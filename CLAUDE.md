# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the site

No build step. Open `index.html` directly in a browser — it loads React 18 and Babel from CDN and transpiles `app.jsx` in-browser at runtime.

To serve locally (avoids CORS issues with asset loading):

```
npx serve .
# or
python -m http.server 8080
```

## Architecture

This is a **no-build single-page React app** using Babel standalone for in-browser JSX transpilation.

Load order matters — `index.html` loads scripts in this sequence:
1. `data.js` — populates `window.MENU`, `window.STORE`, `window.OTHER_STORES` as globals
2. `app.jsx` (type="text/babel") — reads those globals and renders the React tree

**`data.js`** is the single source of truth for all content: menu items (name, ingredients, price, accent colour hex, image path), store info (address, hours, phone), and other store locations. Edit here to change any copy or product data.

**`app.jsx`** is one file containing all React components. Component hierarchy:
```
App
├── Nav
├── Hero
├── StoreInfo (expandable hours, feature pills)
├── MenuSection → ProductCard[]  (tab-filtered, add-to-cart)
├── About
├── MapSection
├── OtherStores
├── BrandBar
├── Footer
└── CartDrawer (slide-in overlay, pickup/delivery toggle)
```

Cart state lives in `App` and is passed down. No external state library.

## Design system

`styles/tokens.css` defines all CSS custom properties — colours, type scale, spacing (8pt grid), radii, shadows, transitions. `styles.css` imports it and contains all layout/component CSS. Never hardcode colour or spacing values; always use the tokens.

**Three-font rule** (enforced in tokens):
- `--font-display` (Fraunces) — hero headings only
- `--font-heading` (Archivo) — buttons, labels, ALL CAPS text only
- `--font-body` (Inter) — everything else

**Colour rule**: 60% Cream `#F8F3EE` / 30% Forest Green `#1D391A` / 10% one produce accent at a time. Accent colours are per-drink (see `color` field on each item in `data.js`).

## Adding menu items

Add an object to the relevant category array in `data.js`:
```js
{ name: 'Name', ingr: 'ingredient list', price: 6.00, color: '#HEX', img: 'assets/drinks/filename.png' }
```
Drink images go in `assets/drinks/`. Coffee/tea items omit `img` and use `kind: 'coffee'` or `kind: 'tea'` instead.

## Known placeholders

Several pieces of content are placeholder and need real data from the client:
- Store name, address, phone, hours (in `data.js` → `window.STORE`)
- Other store locations and distances (`window.OTHER_STORES`)
- Hero store photo and About interior photo (currently styled placeholder divs in `app.jsx`)
- Map (currently a decorative grid — no real embed)
- Coffee/tea card images (no PNGs exist; cards render with a cream tile fallback)
- Footer link URLs
