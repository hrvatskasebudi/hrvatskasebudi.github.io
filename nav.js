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
// =====================================================
(function () {
  var home = document.body.getAttribute("data-page") === "index" ? "" : "index.html";
  var L = [["#plakat","01. Proglas"],["#eu","02. EU & Sustav"],["#seljaci","03. Seljaci"],["#voda","04. Komunalni red"],["#moci","05. Zona Moći"]];
  var h = '<div class="nav-links">';
  L.forEach(function (l) { h += '<a href="' + home + l[0] + '">' + l[1] + '</a>'; });
  h += '<a href="blog.html">06. Blog</a></div><div class="city-terminal"><div class="term-header">// LOKALNI FRONTOVI</div>';
  GRADOVI.forEach(function (g) {
    var ime = g[0].toUpperCase();
    if (g[2] === "hq") h += '<a href="' + g[1] + '" class="city-active"><span class="blink">_</span>' + ime + ' [HQ]</a>';
    else if (g[2] === "aktivno") h += '<a href="' + g[1] + '" class="city-active">&gt; ' + ime + ' [AKTIVNO]</a>';
    else h += '<span class="city-pending">- ' + ime + ' (USKORO)</span>';
  });
  h += '</div>';
  var box = document.getElementById("side-nav");
  if (box) box.innerHTML = h;
})();
