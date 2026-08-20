#!/usr/bin/env node
// =============================================================
//  MIREYA ROJAS — PORTFOLIO BUILD
//  Zero dependencies. Run:  node build.mjs
//  Reads content.js  →  writes the finished site into ./dist
// =============================================================
import { mkdir, writeFile, rm, readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { site, ui, projects, illustrations } from './content.js';

const DIST = path.resolve('./dist');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// -------------------------------------------------------------
//  PLACEHOLDER ART — playful, deterministic SVGs.
//  Real art replaces these files (same names) in dist… no wait —
//  in /assets-src so they survive rebuilds. See README.
// -------------------------------------------------------------
const PAL = ['#FF2B1F', '#FFD21F', '#56CCF2', '#FF4FC3', '#2FBF71', '#FF8A00', '#2D6CDF'];
function rng(seed) {
  let h = 2166136261;
  for (const c of seed) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return () => { h = Math.imul(h ^ (h >>> 15), 2246822519); h = Math.imul(h ^ (h >>> 13), 3266489917); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
}
function blobChar(r, cx, cy, s, fill) {
  const eye = s * 0.09, mouth = s * 0.22;
  const tilt = (r() * 20 - 10).toFixed(1);
  return `<g transform="rotate(${tilt} ${cx} ${cy})">
    <ellipse cx="${cx}" cy="${cy}" rx="${s * 0.52}" ry="${s * 0.46}" fill="${fill}" stroke="#141414" stroke-width="${s * 0.045}"/>
    <circle cx="${cx - s * 0.16}" cy="${cy - s * 0.08}" r="${eye}" fill="#141414"/>
    <circle cx="${cx + s * 0.16}" cy="${cy - s * 0.08}" r="${eye}" fill="#141414"/>
    <path d="M ${cx - mouth / 2} ${cy + s * 0.12} q ${mouth / 2} ${mouth * 0.7} ${mouth} 0" fill="none" stroke="#141414" stroke-width="${s * 0.045}" stroke-linecap="round"/>
    <circle cx="${cx - s * 0.28}" cy="${cy + s * 0.06}" r="${s * 0.07}" fill="#FF4FC3" opacity=".6"/>
    <circle cx="${cx + s * 0.28}" cy="${cy + s * 0.06}" r="${s * 0.07}" fill="#FF4FC3" opacity=".6"/>
  </g>`;
}
function sparkles(r, w, h, n) {
  let out = '';
  for (let i = 0; i < n; i++) {
    const x = r() * w, y = r() * h, s = 6 + r() * 14, c = PAL[Math.floor(r() * PAL.length)];
    out += r() > 0.5
      ? `<path d="M ${x} ${y - s} L ${x + s * 0.3} ${y - s * 0.3} L ${x + s} ${y} L ${x + s * 0.3} ${y + s * 0.3} L ${x} ${y + s} L ${x - s * 0.3} ${y + s * 0.3} L ${x - s} ${y} L ${x - s * 0.3} ${y - s * 0.3} Z" fill="${c}" opacity=".85"/>`
      : `<circle cx="${x}" cy="${y}" r="${s * 0.4}" fill="${c}" opacity=".8"/>`;
  }
  return out;
}
function placeholderSVG(seed, w, h, label) {
  const r = rng(seed);
  const bg = PAL[Math.floor(r() * PAL.length)];
  let bg2 = PAL[Math.floor(r() * PAL.length)];
  if (bg2 === bg) bg2 = '#F4EAD5';
  const cs = Math.min(w, h);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(label)} (placeholder)">
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <path d="M0 ${h * 0.72} Q ${w * 0.25} ${h * 0.6} ${w * 0.5} ${h * 0.72} T ${w} ${h * 0.72} V ${h} H 0 Z" fill="${bg2}" opacity=".9"/>
  ${sparkles(r, w, h, 7)}
  ${blobChar(r, w / 2, h / 2, cs * 0.62, '#FFFDF7')}
  <g font-family="Arial, sans-serif" text-anchor="middle">
    <text x="${w / 2}" y="${h - cs * 0.06}" font-size="${cs * 0.055}" font-weight="bold" fill="#141414" opacity=".55">${esc(label)} · PLACEHOLDER</text>
  </g>
</svg>`;
}
function logoSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="Mireya Rojas logo">
  <circle cx="50" cy="50" r="46" fill="#56CCF2" stroke="#141414" stroke-width="5"/>
  <circle cx="38" cy="44" r="5" fill="#141414"/>
  <circle cx="62" cy="44" r="5" fill="#141414"/>
  <path d="M 36 60 q 14 14 28 0" fill="none" stroke="#141414" stroke-width="5" stroke-linecap="round"/>
  <circle cx="30" cy="56" r="4.5" fill="#FF4FC3" opacity=".7"/>
  <circle cx="70" cy="56" r="4.5" fill="#FF4FC3" opacity=".7"/>
  <path d="M 24 20 q 6 -10 14 -4 M 62 16 q 8 -6 14 2" stroke="#141414" stroke-width="4" fill="none" stroke-linecap="round"/>
</svg>`;
}
function squiggle(color) {
  return `<svg class="squiggle" viewBox="0 0 520 26" fill="none" aria-hidden="true" preserveAspectRatio="none">
  <path d="M4 13 Q 24 -6 44 13 T 84 13 T 124 13 T 164 13 T 204 13 T 244 13 T 284 13 T 324 13 T 364 13 T 404 13 T 444 13 T 484 13 T 516 13" stroke="${color}" stroke-width="5" stroke-linecap="round"/>
</svg>`;
}
function scallop(fillVar, flip) {
  let bumps = '';
  for (let i = 0; i < 20; i++) bumps += `<circle cx="${i * 56 + 28}" cy="34" r="30"/>`;
  return `<svg class="scallop${flip ? ' flip' : ''}" viewBox="0 0 1120 34" preserveAspectRatio="none" aria-hidden="true"><g fill="${fillVar}">${bumps}</g></svg>`;
}

const ICONS = {
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8h4.6v14.8H.2V8zm7.6 0h4.4v2h.06c.61-1.16 2.1-2.38 4.33-2.38 4.63 0 5.49 3.05 5.49 7.02v8.16h-4.6v-7.23c0-1.72-.03-3.94-2.4-3.94-2.4 0-2.77 1.88-2.77 3.82v7.35H7.8V8z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.21 15.62 2.2 15.24 2.2 12s.01-3.58.07-4.85C2.42 3.92 3.94 2.38 7.19 2.23 8.46 2.21 8.84 2.2 12 2.2zm0 3.63A6.17 6.17 0 1 0 18.17 12 6.17 6.17 0 0 0 12 5.83zm0 10.18A4.01 4.01 0 1 1 16.01 12 4.01 4.01 0 0 1 12 16.01zm6.4-11.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z"/></svg>',
  email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m3 6 9 7 9-7"/></svg>',
};

// -------------------------------------------------------------
//  TEMPLATE HELPERS
// -------------------------------------------------------------
const A = (rel, p) => rel + p.replace(/^\//, ''); // asset path relative to page depth

// Social icons with Mireya's animated doodle underlines on hover.
function socialLinks(cls, rel) {
  const s = site.social;
  const d = (n) => `<img class="ico-doodle" src="${rel}assets/img/brand/doodlesmall${n}.GIF" alt="" aria-hidden="true">`;
  return `<div class="${cls}">
    <a class="social-doodle" href="${s.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICONS.instagram}${d(1)}</a>
    <a class="social-doodle" href="${s.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${ICONS.linkedin}${d(2)}</a>
    <a class="social-doodle" href="mailto:${s.email}" aria-label="Email">${ICONS.email}${d(3)}</a>
  </div>`;
}

function head({ lang, title, desc, pagePath, rel }) {
  const t = ui[lang];
  const alt = site.langs.map((l) => `<link rel="alternate" hreflang="${l}" href="${site.domain}/${l}/${pagePath}">`).join('\n  ');
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="${site.themeColor}">
<link rel="canonical" href="${site.domain}/${lang}/${pagePath}">
${alt}
<link rel="alternate" hreflang="x-default" href="${site.domain}/${site.defaultLang}/${pagePath}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:image" content="${site.domain}/assets/img/og.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/svg+xml" href="${rel}assets/img/logo.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Trochut:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${rel}assets/styles.css">
<script>window.MR_I18N={close:${JSON.stringify(t.lightboxClose)},prev:${JSON.stringify(t.prev)},next:${JSON.stringify(t.next)}};</script>
</head>
<body>
<a class="skip-link" href="#main">${t.skip}</a>`;
}

function header({ lang, rel, pagePath, active }) {
  const t = ui[lang];
  const other = lang === 'en' ? 'es' : 'en';
  const home = `${rel}../${lang}/`; // normalized below
  const H = (p) => `${rel}${p}`;    // path relative to dist root
  const nd = (n) => `<img class="nav-doodle" src="${H('assets/img/brand/doodle' + n + '.GIF')}" alt="" aria-hidden="true">`;
  return `<header class="site-header">
  <div class="wrap">
    <a class="logo" href="${H(lang + '/')}" aria-label="${site.name} — home">
      <span class="logo-gif">
        <img class="g1" src="${H('assets/img/brand/mireya1.GIF')}" alt="" width="64">
        <img class="g2" src="${H('assets/img/brand/mireya2.GIF')}" alt="" width="64">
      </span>
      <img class="wordmark-sm" src="${H('assets/img/brand/name.PNG')}" alt="${site.fullName}">
    </a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="mainnav" aria-label="Menu">☰</button>
    <nav class="main-nav" id="mainnav" aria-label="Main">
      <ul>
        <li><a href="${H(lang + '/')}#reel" ${active === 'motion' ? 'aria-current="true"' : ''}>${t.nav.motion}${nd(1)}</a></li>
        <li><a href="${H(lang + '/illustration/')}" ${active === 'illustration' ? 'aria-current="true"' : ''}>${t.nav.illustration}${nd(2)}</a></li>
        <li class="has-sub">
          <button aria-expanded="false" aria-haspopup="true">${t.nav.animation} ▾${nd(3)}</button>
          <ul class="sub">
            ${projects.map((p) => `<li><a href="${H(lang + '/work/' + p.slug + '/')}">${esc(p[lang].title)}</a></li>`).join('\n            ')}
          </ul>
        </li>
        <li><a href="${H(lang + '/')}#about" ${active === 'about' ? 'aria-current="true"' : ''}>${t.nav.about}${nd(1)}</a></li>
      </ul>
    </nav>
    ${socialLinks('header-social', rel)}
    <a class="lang-switch" href="${H(other + '/' + pagePath)}" title="${t.otherLangTitle}" hreflang="${other}">${t.otherLangLabel}</a>
  </div>
</header>`;
}

function footer({ lang, rel }) {
  const t = ui[lang];
  return `<footer class="site-footer">
  <div class="wrap">
    <p>© ${new Date().getFullYear()} ${site.fullName} · ${t.footerMade}</p>
    ${socialLinks('header-social', rel)}
    <a class="btn ghost" style="color:var(--yellow);border-color:var(--yellow)" href="#top">${t.backToTop} ↑</a>
  </div>
</footer>
<div class="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
  <button class="lb-close" aria-label="${t.lightboxClose}">✕</button>
  <button class="lb-btn prev" aria-label="${t.prev}">‹</button>
  <figure><img src="" alt=""><figcaption></figcaption></figure>
  <button class="lb-btn next" aria-label="${t.next}">›</button>
</div>
<script src="${rel}assets/site.js" defer></script>
</body>
</html>`;
}

// Folk-art pattern border band (Anoosha-style): tulips, daisies, leaves.
function flowerBandSVG() {
  const daisy = (cx) => {
    let petals = '';
    for (let a = 0; a < 360; a += 60) petals += `<ellipse cx="${cx}" cy="12" rx="2.6" ry="5.5" fill="#FFFDF7" stroke="#141414" stroke-width=".6" transform="rotate(${a} ${cx} 17)"/>`;
    return `<g>${petals}<circle cx="${cx}" cy="17" r="3.2" fill="#FFD21F" stroke="#141414" stroke-width=".6"/></g>`;
  };
  const unit = `
    <path d="M45 25 C40 17 40 10 45 5 C50 10 50 17 45 25 Z" fill="#FF2B1F" stroke="#141414" stroke-width=".8"/>
    <path d="M38 11 C35 15 36 20 44 25 C42 18 40 14 38 11 Z" fill="#E01507"/>
    <path d="M52 11 C55 15 54 20 46 25 C48 18 50 14 52 11 Z" fill="#E01507"/>
    <path d="M45 25 L45 35" stroke="#2FBF71" stroke-width="2.4"/>
    <path d="M45 30 C39 27 35 28 33 33 C39 34 43 33 45 30 Z" fill="#2FBF71"/>
    <path d="M45 30 C51 27 55 28 57 33 C51 34 47 33 45 30 Z" fill="#2FBF71"/>
    ${daisy(15)} ${daisy(75)}
    <circle cx="15" cy="31" r="1.8" fill="#FF8A00"/>
    <circle cx="75" cy="31" r="1.8" fill="#FF8A00"/>
    <path d="M28 8 l1.4 3 3 1.4 -3 1.4 -1.4 3 -1.4 -3 -3 -1.4 3 -1.4 Z" fill="#FFD21F"/>
    <path d="M62 8 l1.4 3 3 1.4 -3 1.4 -1.4 3 -1.4 -3 -3 -1.4 3 -1.4 Z" fill="#FFD21F"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 40" width="90" height="40">
  <rect width="90" height="40" fill="#F3E9C0"/>
  ${unit}
</svg>`;
}

// Hand-drawn ornamental frame for the about portrait (Anoosha-style).
function frameSVG() {
  const leaf = (x, y, r) => `<g transform="rotate(${r} ${x} ${y})"><path d="M${x} ${y - 4} C ${x + 3} ${y - 1} ${x + 3} ${y + 1} ${x} ${y + 4} C ${x - 3} ${y + 1} ${x - 3} ${y - 1} ${x} ${y - 4} Z" fill="#E23A16"/></g>`;
  const dot = (x, y) => `<circle cx="${x}" cy="${y}" r="1.4" fill="#E23A16"/>`;
  let motifs = '';
  for (let i = 0; i < 9; i++) {
    const p = 8 + i * 10.5;
    motifs += (i % 2 ? leaf(p, 5, 90) + leaf(p, 95, 90) : dot(p, 5) + dot(p, 95));
    motifs += (i % 2 ? leaf(5, p, 0) + leaf(95, p, 0) : dot(5, p) + dot(95, p));
  }
  const corner = (x, y) => `<path d="M${x} ${y - 3.4} L${x + 3.4} ${y} L${x} ${y + 3.4} L${x - 3.4} ${y} Z" fill="#E23A16"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
  <rect x="1.5" y="1.5" width="97" height="97" fill="none" stroke="#E23A16" stroke-width="1.6"/>
  ${motifs}
  ${corner(5, 5)}${corner(95, 5)}${corner(5, 95)}${corner(95, 95)}
</svg>`;
}

// Artistic sliding word band (the marquee, reborn): chunky display font,
// alternating brand colors, slowly spinning stars between words.
const WORDBAND_WORDS = {
  en: ['Illustration', 'Animation', 'Motion Design', 'Children’s Books', 'Murals', 'Color', 'Play'],
  es: ['Ilustración', 'Animación', 'Motion Design', 'Libros infantiles', 'Murales', 'Color', 'Juego'],
};
function wordband(lang, reverse) {
  const star = `<span class="star" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="M10 0 L12.2 7.8 L20 10 L12.2 12.2 L10 20 L7.8 12.2 L0 10 L7.8 7.8 Z" fill="#FF2B1F"/></svg></span>`;
  const words = WORDBAND_WORDS[lang];
  let chunk = '';
  for (let rep = 0; rep < 2; rep++) {
    chunk += words.map((w, i) => `<span class="w c${(i % 5) + 1}">${esc(w)}</span>${star}`).join('');
  }
  return `<div class="wordband${reverse ? ' reverse' : ''} bleed" aria-hidden="true"><div class="wb-track">${chunk}${chunk}</div></div>`;
}

// Little animated details, Anoosha-style: bobbing stars & sparkles.
function decos(seed) {
  const r = rng(seed);
  const kinds = ['bob', 'spin', 'pulse'];
  let out = '';
  for (let i = 0; i < 4; i++) {
    const c = PAL[Math.floor(r() * PAL.length)];
    const size = 18 + Math.round(r() * 22);
    const top = 5 + Math.round(r() * 70);
    const left = i < 2 ? 2 + Math.round(r() * 10) : 86 + Math.round(r() * 9);
    const kind = kinds[Math.floor(r() * kinds.length)];
    const delay = (r() * 2).toFixed(1);
    out += `<span class="deco ${kind}" aria-hidden="true" style="top:${top}%;left:${left}%;width:${size}px;height:${size}px;animation-delay:-${delay}s">
      <svg viewBox="0 0 20 20"><path d="M10 0 L12.2 7.8 L20 10 L12.2 12.2 L10 20 L7.8 12.2 L0 10 L7.8 7.8 Z" fill="${c}" stroke="#141414" stroke-width="1"/></svg>
    </span>`;
  }
  return out;
}

const illuHref = (rel, lang, item) => `${rel}${lang}/illustration/${item.slug}/`;
const illuImages = (item) => [item.src, ...Array.from({ length: item.extras }, (_, k) => `/assets/img/${item.slug}-${k + 1}.svg`)];

// Static vertical gallery (Beatrice Blue simplicity, Mireya colors):
// masonry columns inside the page wrap (white space at the sides),
// first `visible` items shown, the rest revealed in batches by the
// "see more" button that sits on a fade-out veil.
function masonryGallery(lang, rel, { visible = 6, batch = 6, seemoreLabel = 'See more', scope = '' } = {}) {
  const cards = illustrations.map((item, i) => {
    const acc = item.acc || PAL[i % PAL.length];
    return `<a class="card${i >= visible ? ' is-hidden' : ''}" style="--acc:${acc}" href="${illuHref(rel, lang, item)}" aria-label="${esc(item[lang])}">
      <img src="${A(rel, item.src)}" alt="${esc(item[lang])}" loading="lazy">
      <span class="card-cap">${esc(item[lang])}</span>
    </a>`;
  }).join('\n');
  const veil = visible < illustrations.length
    ? `<div class="fade-veil"><button class="btn red" data-seemore="${scope} .masonry" data-batch="${batch}">${seemoreLabel} ↓</button></div>`
    : '';
  return `<div class="gallery-clip">
    <div class="masonry">
${cards}
    </div>
    ${veil}
  </div>`;
}

function illuCard(item, lang, rel, hidden) {
  return `<figure class="card${hidden ? ' is-hidden' : ''}" data-full="${A(rel, item.src)}" data-caption="${esc(item[lang])}" tabindex="0" role="button" aria-label="${esc(item[lang])}">
    <img src="${A(rel, item.src)}" alt="${esc(item[lang])}" loading="lazy">
    <figcaption>${esc(item[lang])}</figcaption>
  </figure>`;
}

// -------------------------------------------------------------
//  PAGES
// -------------------------------------------------------------
function homePage(lang) {
  const t = ui[lang];
  const rel = '../';
  const pagePath = '';
  return `${head({ lang, title: `${site.name} — 2D Artist & Animator`, desc: t.metaHome, pagePath, rel })}
${header({ lang, rel, pagePath, active: 'motion' })}
<main id="main">
<span id="top"></span>

<!-- HERO / SHOWREEL — “video plays as the page opens” -->
<section class="hero" id="reel" style="position:relative">
  ${decos('hero')}
  <div class="wrap hero-inner">
    <h1 class="hero-name"><img src="${A(rel, '/assets/img/brand/name.PNG')}" alt="${site.fullName.toUpperCase()}"></h1>
    <p class="kicker">${lang === 'en' ? '2D artist &amp; animator — bright colors, big smiles, stories in motion.' : 'Artista 2D y animadora — colores vivos, sonrisas grandes, historias en movimiento.'}</p>
    <div class="reel">
      <video autoplay muted loop playsinline poster="${A(rel, '/assets/img/poster-showreel.svg')}" aria-label="Showreel">
        <source src="${A(rel, '/assets/media/showreel.mp4')}" type="video/mp4">
        <img class="poster" src="${A(rel, '/assets/img/poster-showreel.svg')}" alt="${esc(t.showreelNote)}">
      </video>
    </div>
    <p style="margin-top:1.4em"><a class="btn" href="#illustration">${t.viewMore} ↓</a></p>
  </div>
</section>

${squiggle('#FF4FC3')}

<!-- ILLUSTRATION — static vertical gallery: white side margins, bottom fade, "see more" -->
<section id="illustration" aria-labelledby="illu-h">
  <div class="wrap wrap-wide">
    <div class="section-head" data-reveal>
      <h2 id="illu-h" class="squig-under" style="color:var(--red)">${t.illustrationTitle}</h2>
      <p>${t.illustrationIntro}</p>
    </div>
    ${masonryGallery(lang, rel, { visible: 6, batch: 6, seemoreLabel: t.viewMore, scope: '#illustration' })}
    <p class="gallery-hint">${t.galleryHint}</p>
  </div>
</section>

${wordband(lang, false)}

<!-- ANIMATION — full-screen curtain: hovered panel opens, the others shrink -->
<section id="animation" aria-labelledby="anim-h">
  <div class="wrap">
    <div class="section-head" data-reveal>
      <h2 id="anim-h" class="squig-under" style="color:var(--orange)">${t.animationTitle}</h2>
      <p>${t.animationIntro}</p>
    </div>
  </div>
  <div class="curtain bleed">
${projects.map((p) => `    <a class="tile" href="${rel}${lang}/work/${p.slug}/">
      <img class="tile-img" src="${A(rel, p.tileImage)}" alt="">
      <video class="tile-video" muted loop playsinline preload="none">
        <source src="${A(rel, p.video)}" type="video/mp4">
      </video>
      ${p.comingSoon ? `<span class="tile-tag">${t.comingSoon}</span>` : ''}
      <span class="tile-label"><span>${esc(p[lang].title)}</span></span>
    </a>`).join('\n')}
  </div>
  <div class="wrap">
    <p class="center" style="margin-top:1.6em"><a class="btn yellow" href="${rel}${lang}/work/${projects[0].slug}/">${t.viewMore}</a></p>
  </div>
</section>

${squiggle('#FF8A00')}

<!-- WHO AM I — scalloped cream band per wireframe -->
<section class="about" id="about" aria-labelledby="about-h">
  ${scallop('#F4EAD5', false)}
  <div class="about-band" style="position:relative">
    ${decos('about')}
    <div class="wrap about-grid">
      <div data-reveal>
        <h2 id="about-h" class="squig-under">${t.aboutTitle}</h2>
        ${t.aboutParas.map((p) => `<p>${p}</p>`).join('\n        ')}
        <p style="margin-top:1.4em"><a class="btn" href="#contact">${t.aboutCta} →</a></p>
      </div>
      <div class="about-art" data-reveal>
        <div class="fancy-frame">
          <img src="${A(rel, '/assets/img/frame.svg')}" alt="" class="frame-art" aria-hidden="true">
          <img src="${A(rel, '/assets/img/about-mireya.svg')}" alt="${lang === 'en' ? 'Illustrated self-portrait of Mireya (placeholder)' : 'Autorretrato ilustrado de Mireya (placeholder)'}" width="420" height="420">
        </div>
      </div>
    </div>
  </div>
  ${scallop('#F4EAD5', true)}
</section>

<!-- CONTACT -->
<section class="contact" id="contact" aria-labelledby="contact-h">
  <div class="wrap" data-reveal>
    <h2 id="contact-h" class="squig-under">${t.contactTitle}</h2>
    <p style="max-width:52ch;margin:0 auto 1.2em">${t.contactBlurb}</p>
    <p class="arrows" aria-hidden="true">↘ ↙</p>
    <p>
      <a class="btn red" href="mailto:${site.social.email}">${t.contactButton}</a>
      <a class="btn" href="#illustration">${t.contactWork} ↑</a>
    </p>
    ${socialLinks('contact-socials', rel)}
  </div>
</section>

${wordband(lang, true)}

</main>
${footer({ lang, rel })}`;
}

function illustrationPage(lang) {
  const t = ui[lang];
  const rel = '../../';
  const pagePath = 'illustration/';
  return `${head({ lang, title: `${t.illustrationTitle} — ${site.name}`, desc: t.metaIllustration, pagePath, rel })}
${header({ lang, rel, pagePath, active: 'illustration' })}
<main id="main">
<span id="top"></span>
<section class="project-hero">
  <div class="wrap">
    <h1>${t.illustrationTitle}</h1>
    <p class="tagline">${t.illustrationIntro}</p>
  </div>
</section>
${squiggle('#FF4FC3')}
<section>
  <div class="wrap wrap-wide">
    ${masonryGallery(lang, rel, { visible: illustrations.length })}
    <p class="gallery-hint">${t.galleryHint}</p>
  </div>
</section>
</main>
${footer({ lang, rel })}`;
}

// Illustration detail page — blue backdrop, big image, side arrows cycle it,
// more images appear as you scroll (per Mireya's wireframe note: “when
// clicking the illustration it will go big… about 5 images will have this”).
function illuDetailPage(lang, item) {
  const t = ui[lang];
  const rel = '../../../';
  const pagePath = `illustration/${item.slug}/`;
  const imgs = illuImages(item);
  const idx = illustrations.indexOf(item);
  const prev = illustrations[(idx - 1 + illustrations.length) % illustrations.length];
  const next = illustrations[(idx + 1) % illustrations.length];
  const hasMany = imgs.length > 1;
  return `${head({ lang, title: `${item[lang]} — ${site.name}`, desc: `${item[lang]} — ${t.metaIllustration}`, pagePath, rel })}
${header({ lang, rel, pagePath, active: 'illustration' })}
<main id="main">
<span id="top"></span>
<div class="illu-page bleed">
  <div class="wrap">
    <h1>${esc(item[lang])}</h1>
    <div class="illu-stage">
      ${hasMany ? `<button class="illu-arrow prev" aria-label="${t.prev}">‹</button>` : ''}
      <img class="illu-featured" src="${A(rel, imgs[0])}" alt="${esc(item[lang])}">
      ${hasMany ? `<button class="illu-arrow next" aria-label="${t.next}">›</button>` : ''}
    </div>
    ${hasMany ? `<p class="illu-counter">1 / ${imgs.length}</p>
    <p class="illu-more">↓ ${t.moreOfProject} ↓</p>
    <div class="illu-grid">
      ${imgs.map((s, k) => `<button aria-label="${esc(item[lang])} ${k + 1}" aria-current="${k === 0}"><img src="${A(rel, s)}" alt="" loading="lazy"></button>`).join('\n      ')}
    </div>` : ''}
  </div>
</div>
<div class="wrap">
  <nav class="pager" aria-label="${t.illustrationTitle}">
    <a class="btn ghost" href="${illuHref(rel, lang, prev)}">← ${esc(prev[lang])}</a>
    <a class="btn" href="${rel}${lang}/illustration/">${t.backToGallery}</a>
    <a class="btn ghost" href="${illuHref(rel, lang, next)}">${esc(next[lang])} →</a>
  </nav>
</div>
</main>
${footer({ lang, rel })}`;
}

function projectPage(lang, p) {
  const t = ui[lang];
  const rel = '../../../';
  const pagePath = `work/${p.slug}/`;
  const L = p[lang];
  const pi = projects.indexOf(p);
  const prevP = projects[(pi - 1 + projects.length) % projects.length];
  const nextP = projects[(pi + 1) % projects.length];
  let body = '';
  if (p.layout === 'grid' && p.gallery) {
    body = `<div class="project-gallery stack" data-gallery>
${p.gallery.map((g, i) => `      <figure class="card" data-full="${A(rel, g)}" data-caption="${esc(L.title)} — ${i + 1}" tabindex="0" role="button" aria-label="${esc(L.title)} ${i + 1}">
        <img src="${A(rel, g)}" alt="${esc(L.title)} — ${i + 1}" loading="lazy">
      </figure>`).join('\n')}
    </div>`;
  } else if (p.layout === 'slides' && p.slideshows) {
    body = p.slideshows.map((show, si) => `<div class="slideshow" aria-roledescription="carousel">
      <div class="slides-track">
${show.map((s) => `        <img src="${A(rel, s)}" alt="${esc(L.title)} — slide" loading="lazy">`).join('\n')}
      </div>
      <button class="slide-btn prev" aria-label="${t.prev}">‹</button>
      <button class="slide-btn next" aria-label="${t.next}">›</button>
      <div class="slide-dots">${show.map((_, di) => `<button aria-label="Slide ${di + 1}" aria-current="${di === 0}"></button>`).join('')}</div>
    </div>`).join('\n');
  }
  return `${head({ lang, title: `${L.title} — ${site.name}`, desc: L.metaDescription, pagePath, rel })}
${header({ lang, rel, pagePath, active: 'animation' })}
<main id="main">
<span id="top"></span>
<section class="project-hero">
  <div class="wrap">
    <h1>${esc(L.title)}</h1>
    <p class="tagline">${esc(L.tagline)}</p>
    ${p.comingSoon ? `<p class="coming-soon">🎬 ${t.comingSoonNote}</p>` : ''}
    <div class="reel" style="margin-top:1.6em">
      <video controls playsinline poster="${A(rel, p.poster)}" preload="metadata">
        <source src="${A(rel, p.video)}" type="video/mp4">
        <img class="poster" src="${A(rel, p.poster)}" alt="${esc(L.title)}">
      </video>
    </div>
    <div class="project-desc"><p>${L.description}</p></div>
    ${body}
    <nav class="pager" aria-label="${t.animationTitle}">
      <a class="btn ghost" href="${rel}${lang}/work/${prevP.slug}/">← ${esc(prevP[lang].title)}</a>
      <a class="btn" href="${rel}${lang}/#animation">${t.backToWork}</a>
      <a class="btn ghost" href="${rel}${lang}/work/${nextP.slug}/">${esc(nextP[lang].title)} →</a>
    </nav>
  </div>
</section>
</main>
${footer({ lang, rel })}`;
}

function notFoundPage() {
  // Bilingual 404 served from site root
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>404 — ${site.name}</title>
<meta name="robots" content="noindex">
<link rel="icon" type="image/svg+xml" href="/assets/img/logo.svg">
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Source+Sans+3:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/styles.css">
</head>
<body>
<main class="page-404 wrap">
  <img src="/assets/img/logo.svg" alt="" width="110" height="110" style="margin:0 auto 20px">
  <h1>${ui.en.notFoundTitle}</h1>
  <p>${ui.en.notFoundBody}<br><span lang="es">${ui.es.notFoundBody}</span></p>
  <p style="margin-top:2em">
    <a class="btn" href="/en/">${ui.en.notFoundCta}</a>
    <a class="btn yellow" href="/es/" lang="es">${ui.es.notFoundCta}</a>
  </p>
</main>
</body></html>`;
}

function rootRedirect() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${site.name}</title>
<meta name="robots" content="noindex">
<script>
  var l = (navigator.language || 'en').slice(0, 2).toLowerCase();
  location.replace((l === 'es' ? 'es' : 'en') + '/');
</script>
<meta http-equiv="refresh" content="1;url=en/">
</head>
<body>
<p><a href="en/">English</a> · <a href="es/">Español</a></p>
</body></html>`;
}

// -------------------------------------------------------------
//  BUILD
// -------------------------------------------------------------
async function out(p, content) {
  const full = path.join(DIST, p);
  await mkdir(path.dirname(full), { recursive: true });
  await writeFile(full, content);
}
// overwrite-friendly copy (never unlinks, so it works on restricted mounts)
async function copyOver(from, to) {
  for (const e of await readdir(from, { withFileTypes: true })) {
    const src = path.join(from, e.name), dst = path.join(to, e.name);
    if (e.isDirectory()) { await mkdir(dst, { recursive: true }); await copyOver(src, dst); }
    else await writeFile(dst, await readFile(src));
  }
}

console.log('Building Mireya Rojas portfolio…');
try { await rm(DIST, { recursive: true, force: true }); }
catch { console.log('  (could not clear ./dist — rebuilding over it)'); }

// 1) placeholder / static assets
await out('assets/img/logo.svg', logoSVG());
await out('assets/img/frame.svg', frameSVG());
await out('assets/img/about-mireya.svg', placeholderSVG('about', 640, 640, 'Mireya'));
await out('assets/img/poster-showreel.svg', placeholderSVG('showreel', 1280, 720, 'Showreel'));
for (const p of projects) {
  await out(p.tileImage.replace('/assets/', 'assets/'), placeholderSVG('tile-' + p.slug, 640, 800, p.en.title));
  await out(p.poster.replace('/assets/', 'assets/'), placeholderSVG('poster-' + p.slug, 1280, 720, p.en.title));
  for (const g of p.gallery || []) await out(g.replace('/assets/', 'assets/'), placeholderSVG(g, 800, 600, p.en.title));
  for (const show of p.slideshows || []) for (const s of show) await out(s.replace('/assets/', 'assets/'), placeholderSVG(s, 1280, 720, p.en.title));
}
const RATIO = { tall: [640, 860], wide: [860, 580], square: [700, 700] };
for (const it of illustrations) {
  const [w, h] = RATIO[it.ratio] || RATIO.square;
  await out(it.src.replace('/assets/', 'assets/'), placeholderSVG(it.src, w, h, it.en));
  for (let k = 1; k <= it.extras; k++) {
    await out(`assets/img/${it.slug}-${k}.svg`, placeholderSVG(`${it.slug}-${k}`, 900, 675, `${it.en} ${k}`));
  }
}
// media slots: real MP4s go in assets/media/ with these names
await out('assets/media/README.txt',
  `Drop real videos here (same filenames referenced in content.js):
  showreel.mp4      — home hero reel (plays automatically, keep it short + muted-friendly)
  6233km.mp4        — “6233 KM” project film
  animations.mp4    — animations compilation
  pupoclock.mp4     — Pup O'Clock reel
Tip: export H.264 MP4, ~8–15 Mbps for the reel, and compress with Handbrake.`);

// user overrides: anything in ./assets-src is copied over the placeholders
if (existsSync('./assets-src')) await copyOver('./assets-src', path.join(DIST, 'assets'));

// 2) shared css/js
await writeFile(path.join(DIST, 'assets/styles.css'), await readFile('./src/styles.css'));
await writeFile(path.join(DIST, 'assets/site.js'), await readFile('./src/site.js'));

// 3) pages
await out('index.html', rootRedirect());
await out('404.html', notFoundPage());
for (const lang of site.langs) {
  await out(`${lang}/index.html`, homePage(lang));
  await out(`${lang}/illustration/index.html`, illustrationPage(lang));
  for (const it of illustrations) await out(`${lang}/illustration/${it.slug}/index.html`, illuDetailPage(lang, it));
  for (const p of projects) await out(`${lang}/work/${p.slug}/index.html`, projectPage(lang, p));
}

// 4) robots + sitemap
const urls = [];
for (const lang of site.langs) {
  urls.push(`${lang}/`, `${lang}/illustration/`);
  for (const it of illustrations) urls.push(`${lang}/illustration/${it.slug}/`);
  for (const p of projects) urls.push(`${lang}/work/${p.slug}/`);
}
await out('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site.domain}/sitemap.xml\n`);
await out('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map((u) => {
  const other = u.startsWith('en') ? u.replace(/^en/, 'es') : u.replace(/^es/, 'en');
  return `  <url><loc>${site.domain}/${u}</loc>
    <xhtml:link rel="alternate" hreflang="${u.slice(0, 2)}" href="${site.domain}/${u}"/>
    <xhtml:link rel="alternate" hreflang="${other.slice(0, 2)}" href="${site.domain}/${other}"/>
  </url>`;
}).join('\n')}
</urlset>\n`);

console.log('✓ Built to ./dist — open dist/en/index.html (or serve dist/ and visit /)');
