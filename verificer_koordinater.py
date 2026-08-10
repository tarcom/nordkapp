#!/usr/bin/env python3
"""Kontrollér kortpunkternes koordinater mod OpenStreetMap.

    python verificer_koordinater.py            # rapport, retter ingenting
    python verificer_koordinater.py --ret      # skriv OSM's koordinater ind

Baggrund: koordinaterne i site/data.js blev oprindeligt skrevet i hånden, og
flere af dem lå kilometervis forkert — Tungeneset lå ude i havet, Tankavaara
27 km galt. Scriptet slår hvert punkt op i Nominatim og sammenligner.

Googles Geocoding API kan ikke bruges her: nøglen i index.html er
referrer-låst til aogj.com, og serverside-kald afvises med "API keys with
referer restrictions cannot be used with this API". Nominatim er gratis og
kræver ingen nøgle — til gengæld højst ét kald i sekundet og en rigtig
User-Agent, som overholdes nedenfor.

SOEG-tabellen oversætter mine danske navne til det navn stedet har i OSM
("Sodankylä gamle trækirke" -> "Sodankylän vanha kirkko"). Uden den finder
Nominatim ingenting.
"""
import io
import json
import math
import re
import subprocess
import sys
import time
import urllib.parse
import urllib.request

HERE = __file__.rsplit("\\", 1)[0].rsplit("/", 1)[0]
DATA = HERE + "/site/data.js"
UA = "nordkapp-rejseside/1.0 (privat rejseplanlaegning)"

# Steder hvor OSM's svar er dårligere end det håndsatte punkt.
BEHOLD = {
    "Inari, ved søen":      "OSM giver kommunens tyngdepunkt, 21 km fra landsbyen",
    "Globusmonumentet":     "ikke i OSM; punktet ligger 120 m fra Nordkapphallen",
    "Nordkapp-platået":     "samme",
}

# Lokale/officielle navne, hvor det danske navn ikke findes i OSM.
SOEG = {
    "Snøhetta-pavillonen": "Viewpoint Snøhetta, Dovre, Norge",
    "Ryten & Kvalvika": "Ryten, Flakstad, Norge",
    "Mannen ved Haukland": "Mannen, Vestvågøy, Norge",
    "Sherpatrappa til Fløya": "Fløya, Tromsø, Norge",
    "Sautso, Altaelva canyon": "Alta Canyon, Alta, Norge",
    "Pielpajärvi ødemarkskirke": "Pielpajärven erämaakirkko, Inari, Suomi",
    "Urho Kekkonen NP, Saariselkä": "Kiilopää, Inari, Suomi",
    "Pyhä-Luosto · Isokuru": "Isokuru, Pelkosenniemi, Suomi",
    "Ounasvaara, Rovaniemi": "Ounasvaara, Rovaniemi, Suomi",
    "Dovrefjell": "Hjerkinn, Dovre, Norge",
    "Mosjøen · Sjøgata": "Sjøgata, Mosjøen, Norge",
    "Haukland & Uttakleiv": "Hauklandstranda, Vestvågøy, Norge",
    "Lofotr Vikingmuseum": "Lofotr",
    "Bergsbotn-platformen": "Bergsbotn utsiktsplattform, Senja, Norge",
    "Narvik · Narvikfjellet": "Narvikfjellet, Narvik, Norge",
    "Fjellheisen, Tromsø": "Fjellheisen, Tromsø, Norge",
    "Lyngsalpene": "Lyngsalpan, Norge",
    "Gildetun, Kvænangsfjellet": "Gildetun, Kvænangen, Norge",
    "E69 langs Porsangerfjorden": "Olderfjord, Porsanger, Norge",
    "Sápmi, Karasjok": "Sápmi park, Karasjok, Norge",
    "Sodankylä gamle trækirke": "Sodankylän vanha kirkko, Suomi",
    "Ukonkivi i Inarisøen": "Ukonkivi, Inari, Suomi",
    "Tankavaara guldlandsby": "Tankavaara, Sodankylä, Suomi",
    "Kalajoki klitter": "Kalajoen hiekkasärkät, Kalajoki, Suomi",
    "Rauma gamle by": "Vanha Rauma, Rauma, Suomi",
    "Naantali & Mumindalen": "Muumimaailma, Naantali, Suomi",
    "Gränna & Visingsö": "Gränna, Jönköping, Sverige",
    "Vättern ved Gränna": "Gränna, Jönköping, Sverige",
    "Hjerkinn, Dovrefjell": "Hjerkinn, Dovre, Norge",
    "Ramberg strand": "Rambergstranda, Flakstad, Norge",
    "Haukland strand": "Hauklandstranda, Vestvågøy, Norge",
    "Ersfjord strand, Senja": "Ersfjordstranda, Senja, Norge",
    "Atlanterhavsveien": "Atlanterhavsvegen, Averøy, Norge",
    "Kystriksveien Fv17": "Brønnøysund, Norge",
    "Svartisen / Engabreen": "Engabreen, Meløy, Norge",
    "Senja": "Fjordgård, Senja, Norge",
    "Andenes hvalsafari": "Andenes, Andøy, Norge",
    "Oulanka NP · Karhunkierros": "Juuma, Kuusamo, Suomi",
    "Kvarken skærgård": "Björköby, Korsholm, Suomi",
    "Skærgårdsringen ved Turku": "Nagu, Pargas, Suomi",
    "Polarsirkelsenteret": "Polarsirkelsenteret, Norge",
}


def haversine(a, b, c, d):
    R = 6371.0
    p1, p2 = math.radians(a), math.radians(c)
    dp, dl = math.radians(c - a), math.radians(d - b)
    h = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * R * math.asin(math.sqrt(h))


def punkter():
    """Læs POI + STOPS ud af data.js ved at køre den i node."""
    js = (
        "global.window=global;require(%r);"
        "console.log(JSON.stringify("
        "POI.map(p=>({navn:p.navn,lat:p.lat,lon:p.lon}))"
        ".concat(STOPS.map(s=>({navn:s.navn,lat:s.lat,lon:s.lon})))));" % DATA
    )
    out = subprocess.run(["node", "-e", js], capture_output=True, text=True,
                         encoding="utf-8", check=True)
    return json.loads(out.stdout)


def slaa_op(q, lat, lon, bundet):
    p = {"q": q, "format": "jsonv2", "limit": "1"}
    if bundet:
        p["viewbox"] = f"{lon-2.0},{lat+1.0},{lon+2.0},{lat-1.0}"
        p["bounded"] = "1"
    url = "https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode(p)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=45) as r:
            d = json.load(r)
        return d[0] if d else None
    except Exception as e:
        print("    fejl:", e, file=sys.stderr)
        return None


def main():
    ret = "--ret" in sys.argv
    fund = []
    for i, p in enumerate(punkter(), 1):
        navn = p["navn"]
        if navn in BEHOLD:
            print(f"{i:3d}.  --  {navn[:34]:34s} beholdt: {BEHOLD[navn]}")
            continue
        q = SOEG.get(navn, navn)
        r = slaa_op(q, p["lat"], p["lon"], True)
        time.sleep(1.15)
        if not r:
            r = slaa_op(q, p["lat"], p["lon"], False)
            time.sleep(1.15)
        if not r:
            print(f"{i:3d}.  ??  {navn[:34]:34s} ikke fundet ({q})")
            continue
        nlat, nlon = round(float(r["lat"]), 4), round(float(r["lon"]), 4)
        afv = haversine(p["lat"], p["lon"], nlat, nlon)
        mark = "    " if afv < 2 else (" !  " if afv < 15 else " XX ")
        print(f"{i:3d}. {mark}{navn[:34]:34s} {afv:7.2f} km  {r.get('type','')}")
        if afv >= 0.15:
            fund.append((navn, nlat, nlon, afv))

    print(f"\n{len(fund)} punkter afviger mere end 150 m.")
    if not ret:
        print("Kør med --ret for at skrive OSM's koordinater ind i data.js.")
        return

    src = io.open(DATA, encoding="utf-8").read()
    n = 0
    for navn, la, lo, _ in fund:
        pat = re.compile(r'(navn:"' + re.escape(navn) + r'",\s*lat:\s*)(-?[\d.]+)(,\s*lon:\s*)(-?[\d.]+)')
        src, antal = pat.subn(lambda m: f"{m.group(1)}{la:.4f}{m.group(3)}{lo:.4f}", src)
        n += antal
    io.open(DATA, "w", encoding="utf-8").write(src)
    print(f"Rettede {n} forekomster i data.js.")


if __name__ == "__main__":
    main()
