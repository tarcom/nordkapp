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
    dag:1, fra:[57.4370,10.5443], til:[57.6975,11.9285], book:"nu",
    note:"Book morgenafgangen. Sparer ~600 km mod at køre ned over Øresund.",
    link:"https://www.stenaline.dk/ruter/frederikshavn-goteborg" },

  { id:"moskenes", navn:"Bodø → Moskenes", selskab:"Torghatten Nord", min:195,
    dag:4, fra:[67.2804,14.3805], til:[67.9330,12.9950], book:"fra Norge",
    note:"Bilfærgen til Lofoten. Book den et par dage før, når du er i Norge og kender dit tempo. Bliver den fuld: kør E6 til Bognes og ind i Lofoten nordfra.",
    link:"https://www.torghatten-nord.no" },

  { id:"turku", navn:"Turku → Stockholm", selskab:"Viking Line / Tallink Silja", min:660,
    dag:10, fra:[60.4350,22.2280], til:[59.3480,18.1060], book:"undervejs",
    note:"Både dag- og natafgang. Book den ikke hjemmefra — tag den 2-3 dage før fra vejen. Kan du ikke komme med, kører du rundt om Bottenvigen for 294 km.",
    link:"https://www.vikingline.fi" },

  { id:"stena_hjem", navn:"Göteborg → Frederikshavn", selskab:"Stena Line", min:195,
    dag:12, fra:[57.6975,11.9285], til:[57.4370,10.5443], book:"nu",
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
  { navn:"Oslo",       lat:59.9133, lon:10.7390, dag:"Dag 1",     natter:1 },
  { navn:"Trondheim",  lat:63.4305, lon:10.3952, dag:"Dag 2",     natter:1 },
  { navn:"Bodø",       lat:67.2844, lon:14.3818, dag:"Dag 3",     natter:1 },
  { navn:"Reine",      lat:67.9324, lon:13.0887, dag:"Dag 4-5",   natter:2, hoej:true },
  { navn:"Tromsø",     lat:69.6516, lon:18.9559, dag:"Dag 6",     natter:1 },
  { navn:"Alta",       lat:69.9666, lon:23.2733, dag:"Dag 7",     natter:1 },
  { navn:"Nordkapp",   lat:71.1709, lon:25.7833, dag:"Dag 8",     natter:1, top:true },
  { navn:"Rovaniemi",  lat:66.5025, lon:25.7304, dag:"Dag 9",     natter:1 },
  { navn:"Turku",      lat:60.4518, lon:22.2666, dag:"Dag 10",    natter:0 },
  { navn:"Stockholm",  lat:59.3251, lon:18.0711, dag:"Dag 11",    natter:0 },
  { navn:"Göteborg",   lat:57.7072, lon:11.9670, dag:"Dag 11-12", natter:1 },
  { navn:"Aalborg",    lat:57.0465, lon:9.9218, dag:"Start / slut", natter:0, hjem:true }
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

  { id:"booking", titel:"Book Göteborg og Bodø — men lad Turku stå åben",
    status:"aendret",
    foer:"Book alle fire færger hjemmefra og lås planen",
    efter:"Book Stena nu · book Bodø fra Norge · tag Turku som den kommer",
    tekst:"Din egen plan er den rigtige, og den er bedre end min oprindelige. Stena Frederikshavn → Göteborg skal bookes nu: det er en fast startdato, og den er billigst i forkøb. Bodø → Moskenes kan du roligt booke undervejs — et par dages varsel er rigeligt selv i august, og du ved først, når du er i Norge, hvornår du reelt står der. Turku → Stockholm behøver du slet ikke at binde dig til.",
    valg:"Sikkerhedsnettet er, at Turku-færgen ikke er nødvendig. Kan du ikke komme med, kører du rundt om Bottenvigen over Tornio og Haparanda — det koster 294 km og en halv køredag, ikke turen. Derfor er det billigt at lade den stå åben. Book den 2-3 dage før fra vejen, når du kan se dit eget tempo." },

  { id:"dag10", titel:"Uden booket færge forsvinder dag 10-risikoen",
    status:"beholdt",
    foer:"Med booket færge: 875 km mod en check-in der lukker kl. 19",
    efter:"Uden booket færge: bare en lang dag, og du tager næste afgang",
    tekst:"Det her var turens eneste rigtige risiko, så længe færgen var booket. 12 timers ren kørsel plus ladestop er 13½-14 timer, og det krævede afgang kl. 06.00 præcis uden buffer. Men beslutter du dig for ikke at booke, holder problemet op med at eksistere: kommer du for sent, sejler du med den næste. Der er både dag- og natafgang.",
    valg:"Vil du alligevel have kortere dage, så sov i Kemi i stedet for Rovaniemi tirsdag aften. Dag 9 bliver 827 km, dag 10 kun 757 km. Prisen er Arktikum, som du så må køre forbi." },

  { id:"lofoten", titel:"To nætter på Lofoten er ikke luksus",
    status:"beholdt",
    foer:"", efter:"Dag 4 og 5 i Reine",
    tekst:"Fristelsen er at klippe hviledagen for at få luft i Finland. Lad være. Dag 5 er den eneste buffer i hele planen — og med fire etaper på 700+ km er sandsynligheden for, at noget skrider, ikke lille. Går alt godt, får du Reinebringen. Går det skævt, får du din tidsplan tilbage.",
    valg:"" }
];

/* ---------------------------------------------------------------------------
   Punkter på kortet. kat: vandring | udsigt | sove | omvej
   t = hover-tekst (kort!). d = længere beskrivelse til listerne.
   Koordinater er gode nok til at finde stedet - ikke til at navigere efter.
   --------------------------------------------------------------------------- */
window.POI = [
  /* ---- vandreture ---- */
  { kat:"vandring", navn:"Snøhetta-pavillonen", lat:62.2239, lon:9.4902, dag:2,
    t:"1,5 km hver vej · let · moskusokser", tid:"1 time",
    d:"Arkitekttegnet udsigtspavillon på Dovrefjell med glasvæg mod Snøhetta. Kort, flad sti fra parkeringen ved Hjerkinn. Der går moskusokser på vidden — hold god afstand, de er hurtigere end de ser ud." },
  { kat:"vandring", navn:"Keiservarden", lat:67.3150, lon:14.4783, dag:3,
    t:"1-1,5 time · let · Lofotveggen i horisonten", tid:"1-1,5 time",
    d:"Bodøs husbjerg. Bred grusvej hele vejen op, og på en klar dag ser du hele Lofotveggen ligge som en tandet mur ude i havet. Perfekt til at strække benene efter den lange E6-dag." },
  { kat:"vandring", navn:"Reinebringen", lat:67.9278, lon:13.0714, dag:5,
    t:"1.566 sherpatrin · 2-3 timer · turens bedste udsigt", tid:"2-3 timer", stjerne:true,
    d:"Nepalesiske sherpaer har bygget en trappe hele vejen op ad fjeldsiden. 448 meter lige op, og så ligger Reine, Hamnøy og hele Kirkefjorden under dig. Det er det billede, du har set af Lofoten. Stien lukkes i regn og blæst — tjek før du går." },
  { kat:"vandring", navn:"Ryten & Kvalvika", lat:68.0893, lon:13.0929, dag:5,
    t:"4-5 timer · strand uden vej", tid:"4-5 timer", stjerne:true,
    d:"Vandring over fjeldet til en strand, der ikke har nogen vej. Fortsætter du op på Ryten, står du på en klippekant 543 meter direkte over sandet. Færre folk end Reinebringen og mindst lige så godt." },
  { kat:"vandring", navn:"Mannen ved Haukland", lat:68.2037, lon:13.5202, dag:5,
    t:"1,5-2 timer · let · to strande på én gang", tid:"1,5-2 timer",
    d:"Kort, stejl tur op fra Haukland-stranden. Fra toppen ser du både Haukland og Uttakleiv samtidig — de to hvide strande, der får Lofoten til at ligne Caribien indtil man mærker vandet." },
  { kat:"vandring", navn:"Segla, Senja", lat:69.5074, lon:17.5957, dag:6,
    t:"3-4 timer · 639 m · Norges mest dramatiske", tid:"3-4 timer", stjerne:true,
    d:"Sejlet: en klippehale, der rejser sig lodret af fjorden ved Fjordgård. Turen op er stejl men ikke teknisk, og udsigten fra kanten er svær at overgå nogen steder i Norge. Kræver omvejen over Senja." },
  { kat:"vandring", navn:"Husfjellet, Senja", lat:69.4702, lon:17.2731, dag:6,
    t:"3 timer · 635 m · 360° over Senja", tid:"3 timer",
    d:"Mindre kendt end Segla og med udsigt til den. Fra toppen ser du hele Senjas vestside, Bergsfjorden og ud i Atlanterhavet." },
  { kat:"vandring", navn:"Sherpatrappa til Fløya", lat:69.6203, lon:18.9991, dag:7,
    t:"1.200 trin · 1-2 timer · Tromsø under dig", tid:"1-2 timer",
    d:"Stentrappen op ad Fløya fra Tromsdalen. Ender lige over svævebanens topstation, så du kan gå op og køre ned — eller omvendt, hvis knæene foretrækker det." },
  { kat:"vandring", navn:"Sautso, Altaelva canyon", lat:69.7678, lon:23.6981, dag:7,
    t:"Nordeuropas største kløft", tid:"2-4 timer",
    d:"400 meter dyb og 15 km lang. Kræver en afstikker fra Alta ad grusvej, og den bedste udsigt kommer man kun til fods. Vælg den, hvis vejret er for godt til at sidde i bilen." },
  { kat:"vandring", navn:"Kirkeporten, Skarsvåg", lat:71.1133, lon:25.8021, dag:8,
    t:"30-45 min · let · Nordkapp set gennem et klippehul", tid:"30-45 min", stjerne:true,
    d:"Kort sti fra verdens nordligste fiskerleje op til en naturlig klippeport. Stiller du dig rigtigt, rammer Nordkapp-klippen præcis ind i hullet. Det bedste Nordkapp-billede tages herfra, ikke fra platået." },
  { kat:"vandring", navn:"Knivskjellodden", lat:71.1850, lon:25.6765, dag:8,
    t:"9 km hver vej · 5-6 timer · det RIGTIGE nordligste punkt", tid:"5-6 timer",
    d:"Nordkapp er ikke Europas nordligste punkt — Knivskjellodden ligger 1.457 meter længere nordpå, og der er ingen entré, ingen bus og næsten ingen mennesker. Til gengæld 18 km våd vandring. Skriv dig i bogen i kassen ved pynten." },
  { kat:"vandring", navn:"Otsamo ved Inari", lat:68.8838, lon:26.8379, dag:9,
    t:"3-4 timer · udsigt over Inarisøen", tid:"3-4 timer",
    d:"Fjeldet nord for Inari med udsigt ud over søen og dens 3.000 øer. Godt sted at forstå, hvor stort Lapland faktisk er." },
  { kat:"vandring", navn:"Pielpajärvi ødemarkskirke", lat:68.9513, lon:27.1159, dag:9,
    t:"4 km hver vej · let · kirke fra 1760 midt i skoven", tid:"2-3 timer", stjerne:true,
    d:"En træbygget kirke fra 1760'erne, der står helt alene i ødemarken nordøst for Inari — ingen vej, kun en sti gennem fyrreskoven. Det var her samerne mødtes til vintermarked. Et af de mest stemningsfulde steder i finsk Lapland, og næsten ingen turister finder derud." },
  { kat:"vandring", navn:"Urho Kekkonen NP, Saariselkä", lat:68.3466, lon:27.4609, dag:9,
    t:"Finlands næststørste nationalpark · ligger direkte på E75", tid:"2 timer - flere dage",
    d:"2.550 km² fjeldhede og urskov med et net af gratis ødemarkshytter. Kiilopää-toppen tager to timer tur/retur fra vejen, og der er røgsauna og et iskoldt å-bad nedenfor. Du kører lige forbi indgangen." },
  { kat:"vandring", navn:"Pyhä-Luosto · Isokuru", lat:67.0174, lon:27.2409, dag:9,
    t:"+62 km / +1,1 t · Finlands dybeste kløft", tid:"2-3 timer", stjerne:true,
    d:"Finlands ældste fredede natur. Isokuru er en 220 meter dyb kløft med trappe og gangbro hele vejen ned, og den ligger kun en times omvej fra E75. Den bedste enkeltstående naturoplevelse på hele den finske strækning, målt på hvad den koster." },
  { kat:"vandring", navn:"Auttiköngäs-vandfaldet", lat:66.2881, lon:27.2030, dag:10,
    t:"Kort natursti med hængebro · øst for Rovaniemi", tid:"1 time",
    d:"16 meter højt vandfald med en afmærket rundtur på et par kilometer og en hængebro over strømmen. Nemt stop, hvis du kommer den vej." },
  { kat:"vandring", navn:"Ounasvaara, Rovaniemi", lat:66.5025, lon:25.8021, dag:10,
    t:"Bybjerget · kort tur · udsigt over Kemijoki", tid:"1 time",
    d:"Rovaniemis udsigtsbakke lige uden for byen. Kort og nem, og et godt sted at strække benene inden den lange etape sydpå." },

  /* ---- udsigt og seværdigheder ---- */
  { kat:"udsigt", navn:"Dovrefjell", lat:62.2231, lon:9.5500, dag:2,
    t:"Højfjeld, moskusokser, Norges tag" },
  { kat:"udsigt", navn:"Mosjøen · Sjøgata", lat:65.8370, lon:13.1900, dag:3,
    t:"Hel gade af træhuse fra 1800-tallet · bedste frokoststop på E6" },
  { kat:"udsigt", navn:"Polarsirkelsenteret", lat:66.5524, lon:15.3228, dag:3,
    t:"66°33'N · det obligatoriske foto", stjerne:true },
  { kat:"udsigt", navn:"Saltstraumen", lat:67.2321, lon:14.6100, dag:3,
    t:"Verdens stærkeste tidevandsstrøm · TJEK TIDEVANDSTABELLEN", stjerne:true },
  { kat:"udsigt", navn:"Å i Lofoten", lat:67.8796, lon:12.9840, dag:4,
    t:"Vejens ende · tørfiskemuseum · stednavn på ét bogstav" },
  { kat:"udsigt", navn:"Hamnøy", lat:67.9464, lon:13.1376, dag:4,
    t:"Den røde rorbu-klynge fra hvert eneste Lofoten-billede", stjerne:true },
  { kat:"udsigt", navn:"Nusfjord", lat:68.0354, lon:13.3477, dag:5,
    t:"Et af Norges bedst bevarede fiskevær" },
  { kat:"udsigt", navn:"Haukland & Uttakleiv", lat:68.1980, lon:13.5292, dag:5,
    t:"Hvide sandstrande · ser tropiske ud til du mærker vandet" },
  { kat:"udsigt", navn:"Henningsvær", lat:68.1529, lon:14.2007, dag:5,
    t:"Galleribyen på skær · fodboldbanen mellem klipperne" },
  { kat:"udsigt", navn:"Lofotr Vikingmuseum", lat:68.2442, lon:13.7576, dag:6,
    t:"83 m langt høvdingehus · det største fundet i Norden", stjerne:true },
  { kat:"udsigt", navn:"Tungeneset, Senja", lat:69.4869, lon:17.3330, dag:6,
    t:"Træbro ud over klipperne mod Okshornan-tinderne" },
  { kat:"udsigt", navn:"Bergsbotn-platformen", lat:69.4231, lon:17.5038, dag:6,
    t:"44 m udsigtsplatform 160 m over fjorden" },
  { kat:"udsigt", navn:"Narvik · Narvikfjellet", lat:68.4283, lon:17.4562, dag:6,
    t:"Svævebane til 656 m · krigsmuseet nede i byen" },
  { kat:"udsigt", navn:"Polar Park, Bardu", lat:68.6916, lon:18.1104, dag:6,
    t:"Verdens nordligste dyrepark · ulve, bjørne, los" },
  { kat:"udsigt", navn:"Fjellheisen, Tromsø", lat:69.6385, lon:18.9908, dag:7,
    t:"Svævebane til Storsteinen · hele øens panorama", stjerne:true },
  { kat:"udsigt", navn:"Sommarøy", lat:69.6336, lon:18.0074, dag:7,
    t:"Hvide strande på 69°N · 58 km omvej fra Tromsø" },
  { kat:"udsigt", navn:"Lyngsalpene", lat:69.4023, lon:19.8835, dag:7,
    t:"Takkede tinder direkte op af fjorden" },
  { kat:"udsigt", navn:"Gildetun, Kvænangsfjellet", lat:69.8980, lon:21.6055, dag:7,
    t:"Fjeldpas med fjordudsigt · ofte samisk sommerlejr og rensdyr" },
  { kat:"udsigt", navn:"Alta Museum", lat:69.9468, lon:23.1892, dag:7,
    t:"UNESCO-helleristninger · 5.000 år gamle", stjerne:true },
  { kat:"udsigt", navn:"E69 langs Porsangerfjorden", lat:70.4740, lon:25.0706, dag:8,
    t:"De sidste 130 km · blandt Norges smukkeste vejstykker", stjerne:true },
  { kat:"udsigt", navn:"Nordkapptunnelen", lat:70.9298, lon:25.6997, dag:8,
    t:"6,8 km under havet · 212 m under overfladen" },
  { kat:"udsigt", navn:"Globusmonumentet", lat:71.1709, lon:25.7833, dag:8,
    t:"71°10'21\"N · vendepunktet · vær der ved solnedgang 20.56", stjerne:true },
  { kat:"udsigt", navn:"Gjesvær", lat:71.0984, lon:25.3763, dag:8,
    t:"Fugleøerne · lunder og havsuler · bådtur fra landsbyen" },
  { kat:"udsigt", navn:"Sápmi, Karasjok", lat:69.4731, lon:25.5071, dag:9,
    t:"Samisk parlament og kulturpark", stjerne:true },
  { kat:"udsigt", navn:"Siida, Inari", lat:68.9109, lon:27.0134, dag:9,
    t:"Samisk museum ved Inarisøen · nyrenoveret", stjerne:true },
  { kat:"udsigt", navn:"Sodankylä gamle trækirke", lat:67.4146, lon:26.5968, dag:9,
    t:"Fra 1689 · står stadig ved åen" },
  { kat:"udsigt", navn:"Arktikum, Rovaniemi", lat:66.5075, lon:25.7260, dag:10,
    t:"Det bedste museum om Lapland · åbner kl. 9", stjerne:true },
  { kat:"udsigt", navn:"Ukonkivi i Inarisøen", lat:68.9389, lon:27.2925, dag:9,
    t:"Samernes helligste ø · bådtur fra Inari" },
  { kat:"udsigt", navn:"Tankavaara guldlandsby", lat:68.1810, lon:27.0985, dag:9,
    t:"Guldmuseum på E75 · du må vaske guld selv" },
  { kat:"udsigt", navn:"Oulu", lat:65.0121, lon:25.4720, dag:10,
    t:"Halvvejs · torvet ved havnen og markedshallen" },
  { kat:"udsigt", navn:"Kalajoki klitter", lat:64.2393, lon:23.8182, dag:10,
    t:"Sandklitter og kilometerlang strand på Vt8" },
  { kat:"udsigt", navn:"Rauma gamle by", lat:61.1276, lon:21.5141, dag:10,
    t:"UNESCO-træby · 600 bevarede huse · bedste finske stop", stjerne:true },
  { kat:"udsigt", navn:"Naantali & Mumindalen", lat:60.4728, lon:22.0042, dag:10,
    t:"+16 km fra Turku · træby fra 1400-tallet · Mumitrolde" },
  { kat:"udsigt", navn:"Gränna & Visingsö", lat:58.0251, lon:14.4673, dag:11,
    t:"Polkagris ved Vättern · 25 min færge til øen" },

  /* ---- kandidater til at sove i bilen ---- */
  { kat:"sove", navn:"Hjerkinn, Dovrefjell", lat:62.2231, lon:9.5500, dag:2,
    t:"1.000 m højt · vidde til alle sider · meget mørkt",
    d:"Rasteplads på vidden ved Snøhetta-afkørslen. Højt, åbent og køligt selv i august — men til gengæld er der ingen lysforurening overhovedet." },
  { kat:"sove", navn:"Polarsirkelsenteret", lat:66.5524, lon:15.3228, dag:3,
    t:"Vågn op på polarcirklen · stor P-plads · toiletter", stjerne:true,
    d:"Den store parkering ved 66°33'N på E6. Nøgent fjeld, ofte blæsende, og en af de få steder hvor selve adressen er værd at vågne op til. Tjek skiltningen — centeret har egne regler uden for åbningstid." },
  { kat:"sove", navn:"Saltstraumen", lat:67.2321, lon:14.6100, dag:3,
    t:"Sov ved strømmen · vær klar til kulminationen ved daggry",
    d:"Parkeringen ved broen. Fidusen er, at strømmen kulminerer få gange i døgnet — sover du her, kan du ramme den tidlige uden at skulle køre." },
  { kat:"sove", navn:"Ramberg strand", lat:68.0962, lon:13.2423, dag:4,
    t:"Lofoten · hvid strand direkte ud til vejen",
    d:"En af de få Lofoten-strande med parkering lige ved. Åben mod nordvest, så du ser både solnedgang og eventuelt nordlys fra soveposen." },
  { kat:"sove", navn:"Haukland strand", lat:68.1980, lon:13.5292, dag:5,
    t:"Betalt P med toiletter · Lofotens pæneste strand", stjerne:true,
    d:"Lofoten har strammet reglerne kraftigt, og Haukland er nu betalt parkering med toiletter og fast pris for overnatning. Det koster lidt, men det er lovligt og roligt — og du står 30 meter fra vandet." },
  { kat:"sove", navn:"Ersfjord strand, Senja", lat:69.4788, lon:17.3948, dag:6,
    t:"Turistveg-rasteplads · arkitekttegnet toilet · strand", stjerne:true,
    d:"Kræver Senja-omvejen. Nasjonal turistveg har bygget en rasteplads med det mest fotograferede toilet i Norge, og stranden ligger lige nedenfor." },
  { kat:"sove", navn:"Gildetun, Kvænangsfjellet", lat:69.8980, lon:21.6055, dag:7,
    t:"Fjeldpas med fjordudsigt · rensdyr på parkeringen",
    d:"Højt oppe i passet mellem Nordreisa og Kvænangen. Udsigt ned over fjorden, og der går ofte rensdyr rundt mellem bilerne." },
  { kat:"sove", navn:"Skarsvåg", lat:71.1128, lon:25.8252, dag:8,
    t:"Verdens nordligste fiskerleje · 14 km fra Nordkapp",
    d:"Alternativet til at betale for at sove på selve platået. Ligger tæt nok på, at du kan køre ud til solnedgang og tilbage igen — og Kirkeporten starter her." },
  { kat:"sove", navn:"Nordkapp-platået", lat:71.1709, lon:25.7833, dag:8,
    t:"Lovligt med billet · vågn op på 71°N", stjerne:true,
    d:"Billetten til Nordkapphallen gælder 24 timer, og man må overnatte på parkeringen. Det er dyrt, men det er også den eneste måde at have klippen for sig selv ved midnat og igen ved daggry. Tjek de aktuelle regler på nordkapp.no." },
  { kat:"sove", navn:"Inari, ved søen", lat:68.9060, lon:27.0280, dag:9,
    t:"Finlands stilleste sø · laavu-shelters i nærheden",
    d:"Finland har allemannsret på linje med Norge, og der står gratis laavu-shelters med bålplads rundt om Inarisøen. Godt sted at holde en tidlig aften." },
  { kat:"sove", navn:"Vättern ved Gränna", lat:58.0251, lon:14.4673, dag:11,
    t:"Sidste nat · søudsigt · to timer fra færgen",
    d:"Rasteplads ved E4 med udsigt over Vättern. Praktisk sidste overnatning, hvis du tager morgenfærgen fra Göteborg." },

  /* ---- omveje man kan vælge undervejs ---- */
  { kat:"omvej", navn:"Atlanterhavsveien", lat:63.0108, lon:7.4273, dag:2,
    t:"+245 km / +4,9 t · vejen der hopper mellem skær", stjerne:true },
  { kat:"omvej", navn:"Kystriksveien Fv17", lat:65.4749, lon:12.2116, dag:3,
    t:"~+450 km og 6 færger · regn med to dage i stedet for én", stjerne:true },
  { kat:"omvej", navn:"Torghatten", lat:65.3983, lon:12.0912, dag:3,
    t:"Bjerget med hul igennem · 1 times vandring · på Kystriksveien" },
  { kat:"omvej", navn:"Svartisen / Engabreen", lat:66.6824, lon:13.7708, dag:3,
    t:"Norges næststørste gletsjer · båd + vandring" },
  { kat:"omvej", navn:"Senja", lat:69.4856, lon:17.6589, dag:6,
    t:"+159 km / +3 t · «Norge i miniature» · Segla ligger her", stjerne:true },
  { kat:"omvej", navn:"Andenes hvalsafari", lat:69.3123, lon:16.1057, dag:6,
    t:"+178 km / +5,4 t via færgen til Senja · kaskelothvaler" },
  { kat:"omvej", navn:"Oulanka NP · Karhunkierros", lat:66.2720, lon:29.3881, dag:10,
    t:"+243 km / +3,8 t · Finlands bedste vandreterræn", stjerne:true },
  { kat:"omvej", navn:"Kvarken skærgård", lat:63.3448, lon:21.3235, dag:10,
    t:"+89 km / +1,9 t · UNESCO · landet hæver sig 8 mm om året" },
  { kat:"omvej", navn:"Skærgårdsringen ved Turku", lat:60.1925, lon:21.9105, dag:10,
    t:"+120 km / +2,8 t · gratis færger mellem øerne", stjerne:true }
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

/* Omveje: hvad koster det at opleve mere? maalt = tal fra rutemotoren. */
window.OMVEJE = {
  intro: "Kilometer er ikke problemet, siger du. Så er her det, der reelt er værd at lægge vej til — sorteret efter hvor meget du får for timen. Alle tal er merpris i forhold til den planlagte rute, målt med rutemotoren undtagen hvor andet står.",
  liste: [
    { navn:"Senja", km:159, t:3.0, maalt:true, dag:6, karat:5,
      hvor:"I stedet for E10/E6 direkte fra Lofoten til Tromsø",
      d:"Hvis du kun tilføjer én ting, så tag denne. Senja kaldes «Norge i miniature» og har Lofotens landskab uden Lofotens busser. Segla-vandringen er blandt de mest dramatiske i landet, Tungeneset og Bergsbotn er arkitekttegnede udsigtsstop, og Ersfjord er et af turens bedste steder at sove i bilen.",
      pris:"Tre timer. Det er den billigste store oplevelse på hele turen." },

    { navn:"Atlanterhavsveien + Åndalsnes", km:245, t:4.9, maalt:true, dag:2, karat:4,
      hvor:"Fra Dombås mod Trondheim i stedet for E6 over Dovrefjell",
      d:"Vejen der hopper fra skær til skær på otte broer, med Storseisundbroen der ser ud til at ende i luften. Undervejs ligger Trollstigen og Trollveggen ved Åndalsnes. To korte færger indgår i tallene.",
      pris:"Knap fem timer, og du bytter Dovrefjell væk. Tjek om Trollstigen er åben — den har været lukket flere sæsoner på grund af stenskred." },

    { navn:"Kystriksveien Fv17", km:450, t:9, maalt:false, dag:3, karat:5,
      hvor:"I stedet for E6 fra Trondheim til Bodø",
      d:"Norges smukkeste vejstrækning, siger mange — 650 km langs kysten med seks færger, Torghatten med hullet igennem, og Svartisen-gletsjeren der går næsten ned til vejen. Færgerne er en del af oplevelsen, ikke en forhindring.",
      pris:"Regn med to dage i stedet for én. Det er den dyreste omvej på listen og kræver, at du finder en dag et andet sted.",
      note:"Tallene her er skøn — rutemotoren nægter at køre Kystriksveien, fordi den straffer færger så hårdt, at den kører udenom hver gang. Alt andet på siden er målt." },

    { navn:"Andenes hvalsafari", km:178, t:5.4, maalt:true, dag:6, karat:3,
      hvor:"Via Vesterålen og færgen Andenes → Gryllefjord til Senja",
      d:"Kaskelothvaler året rundt ud for Andenes, hvor kontinentalsoklen falder brat. Tager du den vej, får du både Vesterålen og Senja med i én bevægelse.",
      pris:"Fem en halv time inklusive færge, og selve safarien tager en halv dag.",
      note:"Færgen Andenes → Gryllefjord sejler kun om sommeren. Tjek at den kører sidst i august, før du planlægger efter den." },

    { navn:"Sommarøy", km:116, t:2.4, maalt:true, dag:7, karat:3,
      hvor:"Tur/retur fra Tromsø",
      d:"Hvide sandstrande og turkist vand på 69°N. Ser ud som om nogen har flyttet Caribien 3.000 km for langt mod nord og glemt at skrue op for varmen.",
      pris:"To en halv time. Nem at klemme ind på formiddagen inden Alta." },

    { navn:"Pyhä-Luosto", km:62, t:1.1, maalt:true, dag:9, karat:4,
      hvor:"Kort afstikker fra E75 mellem Sodankylä og Rovaniemi",
      d:"Isokuru er Finlands dybeste kløft — 220 meter ned mellem to fjelde, med trappe og gangbro hele vejen. Det er Finlands ældste fredede natur, og den ligger praktisk talt på vejen.",
      pris:"En time. Det er den billigste rigtige naturoplevelse på hele turen." },

    { navn:"Skærgårdsringen ved Turku", km:120, t:2.8, maalt:true, dag:10, karat:4,
      hvor:"Fra Turku ud i skærgården og tilbage, inden færgen",
      d:"Vejen hopper fra ø til ø gennem Finlands skærgårdshav — verdens største målt i antal øer. Færgerne mellem øerne er en del af vejnettet og derfor gratis, og de sejler næsten konstant.",
      pris:"Under tre timer. Perfekt hvis du alligevel venter på en færge, du ikke har booket.",
      note:"Nogle af forbindelserne på den store ring sejler kun i sommersæsonen og lukker sidst i august. Den korte tur til Nagu og tilbage kører hele året." },

    { navn:"Oulanka NP · Karhunkierros", km:243, t:3.8, maalt:true, dag:10, karat:4,
      hvor:"Øst om via Kuusamo i stedet for lige ned ad Vt4 til Oulu",
      d:"Finlands bedste vandreterræn: stryg, hængebroer og fyrreskov i en kløft ved den russiske grænse. «Lille Bjørnerunde» er en 12 km rundtur, der tager en formiddag; den store er 82 km.",
      pris:"Knap fire timer ekstra kørsel plus en halv dag til fods. Det er den finske pendant til Kystriksveien — dyr, men det eneste sted Finland bliver dramatisk." },

    { navn:"Kvarken skærgård", km:89, t:1.9, maalt:true, dag:10, karat:3,
      hvor:"Fra Vaasa på vestkysten, undervejs mod Turku",
      d:"UNESCO-område, hvor landet stadig hæver sig cirka 8 mm om året efter istiden — nye øer dukker bogstaveligt talt op. Replot-broen er Finlands længste.",
      pris:"To timer. Mest for geologien; landskabet er lavt og stille." },

    { navn:"Knivskjellodden", km:0, t:6, maalt:false, dag:8, karat:4,
      hvor:"Fra E69 lige før Nordkapp",
      d:"Europas faktisk nordligste punkt, 1.457 meter længere nordpå end Nordkapp. Ingen entré, ingen bus, næsten ingen mennesker — kun 9 km vandring hver vej og en bog i en kasse, du kan skrive dig i.",
      pris:"Ingen ekstra kørsel, men en hel dag til fods. Til gengæld er det den eneste måde reelt at stå nordligst." }
  ],
  bund: "Tager du Senja og Sommarøy, koster det 275 km og 5,4 timer — og det er den bedste handel på listen. Vil du også have Kystriksveien, skal der findes en hel dag, og så er hviledagen på Lofoten det eneste sted den kan komme fra.",

  finland: {
    titel: "Hvorfor Finland så tomt ud",
    tekst: [
      "Den første udgave af kortet havde seks punkter i Finland mod tredive i Norge, og det var misvisende. Tre ting forklarer det, og kun den ene handler om Finland.",
      "<b>Du kører den hurtige linje gennem Finland og den smukke gennem Norge.</b> E75 og Vt4 ned gennem midten er transitkorridoren — den er lagt for at komme sydpå, ikke for at se noget. I Norge kører du E6 og E10 langs en kyst, der er blandt Europas mest seværdige vejstrækninger. Det er ikke en fair sammenligning mellem to lande; det er en sammenligning mellem en motorvej og en panoramarute.",
      "<b>Finland er landskabeligt fladere, og det er ikke til diskussion.</b> Der er ingen fjorde, og det højeste punkt er Halti på 1.324 meter — som i øvrigt ligger på grænsen og kun kan nås fra norsk side. Men Finlands natur er vandret i stedet for lodret: sø, skov, lys og stilhed. Den belønner at man stopper og bliver, ikke at man kører forbi og kigger. Det er en dårlig match for en bilrute og en god match for en madras i bagagerummet.",
      "<b>Og så var det min egen slagside.</b> Norske bilturs-seværdigheder er gennemdokumenterede; Finlands gode steder er mindre internationalt kendte, og min første liste afspejlede hvad der er nemt at komme i tanke om, ikke hvad der er. Der er nu tolv finske punkter mere på kortet, blandt andet Pielpajärvi-ødemarkskirken, Urho Kekkonen-nationalparken og Pyhä-Luosto."
    ],
    folk: "Færre mennesker er derimod ikke forklaringen. Finland har cirka 5,6 millioner indbyggere, Norge cirka 5,5 — og tætheden er næsten identisk. Går man tættere på: finsk Lapland har omkring 180.000 mennesker på et areal på størrelse med Portugal, norske Finnmark har omkring 76.000 på det halve. Der er lige tomt begge steder. Til gengæld er der <b>langt færre turister</b> i finsk Lapland i august, fordi det primært er en vinterdestination — mens Lofoten og Nordkapp er på deres højeste. Det mærker du."
  }
};

/* At sove i bilen: regler og virkelighed i de fire lande. */
window.SOVE = {
  intro: "Du har madras i bilen og vil sove bagi cirka halvdelen af nætterne. Det er der god plads til på denne rute — men reglerne er ikke helt dem, folk tror.",
  regler: [
    { land:"Norge", d:"Allemannsretten giver dig ret til at overnatte i <b>telt</b> på udyrket mark, mindst 150 m fra beboet hus, i op til to nætter. <b>Den gælder ikke biler.</b> At sove i en parkeret bil er i stedet et spørgsmål om parkeringsreglerne: hvor du må holde, må du som regel også sove. Men du må ikke «campere» — stole, bord og fortelt ud — på rastepladser hvor det er forbudt. Kig efter skilte med «Camping forbudt» eller «Ingen overnatting»." },
    { land:"Lofoten", d:"Har strammet reglerne kraftigt efter mange års overturisme. Vild parkering er forbudt mange steder nu, og de gode strande har fået <b>betalt parkering med toiletter</b> og en fast pris for at stå natten over. Det er billigt sammenlignet med hotel, og det er den lovlige måde. Regn med at betale ved Haukland, Uttakleiv og Kvalvika." },
    { land:"Finland", d:"Jokamiehenoikeus svarer til den norske allemannsret, og finnerne er afslappede med det. Oveni står der gratis <b>laavu</b> — åbne shelters med bålplads — i alle nationalparker og langs mange søer. Metsähallitus har kort over dem alle." },
    { land:"Sverige", d:"Allemansrätten, samme princip. Rastepladser langs E4 og E20 tillader som regel én overnatning. Det er den mindst spændende del af turen at sove på, men også den nemmeste." }
  ],
  praktisk: [
    ["Nætterne bliver kolde","Sidst i august kan det være 3-5 grader på vidden. Tesla'ens Camp Mode holder varmen, men den koster typisk 10-15 % batteri per nat — regn med det, når du planlægger ladning."],
    ["Myg i Lapland","August er bedre end juli, men Finnmarksvidda og finsk Lapland har stadig myg. Myggenet til vinduerne er den bedste 100-kroners investering på turen."],
    ["Lys om natten","Fra dag 3 og nordpå er det aldrig helt mørkt før sent i august — men det bliver mørkt nok. Tag en solskærm eller gardiner, ellers vågner du kl. 4."],
    ["Toiletter og bad","Rastepladserne i Norge har som regel toilet. Til bad: svømmehaller i byerne koster småpenge, og campingpladser sælger ofte adgang til bad uden at man overnatter."],
    ["Skift mellem seng og bil","Halvdelen i bilen er en god plan. Læg de rigtige senge på de dage, hvor du har kørt langt — dag 3, dag 6 og dag 10 — og sov i bilen på de korte dage, hvor du kommer tidligt frem."]
  ],
  advarsel: "Jeg har markeret sovesteder på kortet som <b>kandidater</b>, ikke som garantier. Jeg kan ikke se skiltningen fra Aalborg, og reglerne ændrer sig fra sæson til sæson — særligt på Lofoten. Tjek altid skiltet på stedet."
};

/* Praktisk: hvad der skal bookes, hvad det koster, hvad man skal huske. */
window.PRAKTISK = [
  { gruppe:"Book hjemmefra", ikon:"kalender", punkter:[
    ["Stena Frederikshavn → Göteborg","Det eneste der skal bookes nu. Morgenafgang mandag 17. Tag returen Göteborg → Frederikshavn med det samme — returbillet er typisk billigere end to enkelte, og den er den billigste vej hjem."],
    ["Én seng ved Nordkapp","Honningsvåg har begrænset kapacitet, og det er den ene nat hvor du ikke vil stå uden noget. Resten kan tages undervejs."]
  ]},

  { gruppe:"Book undervejs", ikon:"kalender", punkter:[
    ["Bodø → Moskenes","Book fra Norge et par dage før. Bliver den fuld: E6 til Bognes-færgen og ind i Lofoten nordfra i stedet."],
    ["Turku → Stockholm","Book 2-3 dage før fra vejen. Både dag- og natafgang. Kommer du ikke med, kører du rundt om Bottenvigen for 294 km — derfor er den ufarlig at lade stå åben."],
    ["Rorbu på Lofoten","Vil du have én rigtig seng på Lofoten, så book den tidligt — de gode går måneder i forvejen. Ellers: sov i bilen ved Haukland eller Ramberg."]
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
