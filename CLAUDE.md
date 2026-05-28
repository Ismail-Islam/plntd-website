# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the site

No build step. Open `index.html` directly in a browser — it loads React 18 and Babel from CDN and transpiles `app.jsx` in-browser at runtime.

```
npx serve .        # recommended — avoids CORS issues
python -m http.server 8080
```

Screenshots use Puppeteer. Install once with `npm install puppeteer`, then run `node screenshot-mobile.mjs` to capture mobile views at 390px.

## Architecture

**No-build single-page React app** using Babel standalone for in-browser JSX transpilation.

Load order in `index.html`:
1. `data.js` — populates `window.MENU`, `window.STORE`, `window.OTHER_STORES` as globals
2. `tweaks-panel.jsx` — dev-only design tweaks panel (dark mode toggle)
3. `app.jsx` — reads globals, renders the React tree

**`data.js`** is the single source of truth for all content: menu items (name, ingredients, price, accent colour, image path, allergens, nutrition), store info, and other store locations.

**`app.jsx`** component hierarchy:
```
App
├── Nav
├── StoreHeader (address, open/closed status, expandable hours)
├── MenuSection → ProductCard[]  (tab-filtered by category)
│     └── NutritionModal (allergens + nutrition table, slides up on mobile)
├── BrandBar
├── Footer
└── CartDrawer (slide-in overlay — cart UI exists but ordering not live yet)
```

Cart state lives in `App`. No external state library.

## Design system

`styles/tokens.css` — all CSS custom properties (colours, type scale, 8pt spacing grid, radii, shadows). `styles.css` imports it. Never hardcode values; always use tokens.

**Three-font rule:**
- `--font-display` (Fraunces) — hero headings only
- `--font-heading` (Archivo) — buttons, labels, ALL CAPS text only
- `--font-body` (Inter) — everything else

**Colour rule:** 60% Cream `#F8F3EE` / 30% Forest Green `#1D391A` / 10% one produce accent at a time.

**Mobile:** `overflow-x: hidden` is set globally on `html, body`. The product grid uses `repeat(2, 1fr)` at ≤860px. The nutrition modal slides up from the bottom on mobile (≤520px). CSS specificity note: `.menu-layout .product-grid` (specificity 0,2,0) must be explicitly overridden in every breakpoint — generic `.product-grid` rules won't win.

## Adding menu items

```js
// data.js — add to the relevant category array
{ name: 'Name', ingr: 'ingredient, ingredient', price: 6.00, color: '#HEX', img: 'assets/drinks/filename.png',
  allergens: ['Milk'], nutrition: { kj: 0, kcal: 0, fat: 0, satFat: 0, carbs: 0, sugars: 0, fibre: 0, protein: 0, sodium: 0 } }
```

- Drink images go in `assets/drinks/`
- Coffee/tea items use `img: 'assets/drinks/coffee-name.png'` — **do not add CSS transforms or reposition coffee card images**
- Juice items can include `noAddedSugar: true` to show the "No added sugar" badge in the modal
- Ingredient strings show on hover — no measurements, just names (e.g. `'apple, spinach, ginger'`)
- Nutrition values are estimates; replace with measured data when available

## Deployment

- **Live site:** https://plntdco.com (also https://plntd-website.vercel.app)
- **GitHub:** https://github.com/Ismail-Islam/plntd-website (branch: `main`)
- Deploy: `npx vercel --prod --yes` (Vercel project already linked, auth as `ismail-islam`)
- DNS: A record `@` → `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com` (Namecheap)

## Known placeholders / TODO

- Other store locations (`window.OTHER_STORES` in `data.js`) — currently placeholder data
- Hero photo and About interior photo — styled placeholder divs in `app.jsx`
- Map section — decorative grid, no real embed
- Footer Instagram link points to `instagram.com/plntdlondon`
- All nutrition numbers are estimates — replace with lab-measured values
- Ordering/cart not live yet (no backend); add/cart buttons removed from UI for now
