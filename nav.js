// ===== JEDINO MJESTO GDJE SE UREĐUJE IZBORNIK =====
// status: "hq" ili "aktivno" = crveni link | "uskoro" = sivo, bez linka
// Kad grad postane aktivan, promijeni samo riječ "uskoro" u "aktivno".
var GRADOVI = [
  ["Velika Gorica", "gorica.html", "hq"],
  ["Zagreb", "zagreb.html", "aktivno"],
  ["Split", "split.html", "uskoro"],
  ["Osijek", "osijek.html", "uskoro"],
  ["Rijeka", "rijeka.html", "uskoro"]
];
// Slogani u crvenoj traci na vrhu svake stranice
var SLOGANI = ["Dosta je šutnje", "Vrijeme je za red", "Hrvatska se budi", "Čitaj zakone. Koristi ih.", "Nema povratka natrag"];
// =====================================================
(function () {
  var body = document.body;
  var page = body.getAttribute("data-page");
  var home = page === "index" ? "" : "index.html";
  var cur = location.pathname.split("/").pop() || "index.html";

  var chunk = "";
  SLOGANI.forEach(function (s) { chunk += "<span>" + s + " //</span>"; });
  var tick = document.createElement("div");
  tick.className = "ticker";
  tick.setAttribute("aria-hidden", "true");
  tick.innerHTML = '<div class="ticker-track">' + chunk + chunk + chunk + chunk + chunk + chunk + "</div>";
  body.insertBefore(tick, body.firstChild);

  var L = [["#plakat","01. Proglas"],["#eu","02. EU & Sustav"],["#seljaci","03. Seljaci"],["#voda","04. Komunalni red"],["#moci","05. Zona Moći"]];
  var h = '<a class="brand" href="index.html">Hrvatska<br><span>se budi</span></a>';
  h += '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu-body">Izbornik</button>';
  h += '<div class="menu-body" id="menu-body"><div class="nav-links">';
  L.forEach(function (l) { h += '<a href="' + home + l[0] + '">' + l[1] + "</a>"; });
  var blogOn = cur === "blog.html" || cur.indexOf("clanak-") === 0;
  h += '<a href="blog.html"' + (blogOn ? ' class="is-current"' : "") + ">06. Blog</a></div>";
  h += '<div class="city-terminal"><div class="term-header">// LOKALNI FRONTOVI</div>';
  GRADOVI.forEach(function (g) {
    var ime = g[0].toUpperCase();
    var c = cur === g[1] ? " is-current" : "";
    if (g[2] === "hq") h += '<a href="' + g[1] + '" class="city-active' + c + '"><span class="blink">_</span>' + ime + " [HQ]</a>";
    else if (g[2] === "aktivno") h += '<a href="' + g[1] + '" class="city-active' + c + '">&gt; ' + ime + " [AKTIVNO]</a>";
    else h += '<span class="city-pending">- ' + ime + " (USKORO)</span>";
  });
  h += '</div><p class="sidefoot">Open-source građanski sustav</p></div>';
  var box = document.getElementById("side-nav");
  if (box) {
    box.innerHTML = h;
    var btn = box.querySelector(".menu-btn");
    btn.addEventListener("click", function () {
      var open = box.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    box.querySelector(".menu-body").addEventListener("click", function (e) {
      if (e.target.tagName === "A") { box.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
    });
  }

  if (document.querySelector(".article")) {
    var bar = document.createElement("div");
    bar.className = "progress";
    body.appendChild(bar);
    var upd = function () {
      var d = document.documentElement;
      var max = d.scrollHeight - d.clientHeight;
      bar.style.width = (max > 0 ? (d.scrollTop / max) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", upd, { passive: true });
    upd();
  }
})();
