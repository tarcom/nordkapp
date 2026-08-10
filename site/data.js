/* ---------------------------------------------------------------------------
   Nordkapp-turen 17.-28. august 2026 - alt indhold ét sted.

   Afstande og køretider er hentet fra OSRM (bilprofil) og er "fri kørsel"
   uden pauser, ladning eller kø. Realistisk dagslængde ligger 15-25 % over.
   --------------------------------------------------------------------------- */

window.TRIP = {
  from: "2026-08-17", to: "2026-08-28",
  km: 4944, hours: 73.7, days: 12,
  ferryHours: 21,
  north: 71.1709
};

/* Færger. min = varighed i minutter. */
window.FERRIES = [
  { id:"stena_ud", navn:"Frederikshavn → Göteborg", selskab:"Stena Line", min:195,
    dag:1, fra:[57.4370,10.5443], til:[57.6975,11.9285],
    note:"Book morgenafgangen. Sparer ~600 km mod at køre ned over Øresund.",
    link:"https://www.stenaline.dk/ruter/frederikshavn-goteborg" },

  { id:"moskenes", navn:"Bodø → Moskenes", selskab:"Torghatten Nord", min:195,
    dag:4, fra:[67.2804,14.3805], til:[67.9330,12.9950],
    note:"Bilfærgen til Lofoten. Skal bookes i august — den fyldes af autocampere.",
    link:"https://www.torghatten-nord.no" },

  { id:"turku", navn:"Turku → Stockholm", selskab:"Viking Line / Tallink Silja", min:660,
    dag:10, fra:[60.4350,22.2280], til:[59.3480,18.1060],
    note:"Natfærgen. Afgang ca. 20.00, i land 07.00. Sparer både en køredag og en hotelnat.",
    link:"https://www.vikingline.fi" },

  { id:"stena_hjem", navn:"Göteborg → Frederikshavn", selskab:"Stena Line", min:195,
    dag:12, fra:[57.6975,11.9285], til:[57.4370,10.5443],
    note:"Hjemturen. Tjek om en returbillet sammen med udturen er billigere.",
    link:"https://www.stenaline.dk/ruter/frederikshavn-goteborg" }
];

/* Dag for dag. km/t = kørsel den dag (OSRM, uden pauser). */
window.DAYS = [
  { n:1, dato:"2026-08-17", ugedag:"Mandag", titel:"Aalborg → Oslo",
    km:361, t:4.4, faerge:"Stena 3¼ t", sea:true,
    geom:["d1_aalborg_frederikshavn","d1_goteborg_oslo"],
    nav:{ fra:"Aalborg", til:"Oslo, Norge", via:["Frederikshavn"] },
    tekst:"Kort kørsel til Frederikshavn og morgenfærgen over. Fra Göteborg er det motorvej hele vejen til Oslo — E6 langs Bohuslän-kysten. Du er fremme sidst på eftermiddagen med aftenen fri.",
    sol:"Sol ned 20.59 i Aalborg",
    se:[
      ["Bohuslän-kysten","E6 kører langs skærgården nord for Göteborg — stop i Smögen eller Fjällbacka hvis du har tid til overs"],
      ["Svinesund-broen","grænsen mellem Sverige og Norge, markant bue over fjorden"],
      ["Oslo","Operaen du kan gå på taget af, Vigelandsparken, Akershus festning"]
    ] },

  { n:2, dato:"2026-08-18", ugedag:"Tirsdag", titel:"Oslo → Trondheim",
    km:519, t:8.0,
    geom:["d2_oslo_trondheim"],
    nav:{ fra:"Oslo, Norge", til:"Trondheim, Norge", via:["Lillehammer","Dombås"] },
    tekst:"E6 op gennem Gudbrandsdalen og over Dovrefjell. Turens første rigtige fjeldkørsel, og en af de smukkeste strækninger i Sydnorge. Fremme i Trondheim til aften.",
    sol:"Sol ned 21.24 i Trondheim",
    se:[
      ["Mjøsa","Norges største sø — E6 følger den i 100 km. Verdens ældste hjuldamper, «Skibladner», sejler her"],
      ["Lillehammer","OL-byen fra 1994. Maihaugen er et af Nordens største frilandsmuseer"],
      ["Dovrefjell","højfjeld med moskusokser. Udsigtspavillonen Snøhetta ved Hjerkinn er arkitektur værd at stoppe for",1],
      ["Oppdal","sidste stop før nedkørslen mod Trondheimsfjorden"]
    ] },

  { n:3, dato:"2026-08-19", ugedag:"Onsdag", titel:"Trondheim → Bodø",
    km:719, t:11.5, hard:true,
    geom:["d3_trondheim_bodo"],
    nav:{ fra:"Trondheim, Norge", til:"Bodø, Norge", via:["Mo i Rana","Saltstraumen"] },
    tekst:"Turens hårdeste køredag, og den du krydser polarcirklen på. Start tidligt — der er 11½ times kørsel før pauser, og du vil gerne nå Saltstraumen mens strømmen løber.",
    advarsel:"11½ time bag rattet. Afsæt hele dagen, og se Nidarosdomen aftenen før i stedet for om morgenen.",
    sol:"Sol ned 21.51 i Bodø",
    se:[
      ["Mosjøen","Sjøgata er en hel gade af bevarede træhuse fra 1800-tallet — bedste frokoststop på E6"],
      ["Svartisen","Norges næststørste gletsjer. Kan ses fra Holandsfjord, men det er en afstikker på et par timer"],
      ["Polarsirkelsenteret","66°33′N på E6. Det obligatoriske foto — og herfra og nordpå er du i Arktis",1],
      ["Saltstraumen","verdens stærkeste tidevandsstrøm, 400 mio. m³ vand gennem et 150 m bredt sund. Tjek tidevandstabellen — uden for kulminationen er der ikke meget at se",1],
      ["Keiservarden","kort vandring over Bodø med udsigt til Lofotveggen i horisonten"]
    ] },

  { n:4, dato:"2026-08-20", ugedag:"Torsdag", titel:"Bodø → Reine, Lofoten",
    km:2, t:0.1, faerge:"Moskenes 3¼ t", sea:true,
    geom:["d4_moskenes_reine"],
    nav:{ fra:"Moskenes", til:"Reine, Lofoten" },
    tekst:"Næsten ingen kørsel — færgen gør arbejdet. Tre timer over Vestfjorden med Lofotveggen voksende i horisonten, og så er du der. Resten af dagen er din.",
    sol:"Sol ned 21.36 i Reine",
    se:[
      ["Selve overfarten","stå på dækket den sidste time. Lofoten rejser sig af havet som en mur — det er turens bedste ankomst",1],
      ["Å i Lofoten","vejens ende bogstaveligt talt. Tørfiskemuseum og et stednavn på ét bogstav"],
      ["Hamnøy","den røde rorbu-klynge du har set på hvert eneste Lofoten-billede"],
      ["Sakrisøy","de okkergule huse mellem Hamnøy og Reine, mindre overrendt"]
    ] },

  { n:5, dato:"2026-08-21", ugedag:"Fredag", titel:"Lofoten — hviledag",
    km:0, t:0, rest:true,
    geom:[],
    nav:{ fra:"Reine, Lofoten", til:"Henningsvær", via:["Nusfjord"] },
    tekst:"Den eneste dag uden etape, og turens vigtigste buffer. Er noget gået skævt nordpå, er det her du henter det ind. Ellers: vandring om formiddagen, landsbyer om eftermiddagen.",
    sol:"Sol op 04.53 · ned 21.32",
    se:[
      ["Reinebringen","1.566 sherpa-trin op ad fjeldet til Norges mest fotograferede udsigt. 2-3 timer tur/retur, og stien lukkes i dårligt vejr",1],
      ["Kvalvika","vandring til en strand uden vej — halvanden time hver vej, og du har den næsten for dig selv"],
      ["Nusfjord","et af Norges bedst bevarede fiskevær, nu museumslandsby"],
      ["Henningsvær","galleribyen på skær ude i havet. Fodboldbanen mellem klipperne er den du har set fra luften"],
      ["Haukland og Uttakleiv","hvide sandstrande der ser tropiske ud lige indtil du stikker en tå i"],
      ["Sov i en rorbu","de gamle fiskerhytter er nu hytteudlejning — book i god tid til august"]
    ] },

  { n:6, dato:"2026-08-22", ugedag:"Lørdag", titel:"Reine → Tromsø",
    km:583, t:9.7, hard:true,
    geom:["d6_reine_tromso"],
    nav:{ fra:"Reine, Lofoten", til:"Tromsø, Norge", via:["Svolvær","Narvik"] },
    tekst:"Hele Lofoten på langs ad E10, over Lofast til fastlandet, og nordpå ad E6. Ingen færger på ruten — broer og tunneler hele vejen. Lang dag, men landskabet arbejder for dig.",
    advarsel:"Knap 10 timers kørsel. Vælg ét eller to stop undervejs, ikke fem.",
    sol:"Sol ned 21.18 i Tromsø",
    se:[
      ["Lofotr Vikingmuseum","rekonstrueret høvdingehus på 83 meter ved Borg — det største der er fundet i Norden",1],
      ["Svolvær","Lofotens hovedby. Svolværgeita er de to klippehorn over byen"],
      ["Narvik","malmbyen. Svævebanen Narvikfjellet kører til 656 m, og krigsmuseet fortæller om slaget i 1940"],
      ["Polar Park","verdens nordligste dyrepark ved Bardu — ulve, bjørne, los og jærv på store arealer"],
      ["Lyngsalpene","de takkede tinder øst for Tromsø dukker op på de sidste 50 km"]
    ] },

  { n:7, dato:"2026-08-23", ugedag:"Søndag", titel:"Tromsø → Alta",
    km:385, t:6.4,
    geom:["d7_tromso_alta"],
    nav:{ fra:"Tromsø, Norge", til:"Alta, Norge", via:["Skibotn","Storslett"] },
    tekst:"Formiddagen i Tromsø, eftermiddagen på vejen. Landskabet skifter tydeligt her — skoven bliver lav, træerne forsvinder, og du er reelt på vidden.",
    sol:"Sol ned 21.05 i Alta",
    se:[
      ["Fjellheisen","svævebanen op til Storsteinen over Tromsø. Tag den først på dagen for hele øens panorama",1],
      ["Ishavskatedralen","betonspidserne og glasmosaikken, byens vartegn — ligger lige ved svævebanen"],
      ["Polarmuseet","Amundsen, Nansen og de andre der tog herfra og ikke altid kom hjem"],
      ["Lyngenfjorden","E8 følger fjorden med Lyngsalpene på den anden side"],
      ["Kvænangsfjellet","passet mellem Nordreisa og Kvænangen. Ved Gildetun er der ofte samisk sommerlejr og rensdyr"],
      ["Alta Museum","UNESCO-helleristninger, 5.000 år gamle, langs træbroer gennem klippelandskabet",1]
    ] },

  { n:8, dato:"2026-08-24", ugedag:"Mandag", titel:"Alta → Nordkapp",
    km:250, t:4.3, peak:true,
    geom:["d8_alta_nordkapp"],
    nav:{ fra:"Alta, Norge", til:"Nordkapp", via:["Olderfjord","Honningsvåg"] },
    tekst:"Turens korteste køredag, og det er med vilje. Kør derud sidst på eftermiddagen, når turistbusserne er på vej hjem, og bliv til solen går ned kl. 20.56. Vendepunktet: 71°10′21″N.",
    sol:"Sol op 03.46 · ned 20.56 — ingen midnatssol, men mørke nok til nordlys",
    se:[
      ["E69 langs Porsangerfjorden","de sidste 130 km er blandt Norges smukkeste vejstykker",1],
      ["Nordkapptunnelen","6,8 km under havet til Magerøya, 212 meter under overfladen på det dybeste"],
      ["Kirkeporten","naturlig klippeport ved Skarsvåg, kort vandring. Nordkapp-klippen ses gennem hullet",1],
      ["Skarsvåg","verdens nordligste fiskerleje"],
      ["Gjesvær","fugleøerne med lunder og havsuler — bådtur fra landsbyen, book i forvejen"],
      ["Globusmonumentet","selve stedet. Vær der ved solnedgang, ikke midt på dagen",1],
      ["Knivskjellodden","det faktisk nordligste punkt ligger her — 9 km vandring hver vej, og næsten ingen gør det"]
    ] },

  { n:9, dato:"2026-08-25", ugedag:"Tirsdag", titel:"Nordkapp → Rovaniemi",
    km:709, t:10.6, hard:true,
    geom:["d9_nordkapp_rovaniemi"],
    nav:{ fra:"Nordkapp", til:"Rovaniemi, Finland", via:["Karasjok","Inari"] },
    tekst:"Sydpå over Finnmarksvidda og ind i Finland ved Karigasniemi. Fjeld bliver til endeløs skov og sø. Det er også turens tyndeste strækning for ladning — planlæg den.",
    advarsel:"Se beslutningen om dag 9 og 10 længere nede. Overvejer du at køre videre til Kemi i aften, bliver morgendagen markant lettere.",
    sol:"Sol ned 21.15 i Rovaniemi",
    se:[
      ["Stabbursdalen","verdens nordligste fyrreskov, lige nord for Lakselv"],
      ["Karasjok","det samiske parlament Sámediggi og kulturparken Sápmi — det bedste sted på turen at forstå samisk historie",1],
      ["Karigasniemi","grænsen. Fra her og ned følger vejen Ivalojoki gennem Lapland"],
      ["Siida i Inari","samisk museum og naturcenter ved Inarisøen. Langt bedre end sit rygte, og en oplagt frokostpause",1],
      ["Saariselkä","fjeldresort midt i ingenting, sidste rigtige stop før Rovaniemi"],
      ["Sodankylä","den gamle trækirke fra 1689 står stadig ved åen"]
    ] },

  { n:10, dato:"2026-08-26", ugedag:"Onsdag", titel:"Rovaniemi → Turku → færge",
    km:875, t:12.1, hard:true, sea:true, faerge:"Natfærge 11 t",
    geom:["d10_rovaniemi_turku"],
    nav:{ fra:"Rovaniemi, Finland", til:"Turku Satama, Finland", via:["Oulu","Rauma"] },
    tekst:"Turens længste etape, hele Finland på langs, og den eneste dag med en hård deadline: færgen sejler kl. 20. Kom af sted i lyset.",
    advarsel:"875 km og 12 timers ren kørsel før ladestop, mod en færge der lukker check-in ca. kl. 19. Det hænger kun sammen med afgang senest kl. 06 — se beslutningen nedenfor.",
    sol:"Sol op 05.27 i Rovaniemi",
    se:[
      ["Arktikum","langt det bedste museum om Lapland og arktisk liv. Åbner kl. 9 — men kan du nå det i dag?",1],
      ["Santa Claus Village","polarcirklen går tværs gennem parkeringspladsen. Ja, det er kitsch, og ja, det ligger på vejen ud af byen"],
      ["Oulu","halvvejs. God pause: torvet ved havnen og markedshallen"],
      ["Rauma","UNESCO-træby med 600 bevarede huse — det bedste stop på hele den finske etape, hvis tiden rækker",1],
      ["Turku","Åbo Slot ligger fem minutter fra færgeterminalen. Aura å har restaurantbådene"]
    ] },

  { n:11, dato:"2026-08-27", ugedag:"Torsdag", titel:"Stockholm → Göteborg",
    km:477, t:5.8,
    geom:["B11_stockholm_goteborg"],
    nav:{ fra:"Stockholm, Sverige", til:"Göteborg, Sverige", via:["Jönköping"] },
    tekst:"I land kl. 7 efter en nats søvn i kahytten. Tværs over Sverige ad E4 og E20 — fremme i Göteborg tidligt på eftermiddagen. Herfra kan du enten tage aftenfærgen hjem eller overnatte og sejle fredag morgen.",
    sol:"Sol ned 20.24 i Göteborg",
    se:[
      ["Gränna","polkagris-byen ved Vättern. Færge til Visingsö tager 25 minutter, hvis du vil strække benene",1],
      ["Vättern","E4 følger søen i 60 km — der er udsigtsrastepladser hele vejen"],
      ["Jönköping","i søens sydende, oplagt frokoststop"],
      ["Göteborg","Haga med træhusene, Feskekörka og Slottsskogen hvis du bliver natten over"]
    ] },

  { n:12, dato:"2026-08-28", ugedag:"Fredag", titel:"Göteborg → Aalborg",
    km:63, t:0.8, faerge:"Stena 3¼ t", sea:true, home:true,
    geom:["B12_frederikshavn_aalborg"],
    nav:{ fra:"Frederikshavn", til:"Aalborg" },
    tekst:"Morgenfærgen over Kattegat og en times kørsel hjem. Hjemme til frokost — og hvis du tog aftenfærgen i går, har du hele fredagen i overskud.",
    sol:"Sol ned 20.31 i Aalborg",
    se:[
      ["Sidste morgen om bord","Kattegat er som regel roligt i august. Morgenmad på dækket og 4.900 km i bakspejlet",1]
    ] }
];

/* De store stop - det du bliver længere end en kaffepause. */
window.STOPS = [
  { navn:"Oslo",       lat:59.9139, lon:10.7522, dag:"Dag 1",     natter:1 },
  { navn:"Trondheim",  lat:63.4269, lon:10.3969, dag:"Dag 2",     natter:1 },
  { navn:"Bodø",       lat:67.2804, lon:14.3805, dag:"Dag 3",     natter:1 },
  { navn:"Reine",      lat:67.9324, lon:13.0887, dag:"Dag 4-5",   natter:2, hoej:true },
  { navn:"Tromsø",     lat:69.6437, lon:18.9498, dag:"Dag 6",     natter:1 },
  { navn:"Alta",       lat:69.9475, lon:23.1869, dag:"Dag 7",     natter:1 },
  { navn:"Nordkapp",   lat:71.1709, lon:25.7833, dag:"Dag 8",     natter:1, top:true },
  { navn:"Rovaniemi",  lat:66.5039, lon:25.7294, dag:"Dag 9",     natter:1 },
  { navn:"Turku",      lat:60.4518, lon:22.2666, dag:"Dag 10",    natter:0 },
  { navn:"Stockholm",  lat:59.3293, lon:18.0686, dag:"Dag 11",    natter:0 },
  { navn:"Göteborg",   lat:57.7089, lon:11.9746, dag:"Dag 11-12", natter:1 },
  { navn:"Aalborg",    lat:57.0488, lon: 9.9217, dag:"Start / slut", natter:0, hjem:true }
];

/* Beslutninger hvor jeg har ændret eller udfordret det oprindelige udkast. */
window.BESLUTNINGER = [
  { id:"oslo", titel:"Til Trondheim over Oslo, ikke gennem Sverige",
    status:"aendret",
    foer:"Göteborg → Mora → Östersund → Trondheim · 1.056 km · 16,1 t",
    efter:"Göteborg → Oslo → Trondheim ad E6 · 816 km · 11,6 t",
    tekst:"Udkastet sagde, at inlandsruten gennem Sverige var den hurtige. Målt er den 240 km og 4½ time langsommere. E6 over Oslo er motorvej til Lillehammer og god landevej derfra, og den giver dig Gudbrandsdalen og Dovrefjell i stedet for skov. Den svenske rute er smukkere på en stille måde og har Åre og Siljan — men den koster en halv køredag, som du får hårdt brug for i Finland.",
    valg:"Vil du hellere have Dalarna og Jämtland, så flyt de fire en halve timer et andet sted fra — ikke fra dag 9 og 10." },

  { id:"hjem", titel:"Hjem over Göteborg, ikke over Øresund",
    status:"aendret",
    foer:"Stockholm → Helsingborg → Helsingør → Storebælt → Aalborg · 1.019 km · 11,5 t · to broafgifter",
    efter:"Stockholm → Göteborg → Stena → Aalborg · 540 km · 6,6 t · én færge",
    tekst:"Du sejler alligevel Stena på udturen, så returbilletten er ofte billigere end de to broer tilsammen. Ruten sparer 479 km og næsten fem timers kørsel, og du slipper for både Storebælt og Øresund. Bonus: tager du aftenfærgen torsdag, er du hjemme et helt døgn før deadline.",
    valg:"Undtagelsen er hvis I vil bruge en dag i København eller Malmö på vejen hjem — så er Øresund-ruten sin merpris værd." },

  { id:"dag10", titel:"Dag 10 er turens eneste rigtige risiko",
    status:"advarsel",
    foer:"Sov i Rovaniemi · dag 10 bliver 875 km / 12,1 t mod en færge der lukker kl. 19",
    efter:"Sov i Kemi · dag 9 bliver 827 km, dag 10 kun 757 km / 10,2 t",
    tekst:"Det her er det eneste sted i planen, hvor ét uheld vælter resten. 12 timers ren kørsel plus tre ladestop er 13½-14 timer — det kræver afgang kl. 06.00 præcis, og så er der stadig ingen buffer. Misser du færgen, mister du en hel dag og en hotelnat, og du skal stadig nå hjem fredag.",
    valg:"Kører du de sidste 118 km til Kemi allerede tirsdag aften, bliver onsdagen 757 km med to timers luft. Prisen er Arktikum, som du så må nøjes med at køre forbi. Vil du beholde Rovaniemi: sæt vækkeuret til 05.30, lad fuldt op aftenen før, og tjek om Tallink har en senere afgang som plan B." },

  { id:"lofoten", titel:"To nætter på Lofoten er ikke luksus",
    status:"beholdt",
    foer:"", efter:"Dag 4 og 5 i Reine",
    tekst:"Fristelsen er at klippe hviledagen for at få luft i Finland. Lad være. Dag 5 er den eneste buffer i hele planen — og med fire etaper på 700+ km er sandsynligheden for, at noget skrider, ikke lille. Går alt godt, får du Reinebringen. Går det skævt, får du din tidsplan tilbage.",
    valg:"" }
];

/* Alternativer - målte svar på "kan den gøres kortere?" */
window.ALTERNATIVER = {
  retur: {
    titel: "Hjemturen: Finland eller Sverige?",
    intro: "Det nærliggende spørgsmål er, om man kan spare vej ved at køre ned gennem Sverige i stedet for Finland. Jeg har målt alle fire måder at komme fra Nordkapp til Aalborg på. Svaret er nej — og forskellen er større end man skulle tro.",
    rows: [
      { navn:"Finland + natfærge Turku → Stockholm", km:2055, t:28.3, valgt:true,
        note:"Nuværende rute. Og de 11 timer på Østersøen sover du igennem — de tæller reelt ikke." },
      { navn:"Sverige indland ad E45, «Inlandsvägen»", km:2305, t:34.0,
        note:"250 km og knap 6 timer længere. Smuk vej gennem Lapland, men ingen genvej." },
      { navn:"Sverige østkyst ad E4", km:2349, t:31.8,
        note:"294 km længere. Hurtige veje, men du kører hele Bottenvigen rundt i stedet for at skære over." },
      { navn:"Samme vej tilbage ad E6 gennem Norge", km:2653, t:42.0,
        note:"598 km og næsten 14 timer længere. Og du ser det samme igen." }
    ],
    konklusion: "Finland vinder af to grunde: Bottenvigen skæres over i stedet for rundt, og natfærgen laver 11 timers transport om til en nats søvn. Ingen svensk rute har noget tilsvarende."
  },

  norge: {
    titel: "Den ene rigtige besparelse: en anden færge nordpå",
    intro: "Der er ét sted, hvor der reelt er kilometer at hente — og det er i den sydlige ende, ikke den nordlige.",
    rows: [
      { navn:"Hirtshals → Larvik (Color Line, 3¾ t)", km:721, t:10.5, valgt:true,
        note:"Aalborg → Hirtshals er kun 68 km, og du sættes af midt i Norge." },
      { navn:"Frederikshavn → Göteborg (Stena, 3¼ t)", km:881, t:12.4,
        note:"Nuværende. Billigere billet, men 159 km og næsten 2 timer mere bag rattet." }
    ],
    konklusion: "159 km og 1,9 timers kørsel sparet, mod en halv time længere overfart. Prisen er, at du er i Norge fra dag 1 — dyrere mad og strøm — og at Oslo ryger som stop. Hjemturen kan stadig gå over Göteborg med Stena; ruten behøver ikke være symmetrisk."
  },

  jaevn: {
    titel: "Alternativet: tolv jævne dage i stedet for fire hårde",
    intro: "Turen er ikke lang i kilometer per dag — 4.900 km på 12 dage er 410 km i snit. Problemet er fordelingen: fire dage ligger på 700-875 km, og resten er korte. Flytter man overnatningerne, kan ingen dag komme over 652 km — for præcis samme rute og næsten samme samlede afstand.",
    pris: "Prisen er hviledagen på Lofoten. Du får én nat i Reine i stedet for to, og turen har så ingen buffer, hvis noget skrider.",
    dage: [
      { n:1,  titel:"Aalborg → Oslo",              alt:361, nu:361 },
      { n:2,  titel:"Oslo → Trondheim",            alt:519, nu:519 },
      { n:3,  titel:"Trondheim → Mo i Rana",       alt:472, nu:719 },
      { n:4,  titel:"Mo i Rana → Bodø → Reine",    alt:231, nu:2   },
      { n:5,  titel:"Reine → Tromsø",              alt:583, nu:0   },
      { n:6,  titel:"Tromsø → Alta",               alt:385, nu:583 },
      { n:7,  titel:"Alta → Nordkapp",             alt:250, nu:385 },
      { n:8,  titel:"Nordkapp → Inari",            alt:382, nu:250 },
      { n:9,  titel:"Inari → Oulu",                alt:549, nu:709 },
      { n:10, titel:"Oulu → Turku + natfærge",     alt:652, nu:875 },
      { n:11, titel:"Stockholm → Göteborg",        alt:477, nu:477 },
      { n:12, titel:"Göteborg → Aalborg",          alt:63,  nu:63  }
    ],
    konklusion: "Samme rute, samme 12 dage, 4.924 km mod 4.944. Men den længste dag falder fra 875 til 652 km, og færgedagen bliver ufarlig: afgang fra Oulu kl. 7, i Turku ved 16-tiden, seks timer før afgang."
  },

  bund: "Der er ingen stor besparelse at finde. Aalborg-Nordkapp er 2.500 km hver vej, og alt under omkring 4.800 km betyder, at noget væsentligt skæres væk. Vil du under det, er det ikke ruten der skal ændres — så skal Nordkapp eller Lofoten ud af planen."
};

/* Praktisk: hvad der skal bookes, hvad det koster, hvad man skal huske. */
window.PRAKTISK = [
  { gruppe:"Book nu", ikon:"kalender", punkter:[
    ["Stena Frederikshavn → Göteborg","Morgenafgang mandag 17. Book også returen Göteborg → Frederikshavn fredag 28 (eller torsdag aften) — returbillet er typisk billigere."],
    ["Bodø → Moskenes","Torghatten Nord. August er højsæson og færgen fyldes af autocampere. Bliver du afvist, koster det en hel dag. Alternativ: E6 til Bognes."],
    ["Turku → Stockholm","Viking Line eller Tallink Silja, natafgang ca. 20.00 onsdag 26. Bil + kahyt, typisk 100-200 €."],
    ["Rorbu på Lofoten","To nætter i Reine-området. De gode bookes måneder i forvejen til august."],
    ["Overnatning ved Nordkapp","Honningsvåg har begrænset kapacitet. Book før du kører nordpå."]
  ]},

  { gruppe:"Bompenge og afgifter", ikon:"vej", punkter:[
    ["AutoPASS i Norge","Opret aftale på autopass.no <b>før</b> afrejse, eller brug din BroBizz. Uden brik bliver nummerpladen fotograferet og regningen sendt med posten plus gebyr."],
    ["AutoPASS for ferje","Samme brik giver rabat på de norske bilfærger — også Bodø → Moskenes. Den betaler sig hjem på én overfart."],
    ["Trængselsskat i Sverige","Både Stockholm og Göteborg opkræver af udenlandske biler. Faktureres via Epass24 med posten. Kører du gennem Göteborg midt på dagen, er det småpenge — men den kommer."],
    ["Oslo bomring","Passeres på vej ind og ud dag 1-2. Dækket af AutoPASS-aftalen."],
    ["Finland","Ingen vejafgifter overhovedet. Eneste land på turen uden."]
  ]},

  { gruppe:"Entré og priser", ikon:"billet", punkter:[
    ["Nordkapphallen","Entré til selve Nordkapp-platået. Billetten gælder 24 timer, så du kan komme igen næste morgen hvis vejret svigter om aftenen. Tjek aktuel pris på nordkapp.no — den er steget flere år i træk."],
    ["Alta Museum","UNESCO-helleristningerne. Regn med et par timer."],
    ["Lofotr Vikingmuseum","På vejen dag 6, ved Borg."],
    ["Siida, Inari","Samisk museum, dag 9. Nyrenoveret."],
    ["Arktikum, Rovaniemi","Åbner kl. 9. Se advarslen om dag 10 før du regner med det."]
  ]},

  { gruppe:"Fire valutaer", ikon:"penge", punkter:[
    ["DKK · SEK · NOK · EUR","Du krydser fire valutaområder. Kort virker overalt — Norge er nærmest kontantløst — men tjek din banks valutagebyr, det løber op over 12 dage."],
    ["Norge er dyrt","Regn med at mad og overnatning i Norge koster halvanden gang dansk niveau. Finland og Sverige ligger tættere på hjemme."],
    ["Handel ind i Sverige","Sidste billige indkøb før Norge er i Göteborg-området dag 1. Efter grænsen stiger alt."]
  ]},

  { gruppe:"Ladning", ikon:"lyn", punkter:[
    ["Norge er tæt dækket","Superchargere hele vejen op ad E6. Det er ikke her problemet er."],
    ["Alta → Nordkapp → Rovaniemi","Turens tynde stykke. Planlæg Olderfjord, Honningsvåg, Lakselv, Karasjok, Inari, Ivalo og Sodankylä som faste stop, og lad før du behøver."],
    ["Kør med ABRP","Bilens egen planlægger er god i Norge, mindre god i finsk Lapland. A Better Routeplanner som backup, og hav et RFID-kort til de norske Recharge/Kople-ladere."],
    ["Kulde koster","Sidst i august kan det være 3-5 grader på vidden om natten. Regn med 10-15 % kortere rækkevidde end herhjemme."]
  ]},

  { gruppe:"Vejr og lys", ikon:"sol", punkter:[
    ["Ingen midnatssol","Den slutter ved Nordkapp 31. juli. Til gengæld er nætterne sidst i august mørke nok til nordlys igen — og du er på den rigtige breddegrad hele vejen fra dag 3."],
    ["Nordlys","Følg KP-indeks på yr.no eller Norsk Lysvarsel. Bedste chancer: Lofoten dag 4-5, Nordkapp dag 8, Lapland dag 9."],
    ["Tåge på Nordkapp","Platået ligger 307 m over havet og er ofte i skyen selv i pænt vejr. Der er webcam på nordkapp.no — tjek det før du kører de sidste 30 km."],
    ["Fjeldveje","Kvænangsfjellet dag 7 og Dovrefjell dag 2 kan lukke i hårdt vejr, også i august. Tjek vegvesen.no samme morgen."],
    ["Reinebringen","Stien lukkes i regn og blæst. Har du kun én dag på Lofoten og vejret er godt, så tag den om formiddagen."]
  ]}
];
