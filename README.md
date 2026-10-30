# Hrvatska se budi

Statični sajt (HTML/CSS) na GitHub Pages. Nema JS-a ni dodatnih mapa.

- `index.html` – nacionalni proglas + oglasna ploča
- `gorica.html`, `zagreb.html` – gradovi s blog sekcijom (`#blog`)
- `nav.js` – izbornik i popis gradova (jedino mjesto za uređivanje)
- `osijek.html`, `sisak.html` – aktivni gradovi (Osijek: Orlovnjak i iseljavanje; Sisak: dom nakon potresa); `split.html`, `rijeka.html` – pripremljene stranice
- `style.css` – dizajn (ne dirati)
- `slike/` – fotografije za objave (napravi mapu kad zatreba)

## Pravila pisanja
Svi tekstovi pišu se u glasu "mi, narod, zajedno provodimo kad preuzmemo vlast". Bez crtica i povlaka u tekstovima. Podaci moraju imati naveden izvor.

## Nova objava u gradu
Otvori stranicu grada, nađi komentar "NOVA OBJAVA", kopiraj blok `news-item`, zalijepi iznad prvog, promijeni datum/naslov/tekst.

## Aktivacija grada
Svih 5 stranica već postoje. U `nav.js` promijeni `"uskoro"` u `"aktivno"` za taj grad. Izbornik se mijenja na svim stranicama odjednom.

## Blog (nacionalni tekstovi)
- `blog.html` – popis tekstova, `clanak-*.html` – pojedinačni tekstovi.
- **Novi tekst:** kopiraj bilo koji `clanak-*.html`, promijeni naslov i sadržaj (`<h2>` za podnaslove, `<p>` za odlomke), spremi pod novim imenom. Zatim u `blog.html` kopiraj jedan blok `<a class="post">` na vrh i prepravi.

## Lokalne inicijative (Velika Gorica)
- `gorica.html` – stranica grada: popis inicijativa + sekcija "Objave" (vijesti).
- `gorica-*.html` – pojedinačne inicijative (isti dizajn kao članci). Za novu: kopiraj jednu, promijeni sadržaj i u `gorica.html` dodaj blok `<a class="post">`.
- Pravilo: **dugi, stalni tekstovi** (zahtjevi, nacrti) = vlastita stranica + kartica na stranici grada. **Kratke vijesti** = blok `news-item` u "Objave" grada. **Nacionalna tema** = `clanak-*.html` + `blog.html`.
