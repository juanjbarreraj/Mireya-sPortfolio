# Mireya Rojas Fenoy — Portfolio

Bilingual (EN/ES) portfolio for 2D artist & animator Mireya Rojas Fenoy, built
from her layout PDF. **Zero dependencies** — no `npm install`, ever.

## Run it

```bash
node build.mjs        # builds the whole site into ./dist
npx serve dist        # or: python3 -m http.server -d dist 8000
```

You can also just open `dist/en/index.html` directly in a browser — all paths
are relative, so it works from the filesystem too.

## How it's organized

| File / folder      | What it is |
|--------------------|------------|
| `content.js`       | **The only file you edit day-to-day.** Every text string (EN + ES), every project, every illustration. |
| `build.mjs`        | Build script + HTML templates + placeholder-art generator. |
| `src/styles.css`   | All styling (design tokens at the top in `:root`). |
| `src/site.js`      | Interactions: lightbox, slideshows, dropdown, view-more, hover-videos. |
| `assets-src/`      | **Put real artwork here.** Anything in this folder is copied over the generated placeholders on build (same relative paths, e.g. `assets-src/img/illu-01.png`). |
| `dist/`            | The generated site. Never edit by hand — it's wiped on every build. |

## Swapping in Mireya's real content

1. **Videos** — drop into `assets-src/media/` as `showreel.mp4`, `6233km.mp4`,
   `animations.mp4`, `pupoclock.mp4` (H.264 MP4; keep the showreel short —
   it autoplays muted).
2. **Illustrations** — save images into `assets-src/img/` and update the
   `src:` paths in `content.js` (PNG/JPG/WebP all fine; `ratio:` controls the
   masonry shape).
3. **Copy** — search `content.js` for `PLACEHOLDER` and replace each with the
   real project description (EN and ES fields sit next to each other).
4. **Links** — update `site.social` (LinkedIn / Instagram / TikTok / email)
   and `site.domain` in `content.js`.
5. Run `node build.mjs` again.

## Design decisions (from Mireya's PDF)

- **Fonts**: her picks are Adobe fonts (Acumin Variable Black / Myriad).
  Free web substitutes used: **Archivo Black** (titles) + **Source Sans 3**
  (text) via Google Fonts. If she has an Adobe Fonts (Typekit) embed code,
  swap the `<link>` in `build.mjs` → `head()` and update `--font-title` /
  `--font-body` in `styles.css`.
- **Colors**: red / yellow / cream mains + playful accents, in `:root` of
  `styles.css`.
- Wireframe behaviors implemented: hover-line nav, Animation dropdown,
  autoplay showreel, lightbox on cyan 80% backdrop with arrows, 30%→0% dark
  overlay + hover-video on animation panels, scalloped "Who am I?" band,
  squiggle dividers, auto-advancing slideshows with arrows on the Animations
  page, "coming soon" note on Pup O'Clock.

## v2 — living gallery, curtain & scroll effects

- **Living infinite gallery** (home Illustration section + Illustration
  page): full-screen strip where every card constantly morphs width/height
  (always rectangular; images re-crop via `object-fit: cover`) and loops
  forever. Interactions are deliberately limited: park the cursor near the
  left/right edge, or click the round side arrows — normal page scrolling
  passes straight through. **Clicking a card opens that illustration's own
  page.** Tuning: size/speed ranges in `liveGallery()` in `build.mjs`;
  drift/edge/arrow speeds in `site.js`. Animations pause off-screen.
- **Illustration detail pages** (`/{lang}/illustration/{slug}/`): blue
  backdrop per Mireya's wireframe — big featured image, side arrows cycle
  through the project's images, more images appear as you scroll and set
  the featured one on click. `extras: N` in `content.js` controls how many
  extra images a project has (0 = single-image page); files are
  `assets-src/img/{slug}-1…N`. Prev/next pagers link every page to its
  neighbours (Anoosha-style “several ways to the same place”).
- **Curtain animation section** (home): the 3 projects are full-height
  vertical panels; hovering opens one like a curtain (`flex-grow 2.6`) while
  the others shrink — per Mireya's mock. Hover lifts the 30% overlay and
  plays the panel's preview video; click goes to the project page. The
  6233 KM / Pup O'Clock pages stack their pictures full-width under the
  video (wireframe note: “six pics under the video, gotta scroll down”).
- **Little animated details** (Anoosha-inspired): bobbing/spinning sparkle
  stars in the hero and about sections, nav links that lift on hover,
  springy buttons. **Beatrice Blue-inspired simplicity**: detail pages are
  just title + art + navigation, no clutter.
- **Scroll effects**: rainbow scroll-progress bar, hero showreel parallax,
  springy pop-in reveals. All disabled under `prefers-reduced-motion`
  (gallery becomes a plain scrollable strip).

## Deploying

`dist/` is a plain static site — drag-and-drop to **Netlify**, or point
**Vercel** / **GitHub Pages** / **Cloudflare Pages** at the repo with build
command `node build.mjs` and output directory `dist`.

Before launch: set the real `site.domain` in `content.js` (canonical/hreflang/
sitemap use it), and replace `assets/img/og.png` reference with a real social
share image (1200×630 PNG) at `assets-src/img/og.png`.

## SEO / accessibility already handled

Per-page titles + meta descriptions in both languages, canonical + `hreflang`
alternates, sitemap.xml + robots.txt, semantic landmarks, skip-link, keyboard-
operable lightbox & menus, `prefers-reduced-motion` support, lazy-loaded
images.
