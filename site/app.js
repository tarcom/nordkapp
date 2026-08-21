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

  document.getElementById("legend-km").textContent = DK(T.km) + " km";

  var koeredage = window.DAYS.filter(function (d) { return d.km > 5; }).length;
  document.getElementById("foot-sum").textContent =
    T.days + " dage · " + DK(T.km) + " km · " + koeredage +
    " køredage · 4 færger · længste etape 875 km (dag 10)";

  /* ---------- menu ---------- */
  (function () {
    var menu = document.getElementById("menu");
    var baand = document.getElementById("menu-links");
    var knap = document.getElementById("menu-knap");
    var nuTxt = document.getElementById("menu-nu");
    if (!menu || !baand) return;

    var led = [].slice.call(baand.querySelectorAll("a"));
    var afsnit = led.map(function (a) {
      return document.getElementById(a.getAttribute("href").slice(1));
    });
    var aktiv = -1;

    function luk() {
      menu.classList.remove("aaben");
      if (knap) knap.setAttribute("aria-expanded", "false");
    }

    if (knap) {
      knap.addEventListener("click", function () {
        var aaben = menu.classList.toggle("aaben");
        knap.setAttribute("aria-expanded", aaben ? "true" : "false");
      });
      // Luk når man har valgt, klikker udenfor, eller trykker Esc
      baand.addEventListener("click", function (e) {
        if (e.target.tagName === "A") luk();
      });
      document.addEventListener("click", function (e) {
        if (!menu.contains(e.target)) luk();
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") luk();
      });
    }

    function saet(i) {
      if (i === aktiv || i < 0) return;
      aktiv = i;
      led.forEach(function (a, j) { a.classList.toggle("her", j === i); });
      if (nuTxt) nuTxt.textContent = led[i].textContent;
      // Hold det aktive punkt synligt i den vandrette liste på brede skærme,
      // uden at flytte selve siden (derfor ikke scrollIntoView).
      if (menu.classList.contains("aaben")) return;
      var b = baand.getBoundingClientRect(), a = led[i].getBoundingClientRect();
      if (baand.scrollWidth > baand.clientWidth + 4) {
        if (a.left < b.left + 4) { baand.scrollLeft += a.left - b.left - 12; }
        else if (a.right > b.right - 4) { baand.scrollLeft += a.right - b.right + 12; }
      }
    }

    if (!("IntersectionObserver" in window)) return;
    var synlige = {};
    var obs = new IntersectionObserver(function (poster) {
      poster.forEach(function (p) { synlige[p.target.id] = p.isIntersecting; });
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
  function punktUrl(lat, lon) {
    return "https://www.google.com/maps/search/?api=1&query=" + lat + "," + lon;
  }

  /* Står stedet også på kortet, bliver navnet et link. Så kan man åbne det
     direkte i Google Maps fra telefonen undervejs, uden at lede på kortet. */
  var POI_NAVN = {};
  window.POI.forEach(function (p) { POI_NAVN[p.navn] = p; });

  function stedLink(navn) {
    var p = POI_NAVN[navn];
    if (!p) return "<b>" + esc(navn) + "</b>";
    return '<b><a class="selink" href="' + punktUrl(p.lat, p.lon) +
      '" target="_blank" rel="noopener">' + esc(navn) + "</a></b>";
  }

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
      return '<li class="' + (a[2] ? "star" : "") + '">' + stedLink(a[0]) + " — " + esc(a[1]) + "</li>";
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

  /* ---------- revideret tidsplan ---------- */
  (function () {
    var N = window.NYPLAN, vaert = document.getElementById("nyplan-indhold");
    if (!N || !vaert) return;
    var maxKm = Math.max.apply(null, N.dage.map(function (d) { return d.km; })) || 1;

    document.getElementById("nyplan-note").textContent = "Opdateret " + N.opdateret;

    vaert.innerHTML =
      '<p class="lead">' + esc(N.hvor) + "</p>" +
      '<p class="dom">' + N.dom + "</p>" +

      '<div class="nyplan">' + N.dage.map(function (d) {
        var kls = [d.nu ? "nu" : "", d.hard ? "hard" : "", d.stjerne ? "stjerne" : ""]
                  .filter(Boolean).join(" ");
        return '<div class="npdag ' + kls + '">' +
          '<span class="npdato">' + esc(d.dato) + "</span>" +
          '<div class="nptekst"><h4>' + esc(d.titel) +
            (d.nu ? '<em class="npmaerke">du er her</em>' : "") +
            (d.stjerne ? '<em class="npmaerke ny">ny</em>' : "") + "</h4>" +
            "<p>" + d.d + "</p></div>" +
          '<div class="npbar"><span style="width:' + (d.km / maxKm * 100).toFixed(1) + '%"></span></div>' +
          '<div class="nptal">' + (d.km ? DK(d.km) + " km<br><em>" + komma(d.t) + " t</em>"
                                        : "\u2014<br><em>til fods</em>") + "</div>" +
          "</div>";
      }).join("") + "</div>" +

      '<h3 class="fhd">Hvad forspringet k\u00f8ber</h3>' +
      '<div class="hvorfor">' + N.vundet.map(function (v) {
        return '<div class="hkort"><h3>' + esc(v[0]) + "</h3><p>" + esc(v[1]) + "</p></div>";
      }).join("") + "</div>" +

      '<p class="tur-note p"><b>Hvad det koster</b>' + esc(N.pris) + "</p>" +
      '<p class="sadvarsel">' + esc(N.fast) + "</p>";
  })();

  /* ---------- byafsnit: Trondheim og Tromsø ---------- */
  /* De to byafsnit er ens af opbygning — målt gangrute, minikort og spisesteder
     — så renderingen er skrevet én gang og kaldt to. `kort` bytter SVG'en ud
     med et rigtigt Google-kort og kaldes fra initMap; `tilbage` fortryder.
     Begge er nødvendige, fordi initMap også kører når nøglen er forkert:
     Google-scriptet indlæses fint, og først bagefter melder gm_authFailure. */
  var BYKORT = [];

  function byAfsnit(D) {
    var vaert = document.getElementById(D.id + "-indhold");
    if (!D || !vaert) return;

    var KORT_ID = D.id + "-kort", TEKST_ID = D.id + "-korttekst";
    var SVGTEKST = "Den målte gangrute · numrene følger listen nedenfor · " +
                   "firkanterne er spisestederne";
    var K = Math.cos(D.tur.stop[0].lat * Math.PI / 180);  // længdegrader er kortere heroppe

    /* Hele sløjfen som gårute i Google Maps: første stop er både start og mål,
       resten bliver waypoints. URL-API'et tager op til 9. */
    function sloejfeUrl() {
      var s = D.tur.stop;
      return "https://www.google.com/maps/dir/?api=1&travelmode=walking" +
        "&origin=" + s[0].lat + "," + s[0].lon +
        "&destination=" + s[0].lat + "," + s[0].lon +
        "&waypoints=" + s.slice(1).map(function (q) {
          return q.lat + "," + q.lon;
        }).join("%7C");
    }

    /* Minikortet er ren SVG tegnet af den målte gangrute. Ingen fliser og
       ingen API-nøgle, så det virker også lokalt, hvor Google-kortet ikke gør. */
    function minikort() {
      var alle = D.tur.linje.slice();
      D.tur.stop.forEach(function (q) { alle.push([q.lat, q.lon]); });
      D.mad.steder.forEach(function (m) { alle.push([m.lat, m.lon]); });

      var minLat = 90, maxLat = -90, minLon = 180, maxLon = -180;
      alle.forEach(function (q) {
        if (q[0] < minLat) minLat = q[0];
        if (q[0] > maxLat) maxLat = q[0];
        if (q[1] < minLon) minLon = q[1];
        if (q[1] > maxLon) maxLon = q[1];
      });

      var S = 100000, PAD = 70;
      var x = function (lon) { return ((lon - minLon) * K * S + PAD).toFixed(1); };
      var y = function (lat) { return ((maxLat - lat) * S + PAD).toFixed(1); };
      var w = (maxLon - minLon) * K * S + PAD * 2,
          h = (maxLat - minLat) * S + PAD * 2;

      var d = D.tur.linje.map(function (q, i2) {
        return (i2 ? "L" : "M") + x(q[1]) + " " + y(q[0]);
      }).join(" ");

      var stop = D.tur.stop.map(function (q) {
        return '<g class="mk-stop"><circle cx="' + x(q.lon) + '" cy="' + y(q.lat) + '" r="20"></circle>' +
          '<text x="' + x(q.lon) + '" y="' + y(q.lat) + '" dy="9">' + q.n + "</text></g>";
      }).join("");

      // Spisestederne kan ligge oven i hinanden — i Tromsø deler to af dem
      // ligefrem adresse. Selve firkanten bliver på sit rigtige sted; kun
      // teksten skubbes ned, indtil den ikke længere dækker en tidligere.
      var brugt = [];
      var mad = D.mad.steder.map(function (m) {
        // Navnet skal ind på kortet, ikke ud over kanten: kun det punkt der
        // ligger yderst mod øst får sin tekst til venstre.
        var mx = +x(m.lon), my = +y(m.lat), hoejre = mx < w * 0.75;
        var ty = my;
        for (var n = 0; n < brugt.length; n++) {
          if (Math.abs(brugt[n][0] - mx) < 150 && Math.abs(brugt[n][1] - ty) < 30) {
            ty = brugt[n][1] + 32; n = -1;   // start forfra, den kan ramme en anden
          }
        }
        brugt.push([mx, ty]);
        // Er teksten skubbet væk fra firkanten, så bind dem sammen med en streg.
        var streg = Math.abs(ty - my) > 4
          ? '<line class="mk-traad" x1="' + mx + '" y1="' + my + '" x2="' +
            (mx + (hoejre ? 18 : -18)) + '" y2="' + ty + '"></line>' : "";
        return '<g class="mk-mad' + (m.valg ? " valg" : "") + '">' + streg +
          '<rect x="' + (mx - 13) + '" y="' + (my - 13) + '" width="26" height="26" rx="5"></rect>' +
          '<text x="' + (mx + (hoejre ? 22 : -22)) + '" y="' + ty + '" dy="9" text-anchor="' +
          (hoejre ? "start" : "end") + '">' + esc(m.kort || m.navn) + "</text></g>";
      }).join("");

      return '<figure class="minikort">' +
        '<div class="mk-svg">' +
          '<svg viewBox="0 0 ' + w.toFixed(0) + " " + h.toFixed(0) + '" role="img" ' +
            'aria-label="Kort over byvandringen i ' + esc(D.by) + '">' +
            '<path class="mk-rute" d="' + d + '"></path>' + stop + mad +
          "</svg>" +
        "</div>" +
        '<div id="' + KORT_ID + '" class="trhmap" hidden></div>' +
        '<figcaption id="' + TEKST_ID + '">' + SVGTEKST + "</figcaption></figure>";
    }

    var t = D.tur;
    vaert.innerHTML =
      '<p class="lead">' + esc(D.intro) + "</p>" +

      '<div class="tur-tal">' +
        '<div class="stat"><dt>Rundtur</dt><dd>' + komma(t.km) + "<span> km</span></dd></div>" +
        '<div class="stat"><dt>Ren gang</dt><dd>' + t.min + "<span> min</span></dd></div>" +
        '<div class="stat"><dt>Med stop</dt><dd>' + komma(t.timer) + "<span> time</span></dd></div>" +
        '<div class="stat"><dt>Stigning</dt><dd>' + t.stigning + "<span> m</span></dd></div>" +
      "</div>" +

      minikort() +

      '<ol class="turstop">' + t.stop.map(function (q) {
        return '<li class="turstop-punkt' + (q.stj ? " stjerne" : "") + '">' +
          '<span class="tsnr">' + q.n + "</span>" +
          '<div class="tstekst"><h4>' + esc(q.navn) +
            (q.stj ? stjerner(q.stj, "lille") : "") + "</h4>" +
            "<p>" + esc(q.d) + "</p>" +
            '<a class="tskort" href="' + punktUrl(q.lat, q.lon) +
              '" target="_blank" rel="noopener">Vis på kortet</a>' +
          "</div></li>";
      }).join("") + "</ol>" +

      '<p class="tur-note">' + esc(t.note) + "</p>" +
      '<p class="tur-note p"><b>Parkering</b>' + esc(t.parkering) + "</p>" +
      (t.ekstra ? '<p class="tur-note x"><b>Vil du gå længere</b>' + esc(t.ekstra) + "</p>" : "") +
      '<p class="tur-links"><a class="navlink" href="' + sloejfeUrl() +
        '" target="_blank" rel="noopener">Åbn hele sløjfen som gårute</a></p>' +

      '<h3 class="madhd">' + esc(D.mad.titel || "Aftensmad") + "</h3>" +
      '<p class="lead">' + esc(D.mad.intro) + "</p>" +
      '<div class="mad">' + D.mad.steder.map(function (m) {
        return '<article class="madkort' + (m.valg ? " valgt" : "") + '">' +
          (m.valg ? '<span class="madmaerke">Valget</span>' : "") +
          "<h4>" + esc(m.navn) + "</h4>" +
          '<p class="madart">' + esc(m.art) + "</p>" +
          '<p class="madmeta">' + esc(m.adresse) + " · " + esc(m.pris) + "</p>" +
          "<p>" + esc(m.d) + "</p>" +
          (m.hvorfor ? '<p class="madhvorfor"><b>Derfor den</b>' + esc(m.hvorfor) + "</p>" : "") +
          (m.advarsel ? '<p class="madadvarsel">' + esc(m.advarsel) + "</p>" : "") +
          (m.note ? '<p class="madnote">' + esc(m.note) + "</p>" : "") +
          (m.aabent ? '<p class="madaabent">' + esc(m.aabent) + "</p>" : "") +
          '<p class="madlinks">' +
            (m.tlfnr ? '<a href="tel:' + m.tlfnr + '">' + esc(m.tlf) + "</a>" : "") +
            (m.web ? '<a href="' + m.web + '" target="_blank" rel="noopener">Hjemmeside</a>' : "") +
            '<a href="' + punktUrl(m.lat, m.lon) + '" target="_blank" rel="noopener">Vis på kortet</a>' +
          "</p></article>";
      }).join("") + "</div>" +
      '<p class="altbund">' + esc(D.mad.bund) + "</p>";

    /* Vis enten Google-kortet eller SVG'en — aldrig begge. */
    function byt(google_) {
      var svg = vaert.querySelector(".minikort .mk-svg");
      var el = document.getElementById(KORT_ID);
      if (svg) svg.hidden = google_;
      if (el) el.hidden = !google_;
      var tekst = document.getElementById(TEKST_ID);
      if (tekst) {
        tekst.textContent = google_
          ? "Byvandringen på kortet · tryk på et punkt · de gule prikker er spisestederne"
          : SVGTEKST;
      }
    }

    BYKORT.push({
      navn: D.by,
      tegn: function () {
        var el = document.getElementById(KORT_ID);
        if (!el || !window.google || !google.maps) return;

        var kort = new google.maps.Map(el, {
          styles: DARK, mapTypeControl: false, streetViewControl: false,
          fullscreenControl: true, zoomControl: true,
          gestureHandling: "cooperative"
        });
        var graenser = new google.maps.LatLngBounds();
        var info = new google.maps.InfoWindow();

        var sti = D.tur.linje.map(function (q) { return { lat: q[0], lng: q[1] }; });
        sti.forEach(function (q) { graenser.extend(q); });
        new google.maps.Polyline({ path: sti, map: kort, strokeColor: AURORA,
          strokeOpacity: 0.9, strokeWeight: 4, zIndex: 2 });

        function markoer(lat, lon, farve, etiket, html) {
          var opt = {
            position: { lat: lat, lng: lon }, map: kort, optimized: false,
            zIndex: etiket ? 6 : 5,
            icon: { path: google.maps.SymbolPath.CIRCLE, scale: etiket ? 11 : 8,
                    fillColor: farve, fillOpacity: 1, strokeColor: NIGHT, strokeWeight: 2 }
          };
          if (etiket) {
            opt.label = { text: etiket, color: NIGHT, fontSize: "12px", fontWeight: "700" };
          }
          var m = new google.maps.Marker(opt);
          m.addListener("click", function () {
            info.setContent('<div class="iw">' + html + "</div>");
            info.open(kort, m);
          });
          graenser.extend({ lat: lat, lng: lon });
        }

        D.tur.stop.forEach(function (q) {
          markoer(q.lat, q.lon, ICE, String(q.n),
            "<b>" + esc(q.navn) + "</b>" +
            '<span class="tl">Stop ' + q.n + " af " + D.tur.stop.length + " på byvandringen</span>" +
            '<a href="' + punktUrl(q.lat, q.lon) + '" target="_blank" rel="noopener">Åbn i Google Maps →</a>');
        });

        D.mad.steder.forEach(function (m) {
          markoer(m.lat, m.lon, SUN, null,
            "<b>" + esc(m.navn) + (m.valg ? " ★" : "") + "</b>" +
            '<span class="tl">' + esc(m.adresse) + " · " + esc(m.pris) + "</span>" +
            '<a href="' + punktUrl(m.lat, m.lon) + '" target="_blank" rel="noopener">Åbn i Google Maps →</a>');
        });

        kort.fitBounds(graenser, { top: 34, right: 34, bottom: 34, left: 34 });
        byt(true);
      },
      tilbage: function () { byt(false); }
    });
  }

  byAfsnit(window.TRONDHEIM);
  byAfsnit(window.TROMSO);

  /* ---------- færger ---------- */
  var BROEK = { 0: "", 15: "¼", 30: "½", 45: "¾" };
  function varighed(min) {
    var t = Math.floor(min / 60), m = min % 60, br = BROEK[m];
    return br === undefined ? t + " t " + m + " min"
                            : t + br + " time" + (t > 1 || br ? "r" : "");
  }
  document.getElementById("ferries").innerHTML = window.FERRIES.map(function (f) {
    var maerke = { "booket": "✓ Købt", "nu": "Book hjemmefra", "fra Norge": "Book fra Norge",
                   "undervejs": "Book undervejs" }[f.book];
    var klasse = f.book === "booket" ? " booket" : f.book === "nu" ? " nu" : "";
    return '<article class="card' + klasse + '">' +
      (maerke ? '<span class="bookmaerke' + klasse + '">' + maerke + "</span>" : "") +
      "<h3>" + esc(f.navn) + "</h3>" +
      '<p class="meta">Dag ' + f.dag + " · " + esc(f.selskab) + " · " + varighed(f.min) +
        (f.pris ? " · " + esc(f.pris) : "") + "</p>" +
      (f.tider ? '<p class="ftider">' + esc(f.tider) + "</p>" : "") +
      (f.ref ? '<p class="fref">Bookingnr. <b>' + esc(f.ref) + "</b></p>" : "") +
      "<p>" + esc(f.note) + "</p>" +
      '<p><a class="navlink" href="' + f.link + '" target="_blank" rel="noopener">Book hos ' +
      esc(f.selskab.split(" /")[0]) + "</a></p></article>";
  }).join("");

  /* ---------- alternativer ---------- */
  var A = window.ALTERNATIVER;

  function valgblok(b) {
    var maxKm = Math.max.apply(null, b.rows.map(function (r) { return r.km; }));
    var rows = b.rows.map(function (r) {
      return '<div class="vrow' + (r.valgt ? " valgt" : r.fravalgt ? " fravalgt" : "") + '">' +
        '<div class="vnavn">' + esc(r.navn) +
          (r.valgt ? '<span class="vmaerke">valgt</span>' : "") +
          (r.fravalgt ? '<span class="vmaerke fra">fravalgt</span>' : "") + "</div>" +
        '<div class="vbar"><span style="width:' + (r.km / maxKm * 100).toFixed(1) + '%"></span></div>' +
        '<div class="vtal">' + DK(r.km) + " km<br><em>" + komma(r.t) + " t</em></div>" +
        '<p class="vnote">' + esc(r.note) + "</p></div>";
    }).join("");
    return '<article class="altblok"><h3>' + esc(b.titel) + "</h3>" +
      '<p class="lead">' + esc(b.intro) + "</p>" +
      '<div class="vtabel">' + rows + "</div>" +
      '<p class="vkonk">' + esc(b.konklusion) + "</p>" +
      (b.travemunde ? '<p class="o-note">' + b.travemunde + "</p>" : "") +
      (b.afgoerende ? '<p class="vafg">' + b.afgoerende + "</p>" : "") +
      "</article>";
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
    valgblok(A.maal) + valgblok(A.retur) + valgblok(A.norge) + jaevnblok(A.jaevn) +
    '<p class="altbund">' + esc(A.bund) + "</p>";

  /* ---------- fri plan ---------- */
  /* Tælles ud af POI i stedet for at stå som et tal i teksten — ellers bliver
     det forældet, hver gang der kommer et punkt til. */
  var FEMSTJERNEDE = window.POI.filter(function (p) { return p.stj === 5; }).length;
  var F = window.FRIPLAN;
  document.getElementById("friplan").innerHTML =
    '<p class="dom">' + esc(F.dom) + "</p>" +

    '<div class="hvorfor">' + F.hvorfor.map(function (h) {
      return '<div class="hkort"><h3>' + esc(h.t) + "</h3><p>" + esc(h.d) + "</p></div>";
    }).join("") + "</div>" +

    '<h3 class="fhd">De fire datoer</h3>' +
    '<p class="lead">' + esc(F.frister.intro) + "</p>" +
    '<div class="frister"><div class="frow fhead"><span></span>' +
      "<span>Efter planen</span><span>Absolut sidste</span></div>" +
      F.frister.raekker.map(function (r) {
        return '<div class="frow' + (r.vendepunkt ? " vend" : "") + '">' +
          '<span class="fsted">' + esc(r.sted) +
            '<em>' + esc(r.hvorfor) + "</em></span>" +
          '<span class="fnormal">' + esc(r.normal) + "</span>" +
          '<span class="fsidste">' + esc(r.sidste) + "</span></div>";
      }).join("") + "</div>" +
    '<p class="fluft">' + F.frister.luft + "</p>" +

    '<h3 class="fhd">Fem regler der får det til at virke</h3>' +
    '<div class="pgroup"><ul>' + F.regler.map(function (r) {
      return "<li><b>" + esc(r[0]) + "</b>" + esc(r[1]) + "</li>";
    }).join("") + "</ul></div>" +

    '<p class="sadvarsel">' + esc(F.fare) + "</p>" +

    '<h3 class="fhd">' + esc(F.nod.titel) + "</h3>" +
    '<p class="lead">' + esc(F.nod.intro) + "</p>" +
    '<p class="fnoegle">' + F.nod.noegletal + "</p>" +
    '<div class="nodliste">' + F.nod.raekker.map(function (n) {
      return '<div class="nod' + (n.bedst ? " bedst" : "") + '">' +
        '<div class="n-hd"><h4>' + esc(n.sted) +
          (n.bedst ? '<em>den rigtige</em>' : "") + "</h4>" +
          '<span class="n-spar">sparer ' + esc(n.sparer) + "</span></div>" +
        '<p class="n-rute">' + esc(n.rute) + "</p>" +
        '<p class="n-mister">Mister <b>' + n.mister + "</b> af turens " +
          FEMSTJERNEDE + " femstjernede</p>" +
        "<p>" + esc(n.d) + "</p></div>";
    }).join("") + "</div>" +
    '<p class="fluft">' + F.nod.pointe + "</p>" +
    '<p class="n-naar">' + esc(F.nod.naar) + "</p>";

  /* ---------- karakterer og rangering ---------- */
  function stjerner(n, klasse) {
    var s = "";
    for (var i = 1; i <= 5; i++) s += '<span class="' + (i <= n ? "on" : "") + '"></span>';
    return '<span class="stj ' + (klasse || "") + '" title="' + n + ' af 5">' + s + "</span>";
  }

  var SK = window.SKALA;
  var KATNAVN = { vandring: "Vandring", udsigt: "Seværdighed", sove: "Sovested",
                  omvej: "Omvej", mulighed: "Mulighed" };

  /* Alt med karakter, samlet og sorteret: højeste først, så efter dag. */
  var rangliste = window.POI.map(function (p) {
    return { navn: p.navn, kat: p.kat, stj: p.stj, dag: p.dag, t: p.t };
  }).sort(function (a, b) { return b.stj - a.stj || a.dag - b.dag; });

  document.getElementById("rang-note").textContent =
    window.POI.length + " steder · 1 til 5 stjerner";

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

  /* ---------- infobokse på kortet ---------- */
  /* Boksen skal kunne bruges i bilen, ikke bare pynte: hele beskrivelsen med,
     koordinater der kan kopieres direkte ind i Teslas navigationss\u00f8gning,
     og afstanden herfra hvis positionen er hentet. */
  var minPos = null;   // s\u00e6ttes n\u00e5r «vis hvor jeg er» har v\u00e6ret brugt

  function afstandKm(a, b, c, d) {
    var R = 6371, r = Math.PI / 180;
    var dp = (c - a) * r, dl = (d - b) * r;
    var h = Math.sin(dp / 2) * Math.sin(dp / 2) +
            Math.cos(a * r) * Math.cos(c * r) * Math.sin(dl / 2) * Math.sin(dl / 2);
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  function koordTekst(lat, lon) {
    return lat.toFixed(4).replace(".", ",") + "\u00b0N " +
           lon.toFixed(4).replace(".", ",") + "\u00b0\u00d8";
  }

  function handlinger(lat, lon, navn) {
    var k = lat.toFixed(5) + "," + lon.toFixed(5);
    return '<div class="iw-akt">' +
      '<a href="https://www.google.com/maps/dir/?api=1&destination=' + k +
        '&travelmode=driving" target="_blank" rel="noopener">Naviger hertil \u2192</a>' +
      '<a href="https://www.google.com/maps/search/?api=1&query=' + k +
        '" target="_blank" rel="noopener">Vis stedet</a>' +
      '<button type="button" class="iw-kopi" data-koord="' + k +
        '" data-navn="' + esc(navn) + '">Kopi\u00e9r koordinater</button>' +
      "</div>";
  }

  function metaLinje(lat, lon) {
    var t = koordTekst(lat, lon);
    if (minPos) {
      t += " \u00b7 " + Math.round(afstandKm(minPos[0], minPos[1], lat, lon)) +
           " km herfra i fugleflugt";
    }
    return '<span class="tl">' + t + "</span>";
  }

  /* Fuld infoboks for et kortpunkt. */
  function punktInfo(p) {
    var KN = { vandring: "Vandring", udsigt: "Sev\u00e6rdighed", sove: "Sovested",
               omvej: "Omvej", mulighed: "Mulighed", stop: "Overnatning" };
    return '<b>' + esc(p.navn) + "</b>" +
      '<span class="tl g">' + (KN[p.kat] || "") + " \u00b7 dag " + p.dag +
        (p.tid ? " \u00b7 " + esc(p.tid) : "") + " \u00b7 " + "\u2605".repeat(p.stj) + "</span>" +
      '<p class="iw-d">' + esc(p.d || p.t) + "</p>" +
      (p.d ? '<span class="tl">' + esc(p.t) + "</span>" : "") +
      metaLinje(p.lat, p.lon) +
      handlinger(p.lat, p.lon, p.navn);
  }

  function stopInfo(s2) {
    return '<b>' + esc(s2.navn) + "</b>" +
      '<span class="tl g">Overnatning \u00b7 ' + esc(s2.dag) +
        (s2.natter ? " \u00b7 " + s2.natter + (s2.natter > 1 ? " n\u00e6tter" : " nat") : "") + "</span>" +
      metaLinje(s2.lat, s2.lon) +
      handlinger(s2.lat, s2.lon, s2.navn);
  }

  /* Kopiknappen sidder i en boks, kortmotoren selv har lavet, s\u00e5 den fanges
     p\u00e5 dokumentet i stedet for at blive bundet ved oprettelsen. */
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".iw-kopi");
    if (!b) return;
    var k = b.getAttribute("data-koord");
    function kvitter(ok) {
      b.textContent = ok ? "Kopieret \u2014 s\u00e6t ind i navigationen" : k;
      setTimeout(function () { b.textContent = "Kopi\u00e9r koordinater"; }, 6000);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(k).then(function () { kvitter(true); },
                                            function () { kvitter(false); });
    } else {
      kvitter(false);   // vis dem i stedet, s\u00e5 de kan markeres i h\u00e5nden
    }
  });

  /* ---------- min position ---------- */
  /* Google Maps' JavaScript-API har ingen indbygget «find mig»-knap som
     mobil-SDK'erne har, så den bygges her. Knappen ligger i HTML oven på
     kortet frem for som et kort-kontrolelement, så den samme knap kan betjene
     både Google-kortet og Leaflet-reserven. */
  var visMig = null;
  var minposKnap = document.getElementById("minpos");

  function saetVisMig(fn) {
    visMig = fn;
    if (minposKnap && navigator.geolocation) minposKnap.hidden = false;
  }

  if (minposKnap) {
    var minposTekst = minposKnap.textContent;
    var minposTimer = null;
    function minposSig(txt, ms) {
      minposKnap.textContent = txt;
      if (minposTimer) clearTimeout(minposTimer);
      if (ms) minposTimer = setTimeout(function () { minposKnap.textContent = minposTekst; }, ms);
    }
    minposKnap.addEventListener("click", function () {
      if (!visMig) return;
      minposKnap.disabled = true;
      minposSig("Finder\u2026");
      navigator.geolocation.getCurrentPosition(function (p) {
        minposKnap.disabled = false;
        minposSig(minposTekst);
        visMig(p.coords.latitude, p.coords.longitude, p.coords.accuracy);
      }, function (fejl) {
        minposKnap.disabled = false;
        // 1 = afvist, 2 = ingen position, 3 = tidsudl\u00f8b
        minposSig(fejl.code === 1 ? "Du sagde nej til adgang"
                : fejl.code === 3 ? "Tog for lang tid \u2014 pr\u00f8v igen"
                : "Fandt ingen position", 5000);
      }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 30000 });
    });
  }

  /* ======================= KORT ======================= */
  var AURORA = "#5FD9A6", SUN = "#E8A33D", ICE = "#E4EFF3",
      NIGHT = "#08161F", VIOLET = "#B69CE8", ROSE = "#F0705B",
      SKY = "#6FB3D9";

  var KAT = {
    stop:     { navn: "Overnatning",   farve: ICE,    r: 6.5 },
    sove:     { navn: "Sov i bilen",   farve: VIOLET, r: 6 },
    vandring: { navn: "Vandreture",    farve: AURORA, r: 6 },
    udsigt:   { navn: "Seværdigheder", farve: SUN,    r: 5 },
    omvej:    { navn: "Omveje",        farve: ROSE,   r: 6 },
    mulighed: { navn: "Muligheder",   farve: SKY,    r: 5.5 }
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

  // Touch-enheder har ingen hover. Uden det her kunne en synthetic mouseover
  // efterlade en tooltip hængende midt på kortet efter et tryk.
  var kanHover = !window.matchMedia || window.matchMedia("(hover: hover)").matches;

  function visTip(html) {
    if (!kanHover) return;
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
  var CACHE_KEY = "nordkapp.ruter.v2";
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

    /* Blå prik som på telefonen: markør plus en cirkel for usikkerheden. */
    var migPrik = null, migRing = null;
    saetVisMig(function (lat, lon, noej) {
      minPos = [lat, lon];
      var pos = { lat: lat, lng: lon };
      if (!migPrik) {
        migPrik = new google.maps.Marker({
          position: pos, map: map, zIndex: 999, optimized: false,
          icon: { path: google.maps.SymbolPath.CIRCLE, scale: 7,
                  fillColor: "#4C9BE8", fillOpacity: 1,
                  strokeColor: "#FFFFFF", strokeWeight: 3 }
        });
        migRing = new google.maps.Circle({
          map: map, clickable: false, strokeColor: "#4C9BE8", strokeOpacity: 0.35,
          strokeWeight: 1, fillColor: "#4C9BE8", fillOpacity: 0.12
        });
      }
      migPrik.setPosition(pos);
      migRing.setCenter(pos);
      migRing.setRadius(Math.max(noej || 60, 40));
      map.panTo(pos);
      if (map.getZoom() < 9) map.setZoom(9);
    });

    // Byvandringerne får hver deres kort i deres eget afsnit. Fejler et af dem,
    // må det ikke tage hovedkortet med sig — så bliver SVG'en bare stående.
    BYKORT.forEach(function (b2) {
      try { b2.tegn(); }
      catch (e) { if (window.console) console.warn(b2.navn + "-kortet: " + e.message); }
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

    function tilfoej(kat, lat, lon, txt, z, stor, farve, info2) {
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
        aabnInfo(info2 || txt, null, m);
      });
      grupper[kat].push(m);
      bounds.extend({ lat: lat, lng: lon });
      return m;
    }

    window.STOPS.forEach(function (s) {
      var txt = "<b>" + esc(s.navn) + "</b>" +
        '<span class="tl">' + s.lat.toFixed(2) + "°N · " + esc(s.dag) +
        (s.natter ? " · " + s.natter + (s.natter > 1 ? " nætter" : " nat") : "") + "</span>";
      tilfoej("stop", s.lat, s.lon, txt, s.top ? 20 : 10,
              s.top || s.hjem, s.top ? SUN : null, stopInfo(s));
    });

    window.POI.forEach(function (p) {
      var txt = "<b>" + esc(p.navn) + " " + "★".repeat(p.stj) + "</b>" +
        '<span class="tl">' + esc(p.t) + "</span>" +
        '<span class="tl g">Dag ' + p.dag + (p.tid ? " · " + esc(p.tid) : "") + "</span>";
      // Højere karakter = større og højere prioriteret prik.
      tilfoej(p.kat, p.lat, p.lon, txt, 4 + p.stj, p.stj >= 4,
              null, punktInfo(p));
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
    // initMap kan allerede have byttet bykortene ud — byt tilbage, så man
    // får SVG'en og ikke et gråt, dødt Google-kort.
    BYKORT.forEach(function (b2) { b2.tilbage(); });
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

      var lMigPrik = null, lMigRing = null;
      saetVisMig(function (lat, lon, noej) {
        minPos = [lat, lon];
        if (!lMigPrik) {
          lMigRing = L.circle([lat, lon], { radius: 60, color: "#4C9BE8", weight: 1,
            opacity: 0.35, fillColor: "#4C9BE8", fillOpacity: 0.12 }).addTo(map);
          lMigPrik = L.circleMarker([lat, lon], { radius: 7, color: "#FFFFFF", weight: 3,
            fillColor: "#4C9BE8", fillOpacity: 1 }).addTo(map);
        }
        lMigRing.setLatLng([lat, lon]).setRadius(Math.max(noej || 60, 40));
        lMigPrik.setLatLng([lat, lon]);
        map.setView([lat, lon], Math.max(map.getZoom(), 9));
      });

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
          .bindTooltip("<b>" + esc(p.navn) + "</b><br>" + esc(p.t), { sticky: true })
          .bindPopup(function () { return '<div class="iw">' + punktInfo(p) + "</div>"; },
                     { maxWidth: 300 });
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
