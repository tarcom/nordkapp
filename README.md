# nordkapp

Rejseside for turen Aalborg → Nordkapp → hjem gennem Finland,
17.–28. august 2026. Live på **https://aogj.com/nordkapp**.

Siden er ren statisk HTML/CSS/JS — ingen PHP, ingen database, ingen build.
Rediger i `site/` og kør `deploy.py`.

## Deploy

```powershell
python deploy.py          # uploader site/ -> aogj.com/nordkapp via FTP
```

`.ftp-credentials` (gitignoreret) har samme format som i `bio` og `superbits`:

```
FTP_HOST=ftp.aogj.com
FTP_USER=aogj.com
FTP_PASS=…
```

`index.html` får automatisk `?v=<md5>` på `style.css`, `app.js`, `data.js` og
`geom.js` ved upload. Det er ikke pynt: one.com ligger bag en Varnish, der
ellers serverer forældet CSS/JS i timevis.

## Filer

| Fil | Hvad |
|---|---|
| `site/index.html` | Sidens skelet. Alt indhold indsættes af `app.js`. |
| `site/data.js` | **Alt indhold** — dage, seværdigheder, færger, praktik, beslutninger. Det er her du retter tekst. |
| `site/geom.js` | Vejgeometri (483 punkter) fra OSRM. Genereret — rediger ikke i hånden. |
| `site/app.js` | Rendering + kort. |
| `site/style.css` | Alt design. |

## Kortet

Google Maps JavaScript API. Nøglen ligger synligt i `index.html` — sådan
virker API'et, og derfor er den **referrer-låst til aogj.com**. Sæt et dagligt
forbrugsloft i Google Cloud, så en kopieret nøgle ikke kan koste penge.

Ruten tegnes fra forudberegnet geometri i `geom.js`, **ikke** via Directions
API. Det er med vilje: hvert sidevisning koster så kun ét kortopslag i stedet
for tolv ruteopslag.

Fordi nøglen er låst til aogj.com, virker Google-kortet **ikke** når man åbner
`site/index.html` lokalt. Siden opdager det (`gm_authFailure`, plus en 4
sekunders timeout) og falder automatisk tilbage til Leaflet med
OpenStreetMap-fliser, så resten af siden kan testes lokalt.

## Rutedata

Afstande og køretider er hentet fra den offentlige OSRM-demoserver
(`router.project-osrm.org`, bilprofil) og er **fri kørsel uden pauser**.
Realistisk dagslængde ligger 15–25 % over.

To ting at vide, hvis tallene skal genberegnes:

- Demoserveren afviser `exclude=ferry` ("Exclude flag combination is not
  supported"). I stedet tvinger mellempunkter (Mo i Rana, Narvik, Olderfjord)
  ruten ad E6/E10, og `steps=true` bruges til at verificere, at ingen etape
  smutter over en færge.
- Sol op/ned er beregnet lokalt med NOAA-algoritmen, ikke hentet et sted fra.

## Ændringer i forhold til det oprindelige udkast

Måling mod rigtige rutedata væltede to antagelser:

- **Til Trondheim over Oslo, ikke gennem Sverige.** Inlandsruten via Mora og
  Östersund er 1.056 km / 16,1 t; E6 over Oslo er 816 km / 11,6 t.
  240 km og 4½ time sparet.
- **Hjem over Göteborg, ikke over Øresund.** Stockholm → Helsingborg →
  Helsingør → Storebælt → Aalborg er 1.019 km / 11,5 t plus to broafgifter;
  Stockholm → Göteborg → Stena → Aalborg er 540 km / 6,6 t plus én færge,
  som alligevel sejles på udturen.

Dag 10 var turens eneste rigtige risiko — 875 km / 12,1 t mod en færge der
lukker check-in ca. kl. 19. **Den forsvandt, da færgestrategien blev lagt om:**
kun Stena bookes hjemmefra, Turku tages som den kommer. Uden booket afgang
er en forsinkelse bare næste afgang, og kan man slet ikke komme med, koster
omvejen rundt om Bottenvigen 294 km. Alternativet med overnatning i Kemi
står stadig i `data.js` under `BESLUTNINGER`.

## Kortet: hover, filtre og Directions

Ruten tegnes i to trin. Først straks fra `geom.js`, så kortet aldrig står
tomt — derefter henter siden **Googles egen rute** med DirectionsService og
overskriver linjerne. Waypoints til Directions samples fra OSRM-geometrien
(3 punkter per segment), så Google følger den samme korridor.

Directions-svarene caches i `localStorage` under `nordkapp.ruter.v1`.
Første besøg i en browser koster **12 Directions-kald** (ét per segment);
derefter nul. Ryd nøglen i browserens devtools for at tvinge en genhentning.

Ændrer du ruten i `geom.js`, så **hæv versionsnummeret i `CACHE_KEY`** i
`app.js` — ellers bliver gamle ruter hængende hos dem der har set siden før.

Hover-tekster ligger i `t`-feltet på hvert punkt i `window.POI` (hold dem
korte) og genereres for ruter og færger ud fra `DAYS` og `FERRIES`.
Filterknapperne over kortet bygges automatisk ud fra `KAT` i `app.js`.

## Hvad der er målt, og hvad der er skøn

Alt på siden er målt med OSRM undtagen to ting, der er markeret som skøn
på siden selv:

- **Kystriksveien Fv17.** OSRM straffer færger så hårdt, at den kører
  udenom i stedet for at tage dem — den gav 1.048 km for en strækning der
  reelt er ~650 km med seks færger. Tallene er derfor overslag.
- **Knivskjellodden**, der er en vandring og ikke en køretur.

Sovesteder er **kandidater**, ikke verificerede. Skiltning og regler skifter
fra sæson til sæson, især på Lofoten.

## Koordinater

Punkternes koordinater blev oprindeligt skrevet i hånden og var flere steder
kilometervis forkerte — Tungeneset lå ude i havet, Tankavaara 27 km galt.
De er nu slået op i OpenStreetMap:

```powershell
python verificer_koordinater.py          # rapport, retter ingenting
python verificer_koordinater.py --ret    # skriver OSM's koordinater ind
```

71 af 83 punkter blev flyttet; 19 af dem mere end 5 km. Tre er bevidst
beholdt, fordi OSM's svar er dårligere — de står i `BEHOLD` i scriptet med
begrundelse.

**Googles Geocoding API kan ikke bruges til det her.** Nøglen i `index.html`
er referrer-låst til aogj.com, og serverside-kald afvises med *"API keys with
referer restrictions cannot be used with this API"*. Nominatim kræver ingen
nøgle, men højst ét kald i sekundet og en rigtig User-Agent.

`SOEG`-tabellen i scriptet oversætter de danske navne til stedernes navne i
OSM (`Sodankylä gamle trækirke` → `Sodankylän vanha kirkko`). Tilføjer du et
punkt med et dansk navn, skal det som regel også have en linje der.
