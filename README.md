# Hrvatska se budi

Statični sajt (HTML/CSS/JS), hostan na GitHub Pages.

## Struktura
- `index.html` – nacionalni proglas + oglasna ploča
- `gorica.html`, `zagreb.html` – lokalne podstranice (predložak)
- `style.css` – cijeli dizajn (zaključan)
- `app.js` – gradi bočni izbornik i vijesti iz JSON-a
- `data/gradovi.json` – popis gradova (status: hq / active / soon)
- `data/vijesti.json` – vijesti na glavnoj stranici

## Novi grad
1. U `data/gradovi.json` promijeni `"status":"soon"` u `"active"` i dodaj `"url"`.
2. Kopiraj `zagreb.html` u `<grad>.html` i promijeni tekst + `data-page`.
3. Dodaj vijest u `data/vijesti.json`.

## Lokalno testiranje
`python3 -m http.server` pa otvori http://localhost:8000 (JSON se ne učitava preko file://).

## Deploy
Repo > Settings > Pages > Deploy from branch `main` / root. Domena: Cloudflare DNS + CNAME datoteka.

## Faza 2
Admin aplikacija treba mijenjati samo `data/*.json` (i tekstove podstranica), nikad `style.css`.
