# Hrvatska se budi

Statični sajt (HTML/CSS) na GitHub Pages. Nema JS-a ni dodatnih mapa.

- `index.html` – nacionalni proglas + oglasna ploča
- `gorica.html`, `zagreb.html` – gradovi s blog sekcijom (`#blog`)
- `nav.js` – izbornik i popis gradova (jedino mjesto za uređivanje)
- `split.html`, `osijek.html`, `rijeka.html` – pripremljene stranice
- `style.css` – dizajn (ne dirati)
- `slike/` – fotografije za objave (napravi mapu kad zatreba)

## Nova objava u gradu
Otvori stranicu grada, nađi komentar "NOVA OBJAVA", kopiraj blok `news-item`, zalijepi iznad prvog, promijeni datum/naslov/tekst.

## Aktivacija grada
Svih 5 stranica već postoje. U `nav.js` promijeni `"uskoro"` u `"aktivno"` za taj grad. Izbornik se mijenja na svim stranicama odjednom.
