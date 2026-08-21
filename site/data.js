/* ---------------------------------------------------------------------------
   Nordkapp-turen 17.-28. august 2026 - alt indhold ét sted.

   Afstande og køretider er hentet fra OSRM (bilprofil) og er "fri kørsel"
   uden pauser, ladning eller kø. Realistisk dagslængde ligger 15-25 % over.
   --------------------------------------------------------------------------- */

window.TRIP = {
  from: "2026-08-17", to: "2026-08-28",
  km: 4801, hours: 72.1, days: 12,
  ferryHours: 21,
  north: 71.1709
};

/* Færger. min = varighed i minutter. */
window.FERRIES = [
  { id:"colorline_ud", navn:"Hirtshals → Larvik", selskab:"Color Line · SuperSpeed 2", min:240,
    dag:1, fra:[57.5880,9.9600], til:[59.0530,10.0290], book:"booket", pris:"1.390 NOK",
    ref:"XEA2995", tider:"Afgang 12.45 · i land 16.45 · check-in senest 11.45",
    note:"Booket. Økonomi-billet, 1 voksen og lille bil. Mødetid er senest 60 minutter før afgang, så vær i Hirtshals 11.45 — kør hjemmefra ved 10-tiden.",
    link:"https://www.colorline.no" },

  { id:"moskenes", navn:"Bodø → Moskenes", selskab:"Torghatten Nord", min:195,
    dag:4, fra:[67.2804,14.3805], til:[67.9330,12.9950], book:"fra Norge",
    note:"Bilfærgen til Lofoten. Book den et par dage før, når du er i Norge og kender dit tempo. Bliver den fuld: kør E6 til Bognes og ind i Lofoten nordfra.",
    link:"https://www.torghatten-nord.no" },

  { id:"turku", navn:"Turku → Stockholm", selskab:"Viking Line / Tallink Silja", min:660,
    dag:10, fra:[60.4350,22.2280], til:[59.3480,18.1060], book:"undervejs",
    note:"Både dag- og natafgang. Book den ikke hjemmefra — tag den 2-3 dage før fra vejen. Kan du ikke komme med, kører du rundt om Bottenvigen for 294 km.",
    link:"https://www.vikingline.fi" },

  { id:"stena_hjem", navn:"Göteborg → Frederikshavn", selskab:"Stena Line", min:195,
    dag:12, fra:[57.6975,11.9285], til:[57.4370,10.5443], book:"undervejs", pris:"~1.300 kr",
    note:"Book den 1-2 dage før fra vejen, og vælg en eftermiddags- eller aftenafgang fredag. Den sejler mange gange dagligt, så den kan endda bookes fra telefonen samme formiddag. Kommer du ikke med, kører du over Øresund i stedet — 479 km mere, men omtrent samme billetpris når bro og Storebælt lægges sammen.",
    link:"https://www.stenaline.dk/ruter/frederikshavn-goteborg" }
];

/* Dag for dag. km/t = kørsel den dag (OSRM, uden pauser). */
window.DAYS = [
  { n:1, dato:"2026-08-17", ugedag:"Mandag", titel:"Aalborg → Lillehammer",
    km:385, t:4.9, faerge:"Color Line 3¾ t", sea:true,
    geom:["d1_aalborg_hirtshals","d1_larvik_lillehammer"],
    nav:{ fra:"Aalborg", til:"Lillehammer, Norge", via:["Hirtshals","Larvik"] },
    tekst:"Rolig morgen: 68 km til Hirtshals, check-in 11.45, afgang 12.45. Færgen sætter dig af midt i Norge kl. 16.45, og så er der fire timer op ad E18 forbi Oslo og videre ad E6 langs Mjøsa. Fremme ved 21.30 — første nat i bilen.",
    advarsel:"Solen går ned 21.03 ved Mjøsa, så den sidste times kørsel bliver i skumring. Det er motorvej hele vejen, men vil du hellere ankomme i lys, så stop ved Koigen i Hamar i stedet — det ligger på kortet som sovested, og det koster kun en time ekstra på dag 2.",
    sol:"Sol ned 21.03 ved Mjøsa · afgang Hirtshals 12.45, i land Larvik 16.45",
    se:[
      ["Vestfold-kysten","E18 nordpå fra Larvik gennem det gamle hvalfangerland. Sandefjord og Tønsberg ligger lige ved vejen"],
      ["Oslo passeres","du har været her før, så kør forbi — tunnelringen er hurtig uden for myldretiden",1],
      ["Mjøsa","Norges største sø. E6 følger den i 100 km, og verdens ældste hjuldamper, «Skibladner», sejler stadig her",1],
      ["Lillehammer","OL-byen fra 1994. Maihaugen er et af Nordens største frilandsmuseer, hvis du når det næste morgen"]
    ] },

  { n:2, dato:"2026-08-18", ugedag:"Tirsdag", titel:"Lillehammer → Trondheim",
    km:353, t:5.9,
    geom:["d2_lillehammer_trondheim"],
    nav:{ fra:"Lillehammer, Norge", til:"Trondheim, Norge", via:["Dombås","Oppdal"] },
    tekst:"Turens letteste køredag, og det er med vilje: i morgen venter 719 km. Op gennem Gudbrandsdalen og over Dovrefjell, fremme i Trondheim tidligt på eftermiddagen med hele resten af dagen i byen.",
    sol:"Sol ned 21.24 i Trondheim",
    se:[
      ["Gudbrandsdalen","dalen der bærer hele Norges historie — E6 følger Lågen hele vejen op"],
      ["Dovrefjell","højfjeld med moskusokser. Udsigtspavillonen Snøhetta ved Hjerkinn er arkitektur værd at stoppe for",1],
      ["Oppdal","sidste stop før nedkørslen mod Trondheimsfjorden"],
      ["Nidarosdomen","Nordens største middelalderkatedral, bygget over Olav den Helliges grav. Du har eftermiddagen til den",1],
      ["Bakklandet og Gamle Bybro","de skæve træhuse langs elven, bedst til fods sidst på dagen — og de ligger på byvandringen"],
      ["Kristiansten festning","op ad bakken bag Bakklandet: hele byen, elven og fjorden fra volden, og gratis at komme ind",1],
      ["Aftensmad i byen","Brasilia ved Bakke bru er valget — brasiliansk churrasco, spis alt hvad du kan. Se afsnittet om Trondheim"]
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
      ["Lyngsalpene","de takkede tinder øst for Tromsø dukker op på de sidste 50 km"],
      ["Byvandring i Tromsø","3,7 km gennem polarhistorien, træbyen og domkirken — og den ender ved aftensmaden. Se afsnittet om Tromsø",1]
    ] },

  { n:7, dato:"2026-08-23", ugedag:"Søndag", titel:"Tromsø → Alta",
    km:385, t:6.4,
    geom:["d7_tromso_alta"],
    nav:{ fra:"Tromsø, Norge", til:"Alta, Norge", via:["Skibotn","Storslett"] },
    tekst:"Formiddagen i Tromsø, eftermiddagen på vejen. Landskabet skifter tydeligt her — skoven bliver lav, træerne forsvinder, og du er reelt på vidden.",
    sol:"Sol ned 21.05 i Alta",
    se:[
      ["Fjellheisen, Tromsø","svævebanen op til Storsteinen over byen. Tag den først på dagen for hele øens panorama",1],
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
    tekst:"Turens længste etape: hele Finland på langs. Kom af sted i lyset — men uden booket færge er der ingen deadline, kun en lang dag.",
    advarsel:"875 km og 12 timers ren kørsel før ladestop. Vil du nå aftenafgangen kl. 20, kræver det afgang fra Rovaniemi senest kl. 06. Når du den ikke, tager du bare den næste — det er derfor færgen ikke er booket.",
    sol:"Sol op 05.27 i Rovaniemi",
    se:[
      ["Arktikum","langt det bedste museum om Lapland og arktisk liv. Åbner kl. 9 — vil du nå aftenfærgen, skal du forbi før",1],
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
  { navn:"Lillehammer", lat:61.1153, lon:10.4662, dag:"Dag 1",     natter:1 },
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

/* ---------------------------------------------------------------------------
   Trondheim — turens eneste rigtige by, og det eneste sted hvor der er en hel
   eftermiddag til overs. Rundturen er målt med OSRM's gangprofil
   (routing.openstreetmap.de/routed-foot), ikke skønnet: 3.712 meter og 49
   minutters ren gang. `linje` er den samme målte geometri, forenklet fra 274
   til 75 punkter — den bruges kun til at tegne minikortet i afsnittet.
   Alle koordinater er slået op i OpenStreetMap som resten af sidens punkter.
   --------------------------------------------------------------------------- */
window.TRONDHEIM = {
  id: "trondheim", by: "Trondheim",
  dag: 2,
  intro: "Du er fremme tidligt på eftermiddagen, og hele byen ligger inden for halvanden kilometer. Sløjfen her tager det med i én tur: domkirken, den gamle bybro, Bakklandet, fæstningen med udsigten, og bryggerne på vejen tilbage. Bagefter er der aftensmad, og der er ét oplagt valg.",

  tur: {
    km: 3.7, min: 49, timer: 1.5, stigning: 60,
    parkering: "Bakklandet parkeringshus ligger under 100 meter fra Bakke bru, og Brasilia ligger i samme gade. Vil du hellere starte ved domkirken, er Leutenhaven P-hus det nærmeste ved Torvet — 300 meter derfra og med ladere. Sløjfen kan gås fra begge ender.",
    note: "De 49 minutter er ren gang uden stop. Domkirken tager en halv time indenfor, fæstningsvolden endnu et kvarter, og gennem Bakklandet går man langsomt — derfor halvanden time. Kristiansten koster turens eneste rigtige højdemeter.",
    stop: [
      { n:1, navn:"Torvet", lat:63.43037, lon:10.39532,
        d:"Byens korsvej med Olav Tryggvason på søjlen midt i det hele. Trondheim blev genopbygget efter branden i 1681 med usædvanligt brede gader, og det ser man tydeligst herfra." },
      { n:2, navn:"Nidarosdomen", lat:63.42693, lon:10.39691, stj:5,
        d:"Nordens største middelalderkatedral, bygget over Olav den Helliges grav og pilgrimsmål for hele Nordeuropa i 500 år. Vestfronten alene har række på række af figurer. Der er entré, og den er værd at betale — det er turens eneste bygning i den klasse." },
      { n:3, navn:"Gamle Bybro", lat:63.42825, lon:10.40123, stj:4,
        d:"Broen fra 1861 med de røde portaler. Stil dig i midten og kig nordpå: de gamle pakhuse på pæle ned i elven er det billede af Trondheim, alle har set." },
      { n:4, navn:"Bakklandet", lat:63.42802, lon:10.40286, stj:4,
        d:"Den gamle arbejderbydel øst for elven — skæve træhuse i sennepsgult og oxideret rødt, brostensstræder og cafeer i stueetagerne. Gå igennem, ikke forbi." },
      { n:5, navn:"Kristiansten festning", lat:63.42699, lon:10.41086, stj:4,
        d:"Op ad bakken bag Bakklandet. Fæstningen stoppede svenskerne i 1718, og fra volden ser du hele byen, domkirken, elvesløjfen og fjorden på én gang. Selve området er frit tilgængeligt — det er udsigten, man kommer for." },
      { n:6, navn:"Kjøpmannsgata og bryggerne", lat:63.43180, lon:10.40270,
        d:"Tilbage over broen og nordpå langs elvebredden. Bryggerne er 1700-tals pakhuse, der stadig står på pæle ude i vandet, og gaden bag dem fører dig tilbage til Torvet." }
    ],
    /* Målt gangrute, forenklet. Genereret — rediger ikke i hånden. */
    linje: [
    [63.43042,10.39522],[63.43039,10.39510],[63.43006,10.39528],[63.43005,10.39552],
    [63.42992,10.39561],[63.42777,10.39683],[63.42766,10.39687],[63.42765,10.39661],
    [63.42717,10.39681],[63.42747,10.39805],[63.42779,10.39862],[63.42789,10.39987],
    [63.42832,10.40008],[63.42838,10.40025],[63.42808,10.40280],[63.42767,10.40311],
    [63.42718,10.40317],[63.42639,10.40361],[63.42615,10.40500],[63.42599,10.40640],
    [63.42552,10.40828],[63.42584,10.40861],[63.42599,10.40893],[63.42635,10.40905],
    [63.42656,10.40929],[63.42686,10.40922],[63.42682,10.40932],[63.42695,10.40962],
    [63.42690,10.40963],[63.42692,10.40988],[63.42707,10.41009],[63.42707,10.41043],
    [63.42716,10.41063],[63.42699,10.41085],[63.42716,10.41063],[63.42707,10.41043],
    [63.42707,10.41009],[63.42692,10.40988],[63.42690,10.40963],[63.42695,10.40962],
    [63.42682,10.40932],[63.42686,10.40922],[63.42656,10.40929],[63.42635,10.40905],
    [63.42599,10.40893],[63.42584,10.40861],[63.42552,10.40828],[63.42599,10.40640],
    [63.42615,10.40500],[63.42639,10.40361],[63.42718,10.40317],[63.42767,10.40311],
    [63.42808,10.40280],[63.42838,10.40025],[63.42867,10.40047],[63.42872,10.40017],
    [63.42884,10.40014],[63.42887,10.40037],[63.43013,10.40121],[63.43010,10.40145],
    [63.43293,10.40370],[63.43296,10.40392],[63.43306,10.40401],[63.43317,10.40391],
    [63.43330,10.40402],[63.43296,10.40392],[63.43293,10.40370],[63.43176,10.40274],
    [63.43178,10.40253],[63.43039,10.40141],[63.43036,10.40116],[63.43059,10.39592],
    [63.43047,10.39590],[63.43050,10.39528],[63.43042,10.39522]
    ]
  },

  mad: {
    intro: "Norge er dyrt, og Trondheim er ingen undtagelse. Til gengæld er det den sidste rigtige by før Bodø, så det er her man spiser ordentligt. Alle tre ligger i eller lige ved sløjfen ovenfor.",
    steder: [
      { navn:"Brasilia", kort:"Brasilia", valg:true, lat:63.43262, lon:10.40746,
        adresse:"Ferjemannsveien 10", tlf:"+47 483 05 555", tlfnr:"+4748305555",
        art:"Brasiliansk churrasco — spis alt hvad du kan",
        pris:"~500-600 kr",
        d:"Gauchoer går rundt med spyd og skærer kød direkte om på tallerkenen, indtil du beder dem stoppe — op til fjorten slags — og tilbehøret tager du selv fra buffeten. Det er turens ene måltid, hvor prisen er den samme, uanset hvor sulten du er efter en dag over Dovrefjell.",
        hvorfor:"Den ligger 80 meter fra Bakklandet parkeringshus, altså lige der hvor sløjfen slutter, hvis du parkerer ved Bakke bru. Du kan gå fra fæstningen til bordet uden at flytte bilen.",
        aabent:"Man-tor 16-23 — tjek selv før du går, åbningstider skifter" },

      { navn:"Big Horn Steak House", kort:"Big Horn", lat:63.43372, lon:10.39368,
        adresse:"Munkegata 41", tlf:"73 50 94 90", tlfnr:"+4773509490",
        art:"Uformelt steakhouse",
        pris:"400-600 kr for en hovedret",
        d:"Kædesteakhouse uden ambitioner om at være andet: bøf, pommes frites og en stor øl. 400 meter nord for Torvet på vej mod Ravnkloa, altså lige ved starten af sløjfen.",
        advarsel:"Ring først. Stedet lukkede i august 2021 efter 26 år for at renovere, og Big Horns egen hjemmeside lister i dag ti restauranter uden Trondheim iblandt. Adresse og telefonnummer står stadig i katalogerne, men jeg kunne ikke bekræfte, at den har åbnet igen." },

      { navn:"Graffi Grill og Bar", kort:"Graffi", lat:63.43433, lon:10.41279,
        adresse:"TMV-kaia, Solsiden",
        art:"Grill og bar ved vandet",
        pris:"middel til høj",
        d:"Solsiden er det gamle skibsværft lavet om til kaj, udeservering og barer, og Graffi ligger yderst mod vandet. Mere liv og højere lyd end de to andre — det oplagte valg, hvis du hellere vil sidde blandt folk end spise stort.",
        note:"Der er to Graffi i Trondheim. Denne ligger på Solsiden ved TMV-kaia; den anden ligger inde i Midtbyen på Carl Johans gate." }
    ],
    bund:"Priserne er niveauer, ikke tilbud. Regn med at et hovedmåltid i Norge koster halvanden gang dansk niveau, og at øl trækker regningen op hurtigere end maden."
  }
};

/* ---------------------------------------------------------------------------
   Tromsø — ishavsbyen, og turens sidste rigtige by før Nordkapp. Samme
   opbygning som Trondheim-afsnittet, og gangruten er målt på samme måde med
   OSRM's gangprofil: 3.660 meter og 49 minutters ren gang. `linje` er den
   målte geometri, forenklet fra 441 til 72 punkter — kun til minikortet.
   Højdeforskellen er slået op i EU-DEM: laveste punkt 1 m, højeste 17 m.
   --------------------------------------------------------------------------- */
window.TROMSO = {
  id: "tromso", by: "Tromsø",
  dag: 6,
  intro: "Efter 583 km fra Lofoten ligger hele Tromsø samlet på en håndfuld gader. Byen er hverken stor eller gammel, men den er der, hvorfra polarekspeditionerne sejlede — og den har Nordnorges bedste spisesteder inden for gåafstand af hinanden. Sløjfen her tager polarhistorien, træbyen og domkirken med og ender ved havnen, hvor du skal spise.",

  tur: {
    km: 3.7, min: 49, timer: 1.5, stigning: 17,
    parkering: "Centrum er lille nok til at det er ligegyldigt hvor du stiller bilen. Nærmest sløjfen er P-huset ved Nerstranda eller kajen ved Prostneset; begge ligger få minutter fra Stortorget.",
    note: "De 49 minutter er ren gang. Med Polarmuseet indenfor (regn med en time) bliver det halvanden til to timer. Turen er så godt som flad — kun 17 højdemeter mellem laveste og højeste punkt, mod Trondheims 60 op til fæstningen.",
    ekstra: "Vil du gå længere, så fortsæt over Tromsø bru til Ishavskatedralen. Det lægger 2,9 km og 38 minutter til, og udsigten tilbage mod byen midtvejs på broen er turens bedste. Men katedralen og Fjellheisen står allerede på dag 7 i morgen, så du behøver ikke nå det i aften.",
    stop: [
      { n:1, navn:"Stortorget", lat:69.65136, lon:18.95860,
        d:"Torvet ned mod havnen, med fiskeboder og udsigt over sundet til Ishavskatedralen og fjeldene bagved. Det er her byen samler sig, og det er det naturlige start- og slutpunkt." },
      { n:2, navn:"Polarmuseet", lat:69.65221, lon:18.96332, stj:4,
        d:"I et gammelt toldpakhus ude på bryggen. Amundsen, Nansen, fangstmændene på Svalbard og alle de andre, der tog herfra. Det var også fra Tromsø, Amundsen fløj ud i 1928 for at lede efter Nobile og aldrig kom tilbage. Regn med en time indenfor — det er turens bedste museum." },
      { n:3, navn:"Skansen", lat:69.65291, lon:18.96426, stj:3,
        d:"Tromsøs ældste hus fra 1789, bygget på en middelalderlig jordvold — den skanse, stedet har navn efter. Lille og let at gå forbi, men det er byens eneste rest fra før 1800-tallet." },
      { n:4, navn:"Storgata", lat:69.65309, lon:18.95975,
        d:"Hovedgaden gennem den gamle træby. Facaderne er 1800-tals trælængder i klare farver, og gaden er stadig byens rygrad — butikker, caféer og folk hele vejen." },
      { n:5, navn:"Perspektivet Museum", lat:69.65233, lon:18.95925,
        d:"Bymuseum i et gammelt købmandshus, med fotosamlingen som det bærende. Gratis entré, og en hurtig måde at forstå hvordan byen så ud, før den blev ishavshovedstad." },
      { n:6, navn:"Tromsø domkirke", lat:69.64875, lon:18.95682, stj:3,
        d:"Fra 1861 og en af Norges største trækirker — og landets eneste domkirke bygget i træ. Den står midt i byen med parken omkring, og den er værd at gå ind i, hvis den er åben." },
      { n:7, navn:"Tromsø bibliotek", lat:69.65072, lon:18.95469,
        d:"Det buede glastag over det gamle biografbygningsskelet. Et af de få steder i Nordnorge, hvor moderne arkitektur virkelig er lykkedes — og et varmt sted at sidde ti minutter, hvis vejret er norsk." },
      { n:8, navn:"Ølhallen", lat:69.64590, lon:18.95047, stj:3,
        d:"Macks ølhal fra 1928, byens ældste værtshus og bryggeriets egen udskænkning. Selve brygningen flyttede til Nordkjosbotn i 2012, så titlen som verdens nordligste bryggeri er blevet teknisk — men hallen står, med hovederne af isbjørn og hvalros på væggene." },
      { n:9, navn:"Polaria", lat:69.64368, lon:18.94990,
        d:"Bygningen der ser ud som fem isflager, der er skubbet op på land. Arktisk oplevelsescenter med sælerne indenfor — men selv facaden er værd at gå forbi på vejen tilbage langs vandet." }
    ],
    /* Målt gangrute, forenklet. Genereret — rediger ikke i hånden. */
    linje: [
    [69.65136,18.95860],[69.65130,18.95909],[69.65150,18.95931],[69.65145,18.95964],
    [69.65235,18.96059],[69.65280,18.96138],[69.65264,18.96362],[69.65220,18.96350],
    [69.65264,18.96362],[69.65265,18.96339],[69.65276,18.96380],[69.65301,18.96412],
    [69.65298,18.96437],[69.65301,18.96412],[69.65276,18.96380],[69.65265,18.96339],
    [69.65284,18.96104],[69.65279,18.96058],[69.65301,18.96035],[69.65317,18.95984],
    [69.64971,18.95599],[69.64969,18.95612],[69.64954,18.95605],[69.64946,18.95715],
    [69.64885,18.95693],[69.64904,18.95693],[69.64915,18.95559],[69.64950,18.95592],
    [69.64967,18.95472],[69.64976,18.95483],[69.64982,18.95465],[69.65038,18.95518],
    [69.65040,18.95500],[69.65045,18.95505],[69.65055,18.95418],[69.65077,18.95434],
    [69.65055,18.95418],[69.65045,18.95505],[69.65040,18.95500],[69.65038,18.95518],
    [69.64982,18.95465],[69.64975,18.95481],[69.64807,18.95283],[69.64790,18.95375],
    [69.64776,18.95367],[69.64687,18.95262],[69.64622,18.95143],[69.64614,18.95112],
    [69.64609,18.95119],[69.64553,18.94975],[69.64544,18.95006],[69.64467,18.94809],
    [69.64457,18.94815],[69.64415,18.94957],[69.64409,18.94961],[69.64396,18.94902],
    [69.64378,18.94894],[69.64366,18.94918],[69.64378,18.94894],[69.64396,18.94902],
    [69.64409,18.94961],[69.64415,18.94957],[69.64457,18.94815],[69.64471,18.94812],
    [69.64610,18.95177],[69.64615,18.95174],[69.64690,18.95300],[69.64781,18.95411],
    [69.65126,18.95770],[69.65124,18.95785],[69.65141,18.95812],[69.65136,18.95860]
    ]
  },

  mad: {
    titel: "Aftensmad",
    intro: "Det heldige er, at de to oplagte valg ligger i samme hus. Vertshuset Skarven på Strandtorget rummer både en steakhouse og Nordnorges klassiske sjømatrestaurant, hver sin etage — så du kan gå derned og bestemme dig i døren. Og huset ligger på vejen tilbage fra Polaria, altså sidst på sløjfen.",
    steder: [
      { navn:"Arctandria", kort:"Arctandria", valg:true, lat:69.64706, lon:18.95637,
        adresse:"Strandtorget 1, 2. sal", tlf:"+47 77 60 07 20", tlfnr:"+4777600720",
        web:"https://www.skarven.no/",
        art:"Nordnorsk sjømat — og rensdyr",
        pris:"høj",
        d:"Husets sjømatrestaurant, og den der serverer det, du ikke kan få hjemme: delikatesser fra Ishavet, tørfisk, kongekrabbe og rensdyr. Ovenpå, med udsigt over havnen.",
        hvorfor:"Du kan få en god bøf i Danmark. Nordnorsk ishavsmad over havnen i Tromsø kan du få i aften og ikke igen på turen — og hvis du savner kød, står rensdyret på samme kort.",
        aabent:"Man–lør 16–23 · lukket søndag — den eneste dag den ikke kan bruges" },

      { navn:"Biffhuset (Skarven Grill)", kort:"Biffhuset", lat:69.64718, lon:18.95618,
        adresse:"Strandtorget 1", tlf:"+47 77 60 07 20", tlfnr:"+4777600720",
        web:"https://www.skarven.no/",
        art:"Steakhouse med lokale råvarer",
        pris:"middel til høj",
        d:"Husets steakhouse, med lange traditioner og lokale råvarer — og rensdyr på kortet ved siden af bøfferne. Samme bygning som Arctandria, bare en etage nede.",
        aabent:"Alle dage 15.30–23" },

      { navn:"Emmas Drømmekjøkken", kort:"Emmas", lat:69.64844, lon:18.95605,
        adresse:"Kirkegata", tlfnr:"", web:"https://www.emmasdrommekjokken.no/",
        art:"Byens mest omtalte køkken",
        pris:"høj — turens dyreste måltid",
        d:"Tromsøs berømte restaurant gennem tre årtier, med en mere afslappet bar i stueetagen hvis det fine er for meget. Den ligger 300 meter fra Skarven, altså også på sløjfen.",
        note:"Fredag og lørdag aften i Tromsø: ring og hør efter bord, før du går derhen." }
    ],
    bund:"Priserne er niveauer, ikke tal jeg har set på et menukort — tjek selv. Bliver de fulde, ligger Skarven Kro i samme hus med fiskesuppe og rensdyrburger fra kl. 11 til 01, og Fiskekompaniet ved Killengreens gate og Mathallen er byens andre sikre kort."
  }
};

/* ---------------------------------------------------------------------------
   Revideret tidsplan, lagt ind undervejs den 21. august.
   Turen kom halvanden dag foran: færgen til Lofoten blev taget 04.45 den 20.,
   og Tromsø blev nået og forladt den 21. i stedet for den 22.-23.
   DAYS nedenfor er stadig rutens grunddata — etaperne er de samme og tallene
   målt. Det er kun datoerne der har flyttet sig, plus det forspringet køber.
   Alle tal her er målt med OSRM og ganget med 1,15-1,2 for pauser og ladning.
   --------------------------------------------------------------------------- */
window.NYPLAN = {
  opdateret: "21. august, aften — på E8 gennem Lavangsdalen",
  hvor: "Halvanden dag foran. Den oprindelige plan havde dig i Tromsø til og med den 23.; du forlod byen den 21. om aftenen.",
  dom: "Forspringet er stort nok til at købe <b>både Knivskjellodden og en menneskelig Finlandsstrækning</b> — men kun hvis du står ved Nordkapp senest den 22. om aftenen. Sover du en ekstra nat i Alta, skal du vælge mellem de to.",
  dage: [
    { dato:"fre 21.", titel:"Tromsø → Skibotn", km:126, t:2.1, nu:true,
      d:"E8 gennem Lavangsdalen og ned til E6 ved Skibotn. Sov der — så vågner du på hovedvejen nordpå med Lyngsalpene over fjorden." },
    { dato:"lør 22.", titel:"Skibotn → Alta → Nordkapp", km:498, t:9.4, hard:true,
      d:"Dagens nøgle. Af sted kl. 8, Alta Museum og helleristningerne midt på dagen, videre over Kvænangsfjellet og ud ad E69. Fremme ved 20-tiden — solen går ned 20.56, så du når platået i det sidste lys." },
    { dato:"søn 23.", titel:"Knivskjellodden", km:0, t:0, stjerne:true,
      d:"18 km våd vandring ud til Europas <em>rigtige</em> nordligste punkt, 1.457 meter nordligere end Nordkapp. Ingen entré, ingen bus, næsten ingen mennesker. Skriv dig i bogen i kassen ved pynten. 5-6 timer, så hele dagen går." },
    { dato:"man 24.", titel:"Nordkapp → Inari", km:382, t:7.1,
      d:"Ned ad E69 og E75 i Finland. Siida-museet ved Inarisøen, og laavu-shelters langs vandet hvis du vil sove ude." },
    { dato:"tir 25.", titel:"Inari → forbi Oulu", km:548, t:9.2,
      d:"Gennem finsk Lapland. Her er der plads til Pyhä-Luosto og Isokuru — 62 km og en time ekstra for Finlands dybeste kløft, og den bedste naturoplevelse på hele den finske strækning målt på hvad den koster." },
    { dato:"ons 26.", titel:"→ Turku + natfærge", km:649, t:10.5,
      d:"Sidste finske dag. Book Turku-færgen et par dage før herfra. Åbo Slot ligger fem minutter fra terminalen, hvis du er i god tid." },
    { dato:"tor 27.", titel:"Stockholm → Göteborg", km:477, t:5.8,
      d:"I land kl. 7. Uførandret fra den oprindelige plan." },
    { dato:"fre 28.", titel:"Göteborg → Aalborg", km:63, t:0.8,
      d:"Stena hjem. Book den 1-2 dage før." }
  ],
  vundet: [
    ["Knivskjellodden kommer med","Den kræver en hel dag, og den fandtes ikke i den oprindelige plan. Det er turens eneste sted, hvor du står nordligere end Nordkapp — og hvor der ikke er en turistbus i sigte."],
    ["De to hårde dage forsvinder","Dag 9 og 10 var målt til 12,6 og 14,2 timer bag rattet i træk. Delt over tre dage bliver det 7,1 · 9,2 · 10,5. Den værste dag falder med næsten fire timer."],
    ["Der bliver råd til Pyhä-Luosto","62 km og en time for Finlands dybeste kløft, med trappe og gangbro hele vejen ned. Den lå der også før, men der var ikke tid."]
  ],
  pris: "Det hele hænger på lørdag den 22.: 498 km med et museumsstop midt i. Det er en lang dag, men kortere end de 583 km du kørte fra Lofoten til Tromsø. Bliver den for meget, så sov i Alta — og vælg så mellem Knivskjellodden og de rolige finske dage. Begge dele er stadig bedre end den oprindelige plan.",
  fast: "Det eneste der ikke kan flyttes: du skal være i Turku onsdag den 26. om aftenen, og hjemme fredag den 28."
};

/* Beslutninger hvor jeg har ændret eller udfordret det oprindelige udkast. */
window.BESLUTNINGER = [
  { id:"faerge", titel:"Færgen nordpå: Larvik, ikke Göteborg",
    status:"aendret",
    foer:"Frederikshavn → Göteborg · ~1.300 kr · i land 17.30 · 881 km til Trondheim",
    efter:"Hirtshals → Larvik · ~1.000 kr · i land 16.45 · 721 km til Trondheim",
    tekst:"Jeg antog, at Stena var den billige løsning. Da du hentede priserne, viste det sig omvendt: Göteborg er 300 kr dyrere, lander senest, og er tilmed den længste vej til Trondheim. Den taber på alle tre parametre, og der er ingen grund til at vælge den på udturen. Til gengæld bliver den ved med at være rigtig på hjemturen — fra Stockholm ligger Göteborg 173 km og næsten tre timer tættere på end Larvik, og det æder prisforskellen med renter.",
    valg:"Den egentlige gevinst er ikke de 300 kr, men rækkefølgen: dag 2 falder fra 519 til 353 km og bliver turens letteste køredag — lige inden dag 3, som med 719 km er den hårdeste. Det er den rigtige vej at have dem i." },

  { id:"kristiansand", titel:"Kristiansand er en bedre tur, men til en anden rejse",
    status:"beholdt",
    foer:"Kristiansand · i land 13.25 · 876 km og 12,6 t til Trondheim",
    efter:"Larvik · i land 16.45 · 721 km og 10,5 t til Trondheim",
    tekst:"Kristiansand giver dig fire ekstra timer i dagslys, og du har ikke været der — modsat Oslo. Setesdal, Telemark og især Gaustatoppen er alt sammen nyt for dig, og Gaustatoppen er en Preikestolen-agtig oplevelse: 1.883 meter med udsigt over en sjettedel af Norge, og en bane inde i selve fjeldet hvis benene ikke skal bruges. Problemet er geografien. Kristiansand ligger i Norges sydvestlige hjørne, og Trondheim ligger nordøst. De fire ekstra timer bliver ædt af 155 km mere vej, og dag 2 ender på 715 km og 12 timer — umiddelbart efterfulgt af dag 3 på 719 km. To tolvtimersdage i træk allerede i starten.",
    valg:"Gaustatoppen kan heller ikke klemmes ind fra Larvik: derfra er der kun 174 km til Rjukan, men næste dag er der stadig 703 km til Trondheim. Turen koster en hel dag, og den eneste ledige dag er hviledagen på Lofoten. Sydnorge er en rigtig god tur — den skal bare være sin egen." },

  { id:"hjem", titel:"Hjem over Göteborg, ikke over Øresund",
    status:"aendret",
    foer:"Stockholm → Helsingborg → Helsingør → Storebælt → Aalborg · 1.019 km · 11,5 t · to broafgifter",
    efter:"Stockholm → Göteborg → Stena → Aalborg · 540 km · 6,6 t · én færge",
    tekst:"Ruten sparer 479 km og næsten fem timers kørsel mod at køre ned over Skåne, og du slipper for både Storebælt og Øresund. Stena koster ganske vist 300 kr mere end Color Line — men fra Stockholm ligger Göteborg 173 km og næsten tre timer tættere på end Larvik, så prisforskellen er tjent hjem inden du er ombord. Bonus: tager du aftenfærgen torsdag, er du hjemme et helt døgn før deadline.",
    valg:"Undtagelsen er hvis I vil bruge en dag i København eller Malmö på vejen hjem — så er Øresund-ruten sin merpris værd." },

  { id:"booking", titel:"Book Göteborg og Bodø — men lad Turku stå åben",
    status:"aendret",
    foer:"Book alle fire færger hjemmefra og lås planen",
    efter:"Kun Color Line er købt · alt andet bookes 1-3 dage før fra vejen",
    tekst:"Din egen plan er den rigtige, og den er bedre end min oprindelige. Hirtshals → Larvik er nu købt (XEA2995, afgang 12.45): det er en fast startdato, og den er billigst i forkøb. Bodø → Moskenes kan du roligt booke undervejs — et par dages varsel er rigeligt selv i august, og du ved først, når du er i Norge, hvornår du reelt står der. Turku → Stockholm behøver du slet ikke at binde dig til.",
    valg:"Princippet holder hele vejen rundt, også hjem: hver eneste færge har et alternativ, der altid er åbent. Turku kan omgås over Tornio for 294 km. Bodø kan omgås ad E6 til Bognes. Og Stena hjem kan omgås over Øresund — det koster 479 km og cirka fem timer mere, men koster omtrent det samme i billetter, når bro og Storebælt lægges sammen. Derfor er der ingen grund til at binde sig til noget som helst efter Larvik." },

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
  { kat:"vandring", navn:"Snøhetta-pavillonen", lat:62.2239, lon:9.4902, dag:2, stj:3,
    t:"1,5 km hver vej · let · moskusokser", tid:"1 time",
    d:"Arkitekttegnet udsigtspavillon på Dovrefjell med glasvæg mod Snøhetta. Kort, flad sti fra parkeringen ved Hjerkinn. Der går moskusokser på vidden — hold god afstand, de er hurtigere end de ser ud." },
  { kat:"vandring", navn:"Byvandring i Trondheim", lat:63.4283, lon:10.4012, dag:2, stj:4,
    t:"3,7 km · domkirke, Bakklandet og fæstning · hele byen i én sløjfe", tid:"1,5 time",
    d:"Trondheim ligger samlet: en rundtur på 3,7 km tager Nidarosdomen, Gamle Bybro, Bakklandets skæve træhuse og Kristiansten festning med, og ender ved bryggerne langs Kjøpmannsgata. Målt til 49 minutters ren gang — med stop bliver det halvanden time. Se afsnittet om Trondheim for turen stop for stop." },
  { kat:"vandring", navn:"Keiservarden", lat:67.3150, lon:14.4783, dag:3, stj:3,
    t:"1-1,5 time · let · Lofotveggen i horisonten", tid:"1-1,5 time",
    d:"Bodøs husbjerg. Bred grusvej hele vejen op, og på en klar dag ser du hele Lofotveggen ligge som en tandet mur ude i havet. Perfekt til at strække benene efter den lange E6-dag." },
  { kat:"vandring", navn:"Reinebringen", lat:67.9278, lon:13.0714, dag:5, stj:5,
    t:"1.566 sherpatrin · 2-3 timer · turens bedste udsigt", tid:"2-3 timer",
    d:"Nepalesiske sherpaer har bygget en trappe hele vejen op ad fjeldsiden. 448 meter lige op, og så ligger Reine, Hamnøy og hele Kirkefjorden under dig. Det er det billede, du har set af Lofoten. Stien lukkes i regn og blæst — tjek før du går." },
  { kat:"vandring", navn:"Ryten & Kvalvika", lat:68.0893, lon:13.0929, dag:5, stj:4,
    t:"4-5 timer · strand uden vej", tid:"4-5 timer",
    d:"Vandring over fjeldet til en strand, der ikke har nogen vej. Fortsætter du op på Ryten, står du på en klippekant 543 meter direkte over sandet. Færre folk end Reinebringen og mindst lige så godt." },
  { kat:"vandring", navn:"Mannen ved Haukland", lat:68.2037, lon:13.5202, dag:5, stj:3,
    t:"1,5-2 timer · let · to strande på én gang", tid:"1,5-2 timer",
    d:"Kort, stejl tur op fra Haukland-stranden. Fra toppen ser du både Haukland og Uttakleiv samtidig — de to hvide strande, der får Lofoten til at ligne Caribien indtil man mærker vandet." },
  { kat:"vandring", navn:"Segla, Senja", lat:69.5074, lon:17.5957, dag:6, stj:5,
    t:"3-4 timer · 639 m · Norges mest dramatiske", tid:"3-4 timer",
    d:"Sejlet: en klippehale, der rejser sig lodret af fjorden ved Fjordgård. Turen op er stejl men ikke teknisk, og udsigten fra kanten er svær at overgå nogen steder i Norge. Kræver omvejen over Senja." },
  { kat:"vandring", navn:"Husfjellet, Senja", lat:69.4702, lon:17.2731, dag:6, stj:3,
    t:"3 timer · 635 m · 360° over Senja", tid:"3 timer",
    d:"Mindre kendt end Segla og med udsigt til den. Fra toppen ser du hele Senjas vestside, Bergsfjorden og ud i Atlanterhavet." },
  { kat:"vandring", navn:"Byvandring i Tromsø", lat:69.6510, lon:18.9586, dag:6, stj:3,
    t:"3,7 km · polarhistorie, træby og domkirke · så godt som fladt", tid:"1,5 time",
    d:"Hele Tromsø ligger på en håndfuld gader. Rundturen tager Polarmuseet, Skansen fra 1789, Storgatas træby, domkirken og Macks Ølhal med, og ender ved havnen hvor spisestederne ligger. Målt til 49 minutters ren gang. Se afsnittet om Tromsø." },
  { kat:"vandring", navn:"Sherpatrappa til Fløya", lat:69.6203, lon:18.9991, dag:7, stj:3,
    t:"1.200 trin · 1-2 timer · Tromsø under dig", tid:"1-2 timer",
    d:"Stentrappen op ad Fløya fra Tromsdalen. Ender lige over svævebanens topstation, så du kan gå op og køre ned — eller omvendt, hvis knæene foretrækker det." },
  { kat:"vandring", navn:"Sautso, Altaelva canyon", lat:69.7678, lon:23.6981, dag:7, stj:2,
    t:"Nordeuropas største kløft", tid:"2-4 timer",
    d:"400 meter dyb og 15 km lang. Kræver en afstikker fra Alta ad grusvej, og den bedste udsigt kommer man kun til fods. Vælg den, hvis vejret er for godt til at sidde i bilen." },
  { kat:"vandring", navn:"Kirkeporten, Skarsvåg", lat:71.1133, lon:25.8021, dag:8, stj:5,
    t:"30-45 min · let · Nordkapp set gennem et klippehul", tid:"30-45 min",
    d:"Kort sti fra verdens nordligste fiskerleje op til en naturlig klippeport. Stiller du dig rigtigt, rammer Nordkapp-klippen præcis ind i hullet. Det bedste Nordkapp-billede tages herfra, ikke fra platået." },
  { kat:"vandring", navn:"Knivskjellodden", lat:71.1850, lon:25.6765, dag:8, stj:4,
    t:"9 km hver vej · 5-6 timer · det RIGTIGE nordligste punkt", tid:"5-6 timer",
    d:"Nordkapp er ikke Europas nordligste punkt — Knivskjellodden ligger 1.457 meter længere nordpå, og der er ingen entré, ingen bus og næsten ingen mennesker. Til gengæld 18 km våd vandring. Skriv dig i bogen i kassen ved pynten." },
  { kat:"vandring", navn:"Otsamo ved Inari", lat:68.8838, lon:26.8379, dag:9, stj:2,
    t:"3-4 timer · udsigt over Inarisøen", tid:"3-4 timer",
    d:"Fjeldet nord for Inari med udsigt ud over søen og dens 3.000 øer. Godt sted at forstå, hvor stort Lapland faktisk er." },
  { kat:"vandring", navn:"Pielpajärvi ødemarkskirke", lat:68.9513, lon:27.1159, dag:9, stj:4,
    t:"4 km hver vej · let · kirke fra 1760 midt i skoven", tid:"2-3 timer",
    d:"En træbygget kirke fra 1760'erne, der står helt alene i ødemarken nordøst for Inari — ingen vej, kun en sti gennem fyrreskoven. Det var her samerne mødtes til vintermarked. Et af de mest stemningsfulde steder i finsk Lapland, og næsten ingen turister finder derud." },
  { kat:"vandring", navn:"Urho Kekkonen NP, Saariselkä", lat:68.3466, lon:27.4609, dag:9, stj:3,
    t:"Finlands næststørste nationalpark · ligger direkte på E75", tid:"2 timer - flere dage",
    d:"2.550 km² fjeldhede og urskov med et net af gratis ødemarkshytter. Kiilopää-toppen tager to timer tur/retur fra vejen, og der er røgsauna og et iskoldt å-bad nedenfor. Du kører lige forbi indgangen." },
  { kat:"vandring", navn:"Pyhä-Luosto · Isokuru", lat:67.0174, lon:27.2409, dag:9, stj:4,
    t:"+62 km / +1,1 t · Finlands dybeste kløft", tid:"2-3 timer",
    d:"Finlands ældste fredede natur. Isokuru er en 220 meter dyb kløft med trappe og gangbro hele vejen ned, og den ligger kun en times omvej fra E75. Den bedste enkeltstående naturoplevelse på hele den finske strækning, målt på hvad den koster." },
  { kat:"vandring", navn:"Auttiköngäs-vandfaldet", lat:66.2881, lon:27.2030, dag:10, stj:2,
    t:"Kort natursti med hængebro · øst for Rovaniemi", tid:"1 time",
    d:"16 meter højt vandfald med en afmærket rundtur på et par kilometer og en hængebro over strømmen. Nemt stop, hvis du kommer den vej." },
  { kat:"vandring", navn:"Ounasvaara, Rovaniemi", lat:66.5025, lon:25.8021, dag:10, stj:2,
    t:"Bybjerget · kort tur · udsigt over Kemijoki", tid:"1 time",
    d:"Rovaniemis udsigtsbakke lige uden for byen. Kort og nem, og et godt sted at strække benene inden den lange etape sydpå." },

  /* ---- muligheder: det forspringet gør plads til ---- */
  { kat:"mulighed", navn:"Mollisfossen", lat:69.3611, lon:21.8321, dag:7, stj:3,
    t:"269 m frit fald \u00b7 Reisa nasjonalpark \u00b7 kr\u00e6ver b\u00e5d eller lang vandring", tid:"halv dag",
    d:"Et af Norges h\u00f8jeste vandfald, 269 meter i \u00e9t spring ned i Reisadalen. Men v\u00e6r klar over prisen: der er ingen vej derhen. Man kommer der med elvb\u00e5d fra Storslett eller til fods op ad dalen, og begge dele tager en halv dag. V\u00e6lg den kun, hvis du dropper noget andet." },
  { kat:"mulighed", navn:"Reisa nasjonalpark", lat:69.2371, lon:22.0315, dag:7, stj:3,
    t:"Kl\u00f8ftdal med fossefald \u00b7 indgang ved Storslett", tid:"2 timer - flere dage",
    d:"Reisadalen sk\u00e6rer sig 50 km ind i h\u00f8jfjeldet med lodrette v\u00e6gge og vandfald hele vejen. Du k\u00f8rer forbi indgangen ved Storslett p\u00e5 E6, og selv en kort tur ind i dalen viser hvorfor den er fredet." },
  { kat:"mulighed", navn:"Nordlyskatedralen, Alta", lat:69.9661, lon:23.2644, dag:7, stj:3,
    t:"Titaniumsp\u00e6ndt spiral fra 2013 \u00b7 midt i Alta", tid:"30 min",
    d:"Alta kirke og kulturhus, bygget som en spiral kl\u00e6dt i titanium, der vrider sig opad mod himlen. Den ligger i centrum, s\u00e5 den koster dig ingen omvej overhovedet \u2014 og den er turens mest overraskende bygning efter Nidarosdomen." },
  { kat:"mulighed", navn:"Manndalen, K\u00e5fjord", lat:69.5309, lon:20.5481, dag:7, stj:2,
    t:"Sj\u00f8samisk dal \u00b7 v\u00e6vecenter \u00b7 lige ved E6", tid:"1 time",
    d:"Sj\u00f8samisk bygd i en sidedal til Lyngenfjorden, med et v\u00e6vecenter og en tradition der n\u00e6sten forsvandt under fornorskningen. Ligger direkte ved E6, s\u00e5 det er et stop, ikke en omvej." },

  { kat:"mulighed", navn:"Stabbursdalen nasjonalpark", lat:70.0207, lon:24.4533, dag:8, stj:4,
    t:"Verdens nordligste fyrreskov \u00b7 ved Lakselv", tid:"1-3 timer",
    d:"Verdens nordligste fyrreskov, og tr\u00e6erne her er op mod 500 \u00e5r gamle, fordi de vokser s\u00e5 langsomt s\u00e5 langt mod nord. Der er m\u00e6rkede stier fra parkeringen, og elven er en af Finnmarks bedste laksefloder. Ligger t\u00e6t p\u00e5 E6 lige f\u00f8r Lakselv." },
  { kat:"mulighed", navn:"Repv\u00e5g", lat:70.7470, lon:25.6732, dag:8, stj:3,
    t:"Gammelt handelssted p\u00e5 p\u00e6le \u00b7 direkte p\u00e5 E69", tid:"30 min",
    d:"Et af de f\u00e5 steder p\u00e5 E69, hvor der stod noget f\u00f8r turismen. Gammelt fiskev\u00e6r og handelssted p\u00e5 p\u00e6le ud i fjorden, med de r\u00f8de bygninger i behold. Ti minutters stop p\u00e5 vejen ud mod Nordkapp." },
  { kat:"mulighed", navn:"Honningsv\u00e5g", lat:70.9803, lon:25.9778, dag:8, stj:2,
    t:"Norges nordligste by \u00b7 30 km f\u00f8r Nordkapp", tid:"1 time",
    d:"Byen du k\u00f8rer igennem p\u00e5 vej ud til klippen, og det eneste sted p\u00e5 Mager\u00f8ya med butikker, t\u00e6ndstationer og restauranter. Brugbar til at proviantere \u2014 og havnen er pænere end rygtet." },

  { kat:"mulighed", navn:"Lemmenjoki nationalpark", lat:68.5908, lon:25.5154, dag:9, stj:3,
    t:"Finlands st\u00f8rste nationalpark \u00b7 guldgravere ved floden", tid:"2 timer - flere dage",
    d:"2.860 km\u00b2 \u00f8demark vest for Inari, og Finlands st\u00f8rste nationalpark. Der bliver stadig vasket guld i floden, og der er b\u00e5dtur op ad Lemmenjoki til guldgraveromr\u00e5det. Afstikkeren fra E75 er reel, s\u00e5 den kr\u00e6ver at du har tid." },
  { kat:"mulighed", navn:"Kaunisp\u00e4\u00e4, Saariselk\u00e4", lat:68.4338, lon:27.4421, dag:9, stj:3,
    t:"438 m \u00b7 vej hele vejen op \u00b7 udsigt over hele vidden", tid:"30-45 min",
    d:"Det sj\u00e6ldne: en fjeldtop med asfalt hele vejen til parkeringen. Fra toppen ser du ud over Urho Kekkonens \u00f8demark til alle sider, og du bruger et kvarter i stedet for en dag. Afk\u00f8rslen ligger direkte p\u00e5 E75." },

  { kat:"mulighed", navn:"Napapiiri, Rovaniemi", lat:66.5436, lon:25.8465, dag:10, stj:3,
    t:"Polarcirklen i Finland \u00b7 8 km nord for Rovaniemi", tid:"1 time",
    d:"Den finske polarcirkel med stregen malet i asfalten, julemandslandsbyen og et postkontor der stempler med Napapiiri. Turistfælde, ja \u2014 men du krydsede polarcirklen p\u00e5 vej nordp\u00e5 ved Saltfjellet, og her krydser du den tilbage. Symmetrien er noget v\u00e6rd." },
  { kat:"mulighed", navn:"Ranua dyrepark", lat:65.9409, lon:26.4634, dag:10, stj:3,
    t:"Verdens nordligste dyrepark \u00b7 isbj\u00f8rne \u00b7 80 km syd for Rovaniemi", tid:"2-3 timer",
    d:"Arktiske dyr i store indhegninger i skoven \u2014 isbj\u00f8rn, moskus, j\u00e6rv, los og ulve. Ligger p\u00e5 vej 78 syd for Rovaniemi, alts\u00e5 nogenlunde p\u00e5 ruten hvis du k\u00f8rer mod Oulu." },
  { kat:"mulighed", navn:"Kauppatori, Oulu", lat:65.0139, lon:25.4649, dag:10, stj:2,
    t:"Torvet ved havnen \u00b7 Toripolliisi-statuen", tid:"1 time",
    d:"Oulus torv ligger ned til vandet med de r\u00f8de pakhuse og den lille tykke politimand i bronze, som byen er kendt for. Godt sted at strække benene og spise midtvejs p\u00e5 den lange finske vestkyststr\u00e6kning." },
  { kat:"mulighed", navn:"\u00c5bo Slot", lat:60.4353, lon:22.2286, dag:10, stj:4,
    t:"1280'erne \u00b7 fem minutter fra f\u00e6rgeterminalen i Turku", tid:"1-2 timer",
    d:"Finlands st\u00f8rste middelalderbygning, p\u00e5begyndt i 1280'erne, med b\u00e5de en middelalderborg og en renæssancedel indeni. Og det bedste: den ligger fem minutters k\u00f8rsel fra selve f\u00e6rgelejet. Har du en time f\u00f8r check-in, er der ikke noget bedre valg i Turku." },

  { kat:"mulighed", navn:"Vadstena slott", lat:58.4460, lon:14.8826, dag:11, stj:3,
    t:"Vasaborg ved V\u00e4ttern \u00b7 kort afstikker fra E4", tid:"1-2 timer",
    d:"Gustav Vasas renæssanceborg med voldgrav, direkte ned til V\u00e4ttern, og klosterbyen omkring den. Ligger cirka 15 km fra E4, alts\u00e5 en billig afstikker p\u00e5 en dag hvor du alligevel k\u00f8rer forbi Gr\u00e4nna." },
  { kat:"mulighed", navn:"Vasamuseet, Stockholm", lat:59.3281, lon:18.0914, dag:11, stj:4,
    t:"Krigsskibet der sank i 1628 og blev h\u00e6vet helt \u00b7 i Stockholm", tid:"2-3 timer",
    d:"Regalskeppet Vasa sank p\u00e5 sin jomfrurejse i 1628, l\u00e5 i mudderet i 333 \u00e5r og st\u00e5r nu 98 procent originalt i sin egen hal. Det er et af Nordens virkelig store museer. Prisen er, at du skal ind i Stockholm og ud igen, og det koster en formiddag med bytrafik \u2014 men du lander alligevel kl. 7." },

  /* ---- udsigt og seværdigheder ---- */
  { kat:"udsigt", navn:"Dovrefjell", lat:62.2231, lon:9.5500, dag:2, stj:4,
    t:"Højfjeld, moskusokser, Norges tag" },
  { kat:"udsigt", navn:"Nidarosdomen", lat:63.4269, lon:10.3969, dag:2, stj:5,
    t:"Nordens største middelalderkatedral · Olav den Helliges grav" },
  { kat:"udsigt", navn:"Kristiansten festning", lat:63.4270, lon:10.4109, dag:2, stj:4,
    t:"Hele Trondheim, elven og fjorden fra volden · gratis" },
  { kat:"udsigt", navn:"Mosjøen · Sjøgata", lat:65.8370, lon:13.1900, dag:3, stj:3,
    t:"Hel gade af træhuse fra 1800-tallet · bedste frokoststop på E6" },
  { kat:"udsigt", navn:"Polarsirkelsenteret", lat:66.5524, lon:15.3228, dag:3, stj:4,
    t:"66°33'N · det obligatoriske foto" },
  { kat:"udsigt", navn:"Saltstraumen", lat:67.2321, lon:14.6100, dag:3, stj:5,
    t:"Verdens stærkeste tidevandsstrøm · TJEK TIDEVANDSTABELLEN" },
  { kat:"udsigt", navn:"Å i Lofoten", lat:67.8796, lon:12.9840, dag:4, stj:3,
    t:"Vejens ende · tørfiskemuseum · stednavn på ét bogstav" },
  { kat:"udsigt", navn:"Hamnøy", lat:67.9464, lon:13.1376, dag:4, stj:5,
    t:"Den røde rorbu-klynge fra hvert eneste Lofoten-billede" },
  { kat:"udsigt", navn:"Nusfjord", lat:68.0354, lon:13.3477, dag:5, stj:3,
    t:"Et af Norges bedst bevarede fiskevær" },
  { kat:"udsigt", navn:"Haukland & Uttakleiv", lat:68.1980, lon:13.5292, dag:5, stj:4,
    t:"Hvide sandstrande · ser tropiske ud til du mærker vandet" },
  { kat:"udsigt", navn:"Henningsvær", lat:68.1529, lon:14.2007, dag:5, stj:4,
    t:"Galleribyen på skær · fodboldbanen mellem klipperne" },
  { kat:"udsigt", navn:"Lofotr Vikingmuseum", lat:68.2442, lon:13.7576, dag:6, stj:4,
    t:"83 m langt høvdingehus · det største fundet i Norden" },
  { kat:"udsigt", navn:"Tungeneset, Senja", lat:69.4869, lon:17.3330, dag:6, stj:4,
    t:"Træbro ud over klipperne mod Okshornan-tinderne" },
  { kat:"udsigt", navn:"Bergsbotn-platformen", lat:69.4231, lon:17.5038, dag:6, stj:3,
    t:"44 m udsigtsplatform 160 m over fjorden" },
  { kat:"udsigt", navn:"Narvik · Narvikfjellet", lat:68.4283, lon:17.4562, dag:6, stj:2,
    t:"Svævebane til 656 m · krigsmuseet nede i byen" },
  { kat:"udsigt", navn:"Polar Park, Bardu", lat:68.6916, lon:18.1104, dag:6, stj:3,
    t:"Verdens nordligste dyrepark · ulve, bjørne, los" },
  { kat:"udsigt", navn:"Polarmuseet", lat:69.6522, lon:18.9633, dag:6, stj:4,
    t:"Amundsen, Nansen og fangstmændene · i et toldpakhus på bryggen" },
  { kat:"udsigt", navn:"Ishavskatedralen", lat:69.6480, lon:18.9874, dag:7, stj:3,
    t:"Betonspidserne og glasmosaikken · byens vartegn" },
  { kat:"udsigt", navn:"Fjellheisen, Tromsø", lat:69.6385, lon:18.9908, dag:7, stj:4,
    t:"Svævebane til Storsteinen · hele øens panorama" },
  { kat:"udsigt", navn:"Sommarøy", lat:69.6336, lon:18.0074, dag:7, stj:3,
    t:"Hvide strande på 69°N · 58 km omvej fra Tromsø" },
  { kat:"udsigt", navn:"Lyngsalpene", lat:69.4023, lon:19.8835, dag:7, stj:4,
    t:"Takkede tinder direkte op af fjorden" },
  { kat:"udsigt", navn:"Gildetun, Kvænangsfjellet", lat:69.8980, lon:21.6055, dag:7, stj:3,
    t:"Fjeldpas med fjordudsigt · ofte samisk sommerlejr og rensdyr" },
  { kat:"udsigt", navn:"Alta Museum", lat:69.9468, lon:23.1892, dag:7, stj:5,
    t:"UNESCO-helleristninger · 5.000 år gamle" },
  { kat:"udsigt", navn:"E69 langs Porsangerfjorden", lat:70.4740, lon:25.0706, dag:8, stj:5,
    t:"De sidste 130 km · blandt Norges smukkeste vejstykker" },
  { kat:"udsigt", navn:"Nordkapptunnelen", lat:70.9298, lon:25.6997, dag:8, stj:1,
    t:"6,8 km under havet · 212 m under overfladen" },
  { kat:"udsigt", navn:"Globusmonumentet", lat:71.1709, lon:25.7833, dag:8, stj:5,
    t:"71°10'21\"N · vendepunktet · vær der ved solnedgang 20.56" },
  { kat:"udsigt", navn:"Gjesvær", lat:71.0984, lon:25.3763, dag:8, stj:3,
    t:"Fugleøerne · lunder og havsuler · bådtur fra landsbyen" },
  { kat:"udsigt", navn:"Sápmi, Karasjok", lat:69.4731, lon:25.5071, dag:9, stj:3,
    t:"Samisk parlament og kulturpark" },
  { kat:"udsigt", navn:"Siida, Inari", lat:68.9109, lon:27.0134, dag:9, stj:4,
    t:"Samisk museum ved Inarisøen · nyrenoveret" },
  { kat:"udsigt", navn:"Sodankylä gamle trækirke", lat:67.4146, lon:26.5968, dag:9, stj:2,
    t:"Fra 1689 · står stadig ved åen" },
  { kat:"udsigt", navn:"Arktikum, Rovaniemi", lat:66.5075, lon:25.7260, dag:10, stj:4,
    t:"Det bedste museum om Lapland · åbner kl. 9" },
  { kat:"udsigt", navn:"Ukonkivi i Inarisøen", lat:68.9389, lon:27.2925, dag:9, stj:3,
    t:"Samernes helligste ø · bådtur fra Inari" },
  { kat:"udsigt", navn:"Tankavaara guldlandsby", lat:68.1810, lon:27.0985, dag:9, stj:2,
    t:"Guldmuseum på E75 · du må vaske guld selv" },
  { kat:"udsigt", navn:"Oulu", lat:65.0121, lon:25.4720, dag:10, stj:2,
    t:"Halvvejs · torvet ved havnen og markedshallen" },
  { kat:"udsigt", navn:"Kalajoki klitter", lat:64.2393, lon:23.8182, dag:10, stj:2,
    t:"Sandklitter og kilometerlang strand på Vt8" },
  { kat:"udsigt", navn:"Rauma gamle by", lat:61.1276, lon:21.5141, dag:10, stj:4,
    t:"UNESCO-træby · 600 bevarede huse · bedste finske stop" },
  { kat:"udsigt", navn:"Naantali & Mumindalen", lat:60.4728, lon:22.0042, dag:10, stj:2,
    t:"+16 km fra Turku · træby fra 1400-tallet · Mumitrolde" },
  { kat:"udsigt", navn:"Gränna & Visingsö", lat:58.0251, lon:14.4673, dag:11, stj:2,
    t:"Polkagris ved Vättern · 25 min færge til øen" },

  /* ---- kandidater til at sove i bilen ---- */
  { kat:"sove", navn:"Hamar · Koigen", lat:60.7975, lon:11.0620, dag:1, stj:3,
    t:"Stop en time før Lillehammer · fremme i lys · Mjøsa mod vest",
    d:"Strandpromenaden ved Hamar centrum: badestrand, P-plads og offentligt toilet, og udsigten går vestover ud over Mjøsa. Pointen er tidspunktet, ikke stedet. Planen har dig i Lillehammer 21.30, og solen går ned 21.03 — stopper du her, står du ved vandet cirka 20.30 og ser rent faktisk noget den første aften. Det koster godt en time oveni dag 2, som med 353 km er turens letteste køredag. Til gengæld er der ingen strøm, så Camp Mode æder af rækkevidden i stedet for af stikkontakten. Det er en bypark — tjek skiltningen, og forvent naboer." },
  { kat:"sove", navn:"Lillehammer", lat:61.1015, lon:10.4629, dag:1, stj:3,
    t:"Første nat · camping med strøm ved Mjøsa · Camp Mode gratis",
    d:"Lillehammer Camping ligger nede ved Mjøsa tæt på centrum. Fordelen den første nat er ikke udsigten, men strømmen: står du på en plads med CEE-stik, kører Camp Mode uden at røre køreforbruget, og du starter dag 2 med fuldt batteri." },
  { kat:"sove", navn:"Hjerkinn, Dovrefjell", lat:62.2231, lon:9.5500, dag:2, stj:4,
    t:"1.000 m højt · vidde til alle sider · meget mørkt",
    d:"Rasteplads på vidden ved Snøhetta-afkørslen. Højt, åbent og køligt selv i august — men til gengæld er der ingen lysforurening overhovedet." },
  { kat:"sove", navn:"Polarsirkelsenteret", lat:66.5524, lon:15.3228, dag:3, stj:4,
    t:"Vågn op på polarcirklen · stor P-plads · toiletter",
    d:"Den store parkering ved 66°33'N på E6. Nøgent fjeld, ofte blæsende, og en af de få steder hvor selve adressen er værd at vågne op til. Tjek skiltningen — centeret har egne regler uden for åbningstid." },
  { kat:"sove", navn:"Saltstraumen", lat:67.2321, lon:14.6100, dag:3, stj:3,
    t:"Sov ved strømmen · vær klar til kulminationen ved daggry",
    d:"Parkeringen ved broen. Fidusen er, at strømmen kulminerer få gange i døgnet — sover du her, kan du ramme den tidlige uden at skulle køre." },
  { kat:"sove", navn:"Ramberg strand", lat:68.0962, lon:13.2423, dag:4, stj:4,
    t:"Lofoten · hvid strand direkte ud til vejen",
    d:"En af de få Lofoten-strande med parkering lige ved. Åben mod nordvest, så du ser både solnedgang og eventuelt nordlys fra soveposen." },
  { kat:"sove", navn:"Haukland strand", lat:68.1980, lon:13.5292, dag:5, stj:5,
    t:"Betalt P med toiletter · Lofotens pæneste strand",
    d:"Lofoten har strammet reglerne kraftigt, og Haukland er nu betalt parkering med toiletter og fast pris for overnatning. Det koster lidt, men det er lovligt og roligt — og du står 30 meter fra vandet." },
  { kat:"sove", navn:"Ersfjord strand, Senja", lat:69.4788, lon:17.3948, dag:6, stj:5,
    t:"Turistveg-rasteplads · arkitekttegnet toilet · strand",
    d:"Kræver Senja-omvejen. Nasjonal turistveg har bygget en rasteplads med det mest fotograferede toilet i Norge, og stranden ligger lige nedenfor." },
  { kat:"sove", navn:"Gildetun, Kvænangsfjellet", lat:69.8980, lon:21.6055, dag:7, stj:3,
    t:"Fjeldpas med fjordudsigt · rensdyr på parkeringen",
    d:"Højt oppe i passet mellem Nordreisa og Kvænangen. Udsigt ned over fjorden, og der går ofte rensdyr rundt mellem bilerne." },
  { kat:"sove", navn:"Skarsvåg", lat:71.1128, lon:25.8252, dag:8, stj:3,
    t:"Verdens nordligste fiskerleje · 14 km fra Nordkapp",
    d:"Alternativet til at betale for at sove på selve platået. Ligger tæt nok på, at du kan køre ud til solnedgang og tilbage igen — og Kirkeporten starter her." },
  { kat:"sove", navn:"Nordkapp-platået", lat:71.1709, lon:25.7833, dag:8, stj:5,
    t:"Lovligt med billet · vågn op på 71°N",
    d:"Billetten til Nordkapphallen gælder 24 timer, og man må overnatte på parkeringen. Det er dyrt, men det er også den eneste måde at have klippen for sig selv ved midnat og igen ved daggry. Tjek de aktuelle regler på nordkapp.no." },
  { kat:"sove", navn:"Inari, ved søen", lat:68.9060, lon:27.0280, dag:9, stj:3,
    t:"Finlands stilleste sø · laavu-shelters i nærheden",
    d:"Finland har allemannsret på linje med Norge, og der står gratis laavu-shelters med bålplads rundt om Inarisøen. Godt sted at holde en tidlig aften." },
  { kat:"sove", navn:"Vättern ved Gränna", lat:58.0251, lon:14.4673, dag:11, stj:2,
    t:"Sidste nat · søudsigt · to timer fra færgen",
    d:"Rasteplads ved E4 med udsigt over Vättern. Praktisk sidste overnatning, hvis du tager morgenfærgen fra Göteborg." },

  /* ---- omveje man kan vælge undervejs ---- */
  { kat:"omvej", navn:"Atlanterhavsveien", lat:63.0108, lon:7.4273, dag:2, stj:4,
    t:"+245 km / +4,9 t · vejen der hopper mellem skær" },
  { kat:"omvej", navn:"Kystriksveien Fv17", lat:65.4749, lon:12.2116, dag:3, stj:5,
    t:"~+450 km og 6 færger · regn med to dage i stedet for én" },
  { kat:"omvej", navn:"Torghatten", lat:65.3983, lon:12.0912, dag:3, stj:3,
    t:"Bjerget med hul igennem · 1 times vandring · på Kystriksveien" },
  { kat:"omvej", navn:"Svartisen / Engabreen", lat:66.6824, lon:13.7708, dag:3, stj:4,
    t:"Norges næststørste gletsjer · båd + vandring" },
  { kat:"omvej", navn:"Senja", lat:69.4856, lon:17.6589, dag:6, stj:5,
    t:"+159 km / +3 t · «Norge i miniature» · Segla ligger her" },
  { kat:"omvej", navn:"Andenes hvalsafari", lat:69.3123, lon:16.1057, dag:6, stj:3,
    t:"+178 km / +5,4 t via færgen til Senja · kaskelothvaler" },
  { kat:"omvej", navn:"Oulanka NP · Karhunkierros", lat:66.2720, lon:29.3881, dag:10, stj:4,
    t:"+243 km / +3,8 t · Finlands bedste vandreterræn" },
  { kat:"omvej", navn:"Kvarken skærgård", lat:63.3448, lon:21.3235, dag:10, stj:2,
    t:"+89 km / +1,9 t · UNESCO · landet hæver sig 8 mm om året" },
  { kat:"omvej", navn:"Skærgårdsringen ved Turku", lat:60.1925, lon:21.9105, dag:10, stj:4,
    t:"+120 km / +2,8 t · gratis færger mellem øerne" }
];

/* Alternativer - målte svar på "kan den gøres kortere?" */
window.ALTERNATIVER = {
  retur: {
    titel: "Hjemturen: Finland eller Sverige?",
    intro: "Det nærliggende spørgsmål er, om man kan spare vej ved at køre ned gennem Sverige i stedet for Finland. Jeg har målt alle fire måder at komme fra Nordkapp til Aalborg på. Svaret er nej — og forskellen er større end man skulle tro.",
    rows: [
      { navn:"Finland + natfærge Turku → Stockholm", km:2055, t:28.3, valgt:true,
        note:"Nuværende rute. Og de 11 timer på Østersøen sover du igennem — de tæller reelt ikke." },
      { navn:"Finnlines Helsinki → Travemünde", km:2013, t:26.7, fravalgt:true,
        note:"Undersøgt og fravalgt: 455 € mod Turku-færgens ~70 €, og afgangen onsdag kl. 15 kan ikke nås fra Nordkapp." },
      { navn:"Sverige indland ad E45, «Inlandsvägen»", km:2305, t:34.0,
        note:"250 km og knap 6 timer længere. Smuk vej gennem Lapland, men ingen genvej." },
      { navn:"Sverige østkyst ad E4", km:2349, t:31.8,
        note:"294 km længere. Hurtige veje, men du kører hele Bottenvigen rundt i stedet for at skære over." },
      { navn:"Samme vej tilbage ad E6 gennem Norge", km:2653, t:42.0,
        note:"598 km og næsten 14 timer længere. Og du ser det samme igen." }
    ],
    konklusion: "Finland vinder af to grunde: Bottenvigen skæres over i stedet for rundt, og natfærgen laver 11 timers transport om til en nats søvn. Ingen svensk rute har noget tilsvarende.",
    travemunde: "<b>Travemünde-ruten er undersøgt og fravalgt.</b> Det var den, det oprindelige udkast regnede med, før Turku-færgen erstattede den, og den er faktisk den korteste af alle fem på kørsel — men kun med 42 km. Prisen afgjorde det ikke alene: <b>455 €</b> for voksen, bil og indvendig kahyt mod Turku-færgens 800 SEK, altså cirka 385 € dyrere. Udkastets gæt på ~450 € holdt næsten. <br><br>Det, der gjorde det endeligt, var afgangstidspunktet. <b>Finnlady sejler onsdag kl. 15.00, og den afgang kan ikke nås.</b> Fra Nordkapp er der 1.540 km til Helsinki. Står du på klippen mandag aften, når du selv med en meget lang tirsdag kun cirka 900 km — og så skal de sidste 640 km køres onsdag med afgang kl. 05.00 for at være ved check-in kl. 13. Turku-færgen sejler kl. 20 og kan nås med afgang fra Rovaniemi kl. 06. Helsinki ligger endda 42 km <i>tættere</i> på Rovaniemi end Turku; det er ikke afstanden der fælder ruten, det er de fem timer. Oveni er billetten en «Special Price», som normalt hverken kan ombyttes eller refunderes — det modsatte af den frihed, du har bygget planen op om."
  },

  norge: {
    titel: "Færgen nordpå: prisen vendte regnestykket om",
    intro: "Jeg gik ud fra, at Stena til Göteborg var den billige. Det er den ikke — den er 300 kr dyrere end begge Color Line-ruterne, den lander senest, og den er tilmed den længste vej til Trondheim. Da priserne kom på bordet, tabte den på alle tre parametre.",
    rows: [
      { navn:"Hirtshals → Larvik · i land 16.45 · ~1.000 kr", km:721, t:10.5, valgt:true,
        note:"Kortest til Trondheim, billigst, og kun 45 minutter senere i land end Göteborg." },
      { navn:"Hirtshals → Kristiansand · i land 13.25 · ~1.000 kr", km:876, t:12.6,
        note:"Fire timer tidligere i land — men Kristiansand ligger i det forkerte hjørne. De ekstra timer ædes af 155 km mere vej." },
      { navn:"Frederikshavn → Göteborg · i land 17.30 · ~1.300 kr", km:881, t:12.4,
        note:"Dyrest, senest i land, og 160 km længere end Larvik. Ingen grund til at vælge den på udturen." }
    ],
    konklusion: "Larvik sparer 300 kr og 163 km — men gevinsten er dag 2. Den falder fra 519 til 353 km, og bliver dermed turens letteste køredag lige inden dag 3, som er den hårdeste med 719 km. Det er den rigtige rækkefølge at have dem i."
  },

  maal: {
    titel: "Skal Nordkapp overhovedet være målet?",
    intro: "Som steder betragtet er der ingen tvivl: Lofoten er bedre end Nordkapp. Lofoten er noget man opholder sig i — granittinder direkte op af havet, otte vandreture, fiskevær, strande, og fire femstjernede steder inden for en times kørsel. Nordkapp er et punkt man rører ved: en klippe, en globus, en udsigtshal og en entré. Er der tåge, hvilket der ofte er på 307 meter, har du ingenting. Men Nordkapp konkurrerer ikke som destination — det konkurrerer som begrundelse. Spørgsmålet er, hvad de tre strukturer koster.",
    rows: [
      { navn:"Nordkapp som mål — den nuværende plan", km:4801, t:72.1, valgt:true,
        note:"71°N, E69 langs Porsangerfjorden, Alta Museum, Finnmarksvidda, finsk Lapland og natfærgen. Enorm variation — men kun halvanden dag på Lofoten." },
      { navn:"Lofoten + Senja, hjem gennem Finland", km:4188, t:62.0,
        note:"Dropper Nordkapp og bruger dagene på øerne i stedet: 4½ dag på Lofoten og Senja mod halvanden nu. Beholder Finland, Lapland og natfærgen, så hjemturen bliver ikke kedelig." },
      { navn:"Lofoten som vendepunkt, hjem gennem Sverige", km:3548, t:51.2,
        note:"Kortest, og 1.253 km mindre kørsel. Men hjemturen bliver 2.122 km gennem svensk skov og kystslette — fire dage uden noget at se på. Det er den svageste af de tre." }
    ],
    konklusion: "Vender du om på Lofoten, halverer du kørslen — men du bytter turens mest varierede fjerdedel ud med fire dages tom svensk motorvej. Vil du droppe Nordkapp, så gør det rigtigt: bliv på øerne, tag Senja med, og kør hjem gennem Finland alligevel. Så bliver turen bedre og ikke bare kortere.",
    afgoerende: "Det afgørende argument er afstanden hjemmefra. <b>Lofoten ligger 1.426 km væk — det er en uges ferie, du kan tage igen.</b> Nordkapp ligger 2.500 km væk, og den tur laver de fleste én gang i livet. Derfor: tag Nordkapp nu, mens du alligevel er kørt hele vejen op, og tag tilbage til Lofoten en anden gang med bedre tid. Er du omvendt sikker på, at det her er din ene store nordtur, så er Lofoten det sted, du vil huske."
  },

  jaevn: {
    titel: "Alternativet: tolv jævne dage i stedet for fire hårde",
    intro: "Turen er ikke lang i kilometer per dag — 4.900 km på 12 dage er 410 km i snit. Problemet er fordelingen: fire dage ligger på 700-875 km, og resten er korte. Flytter man overnatningerne, kan ingen dag komme over 652 km — for præcis samme rute og næsten samme samlede afstand.",
    pris: "Prisen er hviledagen på Lofoten. Du får én nat i Reine i stedet for to, og turen har så ingen buffer, hvis noget skrider.",
    dage: [
      { n:1,  titel:"Aalborg → Lillehammer",       alt:385, nu:385 },
      { n:2,  titel:"Lillehammer → Trondheim",     alt:353, nu:353 },
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
    konklusion: "Samme rute, samme 12 dage, 4.782 km mod 4.801. Men den længste dag falder fra 875 til 652 km, og færgedagen bliver ufarlig: afgang fra Oulu kl. 7, i Turku ved 16-tiden, seks timer før afgang."
  },

  bund: "Der er ingen stor besparelse at finde. Aalborg-Nordkapp er 2.500 km hver vej, og alt under omkring 4.800 km betyder, at noget væsentligt skæres væk. Vil du under det, er det ikke ruten der skal ændres — så skal Nordkapp eller Lofoten ud af planen."
};

/* At rejse uden at booke: hvor det virker, og hvor det ikke gør. */
window.FRIPLAN = {
  dom: "Ja, det kan lade sig gøre — og madrassen er grunden. Uden den ville det være en dårlig idé i august; med den er overnatning aldrig en blokering, men et valg. Til gengæld er der tre datoer, der ikke må skride, og præcis én dags luft i hele planen.",

  hvorfor: [
    { t:"Bilen fjerner den eneste rigtige risiko", d:"De to steder hvor man reelt kan komme til at stå uden tag over hovedet i august er Lofoten og Honningsvåg. Begge steder har du en lovlig plads at sove: betalt parkering med toilet ved Haukland og Ramberg, og selve Nordkapp-platået, hvor billetten gælder 24 timer. Du kan altså aldrig blive tvunget til at køre videre, fordi der ikke var en seng." },
    { t:"Sidst i august er bedre end du tror", d:"Både norske og finske skoler er begyndt igen, så den indenlandske ferietrafik er ovre. Der er stadig udenlandske turister på Lofoten og ved Nordkapp, men presset er mærkbart lavere end i juli. I byerne — Trondheim, Bodø, Tromsø, Alta, Rovaniemi, Oulu — finder du stort set altid noget samme dag." },
    { t:"Campingpladsernes hytter står ikke på Booking.com", d:"Norske campingpladser har hytter til langt under hotelpris, og de tager som regel folk ind fra gaden. Oveni har de CEE-strøm, så Camp Mode kører gratis. Det er den bedste fallback på turen, og den er nærmest usynlig, hvis man kun kigger ét sted." }
  ],

  frister: {
    intro: "Turen er ikke bundet af overnatninger, men af to faste endepunkter: færgen fra Hirtshals mandag den 17. og at du skal være hjemme fredag den 28. Alt derimellem kan improviseres — så længe du er de her fire steder senest på de her datoer. Regnet baglæns fra fredag.",
    raekker: [
      { sted:"På Lofoten", normal:"tor 20. aug", sidste:"fre 21. aug",
        hvorfor:"Derfra er der tre køredage til Nordkapp: Tromsø, Alta, klippen." },
      { sted:"Ved Nordkapp", normal:"man 24. aug", sidste:"tir 25. aug",
        hvorfor:"Der er 1.584 km til Turku. Det er to hårde dage — 827 og 757 km — og de kan ikke gøres til én.", vendepunkt:true },
      { sted:"Ombord i Turku", normal:"ons 26. aug", sidste:"tor 27. aug",
        hvorfor:"Natfærgen sejler ca. kl. 20 og lander i Stockholm kl. 7." },
      { sted:"I Göteborg", normal:"tor 27. aften", sidste:"fre 28. middag",
        hvorfor:"Fra Stockholm er der 477 km. Kører du kl. 7, er du fremme ved 13-tiden. Den her frist er den blødeste: kan du ikke nå en Stena-afgang, kører du over Øresund i stedet." }
    ],
    luft: "Der er præcis <b>én dags luft</b> i hele planen, og det er hviledagen på Lofoten. Bruger du den på at komme videre, er du tilbage på skemaet. Bruger du den på at ligge i solen, har du ingen tilbage. Begge dele er fine — du skal bare vide hvilken af dem du gør."
  },

  regler: [
    ["Book altid mens du har dækning","Det er ikke sengen der er problemet, det er signalet. Der er huller på E69, Finnmarksvidda og strækningen Karasjok-Inari. Find stedet ved 15-tiden mens du holder et sted med net — ikke kl. 21 på vidden."],
    ["Bodø-færgen er den eneste der skal planlægges","Den sejler få gange i døgnet og fyldes i august. Book den 2-3 dage før, når du kan se dit eget tempo. Bliver den fuld, koster det ikke turen: kør E6 til Bognes-færgen, som sejler ofte og ikke skal bookes, og kom ind i Lofoten nordfra i stedet."],
    ["Vælg steder med nøgleboks","Små gæstgiverier i Norge lukker receptionen kl. 18-20. Kommer du kl. 22, står du udenfor. Filtrér efter selvbetjent indtjekning, eller sov i bilen den nat."],
    ["Heller ikke hjemturen skal bookes hjemmefra","Stena Göteborg → Frederikshavn sejler mange gange dagligt og kan bookes fra telefonen 1-2 dage før — eller samme formiddag. Vælg en eftermiddags- eller aftenafgang fredag, så din ene dags luft holder helt til sidst."],
    ["Vejen over Øresund er altid åben","Den fallback binder dig ikke til noget: fra Stockholm kan du køre ned gennem Skåne og hjem over Øresundsbroen eller Helsingør-færgen, som begge går hele tiden. Det koster 479 km og cirka fem timer mere end Stena — men bro plus Storebælt lander omtrent på samme billetpris. Derfor er der ingen risiko ved at lade Stena stå åben."],
    ["Beslut om aftenen, ikke om morgenen","Ad hoc fungerer bedst, når du vælger næste dags mål aftenen før, ud fra vejrudsigten. yr.no er præcis i Norge, og på Lofoten og Senja afgør vejret alligevel, om vandreturene overhovedet giver mening."]
  ],

  fare: "Det eneste sted planen kan gå i stykker er efter Nordkapp. Nordfra og hjem er der 2.600 km og fire dage, og der er ingen genveje tilbage — Sverige er 294 km længere, og at køre tilbage gennem Norge er 598 km længere. Så længe du står på klippen senest tirsdag den 25., kan alt andet improviseres.",

  nod: {
    titel: "Nødudgangen: hvor du kan droppe Nordkapp",
    intro: "Tanken om at vurdere det på Lofoten og køre øst mod Finland i stedet er rigtig at have — men Lofoten er det dårligste sted at træffe beslutningen. Her er hvad den koster de tre steder, den kan træffes.",
    noegletal: "Nordkapp koster kun <b>308 km og 5 timer</b> som omvej, når du først står i Alta. Alta → Karasjok direkte er 197 km; Alta → Nordkapp → Karasjok er 505 km. Det er hele prisen for det, turen er opkaldt efter.",
    raekker: [
      { sted:"På Lofoten", dag:"dag 5", sparer:"1.029 km · 17 t", mister:8,
        rute:"Reine → Narvik → Kiruna → Pajala → Rovaniemi",
        d:"Sparer mest og koster mest. Du opgiver hele den arktiske del af turen på det tidspunkt, hvor du ved mindst om dit eget tempo. Otte af turens tretten femstjernede ligger nord for dette punkt." },
      { sted:"I Tromsø", dag:"dag 6", sparer:"726 km · 12 t", mister:5, bedst:true,
        rute:"Tromsø → Kilpisjärvi → Muonio → Rovaniemi ad E8",
        d:"Den rigtige nødudgang, hvis der endelig skal bruges én. E8 går direkte fra Tromsø ind i Finland forbi Lyngsalpene og over Kilpisjärvi med Saana-fjeldet — det er ikke en trist tilbagetrækning, men en smuk vej i sig selv. Du har allerede fået Lofoten, Senja og Tromsø, og du får Finland i stedet." },
      { sted:"I Alta", dag:"dag 7", sparer:"308 km · 5 t", mister:4,
        rute:"Alta → Karasjok → Inari, uden om Magerøya",
        d:"Sparer så lidt, at det næsten aldrig er rigtigt. Du er 250 km fra klippen, og fristen siger, at du må være der helt frem til tirsdag den 25. Herfra skal der være noget alvorligt galt, før det giver mening." }
    ],
    pointe: "Prisen falder, jo tættere du kommer: 1.029 km på Lofoten, 726 i Tromsø, 308 i Alta. Beslutningen bliver altså både billigere og bedre oplyst af at blive udskudt. <b>Flyt den til Alta.</b> Der ved du præcis, hvordan turen er gået, og du kan stadig spare de 308 km, hvis du har brug for det.",
    naar: "Den ægte grund til at bruge nødudgangen er ikke, at du er en halv dag bagud — det klarer hviledagen. Det er noget strukturelt: bilen, helbredet, flere dages storm, eller en lukket fjeldvej. Sker det, er Tromsø-udgangen din, og den er god."
  }
};

/* Karakterskalaen. Forankret i hvad du skal GØRE, ikke i vage kvalitetsord. */
window.SKALA = {
  intro: "Alt på kortet har fået 1-5 stjerner. Skalaen handler om hvad stedet er værd at gøre for — ikke om det er «pænt», for det er alting heroppe.",
  trin: [
    [5, "Det er derfor du kørte herop", "Ville være tåbeligt at springe over. 13 steder."],
    [4, "Kør en omvej for det", "Værd at lægge kilometer eller en halv dag til. 22 steder."],
    [3, "Planlæg efter det", "Læg ruten så du kommer forbi, men brænd ikke tid på det. 24 steder."],
    [2, "Stop hvis du har tid", "Fint nok, men vælg det fra når dagen er lang. 13 steder."],
    [1, "Kun hvis du alligevel står der", "Interessant at vide, ikke at opleve. 1 sted."]
  ],
  forbehold: "Det her er det eneste på siden, der er en <b>vurdering</b> og ikke en måling. Afstande, køretider og koordinater er hentet fra rutemotor og kort; stjernerne er min mening. Er du uenig, er det dig der har ret — du er den der står der."
};

/* Omveje: hvad koster det at opleve mere? maalt = tal fra rutemotoren. */
window.OMVEJE = {
  intro: "Kilometer er ikke problemet, siger du. Så er her det, der reelt er værd at lægge vej til — sorteret efter hvor meget du får for timen. Alle tal er merpris i forhold til den planlagte rute, målt med rutemotoren undtagen hvor andet står.",
  liste: [
    { navn:"Senja", km:159, t:3.0, maalt:true, dag:6, stj:5,
      hvor:"I stedet for E10/E6 direkte fra Lofoten til Tromsø",
      d:"Hvis du kun tilføjer én ting, så tag denne. Senja kaldes «Norge i miniature» og har Lofotens landskab uden Lofotens busser. Segla-vandringen er blandt de mest dramatiske i landet, Tungeneset og Bergsbotn er arkitekttegnede udsigtsstop, og Ersfjord er et af turens bedste steder at sove i bilen.",
      pris:"Tre timer. Det er den billigste store oplevelse på hele turen." },

    { navn:"Atlanterhavsveien + Åndalsnes", km:245, t:4.9, maalt:true, dag:2, stj:4,
      hvor:"Fra Dombås mod Trondheim i stedet for E6 over Dovrefjell",
      d:"Vejen der hopper fra skær til skær på otte broer, med Storseisundbroen der ser ud til at ende i luften. Undervejs ligger Trollstigen og Trollveggen ved Åndalsnes. To korte færger indgår i tallene.",
      pris:"Knap fem timer, og du bytter Dovrefjell væk. Tjek om Trollstigen er åben — den har været lukket flere sæsoner på grund af stenskred." },

    { navn:"Kystriksveien Fv17", km:450, t:9, maalt:false, dag:3, stj:5,
      hvor:"I stedet for E6 fra Trondheim til Bodø",
      d:"Norges smukkeste vejstrækning, siger mange — 650 km langs kysten med seks færger, Torghatten med hullet igennem, og Svartisen-gletsjeren der går næsten ned til vejen. Færgerne er en del af oplevelsen, ikke en forhindring.",
      pris:"Regn med to dage i stedet for én. Det er den dyreste omvej på listen og kræver, at du finder en dag et andet sted.",
      note:"Tallene her er skøn — rutemotoren nægter at køre Kystriksveien, fordi den straffer færger så hårdt, at den kører udenom hver gang. Alt andet på siden er målt." },

    { navn:"Andenes hvalsafari", km:178, t:5.4, maalt:true, dag:6, stj:3,
      hvor:"Via Vesterålen og færgen Andenes → Gryllefjord til Senja",
      d:"Kaskelothvaler året rundt ud for Andenes, hvor kontinentalsoklen falder brat. Tager du den vej, får du både Vesterålen og Senja med i én bevægelse.",
      pris:"Fem en halv time inklusive færge, og selve safarien tager en halv dag.",
      note:"Færgen Andenes → Gryllefjord sejler kun om sommeren. Tjek at den kører sidst i august, før du planlægger efter den." },

    { navn:"Sommarøy", km:116, t:2.4, maalt:true, dag:7, stj:3,
      hvor:"Tur/retur fra Tromsø",
      d:"Hvide sandstrande og turkist vand på 69°N. Ser ud som om nogen har flyttet Caribien 3.000 km for langt mod nord og glemt at skrue op for varmen.",
      pris:"To en halv time. Nem at klemme ind på formiddagen inden Alta." },

    { navn:"Pyhä-Luosto", km:62, t:1.1, maalt:true, dag:9, stj:4,
      hvor:"Kort afstikker fra E75 mellem Sodankylä og Rovaniemi",
      d:"Isokuru er Finlands dybeste kløft — 220 meter ned mellem to fjelde, med trappe og gangbro hele vejen. Det er Finlands ældste fredede natur, og den ligger praktisk talt på vejen.",
      pris:"En time. Det er den billigste rigtige naturoplevelse på hele turen." },

    { navn:"Skærgårdsringen ved Turku", km:120, t:2.8, maalt:true, dag:10, stj:4,
      hvor:"Fra Turku ud i skærgården og tilbage, inden færgen",
      d:"Vejen hopper fra ø til ø gennem Finlands skærgårdshav — verdens største målt i antal øer. Færgerne mellem øerne er en del af vejnettet og derfor gratis, og de sejler næsten konstant.",
      pris:"Under tre timer. Perfekt hvis du alligevel venter på en færge, du ikke har booket.",
      note:"Nogle af forbindelserne på den store ring sejler kun i sommersæsonen og lukker sidst i august. Den korte tur til Nagu og tilbage kører hele året." },

    { navn:"Oulanka NP · Karhunkierros", km:243, t:3.8, maalt:true, dag:10, stj:4,
      hvor:"Øst om via Kuusamo i stedet for lige ned ad Vt4 til Oulu",
      d:"Finlands bedste vandreterræn: stryg, hængebroer og fyrreskov i en kløft ved den russiske grænse. «Lille Bjørnerunde» er en 12 km rundtur, der tager en formiddag; den store er 82 km.",
      pris:"Knap fire timer ekstra kørsel plus en halv dag til fods. Det er den finske pendant til Kystriksveien — dyr, men det eneste sted Finland bliver dramatisk." },

    { navn:"Kvarken skærgård", km:89, t:1.9, maalt:true, dag:10, stj:2,
      hvor:"Fra Vaasa på vestkysten, undervejs mod Turku",
      d:"UNESCO-område, hvor landet stadig hæver sig cirka 8 mm om året efter istiden — nye øer dukker bogstaveligt talt op. Replot-broen er Finlands længste.",
      pris:"To timer. Mest for geologien; landskabet er lavt og stille." },

    { navn:"Knivskjellodden", km:0, t:6, maalt:false, dag:8, stj:4,
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
    ["Camp Mode løser tre ting på én gang","Varme, når det er 3-5 grader på vidden. Fugt, så ruderne ikke dugger til. Og strøm til 12 V-udtaget hele natten, så køletasken kører. Til gengæld koster den et par kWh per nat — mere når det er koldt — så den skal med i ladeplanen."],
    ["Sov hvor du kan lade, så er Camp Mode gratis","Det er her CEE-adapteren tjener sig ind. Står du på en campingplads med strøm, kan du køre Camp Mode hele natten uden at røre køreforbruget — og lade bilen op oveni. Det gør de betalte pladser på Lofoten til en bedre handel, end prisen antyder. Spørg altid om lov først; se afsnittet om ladning."],
    ["Myg i Lapland","August er bedre end juli, men Finnmarksvidda og finsk Lapland har stadig myg. Med Camp Mode er ruderne lukkede, så du skal ikke bruge net — myggene kommer ind ad døren. Det generende er udenfor: madlavning, fotostop, og ikke mindst når du står stille i mørket og venter på nordlys."],
    ["Toiletter og bad","Rastepladserne i Norge har som regel toilet. Til bad: svømmehaller i byerne koster småpenge, og campingpladser sælger ofte adgang til bad uden at man overnatter."],
    ["Skift mellem seng og bil","Halvdelen i bilen er en god plan. Læg de rigtige senge på de dage, hvor du har kørt langt — dag 3, dag 6 og dag 10 — og sov i bilen på de korte dage, hvor du kommer tidligt frem."]
  ],
  advarsel: "Jeg har markeret sovesteder på kortet som <b>kandidater</b>, ikke som garantier. Jeg kan ikke se skiltningen fra Aalborg, og reglerne ændrer sig fra sæson til sæson — særligt på Lofoten. Tjek altid skiltet på stedet."
};

/* ---------------------------------------------------------------------------
   Pakkeliste. kritisk = kan ikke købes undervejs, eller noget går i stykker
   hvis den mangler. d = kun hvor der er noget ikke-indlysende at sige.
   Afkrydsning gemmes i browseren.
   --------------------------------------------------------------------------- */
window.PAKKELISTE = {
  intro: "Skruet sammen til præcis denne tur: alene, elbil, madras i bagagerummet, fire lande, vandreture undervejs, og nætter der kan komme ned på 3-5 grader på vidden. Det markerede kan du ikke bare købe på vejen — eller også vælter det noget, hvis det mangler.",

  grupper: [
    { navn:"Dokumenter og penge", ting:[
      { t:"Pas", kritisk:true, d:"Alle fire lande er i Schengen, men færgeselskaberne kræver billed-ID, og der har været genindførte grænsekontroller. Pas er det simpleste." },
      { t:"Kørekort" , kritisk:true },
      { t:"Registreringsattest", d:"Ligger tit i handskerummet — tjek at den faktisk er der." },
      { t:"Forsikringspolice", d:"Grønt kort kræves ikke inden for EØS, men policenummeret er rart at have ved et uheld." },
      { t:"Det blå EU-sygesikringskort", kritisk:true, d:"Gælder også i Norge, som er med i EØS. Dækker nødvendig behandling." },
      { t:"Rejseforsikring", d:"Det blå kort dækker ikke hjemtransport. Tjek om dit kreditkort allerede har det." },
      { t:"Color Line-billetten (XEA2995)", kritisk:true, d:"Gem den offline — ikke kun i en mail du skal have net for at åbne. Mødetid i Hirtshals senest 11.45 mandag den 17." },
      { t:"Spurgt BroBizz om Norge", kritisk:true, d:"Spørg dem direkte, om din aftale dækker norske bomringe og færger. Kan de ikke bekræfte det, så registrer nummerpladen gratis hos Epass24 i stedet — det fjerner opslagsgebyret, men giver ingen rabat." },
      { t:"Betalingskort med lavt valutagebyr", d:"Fire valutaer på tolv dage. Gebyret løber op." },
      { t:"Lidt kontanter i nødsfald", d:"Norge er nærmest kontantløst, så det er kun til hvis kortet dør." }
    ]},

    { navn:"Bilen og ladning", ting:[
      { t:"Type 2-kabel", kritisk:true, d:"Til destinationsladere på hoteller og campingpladser. Lynladerne har fast kabel, men det har AC-standerne ikke." },
      { t:"Mobil lader (granny-kabel)", d:"Model 3 har CCS2 indbygget, så du skal ikke bruge nogen lynlade-adapter i Europa." },
      { t:"CEE-blå adapter til den mobile lader", kritisk:true, d:"Nordiske campingpladser bruger blå CEE-stik, ikke Schuko. Uden adapteren kan du ikke lade på en campingplads overhovedet — og det er den billigste strøm på turen." },
      { t:"Ladebrikker og apps", d:"Norge: Recharge, Kople, Mer, Eviny. Finland: K-Lataus, Virta. Opret dem hjemmefra — flere kræver SMS-bekræftelse, og det er surt i et dødt netområde." },
      { t:"A Better Routeplanner installeret", d:"Bilens egen planlægger er god i Norge, mindre god i finsk Lapland." },
      { t:"Advarselstrekant", kritisk:true, d:"Lovpligtig i Norge, Sverige og Finland." },
      { t:"Refleksvest", kritisk:true, d:"Skal kunne nås fra førersædet — ikke ligge i bagagerummet. Påbudt i norskindregistrerede biler og stærkt anbefalet i alle." },
      { t:"Dækreparationssæt og kompressor", kritisk:true, d:"Model 3 har intet reservehjul. På E69 og Finnmarksvidda er der langt til nærmeste værksted." },
      { t:"Sprinklervæske og en klud", d:"Insekter på forruden bliver et reelt problem på de finske etaper." },
      { t:"Startkabler eller jumpstarter", d:"Ikke til køresystemet, men Model 3'ens 12 V-batteri kan drille — og så kan du ikke engang åbne bilen normalt." }
    ]},

    { navn:"At sove i bilen", ting:[
      { t:"Sovepose - en let én er nok", d:"Med Camp Mode er der 18-20 grader i bilen, så en 0-graders pose er overflødig. Tag alligevel noget der kan klare 5-10 grader plus et lag uld: den nat du står med for lidt strøm til at køre Camp Mode, vil du gerne have marginen." },
      { t:"Pude og lagen", d:"Madras uden lagen bliver klam efter to nætter." },
      { t:"Sovemaske", kritisk:true, d:"Den lette løsning på det lys, der ellers ville kræve mørklægning af hele kabinen. Nordpå bliver det lyst igen omkring kl. 4, og glastaget lukker det hele ind." },
      { t:"Myggene kommer ind ad døren, ikke ad ruden", d:"Med Camp Mode er ruderne lukkede, så du skal ikke bruge net. Til gengæld følger der myg med hver gang du åbner døren om aftenen i Lapland — luk hurtigt, og slå dem ihjel før du lægger dig." },
      { t:"Pandelampe", kritisk:true },
      { t:"Ørepropper", d:"Rastepladser ligger ved vejen, og lastbiler kører hele natten." },
      { t:"Foldbar spand eller pose til skidt", d:"Der er ikke skraldespand alle steder, og efterlader man noget, er det den slags der får rastepladser lukket for overnatning." },
      { t:"Hurtigtørrende håndklæde", d:"Svømmehaller i byerne koster småpenge og er den nemme adgang til bad." }
    ]},

    { navn:"Vandring og vejr", ting:[
      { t:"Vandrestøvler", kritisk:true, d:"Gåede til, ikke nye. Reinebringens 1.566 trin er ikke stedet at opdage vabler." },
      { t:"Regnjakke og regnbukser", kritisk:true, d:"Lofoten og Senja skifter vejr på en halv time. Det er ikke et spørgsmål om det bliver vådt." },
      { t:"Uldundertøj", kritisk:true, d:"Base layer i merino. Bomuld holder på fugten og køler dig ned." },
      { t:"Fleece og en let dunjakke", d:"Lagdeling slår én tyk jakke, når du både skal gå op ad et fjeld og stå stille på Nordkapp i blæst." },
      { t:"Hue og handsker", kritisk:true, d:"Nordkapp i slutningen af august med vind er ikke behageligt uden. Solen går ned 20.56, og så falder temperaturen hurtigt." },
      { t:"Vandrestave", d:"Mest for nedturen. Reinebringen ned ad de trin belaster knæene mere end op." },
      { t:"Dagrygsæk", kritisk:true },
      { t:"Drikkedunk", d:"Vandet i norske fjeldbække kan drikkes de fleste steder." },
      { t:"Knopplaster og lidt tape", kritisk:true, d:"Vabler på dag 5 ødelægger Segla på dag 6." },
      { t:"Solbriller", kritisk:true, d:"Solen står lavt hele dagen på 70 grader nord — den sidder i øjnene i timevis, ikke bare ved solnedgang." },
      { t:"Solcreme", d:"Undervurderet heroppe. Refleksion fra vand og lys hele dagen." }
    ]},

    { navn:"Elektronik", ting:[
      { t:"Bærbar og oplader", kritisk:true },
      { t:"Powerbank", kritisk:true, d:"Til vandringerne, hvor bilen ikke er i nærheden." },
      { t:"Pixel Buds og etui", d:"Oplad etuiet inden de lange etaper — dag 3, 6, 9 og 10 er der mange timer at fylde." },
      { t:"USB-C-kabler og en flerport-oplader", d:"Mindst ét kabel mere end du tror. De går i stykker på ferier." },
      { t:"Telefonholder til bilen" },
      { t:"Offline-kort hentet ned", kritisk:true, d:"Google Maps offline for hele Norge og Finland FØR du kører. Der er rigtige huller i dækningen på E69, Finnmarksvidda og strækningen Karasjok-Inari." },
      { t:"Musik og podcasts hentet offline", d:"Samme grund. 74 timer bag rattet er lang tid med sin egen selskab." },
      { t:"Ingen rejseadapter nødvendig", d:"Danmark, Sverige, Norge og Finland bruger alle Schuko-kompatible stik. Du skal ikke slæbe en adapter med." }
    ]},

    { navn:"Køletaske og mad", ting:[
      { t:"Køletaske med 12 V", kritisk:true },
      { t:"Regn Camp Mode med i ladeplanen", kritisk:true, d:"Camp Mode holder 12 V-udtaget i live hele natten, så køletasken kører — men den bruger et par kWh, og mere når det er koldt. Ankom til sovestedet med en buffer, ikke med 10 %." },
      { t:"Termokande", d:"Kaffe på en rasteplads klokken syv om morgenen ved Polarsirkelen er halvdelen af turen." },
      { t:"Turkomfur og gaspatron", d:"Norge er halvanden gang så dyrt som herhjemme. Et komfur tjener sig ind på tre-fire måltider. Gaspatroner må gerne med på bilfærgerne." },
      { t:"Bestik, kop, tallerken, dåseåbner" },
      { t:"Foldekniv" },
      { t:"Køb ind i Sverige på dag 1", d:"Sidste billige indkøb inden Norge er i Göteborg-området. Alt stiger, når du krydser grænsen ved Svinesund." }
    ]},

    { navn:"Nordlys og foto", ting:[
      { t:"Stativ", kritisk:true, d:"Nordlys kan ikke fotograferes på fri hånd. Uden stativ får du grønne udtværede pletter — og du er der i den rigtige sæson, sidst i august." },
      { t:"Kamera med manuel indstilling", d:"Telefonen kan mere end man tror, men lang lukketid kræver stadig at den står stille." },
      { t:"Ekstra batterier", kritisk:true, d:"Kulde halverer batteritiden. Hav dem i inderlommen, ikke i tasken." },
      { t:"Fjernudløser eller selvudløser", d:"Selv et let tryk ryster billedet ved 15 sekunders lukketid." },
      { t:"Nordlysvarsel installeret", d:"Følg Kp-indeks på yr.no eller NOAA’s 30-minutters varsel. Men husk at mørket er den bindende faktor i august, ikke aktiviteten — se afsnittet om vejr og lys." }
    ]},

    { navn:"Krop og apotek", ting:[
      { t:"Fast medicin i original emballage", kritisk:true, d:"Nok til hele turen plus et par dage. Recepter fra Danmark kan ikke uden videre indløses i Norge." },
      { t:"Myggemiddel med DEET", kritisk:true, d:"Til udendørs brug — i bilen er du dækket af Camp Mode og lukkede ruder. Finnmarksvidda og finsk Lapland er stadig ikke myggefri i august." },
      { t:"Myggehovednet", d:"Vejer ingenting og fylder ingenting. Det afgørende øjeblik er nordlysvagten: du står stille i mørket i en time i Lapland, og det er præcis når de finder dig." },
      { t:"Håndkøbs smertestillende" },
      { t:"Lille førstehjælpstaske", d:"Du er alene, og der er langt mellem folk på flere af vandringerne." },
      { t:"Vådservietter og håndsprit", d:"Halvdelen af nætterne uden bad." },
      { t:"Toiletsager og en rulle papir", d:"Ikke alle rastepladser har toilet, og ikke alle toiletter har papir." }
    ]},

    { navn:"Kan trygt købes undervejs", ikkepak:true, ting:[
      { t:"Mad og drikke", d:"Dagligvarer findes i alle byer. Køb bare stort ind i Sverige dag 1." },
      { t:"Sprinklervæske og småting til bilen", d:"Fås på enhver tankstation." },
      { t:"Gaspatroner", d:"Sportsbutikker og større tankstationer i Norge." },
      { t:"Souvenirs", d:"Til gengæld er alt ved Nordkapp dyrt. Køb i Honningsvåg i stedet for på platået." }
    ]}
  ],

  bund: "Det du helst ikke vil opdage klokken 23 på en rasteplads ved Saltstraumen: sovepose, pandelampe og hue."
};

/* Praktisk: hvad der skal bookes, hvad det koster, hvad man skal huske. */
window.PRAKTISK = [
  { gruppe:"På plads", ikon:"kalender", punkter:[
    ["Color Line Hirtshals → Larvik","<b>Købt.</b> Bookingnummer XEA2995. Mandag 17. august, afgang 12.45, i land Larvik 16.45. 1.390 NOK for voksen og lille bil. Mødetid senest 11.45."],
    ["Bompenge i Norge","Spørg BroBizz om Norge er dækket, eller registrer nummerpladen gratis hos Epass24. Se afsnittet om bompenge — det handler om nogle hundrede kroner, ikke om adgang."]
  ]},

  { gruppe:"Book undervejs — intet af det binder dig", ikon:"kalender", punkter:[
    ["Bodø → Moskenes","Book fra Norge et par dage før. Bliver den fuld: E6 til Bognes-færgen og ind i Lofoten nordfra i stedet."],
    ["Turku → Stockholm","Book 2-3 dage før fra vejen. Både dag- og natafgang. Kommer du ikke med, kører du rundt om Bottenvigen for 294 km."],
    ["Stena Göteborg → Frederikshavn","Book 1-2 dage før, gerne en eftermiddags- eller aftenafgang fredag. Den sejler mange gange dagligt, så den kan bookes fra telefonen samme formiddag."],
    ["Seng ved Nordkapp","Honningsvåg har begrænset kapacitet, så tjek et par dage før. Kan du ikke finde noget, sover du på platået — billetten gælder 24 timer."],
    ["Rorbu på Lofoten","Kun hvis du vil have en rigtig seng der. De gode går måneder i forvejen; ellers sover du i bilen ved Haukland eller Ramberg."]
  ]},

  { gruppe:"Bompenge og afgifter", ikon:"vej", punkter:[
    ["Du kommer altid igennem — det er nummerpladen der gælder","Du har ret: norske bomstationer er fri passage uden bomme, og de læser nummerpladen. Du kan altså aldrig blive stoppet eller komme til at snyde. Brikken afgør ikke <b>om</b> du bliver opkrævet, kun <b>hvor meget</b>. Ifølge autopass.no har udenlandske biler præcis to muligheder, og forskellen mellem dem er penge, ikke adgang."],
    ["Mulighed 1: aftale med brik — 20 % rabat","«You receive a toll tag that must be mounted on the inside of the vehicle's windscreen. You will receive discounted toll rates of 20 % on each transaction and other discounts.» Rabatten hænger på aftalen, og aftalen leveres med en fysisk brik."],
    ["Mulighed 2: Epass24 på nummerplade — ingen rabat","«You will have no discounts, but in cities with environmental toll system, you will be charged the correct toll rate based on your vehicle's environmental data.» Registreringen er gratis og fjerner opslagsgebyret. Det er minimumsløsningen, og den tager få minutter."],
    ["Gør du ingenting, betaler du et opslagsgebyr","Uden nogen form for registrering opkræver de et gebyr for at slå ejeren op i det danske køretøjsregister — autopass.no angiver 5,10 til 14,00 € afhængigt af land. Det kommer oveni fuld takst."],
    ["Om din BroBizz: jeg tog fejl, og du skal spørge dem","Jeg skrev tidligere at BroBizz sandsynligvis dækker Norge gennem EasyGo. <b>Det kunne jeg ikke få bekræftet.</b> AutoPASS' egen side om udenlandske biler nævner overhovedet ikke udenlandske brikker — kun de to muligheder ovenfor — og BroBizz' egen side omtaler kun Storebælt, Øresund og danske færger. Ring eller skriv til BroBizz og spørg direkte, om din aftale dækker norske bomringe og norske færger. Antag ikke at den gør."],
    ["Hvad det handler om i kroner","På en norsk strækning som din løber bompengene op i nogle hundrede kroner. De 20 % er derfor i størrelsesordenen hundrede kroner, og opslagsgebyret et par hundrede. Det er ikke mange penge — men Epass24-registreringen er gratis, så den er der ingen grund til at springe over."],
    ["Og batteriet: du har ret, det er sekundært","Da identifikationen sker på nummerpladen, strander du ikke af en død brik. Det eneste den kan koste dig er rabatten, hvis den er bundet til at brikken faktisk svarer. Det fremgår ikke af siden — men en tur over Storebælt inden afrejse afklarer det gratis."],
    ["Oslo bomring","Passeres på vej nordpå dag 1. Dækket af AutoPASS-aftalen."],
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
    ["Spørg altid — men de siger næsten altid ja","Det korte svar på om man må sætte mormor-laderen i på en campingplads eller i en hytte: <b>spørg ved indtjekning, og lad være med at gøre det uden at spørge.</b> Nordmændene er fuldstændig vant til elbiler — landet har verdens højeste elbilandel — og de allerfleste siger ja, ofte mod et tillæg på nogle få tikroner. Men det er præcis de gæster, der bare har sat stikket i, der har fået enkelte pladser til at forbyde det helt. Bed om lov, så får du det."],
    ["Skru ned til 10 A af hensyn til stikket","Campingpladsers stik er 16 A og deler ofte gruppe med naboerne. Trækker du 16 A i ti timer i træk, er det dér HFI'en springer — typisk midt om natten, og så for hele rækken. Sæt ampere ned i bilen; Tesla husker indstillingen per sted. 10 A i ti timer er stadig cirka 23 kWh, og det er rigeligt til at starte dagen fuld."],
    ["Regnestykket er stadig klart i din favør","Ti timer på 16 A giver op mod 35 kWh. Selv hvis pladsen tager 100-150 kr for strømmen, er det langt under, hvad de samme kWh koster på en lynlader. <b>Men den største gevinst er tid, ikke penge:</b> du starter dagen på 100 % uden at bruge en formiddag på at holde stille. På dag 3 og 10 er det en halv time, du får forærende."],
    ["Strøm er billigst i nord","Norge er delt i prisområder, og Nordnorge har historisk været markant billigere end syd. De fleste af dine norske nætter ligger nordpå, så det er også dér, en plads er mest tilbøjelig til at sige ja uden tillæg."],
    ["Motorvarmerstik er ikke selvbetjening","Finland og Sverige har 230 V-stik på næsten alle parkeringspladser til motorvarmere. De ligner en invitation, men strømmen er nogens. Samme regel: spørg, eller lad være."],
    ["Norge er tæt dækket","Superchargere hele vejen op ad E6. Det er ikke her problemet er."],
    ["Alta → Nordkapp → Rovaniemi","Turens tynde stykke. Planlæg Olderfjord, Honningsvåg, Lakselv, Karasjok, Inari, Ivalo og Sodankylä som faste stop, og lad før du behøver."],
    ["Kør med ABRP","Bilens egen planlægger er god i Norge, mindre god i finsk Lapland. A Better Routeplanner som backup, og hav et RFID-kort til de norske Recharge/Kople-ladere."],
    ["Kulde koster","Sidst i august kan det være 3-5 grader på vidden om natten. Regn med 10-15 % kortere rækkevidde end herhjemme."]
  ]},

  { gruppe:"Vejr og lys", ikon:"sol", punkter:[
    ["Ingen midnatssol","Den slutter ved Nordkapp 31. juli. Men nætterne er endnu ikke rigtigt mørke igen: solen når kun 8-10 grader under horisonten på de norske nætter, og det er nautisk tusmørke, ikke mørke."],
    ["Nordlys","<b>Længere nordpå gør det lysere, ikke mørkere.</b> Laveste solhøjde er beregnet for hver nat: Bodø -10,2°, Lofoten -9,9°, Tromsø -8,8°, Alta -8,8° og <b>Nordkapp kun -8,0°</b> — turens dårligste nordlysnat. Kun Rovaniemi dag 9 når rigtigt mørke (-13,0°, nautisk mørkt 23.15-01.25). Nordpå står nordlyset til gengæld lige over hovedet og er kraftigt nok til at skære gennem tusmørket, så chancen er reel fra dag 3 — den kræver bare mere aktivitet end i september. Kig mellem 23 og 03, hvor solen er lavest."],
    ["Tåge på Nordkapp","Platået ligger 307 m over havet og er ofte i skyen selv i pænt vejr. Der er webcam på nordkapp.no — tjek det før du kører de sidste 30 km."],
    ["Fjeldveje","Kvænangsfjellet dag 7 og Dovrefjell dag 2 kan lukke i hårdt vejr, også i august. Tjek vegvesen.no samme morgen."],
    ["Reinebringen","Stien lukkes i regn og blæst. Har du kun én dag på Lofoten og vejret er godt, så tag den om formiddagen."]
  ]}
];
