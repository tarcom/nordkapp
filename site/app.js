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

  /* ---------- nøgletal ---------- */
  var T = window.TRIP;
  document.getElementById("stats").innerHTML = [
    ["Kørsel", DK(T.km), " km"],
    ["Bag rattet", String(T.hours).replace(".", ","), " timer"],
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
      : DK(d.km) + " km · " + String(d.t).replace(".", ",") + " t";
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
  document.getElementById("ferries").innerHTML = window.FERRIES.map(function (f) {
    var t = Math.floor(f.min / 60), m = f.min % 60;
    var br = BROEK[m];
    var varighed = br === undefined
      ? t + " t " + m + " min"
      : t + br + " time" + (t > 1 || br ? "r" : "");
    return '<article class="card"><h3>' + esc(f.navn) + "</h3>" +
      '<p class="meta">Dag ' + f.dag + " · " + esc(f.selskab) + " · " + varighed + "</p>" +
      "<p>" + esc(f.note) + "</p>" +
      '<p><a class="navlink" href="' + f.link + '" target="_blank" rel="noopener">Book hos ' +
      esc(f.selskab.split(" /")[0]) + "</a></p></article>";
  }).join("");

  /* ---------- praktisk ---------- */
  document.getElementById("praktisk-liste").innerHTML = window.PRAKTISK.map(function (g) {
    return '<section class="pgroup"><h3>' + esc(g.gruppe) + "</h3><ul>" +
      g.punkter.map(function (p) {
        return "<li><b>" + esc(p[0]) + "</b>" + p[1] + "</li>";
      }).join("") + "</ul></section>";
  }).join("");

  /* ---------- kort ---------- */
  var G = window.GEOM;
  var driveGeoms = Object.keys(G).map(function (k) { return G[k]; });
  var AURORA = "#5FD9A6", SUN = "#E8A33D", ICE = "#E4EFF3", NIGHT = "#08161F";

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

  window.initMap = function () {
    if (mapDone) return;
    mapDone = true;

    var map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 65, lng: 17 }, zoom: 4,
      styles: DARK, mapTypeControl: true, streetViewControl: false,
      fullscreenControl: true, scrollwheel: false,
      mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU }
    });

    var bounds = new google.maps.LatLngBounds();

    driveGeoms.forEach(function (g) {
      var path = g.map(function (p) { return { lat: p[0], lng: p[1] }; });
      path.forEach(function (p) { bounds.extend(p); });
      new google.maps.Polyline({
        path: path, map: map, strokeColor: AURORA, strokeOpacity: 0.9, strokeWeight: 3
      });
    });

    window.FERRIES.forEach(function (f) {
      var path = [{ lat: f.fra[0], lng: f.fra[1] }, { lat: f.til[0], lng: f.til[1] }];
      path.forEach(function (p) { bounds.extend(p); });
      new google.maps.Polyline({
        path: path, map: map, geodesic: true, strokeOpacity: 0, strokeColor: SUN,
        icons: [{
          icon: { path: "M 0,-1 0,1", strokeOpacity: 0.85, strokeColor: SUN, strokeWeight: 3, scale: 3 },
          offset: "0", repeat: "14px"
        }]
      });
    });

    var info = new google.maps.InfoWindow();
    window.STOPS.forEach(function (s) {
      var big = s.top || s.hjem;
      var m = new google.maps.Marker({
        position: { lat: s.lat, lng: s.lon }, map: map, title: s.navn,
        zIndex: big ? 10 : 1,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: big ? 8 : 6,
          fillColor: s.top ? SUN : s.hoej ? AURORA : ICE,
          fillOpacity: 1, strokeColor: NIGHT, strokeWeight: 2
        }
      });
      m.addListener("click", function () {
        info.setContent(
          '<div class="iw"><b>' + esc(s.navn) + "</b>" +
          "<span>" + s.lat.toFixed(2) + "°N · " + esc(s.dag) +
          (s.natter ? " · " + s.natter + (s.natter > 1 ? " nætter" : " nat") : "") + "</span>" +
          '<a href="https://www.google.com/maps/search/?api=1&query=' + s.lat + "," + s.lon +
          '" target="_blank" rel="noopener">Åbn i Google Maps →</a></div>'
        );
        info.open(map, m);
      });
      bounds.extend({ lat: s.lat, lng: s.lon });
    });

    map.fitBounds(bounds, { top: 40, right: 40, bottom: 40, left: 40 });
  };

  /* Google afviser nøglen (forkert domæne, kvote opbrugt) → Leaflet i stedet. */
  window.gm_authFailure = function () { mapDone = true; leaflet("Google Maps afviste nøglen på dette domæne"); };

  /* Scriptet nåede aldrig frem (offline, blokeret) → Leaflet i stedet. */
  setTimeout(function () {
    if (!mapDone) { mapDone = true; leaflet("Google Maps kunne ikke indlæses"); }
  }, 4000);

  function leaflet(grund) {
    var el = document.getElementById("map");
    el.innerHTML = "";
    var css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(css);

    var js = document.createElement("script");
    js.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    js.onload = function () {
      var map = L.map(el, { scrollWheelZoom: false }).setView([65, 17], 4);
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: "© OpenStreetMap, © CARTO", maxZoom: 18
      }).addTo(map);

      var all = [];
      driveGeoms.forEach(function (g) {
        L.polyline(g, { color: AURORA, weight: 3, opacity: 0.9 }).addTo(map);
        all = all.concat(g);
      });
      window.FERRIES.forEach(function (f) {
        L.polyline([f.fra, f.til], { color: SUN, weight: 3, opacity: 0.75, dashArray: "6 8" }).addTo(map);
        all.push(f.fra, f.til);
      });
      window.STOPS.forEach(function (s) {
        L.circleMarker([s.lat, s.lon], {
          radius: s.top || s.hjem ? 8 : 6, weight: 2, color: NIGHT,
          fillColor: s.top ? SUN : s.hoej ? AURORA : ICE, fillOpacity: 1
        }).addTo(map).bindPopup(
          "<b>" + esc(s.navn) + "</b><br>" + s.lat.toFixed(2) + "°N · " + esc(s.dag)
        );
        all.push([s.lat, s.lon]);
      });
      map.fitBounds(L.latLngBounds(all), { padding: [40, 40] });

      var note = document.createElement("div");
      note.className = "map-fallback";
      note.textContent = grund + " — viser OpenStreetMap i stedet.";
      el.parentNode.appendChild(note);
    };
    document.head.appendChild(js);
  }
})();
