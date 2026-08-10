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

Og fandt én risiko, der ikke er løst, men beskrevet på siden:
**dag 10 er 875 km / 12,1 t mod en færge, der lukker check-in ca. kl. 19.**
Alternativet — at sove i Kemi i stedet for Rovaniemi — står i `data.js`
under `BESLUTNINGER`.
