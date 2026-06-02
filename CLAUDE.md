# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the site

No build step. Serve the folder and open a page in a browser:

```
npx serve .        # recommended — avoids CORS issues (the menu page fetches data.js)
python -m http.server 8080
```

`npx serve` honours `vercel.json` clean URLs locally, so `/menu`, `/story`, `/app` resolve.

Screenshots use Puppeteer (`npm install puppeteer`). The repo has ad-hoc capture scripts in the
root (`shot-*.mjs`, `screenshot*.mjs`) — most take a URL + label, e.g.
`node shot-mobile.mjs http://localhost:3000/ label`. They're dev-only and uncommitted-friendly.

## Pages & routing

This is a **multi-page static site**, not a single SPA. Each top-level page is its own `.html`
file. Routing/clean-URLs are configured in `vercel.json` (`cleanUrls: true`, plus rewrites).

| URL | File | What it is |
|-----|------|------------|
| `/` | `index.html` | **Homepage** — full-screen liquid-pour video hero (see below) |
| `/home` | `home.html` | **Exact mirror of `index.html`** (a `/home → /index.html` rewrite 404'd on the alias, so it's a real copy) |
| `/menu` | `menu.html` | The React menu app (rewrite `/menu → /menu.html`) |
| `/story` | `story.html` | Brand / our-story page |
| `/app` | `app.html` | App page |
| `/landing` | `landing.html` | Older hero experiment (video, holds a frame). Superseded by the homepage — candidate for removal |

> ⚠️ **`home.html` must be kept byte-identical to `index.html`.** Any homepage edit has to be
> applied to **both** files or the two routes drift.

## Homepage hero (`index.html` / `home.html`)

Self-contained page (inline `<style>` + `<script>`, Archivo from Google Fonts — no React, no
tokens.css). Layer stack: full-bleed `<video>` (`assets/video/juice-pour.mp4`) → `.settled-liquid`
flat fill → `.grain` → `.nav-mask` (cream strip hiding the video behind the nav) → hero content →
nav. There is also a mobile hamburger drawer.

Behaviour: the juice video pours up on load; when it finishes (target level **or** clip end), the
`.settled-liquid` element fades in — a **deterministic flat juice gradient** filling from a fixed
line under the nav (`REST_Y`, tucked into the nav-mask fade) to the bottom. This gives a clean
flat waterline on every viewport. The `PLNTDco.` headline recolors dark→cream as the waterline
crosses it. A `prefers-reduced-motion` path skips the pour and shows the filled state.

> Pixel-detecting the video waterline was tried and abandoned — the green glow under the nav mask
> fooled it differently per viewport. Don't reintroduce detection-based band placement; the fixed
> `REST_Y` flat fill is intentional.

Source prototypes for the hero variants live in `~/Downloads/PLNTD Website (1|2|3)/`.

## The menu app (`menu.html`)

**No-build React app** using Babel standalone for in-browser JSX transpilation.

Load order in `menu.html`:
1. `data.js` — populates `window.MENU`, `window.STORE`, `window.OTHER_STORES` as globals
2. `tweaks-panel.jsx` — dev-only design tweaks panel (dark mode toggle)
3. `app.jsx` — reads globals, renders the React tree

**`data.js`** is the single source of truth for all content: menu items (name, ingredients, price,
accent colour, image path, allergens, nutrition), store info, and other store locations.

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

`styles/tokens.css` — all CSS custom properties (colours, type scale, 8pt spacing grid, radii,
shadows). `styles.css` imports it; the menu app uses it. Never hardcode values; use tokens.
(The standalone hero pages predate this and use inline values — that's expected.)

**Three-font rule:**
- `--font-display` (Fraunces) — hero headings only
- `--font-heading` (Archivo) — buttons, labels, ALL CAPS text only
- `--font-body` (Inter) — everything else

**Colour rule:** 60% Cream `#F8F3EE` / 30% Forest Green `#1D391A` / 10% one produce accent at a time.

**Mobile:** `overflow-x: hidden` is set globally on `html, body`. The menu product grid uses
`repeat(2, 1fr)` at ≤860px. The nutrition modal slides up from the bottom on mobile (≤520px).
CSS specificity note: `.menu-layout .product-grid` (specificity 0,2,0) must be explicitly
overridden in every breakpoint — generic `.product-grid` rules won't win.

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
- **Always commit assets (images, video) before deploying** — a past deploy wiped deploy-only
  coffee images that were never in git.

## Known placeholders / TODO

- `/landing` is a stale hero experiment — decide whether to remove it
- Other store locations (`window.OTHER_STORES` in `data.js`) — currently placeholder data
- Map section — decorative grid, no real embed
- Footer Instagram link points to `instagram.com/plntdlondon`
- All nutrition numbers are estimates — replace with lab-measured values
- Ordering/cart not live yet (no backend); add/cart buttons removed from UI for now
