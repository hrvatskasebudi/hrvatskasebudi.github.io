// ===== HRVATSKA SE BUDI — pokret.js =====
// JEDINO MJESTO ZA POSTAVKE:
var HSB = {
  OPERATIVNA_BAZA: 4249,   // statični prikaz operativne mreže (objavi samo ako je točan!)
  BROJAC_START: 1342,      // početna baza živog brojača
  FORM_ENDPOINT: "",       // URL za slanje prijava (Google Apps Script / Formspree) – vidi UPUTE
  COUNT_ENDPOINT: ""       // URL koji vraća {"count": N} = broj STVARNIH prijava
};
(function () {
  var fmt = function (n) { return Number(n).toLocaleString("hr-HR"); };
  var el = document.getElementById("pk-count"); if (!el) return;
  var baseEl = document.getElementById("pk-base"); if (baseEl) baseEl.textContent = fmt(HSB.OPERATIVNA_BAZA);
  var bar = document.getElementById("pk-bar"), goal = document.getElementById("pk-goal");
  var MILE = [2000, 2500, 5000, 7500, 10000, 25000, 50000, 100000, 250000];
  var current = 0, real = 0, shown = 0;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  function paint(v) { el.textContent = fmt(v); }
  function progress(v) {
    var next = MILE.filter(function (m) { return m > v; })[0] || v;
    if (bar) bar.style.width = Math.min(100, (v / next) * 100) + "%";
    if (goal) goal.textContent = "Sljedeći cilj: " + fmt(next);
  }
  function animateTo(target) {
    var from = shown, t0 = null, dur = reduce ? 1 : 1300;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      shown = Math.round(from + (target - from) * e); paint(shown);
      if (p < 1) requestAnimationFrame(step); else { shown = target; progress(target); }
    }
    requestAnimationFrame(step);
  }
  function setTotal(realCount) { real = realCount; current = HSB.BROJAC_START + real; animateTo(current); }

  // prikaz početne vrijednosti (bez ikakvog lažnog rasta)
  setTotal(0);
  function pull() {
    if (!HSB.COUNT_ENDPOINT) return;
    fetch(HSB.COUNT_ENDPOINT, { cache: "no-store" }).then(function (r) { return r.json(); })
      .then(function (d) { var n = parseInt(d.count, 10); if (!isNaN(n) && n !== real) setTotal(n); })
      .catch(function () {});
  }
  pull(); setInterval(pull, 60000);

  // ----- forma -----
  var form = document.getElementById("pk-form"), msg = document.getElementById("pk-msg");
  if (!form) return;
  var opT = document.getElementById("pk-op-toggle"), opP = document.getElementById("pk-op");
  opT.addEventListener("change", function () { opP.hidden = !opT.checked; });
  function say(t, ok) { msg.textContent = t; msg.className = "pk-msg show" + (ok ? " ok" : ""); }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var fd = new FormData(form);
    if (fd.get("web")) { return; }                       // honeypot (botovi)
    if (!HSB.FORM_ENDPOINT) { say("Prijave se još nisu aktivirale. Pokušaj ponovno uskoro.", false); return; }
    var b = form.querySelector("button[type=submit]"); b.disabled = true; b.textContent = "Šaljem…";
    var body = new URLSearchParams();
    fd.forEach(function (v, k) { if (k !== "web" && k !== "podrucja") body.append(k, v); });
    body.set("podrucja", fd.getAll("podrucja").join(", "));
    body.set("tip", opT.checked ? "operativac" : "podrska");
    body.set("vrijeme", new Date().toISOString());
    fetch(HSB.FORM_ENDPOINT, { method: "POST", body: body, headers: { "Accept": "application/json" } })
      .then(function (r) { if (!r.ok) throw 0; return r.text(); })
      .then(function () {
        form.innerHTML = '<div class="pk-thanks"><h3>Prijava primljena.</h3><p>Hvala. Upute stožera stižu na tvoj e-mail. Pokaži ovu stranicu još jednoj osobi.</p></div>';
        setTotal(real + 1);                               // samo STVARNA prijava povećava brojač
        var t = document.getElementById("pristupnica"); if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
      })
      .catch(function () { b.disabled = false; b.textContent = "Pošalji prijavu"; say("Slanje nije uspjelo. Provjeri vezu i pokušaj ponovno.", false); });
  });
})();
