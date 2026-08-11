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
  { id:"colorline_ud", navn:"Hirtshals → Larvik", selskab:"Color Line", min:225,
    dag:1, fra:[57.5880,9.9600], til:[59.0530,10.0290], book:"nu", pris:"~1.000 kr",
    note:"Den eneste færge der skal bookes hjemmefra. 300 kr billigere end Göteborg, i land 16.45, og den sætter dig af 163 km tættere på Trondheim.",
    link:"https://www.colorline.dk/hirtshals-larvik" },

  { id:"moskenes", navn:"Bodø → Moskenes", selskab:"Torghatten Nord", min:195,
    dag:4, fra:[67.2804,14.3805], til:[67.9330,12.9950], book:"fra Norge",
    note:"Bilfærgen til Lofoten. Book den et par dage før, når du er i Norge og kender dit tempo. Bliver den fuld: kør E6 til Bognes og ind i Lofoten nordfra.",
    link:"https://www.torghatten-nord.no" },

  { id:"turku", navn:"Turku → Stockholm", selskab:"Viking Line / Tallink Silja", min:660,
    dag:10, fra:[60.4350,22.2280], til:[59.3480,18.1060], book:"undervejs",
    note:"Både dag- og natafgang. Book den ikke hjemmefra — tag den 2-3 dage før fra vejen. Kan du ikke komme med, kører du rundt om Bottenvigen for 294 km.",
    link:"https://www.vikingline.fi" },

  { id:"stena_hjem", navn:"Göteborg → Frederikshavn", selskab:"Stena Line", min:195,
    dag:12, fra:[57.6975,11.9285], til:[57.4370,10.5443], book:"nu", pris:"~1.300 kr",
    note:"Hjemturen. Dyrere end Color Line, men fra Stockholm er Göteborg 173 km og næsten tre timer tættere på end Larvik — det æder prisforskellen med renter.",
    link:"https://www.stenaline.dk/ruter/frederikshavn-goteborg" }
];

/* Dag for dag. km/t = kørsel den dag (OSRM, uden pauser). */
window.DAYS = [
  { n:1, dato:"2026-08-17", ugedag:"Mandag", titel:"Aalborg → Lillehammer",
    km:385, t:4.9, faerge:"Color Line 3¾ t", sea:true,
    geom:["d1_aalborg_hirtshals","d1_larvik_lillehammer"],
    nav:{ fra:"Aalborg", til:"Lillehammer, Norge", via:["Hirtshals","Larvik"] },
    tekst:"Kun 68 km til Hirtshals, og så sætter færgen dig af midt i Norge kl. 16.45. Op ad E18 forbi Oslo og videre ad E6 langs Mjøsa. Fremme ved 21-tiden — første nat i bilen.",
    sol:"Sol ned 21.03 ved Mjøsa",
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
      ["Bakklandet og Gamle Bybro","de skæve trævillaer langs elven. Bedst til fods sidst på dagen"]
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
    efter:"Book Color Line nu · book Bodø fra Norge · tag Turku som den kommer",
    tekst:"Din egen plan er den rigtige, og den er bedre end min oprindelige. Hirtshals → Larvik skal bookes nu: det er en fast startdato, og den er billigst i forkøb. Bodø → Moskenes kan du roligt booke undervejs — et par dages varsel er rigeligt selv i august, og du ved først, når du er i Norge, hvornår du reelt står der. Turku → Stockholm behøver du slet ikke at binde dig til.",
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
  { kat:"vandring", navn:"Snøhetta-pavillonen", lat:62.2239, lon:9.4902, dag:2, stj:3,
    t:"1,5 km hver vej · let · moskusokser", tid:"1 time",
    d:"Arkitekttegnet udsigtspavillon på Dovrefjell med glasvæg mod Snøhetta. Kort, flad sti fra parkeringen ved Hjerkinn. Der går moskusokser på vidden — hold god afstand, de er hurtigere end de ser ud." },
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

  /* ---- udsigt og seværdigheder ---- */
  { kat:"udsigt", navn:"Dovrefjell", lat:62.2231, lon:9.5500, dag:2, stj:4,
    t:"Højfjeld, moskusokser, Norges tag" },
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
        hvorfor:"Fra Stockholm er der 477 km. Kører du kl. 7, er du fremme ved 13-tiden." }
    ],
    luft: "Der er præcis <b>én dags luft</b> i hele planen, og det er hviledagen på Lofoten. Bruger du den på at komme videre, er du tilbage på skemaet. Bruger du den på at ligge i solen, har du ingen tilbage. Begge dele er fine — du skal bare vide hvilken af dem du gør."
  },

  regler: [
    ["Book altid mens du har dækning","Det er ikke sengen der er problemet, det er signalet. Der er huller på E69, Finnmarksvidda og strækningen Karasjok-Inari. Find stedet ved 15-tiden mens du holder et sted med net — ikke kl. 21 på vidden."],
    ["Bodø-færgen er den eneste der skal planlægges","Den sejler få gange i døgnet og fyldes i august. Book den 2-3 dage før, når du kan se dit eget tempo. Bliver den fuld, koster det ikke turen: kør E6 til Bognes-færgen, som sejler ofte og ikke skal bookes, og kom ind i Lofoten nordfra i stedet."],
    ["Vælg steder med nøgleboks","Små gæstgiverier i Norge lukker receptionen kl. 18-20. Kommer du kl. 22, står du udenfor. Filtrér efter selvbetjent indtjekning, eller sov i bilen den nat."],
    ["Book hjemturen sent på dagen","Stena-billetten fredag bør være en eftermiddags- eller aftenafgang, ikke morgen. Det er dét, der gør din ene dags luft brugbar helt til sidst — ellers forsvinder den i en færge du ikke kan nå."],
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
    [3, "Planlæg efter det", "Læg ruten så du kommer forbi, men brænd ikke tid på det. 22 steder."],
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
    ["Sov hvor du kan lade, så er Camp Mode gratis","Det er her CEE-adapteren tjener sig ind. Står du på en campingplads med strøm, kan du køre Camp Mode hele natten uden at røre køreforbruget. Det gør de betalte pladser på Lofoten til en bedre handel, end prisen antyder."],
    ["Glastaget er hele problemet","Model 3 har panoramaglas over hele kabinen, og det er langt den største lysflade — større end alle ruderne tilsammen. Mørklægger du sideruderne men ikke taget, har du intet opnået. Det er også hovedargumentet for en stofløsning frem for plader: et stykke stof, der hænger under taget, dækker glasset af sig selv."],
    ["Stof slår paneler til netop denne brug","<b>Ét stykke mørklægningsstof monteret i loftet, ned over forsæderne og langs siderne, er den rigtige løsning når man skal gøre det seks nætter i træk.</b> Det tager et minut at hænge op mod et kvarter med ti plader, det fylder ingenting sammenrullet, det koster nogle få hundrede kroner for stoffet, og det giver fuldstændig privatliv. Det behøver ikke slutte tæt — det skal bare være uigennemsigtigt. Paneler har kun én reel fordel: de isolerer, og det sænker Camp Modes forbrug."],
    ["Sådan hænges det op uden at bore","Den nemme metode er at klemme stoffets øverste kant fast i dørkarmene og lukke dørene om det. Suge-kroge virker desuden usædvanlig godt i netop denne bil, fordi taget <b>er</b> glas — noget der ikke duer i en bil med stålkarosseri. Magneter fungerer kun i dørkarme og stolper, ikke i taget. Undgå at fastgøre noget i selve taghimlen."],
    ["Vigtigt: gardinairbaggen sidder i tagkanten","Model 3 har sidegardinairbags, der folder ud fra tagkanten ned langs ruderne. Alt hvad du hænger op langs den kant, sidder præcis i vejen for dem. Det er uproblematisk når bilen holder stille — men <b>det skal tages ned, før du kører videre</b>. Gør det til en fast rutine sammen med at rulle madrassen sammen."],
    ["Pas på fælden: solskærm er ikke mørklægning","Køber du stof, så tag <b>mørklægningsstof</b> med bagsidebelægning — almindeligt stof lukker masser af lys igennem. Køber du plader, så læs efter <b>blackout</b> eller <b>opaque</b>: rigtig mange Tesla-sæt er mesh, der holder varme ude, men ikke lys."],
    ["Tænk på luften og bagruden","To ting stofløsningen let overser. Camp Mode blæser varmen ud gennem instrumentbrættet foran — hænger du et tæt gardin bag forsæderne, kan varmen blive i den forkerte ende. Lad der være en åbning forneden. Og husk bagruden: ligger du med hovedet mod bagagerummet, er den lige bag dig."],
    ["Mørklægning er også privatliv","På en rasteplads er det lige så meget værd at folk ikke kan se ind, som at du ikke kan se ud. Det er netop dét, stofløsningen er god til — også selvom den ikke slutter tæt."],
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
      { t:"Color Line-billetten til Larvik", kritisk:true, d:"Den eneste færge du booker hjemmefra. Gem den offline — ikke kun i en mail du skal have net for at åbne." },
      { t:"AutoPASS-aftale oprettet", kritisk:true, d:"Skal gøres FØR afrejse på autopass.no, ellers kommer bompengene med posten plus gebyr. Giver også rabat på de norske færger." },
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
      { t:"Mørklægningsstof til kabinen", kritisk:true, d:"Ét stykke, monteret i loftet og ned over forsæderne og siderne. Dækker glastaget af sig selv, tager et minut at hænge op og fylder intet. Skal være mørklægningsstof med bagsidebelægning — almindeligt stof lukker lys igennem." },
      { t:"Suge-kroge og et par magneter", d:"Suge-kroge virker på glastaget, magneter i dørkarmene. Prøv ophængningen af hjemme, ikke på en parkeringsplads i Bodø." },
      { t:"Foldbar forrudeskærm", d:"Billig og universel. Dækker det stykke lys, der ellers kommer ind forfra." },
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
      { t:"Nordlysvarsel installeret", d:"Følg KP-indeks på yr.no eller Norsk Lysvarsel. Bedste chancer: Lofoten dag 4-5, Nordkapp dag 8, Lapland dag 9." }
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

  bund: "Det du helst ikke vil opdage klokken 23 på en rasteplads ved Saltstraumen: mørklægning, myggenet, sovepose og hue. Og det du helst ikke vil opdage på grænsen: at AutoPASS ikke er oprettet."
};

/* Praktisk: hvad der skal bookes, hvad det koster, hvad man skal huske. */
window.PRAKTISK = [
  { gruppe:"Book hjemmefra", ikon:"kalender", punkter:[
    ["Color Line Hirtshals → Larvik","Det eneste der skal bookes nu. Mandag 17., så du er i land 16.45. ~1.000 kr — 300 kr under Stena til Göteborg."],
    ["Stena Göteborg → Frederikshavn","Hjemturen fredag 28. eller torsdag aften. Dyrere (~1.300 kr), men fra Stockholm er Göteborg langt den korteste vej hjem. Bemærk at du ikke får returrabat, når udturen går med et andet rederi — tjek om det ændrer regnestykket."],
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
