# Mireya Rojas Fenoy — Portfolio

Bilingual (EN default / ES) portfolio built from Mireya's "Website Style" PDF.
Zero dependencies — no `npm install`, ever.

```bash
node build.mjs                      # builds the site into ./dist
python3 -m http.server 8000 -d dist # preview at http://localhost:8000
```

Netlify builds it automatically on every push (`netlify.toml`: build
`node build.mjs`, publish `dist`).

## Where things live

| What | Where |
|------|-------|
| All text, video lists, projects, illustrations | `content.js` |
| Videos (MP4, H.264, ≤ ~20 MB each) | `assets-src/media/` |
| Home demo reel | `assets-src/media/demoreel.mp4` (empty slot until it exists) |
| Video posters (thumbnail frames) | `assets-src/img/posters/` |
| About-me photo cycler (all files used, name order) | `assets-src/img/about/` |
| Illustrations (full size / mosaic thumbnails) | `assets-src/img/work/` and `assets-src/img/work/thumbs/` |
| Logo GIFs, name, dashed lines, favicon | `assets-src/img/brand/` |
| Templates · styles · interactions | `build.mjs` · `src/styles.css` · `src/site.js` |

## Pages

- `/en/` home: demo reel → orange band → illustration mosaic (click = viewer)
  → green band → projects (hover opens a banner) → purple band → word band →
  Who is Mireya (photos change every 3 s) → contact form → footer.
- `/en/motion-design/` 6 videos (preview plays on hover) → one blue page each.
- `/en/illustration/` full mosaic + viewer (arrows, Esc, keyboard).
- `/en/projects/6233-km/`, `/en/projects/pup-o-clock/`.
- Same under `/es/`. The root `/` always opens English.

## Adding content

- **New motion video:** compress (e.g. HandBrake "Fast 1080p30"), drop in
  `assets-src/media/`, add an entry to `motion` in `content.js`.
- **Text for a video / project / illustration:** fill `desc`, `intro`,
  `body`, `descEn`/`descEs` in `content.js` (blank = hidden).
- **6233 Km:** put the film at `assets-src/media/6233km.mp4` and stills in
  `assets-src/img/projects/…`, then list them in `projects[0].images`.
- **Contact form:** uses Netlify Forms. In Netlify → Site → Forms, enable
  form detection once, then add Mireya's email under Form notifications.
