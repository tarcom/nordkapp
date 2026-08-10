/* Nordkapp-turen — rendering af indhold + kort.
   Google Maps er primært kort; nøglen er låst til aogj.com, så alle andre
   steder (lokal test) falder siden automatisk tilbage til Leaflet/OSM. */

(function () {
  "use strict";

  var DK = function (n) { return n.toLocaleString("da-DK"); };
  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };
  var komma = function (n) { return String(n).replace(".", ","); };

  /* ---------- nøgletal ---------- */
  var T = window.TRIP;
  document.getElementById("stats").innerHTML = [
    ["Kørsel", DK(T.km), " km"],
    ["Bag rattet", komma(T.hours), " timer"],
    ["Om bord", "~" + T.ferryHours, " timer"],
    ["Nordligst", "71,17", "°N"]
  ].map(function (s) {
    return '<div class="stat"><dt>' + s[0] + "</dt><dd>" + s[1] +
           "<span>" + s[2] + "</span></dd></div>";
  }).join("");

  var koeredage = window.DAYS.filter(function (d) { return d.km > 5; }).length;
  document.getElementById("foot-sum").textContent =
    T.days + " dage · " + DK(T.km) + " km · " + koeredage +
    " køredage · 4 færger · længste etape 875 km (dag 10)";

  /* ---------- menu: marker det afsnit man læser ---------- */
  (function () {
    var baand = document.getElementById("menu-links");
    if (!baand) return;
    var led = [].slice.call(baand.querySelectorAll("a"));
    var afsnit = led.map(function (a) {
      return document.getElementById(a.getAttribute("href").slice(1));
    });
    var aktiv = null;

    function saet(i) {
      if (i === aktiv || i < 0) return;
      aktiv = i;
      led.forEach(function (a, j) { a.classList.toggle("her", j === i); });
      // Hold det aktive punkt synligt i den vandrette liste på mobil,
      // uden at flytte selve siden (derfor ikke scrollIntoView).
      var b = baand.getBoundingClientRect(), a = led[i].getBoundingClientRect();
      if (a.left < b.left + 4) { baand.scrollLeft += a.left - b.left - 12; }
      else if (a.right > b.right - 4) { baand.scrollLeft += a.right - b.right + 12; }
    }

    if (!("IntersectionObserver" in window)) return;
    var synlige = {};
    var obs = new IntersectionObserver(function (poster) {
      poster.forEach(function (p) {
        synlige[p.target.id] = p.isIntersecting;
      });
      // Første afsnit i dokumentrækkefølge som stadig er i læsefeltet.
      for (var i = 0; i < afsnit.length; i++) {
        if (afsnit[i] && synlige[afsnit[i].id]) { saet(i); return; }
      }
    }, { rootMargin: "-80px 0px -65% 0px", threshold: 0 });

    afsnit.forEach(function (s) { if (s) obs.observe(s); });
  })();

  /* ---------- beslutninger ---------- */
  document.getElementById("beslut").innerHTML = window.BESLUTNINGER.map(function (b) {
    var tag = { aendret: "Ændret", advarsel: "Vær opmærksom", beholdt: "Beholdt" }[b.status];
    var swap = "";
    if (b.foer || b.efter) {
      swap = '<div class="b-swap">' +
        (b.foer ? '<div class="foer">' + esc(b.foer) + "</div>" : "") +
        (b.efter ? '<div class="efter">' + esc(b.efter) + "</div>" : "") + "</div>";
    }
    return '<article class="b-card ' + b.status + '">' +
      '<p class="b-tag">' + tag + "</p>" +
      "<h3>" + esc(b.titel) + "</h3>" + swap +
      "<p>" + esc(b.tekst) + "</p>" +
      (b.valg ? '<p class="b-valg"><b>Alternativet</b>' + esc(b.valg) + "</p>" : "") +
      "</article>";
  }).join("");

  var TAL = ["nul", "ét", "to", "tre", "fire", "fem", "seks", "syv", "otte", "ni", "ti"];
  document.getElementById("beslut-note").textContent =
    (TAL[window.BESLUTNINGER.length] || window.BESLUTNINGER.length) + " valg og hvorfor";

  /* ---------- dag for dag ---------- */
  function navUrl(nav) {
    if (!nav) return null;
    var u = "https://www.google.com/maps/dir/?api=1&travelmode=driving" +
            "&origin=" + encodeURIComponent(nav.fra) +
            "&destination=" + encodeURIComponent(nav.til);
    if (nav.via && nav.via.length) {
      u += "&waypoints=" + nav.via.map(encodeURIComponent).join("%7C");
    }
    return u;
  }

  document.getElementById("timeline").innerHTML = window.DAYS.map(function (d) {
    var cls = [d.peak ? "peak" : "", d.sea ? "sea" : "", d.rest ? "rest" : ""]
              .filter(Boolean).join(" ");

    var drive = d.rest ? "hviledag"
      : d.km < 5 ? (d.faerge || "kun færge")
      : DK(d.km) + " km · " + komma(d.t) + " t";
    if (d.faerge && d.km >= 5) drive += " + " + d.faerge;

    var se = (d.se || []).map(function (a) {
      return '<li class="' + (a[2] ? "star" : "") + '"><b>' + esc(a[0]) + "</b> — " + esc(a[1]) + "</li>";
    }).join("");

    var dato = new Date(d.dato + "T12:00:00");
    var datoTxt = dato.getDate() + ". aug";

    return '<article class="day ' + cls + '">' +
      '<span class="day-dot"></span>' +
      '<span class="day-date"><b>Dag ' + d.n + "</b>" + d.ugedag.slice(0, 3).toLowerCase() + " " + datoTxt + "</span>" +
      '<div class="day-hd"><h3>' + esc(d.titel) + "</h3>" +
        '<span class="day-drive">' + drive + "</span></div>" +
      "<p>" + esc(d.tekst) + "</p>" +
      (d.advarsel ? '<p class="day-warn">' + esc(d.advarsel) + "</p>" : "") +
      (d.sol ? '<p class="day-sun">☀ ' + esc(d.sol) + "</p>" : "") +
      '<ul class="se">' + se + "</ul>" +
      '<div class="day-links">' +
        (navUrl(d.nav) ? '<a class="navlink" href="' + navUrl(d.nav) + '" target="_blank" rel="noopener">Åbn ruten i Google Maps</a>' : "") +
      "</div></article>";
  }).join("");

  /* ---------- færger ---------- */
  var BROEK = { 0: "", 15: "¼", 30: "½", 45: "¾" };
  function varighed(min) {
    var t = Math.floor(min / 60), m = min % 60, br = BROEK[m];
    return br === undefined ? t + " t " + m + " min"
                            : t + br + " time" + (t > 1 || br ? "r" : "");
  }
  document.getElementById("ferries").innerHTML = window.FERRIES.map(function (f) {
    var maerke = { "nu": "Book hjemmefra", "fra Norge": "Book fra Norge",
                   "undervejs": "Book undervejs" }[f.book];
    return '<article class="card' + (f.book === "nu" ? " nu" : "") + '">' +
      (maerke ? '<span class="bookmaerke' + (f.book === "nu" ? " nu" : "") + '">' + maerke + "</span>" : "") +
      "<h3>" + esc(f.navn) + "</h3>" +
      '<p class="meta">Dag ' + f.dag + " · " + esc(f.selskab) + " · " + varighed(f.min) + "</p>" +
      "<p>" + esc(f.note) + "</p>" +
      '<p><a class="navlink" href="' + f.link + '" target="_blank" rel="noopener">Book hos ' +
      esc(f.selskab.split(" /")[0]) + "</a></p></article>";
  }).join("");

  /* ---------- alternativer ---------- */
  var A = window.ALTERNATIVER;

  function valgblok(b) {
    var maxKm = Math.max.apply(null, b.rows.map(function (r) { return r.km; }));
    var rows = b.rows.map(function (r) {
      return '<div class="vrow' + (r.valgt ? " valgt" : "") + '">' +
        '<div class="vnavn">' + esc(r.navn) +
          (r.valgt ? '<span class="vmaerke">valgt</span>' : "") + "</div>" +
        '<div class="vbar"><span style="width:' + (r.km / maxKm * 100).toFixed(1) + '%"></span></div>' +
        '<div class="vtal">' + DK(r.km) + " km<br><em>" + komma(r.t) + " t</em></div>" +
        '<p class="vnote">' + esc(r.note) + "</p></div>";
    }).join("");
    return '<article class="altblok"><h3>' + esc(b.titel) + "</h3>" +
      '<p class="lead">' + esc(b.intro) + "</p>" +
      '<div class="vtabel">' + rows + "</div>" +
      '<p class="vkonk">' + esc(b.konklusion) + "</p></article>";
  }

  function jaevnblok(j) {
    var maxKm = Math.max.apply(null, j.dage.map(function (d) { return Math.max(d.alt, d.nu); }));
    var rows = j.dage.map(function (d) {
      var bedre = d.alt < d.nu, vaerre = d.alt > d.nu;
      return '<div class="jrow">' +
        '<div class="jdag">' + d.n + "</div>" +
        '<div class="jnavn">' + esc(d.titel) + "</div>" +
        '<div class="jbars">' +
          '<span class="jb nu" style="width:' + (d.nu / maxKm * 100).toFixed(1) + '%"></span>' +
          '<span class="jb alt' + (bedre ? " ned" : vaerre ? " op" : "") +
            '" style="width:' + (d.alt / maxKm * 100).toFixed(1) + '%"></span>' +
        "</div>" +
        '<div class="jtal">' + DK(d.nu) + " → <b>" + DK(d.alt) + "</b></div>" +
        "</div>";
    }).join("");
    return '<article class="altblok"><h3>' + esc(j.titel) + "</h3>" +
      '<p class="lead">' + esc(j.intro) + "</p>" +
      '<div class="jlegend"><span class="k nu"></span>nuværende plan' +
        '<span class="k alt"></span>jævn variant · km per dag</div>' +
      '<div class="jtabel">' + rows + "</div>" +
      '<p class="vkonk">' + esc(j.konklusion) + "</p>" +
      '<p class="jpris"><b>Hvad det koster</b>' + esc(j.pris) + "</p></article>";
  }

  document.getElementById("alt-indhold").innerHTML =
    valgblok(A.retur) + valgblok(A.norge) + jaevnblok(A.jaevn) +
    '<p class="altbund">' + esc(A.bund) + "</p>";

  /* ---------- karakterer og rangering ---------- */
  function stjerner(n, klasse) {
    var s = "";
    for (var i = 1; i <= 5; i++) s += '<span class="' + (i <= n ? "on" : "") + '"></span>';
    return '<span class="stj ' + (klasse || "") + '" title="' + n + ' af 5">' + s + "</span>";
  }

  var SK = window.SKALA;
  var KATNAVN = { vandring: "Vandring", udsigt: "Seværdighed", sove: "Sovested", omvej: "Omvej" };

  /* Alt med karakter, samlet og sorteret: højeste først, så efter dag. */
  var rangliste = window.POI.map(function (p) {
    return { navn: p.navn, kat: p.kat, stj: p.stj, dag: p.dag, t: p.t };
  }).sort(function (a, b) { return b.stj - a.stj || a.dag - b.dag; });

  document.getElementById("skala").innerHTML =
    '<p class="lead">' + esc(SK.intro) + "</p>" +
    '<div class="skala">' + SK.trin.map(function (t) {
      return '<div class="strin">' + stjerner(t[0]) +
        "<div><b>" + esc(t[1]) + "</b><span>" + esc(t[2]) + "</span></div></div>";
    }).join("") + "</div>" +
    '<p class="sforbehold">' + SK.forbehold + "</p>" +
    '<div class="rang">' + rangliste.map(function (r, i) {
      var nyGruppe = i === 0 || rangliste[i - 1].stj !== r.stj;
      return (nyGruppe ? '<h3 class="rhd">' + stjerner(r.stj) + "</h3>" : "") +
        '<div class="rrow"><span class="rkat ' + r.kat + '">' + KATNAVN[r.kat] + "</span>" +
        '<span class="rnavn">' + esc(r.navn) + "</span>" +
        '<span class="rdag">dag ' + r.dag + "</span>" +
        '<span class="rt">' + esc(r.t) + "</span></div>";
    }).join("") + "</div>";

  /* ---------- omveje ---------- */
  var O = window.OMVEJE;
  document.getElementById("omveje-liste").innerHTML =
    '<p class="lead">' + esc(O.intro) + "</p>" +
    O.liste.map(function (o) {
      var pris = o.km ? "+" + DK(o.km) + " km · +" + komma(o.t) + " t"
                      : "+" + komma(o.t) + " t til fods";
      return '<article class="omvej"><div class="o-hd">' +
        "<h3>" + esc(o.navn) + "</h3>" +
        '<span class="o-pris' + (o.maalt ? "" : " skoen") + '">' + pris +
          (o.maalt ? "" : " <em>skøn</em>") + "</span></div>" +
        '<p class="o-hvor">' + esc(o.hvor) + stjerner(o.stj, "lille") + "</p>" +
        "<p>" + esc(o.d) + "</p>" +
        '<p class="o-koster"><b>Hvad det koster</b>' + esc(o.pris) + "</p>" +
        (o.note ? '<p class="o-note">' + esc(o.note) + "</p>" : "") +
        "</article>";
    }).join("") +
    '<p class="altbund">' + esc(O.bund) + "</p>" +
    '<article class="finland"><h3>' + esc(O.finland.titel) + "</h3>" +
      O.finland.tekst.map(function (p) { return "<p>" + p + "</p>"; }).join("") +
      '<p class="ffolk">' + O.finland.folk + "</p></article>";

  /* ---------- sove i bilen ---------- */
  var S = window.SOVE;
  document.getElementById("sove-indhold").innerHTML =
    '<p class="lead">' + esc(S.intro) + "</p>" +
    '<div class="sregler">' + S.regler.map(function (r) {
      return '<div class="sregel"><h3>' + esc(r.land) + "</h3><p>" + r.d + "</p></div>";
    }).join("") + "</div>" +
    '<div class="pgroup spraktisk"><h3>Praktisk</h3><ul>' +
      S.praktisk.map(function (p) {
        return "<li><b>" + esc(p[0]) + "</b>" + esc(p[1]) + "</li>";
      }).join("") + "</ul></div>" +
    '<p class="sadvarsel">' + S.advarsel + "</p>";

  /* ---------- pakkeliste ---------- */
  var P = window.PAKKELISTE;
  var PAK_KEY = "nordkapp.pakket.v1";

  function laesPakket() {
    try { return JSON.parse(localStorage.getItem(PAK_KEY)) || {}; }
    catch (e) { return {}; }
  }
  var pakket = laesPakket();

  /* Stabil nøgle ud fra navnet, så afkrydsning overlever at listen omrokeres. */
  function noegle(s) {
    return s.toLowerCase()
      .replace(/[æå]/g, "a").replace(/ø/g, "o")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
  }

  var pakLister = P.grupper.filter(function (g) { return !g.ikkepak; });
  var antalIalt = pakLister.reduce(function (a, g) { return a + g.ting.length; }, 0);

  function tegnPakke() {
    var talt = 0;
    pakLister.forEach(function (g) {
      g.ting.forEach(function (t) { if (pakket[noegle(t.t)]) talt++; });
    });

    document.getElementById("pakke-liste").innerHTML =
      '<p class="lead">' + esc(P.intro) + "</p>" +
      '<div class="pakbar"><div class="pakbar-tal"><b>' + talt + "</b> af " + antalIalt +
        ' pakket</div><div class="pakbar-spor"><span style="width:' +
        (antalIalt ? (talt / antalIalt * 100).toFixed(1) : 0) + '%"></span></div>' +
        (talt ? '<button type="button" id="pak-nulstil">Nulstil</button>' : "") + "</div>" +

      P.grupper.map(function (g) {
        var n = g.ting.filter(function (t) { return pakket[noegle(t.t)]; }).length;
        return '<section class="pakgruppe' + (g.ikkepak ? " ikkepak" : "") + '">' +
          "<h3>" + esc(g.navn) +
            (g.ikkepak ? "" : '<span class="pakantal">' + n + "/" + g.ting.length + "</span>") +
          "</h3><ul>" +
          g.ting.map(function (t) {
            var k = noegle(t.t), af = !!pakket[k];
            if (g.ikkepak) {
              return '<li class="paklinje ikke"><b>' + esc(t.t) + "</b>" +
                (t.d ? "<span>" + esc(t.d) + "</span>" : "") + "</li>";
            }
            return '<li class="paklinje' + (af ? " af" : "") + '">' +
              '<label><input type="checkbox" data-k="' + k + '"' + (af ? " checked" : "") + ">" +
              '<span class="pakboks"></span>' +
              '<span class="paktekst"><b>' + esc(t.t) +
                (t.kritisk ? '<em class="krit">vigtig</em>' : "") + "</b>" +
                (t.d ? "<span>" + esc(t.d) + "</span>" : "") +
              "</span></label></li>";
          }).join("") + "</ul></section>";
      }).join("") +
      '<p class="altbund">' + esc(P.bund) + "</p>";
  }

  tegnPakke();

  document.getElementById("pakke-liste").addEventListener("change", function (e) {
    var b = e.target;
    if (!b || b.type !== "checkbox") return;
    var k = b.getAttribute("data-k");
    if (b.checked) { pakket[k] = 1; } else { delete pakket[k]; }
    try { localStorage.setItem(PAK_KEY, JSON.stringify(pakket)); } catch (err) { /* privat tilstand */ }
    tegnPakke();
  });

  document.getElementById("pakke-liste").addEventListener("click", function (e) {
    if (e.target && e.target.id === "pak-nulstil") {
      pakket = {};
      try { localStorage.removeItem(PAK_KEY); } catch (err) { /* privat tilstand */ }
      tegnPakke();
    }
  });

  /* ---------- praktisk ---------- */
  document.getElementById("praktisk-liste").innerHTML = window.PRAKTISK.map(function (g) {
    return '<section class="pgroup"><h3>' + esc(g.gruppe) + "</h3><ul>" +
      g.punkter.map(function (p) {
        return "<li><b>" + esc(p[0]) + "</b>" + p[1] + "</li>";
      }).join("") + "</ul></section>";
  }).join("");

  /* ======================= KORT ======================= */
  var AURORA = "#5FD9A6", SUN = "#E8A33D", ICE = "#E4EFF3",
      NIGHT = "#08161F", VIOLET = "#B69CE8", ROSE = "#F0705B";

  var KAT = {
    stop:     { navn: "Overnatning",   farve: ICE,    r: 6.5 },
    sove:     { navn: "Sov i bilen",   farve: VIOLET, r: 6 },
    vandring: { navn: "Vandreture",    farve: AURORA, r: 6 },
    udsigt:   { navn: "Seværdigheder", farve: SUN,    r: 5 },
    omvej:    { navn: "Omveje",        farve: ROSE,   r: 6 }
  };

  /* Ét segment = ét stykke vejgeometri, knyttet til sin dag. */
  var SEGMENTER = [];
  window.DAYS.forEach(function (d) {
    (d.geom || []).forEach(function (key) {
      if (window.GEOM[key]) {
        SEGMENTER.push({ key: key, dag: d.n, titel: d.titel, km: d.km, t: d.t,
                         alene: d.geom.length === 1 });
      }
    });
  });

  var DARK = [
    { elementType: "geometry", stylers: [{ color: "#0d2530" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#08161f" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#8fb3c0" }] },
    { featureType: "administrative", elementType: "geometry", stylers: [{ visibility: "off" }] },
    { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ visibility: "on" }, { color: "#2c4e5e" }] },
    { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#bdd6df" }] },
    { featureType: "poi", stylers: [{ visibility: "off" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#173a49" }] },
    { featureType: "road", elementType: "labels", stylers: [{ visibility: "off" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#1e4757" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#061019" }] },
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3f6b7d" }] },
    { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#0f2e3d" }] }
  ];

  var mapDone = false;
  var shell = document.querySelector(".map-shell");
  var tip = document.getElementById("maptip");

  /* Musens position følges på dokumentniveau. Google sender ikke altid et
     domEvent med sine hændelser, og en manglende domEvent fik tidligere hele
     hover-handleren til at fejle lydløst. */
  var mus = { x: 0, y: 0 };
  document.addEventListener("mousemove", function (e) {
    var box = shell.getBoundingClientRect();
    mus.x = e.clientX - box.left;
    mus.y = e.clientY - box.top;
  }, { passive: true });

  function visTip(html) {
    tip.innerHTML = html;
    tip.classList.add("vis");
    var box = shell.getBoundingClientRect();
    var left = Math.min(Math.max(mus.x + 16, 8), box.width - tip.offsetWidth - 8);
    var top = mus.y - tip.offsetHeight - 14;
    if (top < 8) top = mus.y + 22;
    tip.style.left = Math.max(left, 8) + "px";
    tip.style.top = top + "px";
  }
  function skjulTip() { tip.classList.remove("vis"); }

  /* Directions-svar caches, så kun første besøg koster API-kald. */
  var CACHE_KEY = "nordkapp.ruter.v1";
  function laesCache() {
    try { return JSON.parse(localStorage.getItem(CACHE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function skrivCache(c) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(c)); }
    catch (e) { /* privat tilstand eller fuldt lager - ikke kritisk */ }
  }

  window.initMap = function () {
    if (mapDone) return;
    mapDone = true;

    var map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 65, lng: 17 }, zoom: 4,
      styles: DARK, mapTypeControl: true, streetViewControl: false,
      fullscreenControl: true, zoomControl: true,
      // cooperative: Ctrl+hjul zoomer på PC, to fingre på mobil.
      gestureHandling: "cooperative",
      mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU }
    });

    var bounds = new google.maps.LatLngBounds();
    var linjer = {};
    var info = new google.maps.InfoWindow();

    function aabnInfo(html, pos, anker) {
      info.setContent('<div class="iw">' + html + "</div>");
      if (anker) { info.open(map, anker); }
      else { info.setPosition(pos); info.open(map); }
    }

    function tegnLinje(seg, path, gkm, gt) {
      path.forEach(function (p) { bounds.extend(p); });

      var synlig = new google.maps.Polyline({
        path: path, map: map, strokeColor: AURORA, strokeOpacity: 0.9,
        strokeWeight: 3, zIndex: 2
      });
      // Næsten usynlig, tyk linje ovenpå gør ruten nem at ramme.
      // Bemærk 0.001 og ikke 0: en helt gennemsigtig linje bliver slet ikke
      // ramt af musen i Google Maps.
      var ramme = new google.maps.Polyline({
        path: path, map: map, strokeOpacity: 0.001, strokeWeight: 16,
        zIndex: 3, clickable: true
      });
      linjer[seg.key] = synlig;

      var txt = "<b>Dag " + seg.dag + " · " + esc(seg.titel) + "</b>" +
        '<span class="tl">' + DK(seg.km) + " km · " + komma(seg.t) + " t planlagt</span>" +
        (seg.alene && gkm ? '<span class="tl g">Google: ' + DK(gkm) + " km · " +
                            komma(gt) + " t</span>" : "");

      ramme.addListener("mouseover", function () {
        synlig.setOptions({ strokeWeight: 6, strokeColor: ICE });
        visTip(txt);
      });
      ramme.addListener("mousemove", function () { visTip(txt); });
      ramme.addListener("mouseout", function () {
        synlig.setOptions({ strokeWeight: 3, strokeColor: AURORA });
        skjulTip();
      });
      ramme.addListener("click", function (e) {
        skjulTip();
        aabnInfo(txt, e.latLng);
      });
    }

    /* Tegn straks fra forudberegnet geometri, så kortet aldrig står tomt.
       Directions overskriver linjerne, efterhånden som svarene kommer. */
    SEGMENTER.forEach(function (seg) {
      tegnLinje(seg, window.GEOM[seg.key].map(function (p) {
        return { lat: p[0], lng: p[1] };
      }));
    });

    hentRuter(tegnLinje, linjer);

    /* ---- færger ---- */
    window.FERRIES.forEach(function (f) {
      var path = [{ lat: f.fra[0], lng: f.fra[1] }, { lat: f.til[0], lng: f.til[1] }];
      path.forEach(function (p) { bounds.extend(p); });
      new google.maps.Polyline({
        // Selve stregerne kommer fra icons, derfor opacity 0 på linjen.
        // clickable:false så den ikke stjæler hændelser fra ramme-linjen.
        path: path, map: map, geodesic: true, strokeOpacity: 0, zIndex: 1,
        clickable: false,
        icons: [{ icon: { path: "M 0,-1 0,1", strokeOpacity: 0.85, strokeColor: SUN,
                          strokeWeight: 3, scale: 3 }, offset: "0", repeat: "14px" }]
      });
      var ramme = new google.maps.Polyline({
        path: path, map: map, geodesic: true, strokeOpacity: 0.001,
        strokeWeight: 16, zIndex: 3, clickable: true
      });
      var b = { "nu": "Book hjemmefra", "fra Norge": "Book fra Norge",
                "undervejs": "Book undervejs" }[f.book];
      var txt = "<b>⛴ " + esc(f.navn) + "</b>" +
        '<span class="tl">Dag ' + f.dag + " · " + esc(f.selskab) + " · " + varighed(f.min) + "</span>" +
        (b ? '<span class="tl g">' + b + "</span>" : "");
      ramme.addListener("mouseover", function () { visTip(txt); });
      ramme.addListener("mousemove", function () { visTip(txt); });
      ramme.addListener("mouseout", skjulTip);
      ramme.addListener("click", function (e) { skjulTip(); aabnInfo(txt, e.latLng); });
    });

    /* ---- markører ---- */
    var grupper = {};
    Object.keys(KAT).forEach(function (k) { grupper[k] = []; });

    function tilfoej(kat, lat, lon, txt, z, stor, farve, klik) {
      var k = KAT[kat];
      var m = new google.maps.Marker({
        position: { lat: lat, lng: lon }, map: map, zIndex: z || 5,
        clickable: true,
        // optimized:false giver hver markør sit eget element. Med den
        // fælles canvas-optimering er hover på symbol-ikoner upålidelig.
        optimized: false,
        icon: { path: google.maps.SymbolPath.CIRCLE,
                scale: stor ? k.r + 2 : k.r - 1,
                fillColor: farve || k.farve, fillOpacity: 1,
                strokeColor: NIGHT, strokeWeight: 2 }
      });
      m.addListener("mouseover", function () { visTip(txt); });
      m.addListener("mouseout", skjulTip);
      m.addListener("click", function () {
        skjulTip();
        aabnInfo(txt + (klik ? '<a href="' + klik + '" target="_blank" rel="noopener">Åbn i Google Maps →</a>' : ""), null, m);
      });
      grupper[kat].push(m);
      bounds.extend({ lat: lat, lng: lon });
      return m;
    }

    function gmLink(lat, lon) {
      return "https://www.google.com/maps/search/?api=1&query=" + lat + "," + lon;
    }

    window.STOPS.forEach(function (s) {
      var txt = "<b>" + esc(s.navn) + "</b>" +
        '<span class="tl">' + s.lat.toFixed(2) + "°N · " + esc(s.dag) +
        (s.natter ? " · " + s.natter + (s.natter > 1 ? " nætter" : " nat") : "") + "</span>";
      tilfoej("stop", s.lat, s.lon, txt, s.top ? 20 : 10,
              s.top || s.hjem, s.top ? SUN : null, gmLink(s.lat, s.lon));
    });

    window.POI.forEach(function (p) {
      var txt = "<b>" + esc(p.navn) + " " + "★".repeat(p.stj) + "</b>" +
        '<span class="tl">' + esc(p.t) + "</span>" +
        '<span class="tl g">Dag ' + p.dag + (p.tid ? " · " + esc(p.tid) : "") + "</span>";
      // Højere karakter = større og højere prioriteret prik.
      tilfoej(p.kat, p.lat, p.lon, txt, 4 + p.stj, p.stj >= 4,
              null, gmLink(p.lat, p.lon));
    });

    map.fitBounds(bounds, { top: 40, right: 40, bottom: 40, left: 40 });

    /* ---- filterknapper ---- */
    var vist = {};
    var filter = document.getElementById("mapfilter");
    filter.innerHTML = Object.keys(KAT).map(function (k) {
      vist[k] = true;
      return '<button type="button" class="fbtn on" data-kat="' + k + '">' +
        '<span class="fdot" style="background:' + KAT[k].farve + '"></span>' +
        esc(KAT[k].navn) + " <em>" + grupper[k].length + "</em></button>";
    }).join("");
    filter.addEventListener("click", function (e) {
      var b = e.target.closest(".fbtn");
      if (!b) return;
      var k = b.getAttribute("data-kat");
      vist[k] = !vist[k];
      b.classList.toggle("on", vist[k]);
      grupper[k].forEach(function (m) { m.setMap(vist[k] ? map : null); });
      skjulTip();
    });
  };

  /* Googles egen rute per segment. Waypoints tages fra den forudberegnede
     geometri, så Google følger samme korridor som den planlagte rute. */
  function hentRuter(tegnLinje, linjer) {
    var cache = laesCache();
    var svc = new google.maps.DirectionsService();
    var koe = SEGMENTER.slice();

    function brug(seg, c) {
      if (linjer[seg.key]) linjer[seg.key].setMap(null);
      tegnLinje(seg, c.p.map(function (p) { return { lat: p[0], lng: p[1] }; }), c.km, c.t);
    }

    function naeste() {
      if (!koe.length) { skrivCache(cache); return; }
      var seg = koe.shift();
      var g = window.GEOM[seg.key];

      if (cache[seg.key]) { brug(seg, cache[seg.key]); return naeste(); }

      var via = [];
      for (var i = 1; i <= 3; i++) {
        var p = g[Math.round(g.length * i / 4)];
        if (p) via.push({ location: { lat: p[0], lng: p[1] }, stopover: false });
      }

      svc.route({
        origin: { lat: g[0][0], lng: g[0][1] },
        destination: { lat: g[g.length - 1][0], lng: g[g.length - 1][1] },
        waypoints: via,
        travelMode: google.maps.TravelMode.DRIVING
      }, function (res, status) {
        if (status === "OK" && res.routes[0]) {
          var r = res.routes[0], km = 0, sek = 0;
          r.legs.forEach(function (l) { km += l.distance.value / 1000; sek += l.duration.value; });
          cache[seg.key] = {
            p: r.overview_path.map(function (pt) {
              return [Math.round(pt.lat() * 1e4) / 1e4, Math.round(pt.lng() * 1e4) / 1e4];
            }),
            km: Math.round(km),
            t: Math.round(sek / 360) / 10
          };
          brug(seg, cache[seg.key]);
        }
        // Ved fejl bliver den forudberegnede linje bare stående.
        setTimeout(naeste, status === "OVER_QUERY_LIMIT" ? 1200 : 120);
      });
    }

    naeste();
  }

  /* Google afviser nøglen (forkert domæne, kvote opbrugt) → Leaflet i stedet. */
  window.gm_authFailure = function () {
    mapDone = true;
    leaflet("Google Maps afviste nøglen på dette domæne");
  };
  /* Scriptet nåede aldrig frem (offline, blokeret) → Leaflet i stedet. */
  setTimeout(function () {
    if (!mapDone) { mapDone = true; leaflet("Google Maps kunne ikke indlæses"); }
  }, 4000);

  function leaflet(grund) {
    var el = document.getElementById("map");
    el.innerHTML = "";
    document.getElementById("mapfilter").hidden = true;

    var css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(css);

    var js = document.createElement("script");
    js.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    js.onload = function () {
      var map = L.map(el, { scrollWheelZoom: false }).setView([65, 17], 4);
      // Samme opførsel som Google: Ctrl+hjul zoomer, alm. hjul scroller siden.
      el.addEventListener("wheel", function (e) {
        if (e.ctrlKey) { e.preventDefault(); map.scrollWheelZoom.enable(); }
        else { map.scrollWheelZoom.disable(); }
      }, { passive: false });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: "© OpenStreetMap, © CARTO", maxZoom: 18
      }).addTo(map);

      var all = [];
      SEGMENTER.forEach(function (seg) {
        var g = window.GEOM[seg.key];
        L.polyline(g, { color: AURORA, weight: 3, opacity: 0.9 }).addTo(map)
          .bindTooltip("<b>Dag " + seg.dag + " · " + esc(seg.titel) + "</b><br>" +
                       DK(seg.km) + " km · " + komma(seg.t) + " t", { sticky: true });
        all = all.concat(g);
      });
      window.FERRIES.forEach(function (f) {
        L.polyline([f.fra, f.til], { color: SUN, weight: 3, opacity: 0.75, dashArray: "6 8" })
          .addTo(map).bindTooltip("⛴ " + esc(f.navn), { sticky: true });
        all.push(f.fra, f.til);
      });
      window.STOPS.forEach(function (s) {
        L.circleMarker([s.lat, s.lon], { radius: s.top ? 8 : 6, weight: 2, color: NIGHT,
          fillColor: s.top ? SUN : ICE, fillOpacity: 1 }).addTo(map)
          .bindTooltip("<b>" + esc(s.navn) + "</b><br>" + esc(s.dag), { sticky: true });
        all.push([s.lat, s.lon]);
      });
      window.POI.forEach(function (p) {
        L.circleMarker([p.lat, p.lon], { radius: KAT[p.kat].r - 1, weight: 2, color: NIGHT,
          fillColor: KAT[p.kat].farve, fillOpacity: 1 }).addTo(map)
          .bindTooltip("<b>" + esc(p.navn) + "</b><br>" + esc(p.t), { sticky: true });
        all.push([p.lat, p.lon]);
      });
      map.fitBounds(L.latLngBounds(all), { padding: [40, 40] });

      var note = document.createElement("div");
      note.className = "map-fallback";
      note.textContent = grund + " — viser OpenStreetMap i stedet.";
      shell.appendChild(note);
    };
    document.head.appendChild(js);
  }
})();
