#!/usr/bin/env node
// =============================================================
//  MIREYA ROJAS FENOY — PORTFOLIO BUILD   (zero dependencies)
//  Run:  node build.mjs      →  writes the finished site to ./dist
//  All words, videos and images come from content.js.
// =============================================================
import { mkdir, writeFile, rm, readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { site, ui, motion, projects, illustrations, illustrationHomeCount } from './content.js';

const DIST = path.resolve('./dist');
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const A = (rel, p) => rel + String(p).replace(/^\//, '');               // asset path relative to page depth
const has = (p) => !!p && existsSync(path.join('assets-src', String(p).replace(/^\/assets\//, '')));
const paras = (txt) => String(txt || '').split(/\n\s*\n/).filter(Boolean).map((p) => `<p>${esc(p)}</p>`).join('');

// ------------------------------------------------------------- icons
const ICONS = {
  email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m3 6 9 7 9-7"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM2.8 9.5h4.4V21H2.8zM9.6 9.5h4.2v1.6h.06c.6-1.1 2-2.2 4.1-2.2 4.4 0 5.2 2.9 5.2 6.6V21h-4.4v-5.2c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21H9.6z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.6 6.7a4.8 4.8 0 0 1-3.8-4.2V2h-3.4v13.7a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.4a6.3 6.3 0 1 0 5.4 6.3V9a8.2 8.2 0 0 0 4.8 1.5V7.1c-.3 0-.7-.1-1-.4z"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" fill="currentColor"/></svg>',
  sound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path class="on" d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"/><path class="off" d="m16 9 6 6m0-6-6 6"/></svg>',
  full: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
};

// Hand-drawn style arrows (SVG) used next to section titles, like the PDF.
const ARROW = {
  down: (c) => `<svg class="hand-arrow" viewBox="0 0 70 44" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M3 12C25 1 52 6 58 32"/><path d="M49 26l9 8 5-10"/></svg>`,
  downLeft: (c) => `<svg class="hand-arrow" viewBox="0 0 60 50" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M56 6C34 2 14 12 10 40"/><path d="M3 31l7 10 9-8"/></svg>`,
  up: (c) => `<svg class="hand-arrow up" viewBox="0 0 44 110" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M24 104C16 76 30 44 22 9"/><path d="M11 22 22 7l11 14"/></svg>`,
  loop: (c) => `<svg class="hand-arrow loop" viewBox="0 0 460 80" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 54C40 20 80 10 110 30s40 40 70 20c16-12 10-34-4-30-16 6-2 46 30 48 40 2 50-50 110-40 30 6 40 30 60 28 18-2 18-26 6-28-14-2-14 28 6 34 18 6 40-4 60-12"/><path d="M436 60l14 -6-8 14"/></svg>`,
  back: (c) => `<svg viewBox="0 0 60 24" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M56 13C40 10 22 12 6 12"/><path d="M15 3 5 12l10 9"/></svg>`,
  next: (c) => `<svg viewBox="0 0 60 24" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M4 11c16 3 34 1 50 1"/><path d="M45 3l10 9-10 9"/></svg>`,
};

// ------------------------------------------------------------- shared chrome
function head({ lang, title, desc, pagePath, rel }) {
  const alts = site.langs.map((l) => `<link rel="alternate" hreflang="${l}" href="${site.domain}/${l}/${pagePath}">`).join('\n');
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="${site.themeColor}">
<link rel="canonical" href="${site.domain}/${lang}/${pagePath}">
${alts}
<link rel="alternate" hreflang="x-default" href="${site.domain}/${site.defaultLang}/${pagePath}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${site.domain}/assets/img/tile-6233km.jpg">
<link rel="icon" type="image/png" href="${rel}assets/img/brand/favicon.png">
<link rel="apple-touch-icon" href="${rel}assets/img/brand/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,500..900&family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${rel}assets/styles.css">
</head>
<body>
<a class="skip-link" href="#main">${ui[lang].skip}</a>`;
}

function socialIcons(cls) {
  const s = site.social;
  const items = [
    s.email && `<a href="mailto:${s.email}" aria-label="Email">${ICONS.email}</a>`,
    s.instagram && `<a href="${s.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICONS.instagram}</a>`,
    s.linkedin && `<a href="${s.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${ICONS.linkedin}</a>`,
    s.tiktok && `<a href="${s.tiktok}" target="_blank" rel="noopener" aria-label="TikTok">${ICONS.tiktok}</a>`,
  ].filter(Boolean);
  return `<div class="${cls}">${items.join('')}</div>`;
}

const handLine = (rel, n = 2) =>
  `<div class="hand-line" style="background-image:url('${A(rel, `/assets/img/brand/longline${n}.PNG`)}')" aria-hidden="true"></div>`;
const band = (color) => `<div class="band band-${color}" aria-hidden="true"></div>`;

function header({ lang, rel, pagePath, active }) {
  const t = ui[lang];
  const other = lang === 'en' ? 'es' : 'en';
  const H = (p) => rel + p;
  const item = (key, href, label) =>
    `<li><a href="${H(href)}"${active === key ? ' aria-current="page"' : ''}>${label}</a></li>`;
  return `<header class="site-header">
  <div class="hdr">
    <a class="brand" href="${H(lang + '/')}" aria-label="${esc(site.fullName)} — home">
      <span class="avatar">
        <img class="g1" src="${H('assets/img/brand/mireya1.GIF')}" alt="">
        <img class="g2" src="${H('assets/img/brand/mireya2.GIF')}" alt="">
      </span>
      <span class="brand-text">
        <img class="wordmark" src="${H('assets/img/brand/name.PNG')}" alt="${esc(site.fullName)}">
        <span class="role">${esc(t.role)}</span>
      </span>
    </a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="mainnav" aria-label="Menu"><span></span><span></span><span></span></button>
    <div class="hdr-right" id="mainnav">
      <div class="hdr-top">
        ${socialIcons('social')}
        <a class="pill red contact-pill" href="${H(lang + '/')}#contact">${t.nav.contact}</a>
        <a class="lang" href="${H(other + '/' + pagePath)}" hreflang="${other}" title="${t.otherLangTitle}">${t.otherLangLabel}</a>
      </div>
      <nav aria-label="Main">
        <ul class="nav">
          ${item('motion', lang + '/motion-design/', t.nav.motion)}
          ${item('illustration', lang + '/illustration/', t.nav.illustration)}
          <li class="has-sub">
            <a href="${H(lang + '/')}#projects"${active === 'projects' ? ' aria-current="page"' : ''} aria-haspopup="true">${t.nav.projects}</a>
            <div class="sub">
              ${projects.map((p) => `<a href="${H(lang + '/projects/' + p.slug + '/')}">${esc(p[lang].title)}</a>`).join('<span class="dot" aria-hidden="true"></span>')}
            </div>
          </li>
          ${item('about', lang + '/#about', t.nav.about)}
        </ul>
      </nav>
    </div>
  </div>
  ${handLine(rel)}
</header>`;
}

function footer({ lang, rel }) {
  const t = ui[lang];
  return `<footer class="site-footer">
  <div class="ftr">
    <p class="copy">© ${new Date().getFullYear()} ${esc(site.fullName)}. ${esc(t.footerMade)}</p>
    <div class="ftr-mid">
      <span class="ftr-avatar"><img src="${rel}assets/img/brand/mireya1.GIF" alt=""></span>
      <span class="bubble">${esc(t.hopeFun)}</span>
    </div>
    ${socialIcons('social light')}
    <a class="to-top" href="#top" aria-label="${esc(t.backToTop)}">${ARROW.up('#fff')}</a>
  </div>
</footer>
<script src="${rel}assets/site.js" defer></script>
</body>
</html>`;
}

const page = (o, body) => `${head(o)}\n${header(o)}\n<main id="main"><span id="top"></span>\n${body}\n</main>\n${footer(o)}`;

// Video player block: autoplay muted loop + side controls (sound / full screen).
function playerBlock({ src, poster, rel, t, autoplay = true, cls = '' }) {
  if (!has(src)) {
    return `<div class="player empty ${cls}"${poster && has(poster) ? ` style="background-image:url('${A(rel, poster)}')"` : ''}>
      <span class="play-big">${ICONS.play}</span><span class="soon">${esc(t.mediaSoon)}</span></div>`;
  }
  return `<div class="player ${cls}">
    <video ${autoplay ? 'autoplay muted loop' : ''} playsinline preload="metadata"${poster && has(poster) ? ` poster="${A(rel, poster)}"` : ''}>
      <source src="${A(rel, src)}" type="video/mp4">
    </video>
    <div class="vctl">
      <button class="vbtn snd" aria-pressed="false" aria-label="${esc(t.sound)}" data-on="${esc(t.mute)}" data-off="${esc(t.sound)}">${ICONS.sound}</button>
      <button class="vbtn fs" aria-label="${esc(t.fullscreen)}">${ICONS.full}</button>
    </div>
  </div>`;
}

// Illustration tile (mosaic). Data for the viewer lives in data-* attrs.
function illuTile(item, idx, lang, rel, hidden) {
  const thumb = item.src.replace('/work/', '/work/thumbs/').replace(/\.(png|jpg)$/i, '.jpg');
  const more = (item.more || []).map((m) => A(rel, m)).join('|');
  const desc = lang === 'es' ? item.descEs : item.descEn;
  return `<button class="tile${hidden ? ' is-hidden' : ''}" style="--acc:${item.acc || '#4FA6DF'}" data-idx="${idx}"
    data-full="${A(rel, item.src)}" data-title="${esc(item[lang])}" data-desc="${esc(desc || '')}" data-more="${esc(more)}">
    <img src="${A(rel, has(thumb) ? thumb : item.src)}" alt="${esc(item[lang])}" loading="lazy">
    <span class="cap">${esc(item[lang])}</span>
  </button>`;
}

function viewer(t) {
  return `<div class="viewer" role="dialog" aria-modal="true" aria-label="${esc(t.illustrationTitle)}" hidden>
  <div class="viewer-sheet">
    <button class="v-close" aria-label="${esc(t.close)}"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 5l14 14M19 5 5 19"/></svg></button>
    <button class="v-arrow prev" aria-label="${esc(t.prev)}">${ARROW.back('#FFC21F')}</button>
    <button class="v-arrow next" aria-label="${esc(t.next)}">${ARROW.next('#FFC21F')}</button>
    <figure class="v-main"><img alt=""></figure>
    <h2 class="v-title"></h2>
    <div class="v-desc"></div>
    <div class="v-more"></div>
  </div>
</div>`;
}

// ------------------------------------------------------------- pages
function homePage(lang) {
  const t = ui[lang], rel = '../', o = { lang, rel, pagePath: '', title: `${site.fullName} — ${t.role}`, desc: t.metaHome };
  const stars = ['#FF6BD6', '#FFC21F', '#FF1744', '#AEDD00', '#4FA6DF'];
  const wordColors = ['c-blue', 'c-pink', 'c-yellow', 'c-red', 'c-green'];
  const words = t.words.map((w, i) => `<span class="star" style="color:${stars[i % 5]}">★</span><span class="w ${wordColors[i % 5]}">${esc(w)}</span>`).join('');
  const photos = aboutPhotos;
  const body = `
<section class="hero" id="reel">
  <div class="wrap">
    ${playerBlock({ src: site.demoReel, poster: site.demoReelPoster, rel, t, cls: 'reel' })}
    <div class="hero-foot">
      <a class="pill yellow big" href="${rel}${lang}/motion-design/">${t.viewMore}</a>
      <p class="reel-label">${esc(t.demoReel)}</p>
      ${ARROW.up('#FFC21F')}
    </div>
  </div>
</section>

${band('orange')}

<section class="illu" id="illustration" aria-labelledby="illu-h">
  <div class="wrap">
    <h2 class="sec-title c-blue" id="illu-h">${esc(t.illustrationTitle)} ${ARROW.down('#4FA6DF')}</h2>
    <div class="mosaic" data-gallery>
      ${illustrations.slice(0, illustrationHomeCount).map((it, i) => illuTile(it, i, lang, rel, false)).join('\n')}
    </div>
    <p class="center"><a class="pill blue big" href="${rel}${lang}/illustration/">${t.viewMore}</a></p>
  </div>
</section>

${band('green')}

<section class="projects" id="projects" aria-labelledby="proj-h">
  <div class="wrap">
    <h2 class="sec-title c-pink right" id="proj-h">${ARROW.downLeft('#FF6BD6')} ${esc(t.projectsTitle)}</h2>
    <div class="stack">
      ${projects.map((p) => `<a class="banner" href="${rel}${lang}/projects/${p.slug}/"${has(p.banner) ? ` style="background-image:url('${A(rel, p.banner)}')"` : ''}>
        <span class="banner-in">
          <span class="b-title">${esc(p[lang].title)}</span>
          ${p[lang].role ? `<span class="b-role">${esc(p[lang].role)}</span>` : ''}
          ${p.comingSoon ? `<span class="pill red soon-pill">${esc(t.comingSoon)}</span>` : ''}
        </span>
      </a>`).join('\n')}
    </div>
  </div>
</section>

${band('purple')}

<div class="wordband" aria-hidden="true"><div class="wb-track"><div class="wb-set">${words}${words}</div><div class="wb-set">${words}${words}</div></div></div>
${handLine(rel)}

<section class="about" id="about" aria-labelledby="about-h">
  <div class="about-text">
    <h2 class="sec-title c-white" id="about-h">${esc(t.aboutTitle)} ${ARROW.loop('#FF1744')}</h2>
    ${t.aboutParas.map((p) => `<p>${esc(p)}</p>`).join('\n    ')}
  </div>
  <div class="about-photos" data-interval="${site.aboutInterval}">
    ${photos.map((p, i) => i === 0
      ? `<img class="on" src="${A(rel, p)}" alt="${esc(site.fullName)}">`
      : `<img data-src="${A(rel, p)}" alt="">`).join('\n    ')}
  </div>
</section>
${handLine(rel)}

<section class="contact" id="contact" aria-labelledby="contact-h">
  <div class="wrap contact-head">
    <h2 class="sec-title c-red" id="contact-h">${esc(t.contactTitle)} ${ARROW.down('#FFC21F')}</h2>
    <a class="email-pill" href="mailto:${site.social.email}">${esc(site.social.email)}</a>
  </div>
  <div class="contact-panel">
    <form class="wrap form" name="contact" method="POST" action="/${lang}/thanks/" data-netlify="true" netlify-honeypot="bot-field">
      <input type="hidden" name="form-name" value="contact">
      <p class="hp"><label>Don’t fill this out: <input name="bot-field"></label></p>
      <label class="f-name"><span>${esc(t.form.name)}</span><input name="name" autocomplete="name" required></label>
      <label class="f-email"><span>${esc(t.form.email)}</span><input name="email" type="email" autocomplete="email" required></label>
      <label class="f-msg"><span>${esc(t.form.message)}</span><textarea name="message" rows="7" required></textarea></label>
      <p class="center f-send"><button class="pill yellow" type="submit">${esc(t.form.send)}</button></p>
    </form>
  </div>
  ${handLine(rel)}
</section>
${viewer(t)}`;
  return page(o, body);
}

function illustrationPage(lang) {
  const t = ui[lang], rel = '../../', o = { lang, rel, pagePath: 'illustration/', title: `${t.illustrationTitle} — ${site.fullName}`, desc: t.metaIllustration, active: 'illustration' };
  return page(o, `
<section class="illu page-top">
  <div class="wrap">
    <div class="page-head"><a class="back" href="${rel}${lang}/" aria-label="${esc(t.back)}">${ARROW.back('#4FA6DF')}</a><h1 class="sec-title c-blue">${esc(t.illustrationTitle)}</h1></div>
    <div class="mosaic" data-gallery>
      ${illustrations.map((it, i) => illuTile(it, i, lang, rel, false)).join('\n')}
    </div>
  </div>
</section>
${viewer(t)}`);
}

function motionPage(lang) {
  const t = ui[lang], rel = '../../', o = { lang, rel, pagePath: 'motion-design/', title: `${t.motionTitle} — ${site.fullName}`, desc: t.metaMotion, active: 'motion' };
  return page(o, `
<section class="motion page-top">
  <div class="wrap">
    <div class="page-head"><a class="back" href="${rel}${lang}/" aria-label="${esc(t.back)}">${ARROW.back('#FFC21F')}</a><h1 class="sec-title c-yellow">${esc(t.motionTitle)}</h1></div>
    <div class="vgrid">
      ${motion.map((m) => `<a class="vcard" href="${rel}${lang}/motion-design/${m.slug}/">
        <span class="vthumb">
          <img src="${A(rel, m.poster)}" alt="" loading="lazy">
          ${has(m.preview) ? `<video muted loop playsinline preload="none" data-src="${A(rel, m.preview)}"></video>` : ''}
          <span class="play-big">${ICONS.play}</span>
        </span>
        <span class="vcap">${esc(m[lang].title)}</span>
      </a>`).join('\n')}
    </div>
  </div>
</section>`);
}

function motionDetail(lang, m, i) {
  const t = ui[lang], rel = '../../../', L = m[lang];
  const prev = motion[(i - 1 + motion.length) % motion.length], next = motion[(i + 1) % motion.length];
  const o = { lang, rel, pagePath: `motion-design/${m.slug}/`, title: `${L.title} — ${site.fullName}`, desc: `${L.title} — ${t.metaMotion}`, active: 'motion' };
  return page(o, `
<section class="vdetail">
  <div class="wrap-wide">
    <a class="back light" href="${rel}${lang}/motion-design/" aria-label="${esc(t.back)}">${ARROW.back('#fff')}</a>
    <div class="vd-grid">
      ${playerBlock({ src: m.video, poster: m.poster, rel, t })}
      <div class="vd-text"><h1>${esc(L.title)}</h1>${paras(L.desc)}</div>
    </div>
  </div>
</section>
${handLine(rel)}
<nav class="pager wrap-wide" aria-label="${esc(t.motionTitle)}">
  <a href="${rel}${lang}/motion-design/${prev.slug}/">${ARROW.back('#4FA6DF')}<span>${esc(prev[lang].title)}</span></a>
  <a href="${rel}${lang}/motion-design/${next.slug}/"><span>${esc(next[lang].title)}</span>${ARROW.next('#4FA6DF')}</a>
</nav>`);
}

function projectPage(lang, p) {
  const t = ui[lang], rel = '../../../', L = p[lang];
  const o = { lang, rel, pagePath: `projects/${p.slug}/`, title: `${L.title} — ${site.fullName}`, desc: `${L.title} — ${site.fullName}`, active: 'projects' };
  const imgs = p.images.filter(has);
  const slots = Math.max(0, (p.slots || 0) - imgs.length);
  const grid = imgs.length + slots
    ? `<div class="pgrid">${imgs.map((s) => `<img src="${A(rel, s)}" alt="${esc(L.title)}" loading="lazy">`).join('')}${'<span class="slot"></span>'.repeat(slots)}</div>` : '';
  return page(o, `
<section class="project page-top">
  <div class="wrap">
    <div class="page-head center-head">
      <a class="back" href="${rel}${lang}/#projects" aria-label="${esc(t.back)}">${ARROW.back('#FF6BD6')}</a>
      <h1 class="sec-title c-pink">${esc(L.title)}</h1>
    </div>
    ${L.role ? `<p class="p-role">${esc(L.role)}</p>` : ''}
    ${L.intro ? `<div class="p-intro">${paras(L.intro)}</div>` : ''}
    ${p.comingSoon
      ? `<div class="soon-card"${has(p.poster) ? ` style="background-image:url('${A(rel, p.poster)}')"` : ''}><span class="pill red huge">${esc(t.comingSoon)}</span></div>`
      : playerBlock({ src: p.video, poster: p.poster, rel, t, autoplay: false, cls: 'project-video' })}
    ${L.body ? `<div class="p-body">${paras(L.body)}</div>` : ''}
    ${grid}
  </div>
</section>`);
}

function thanksPage(lang) {
  const t = ui[lang], rel = '../../', o = { lang, rel, pagePath: 'thanks/', title: `${t.thanksTitle} — ${site.fullName}`, desc: t.thanksBody };
  return page(o, `<section class="page-top center thanks"><div class="wrap"><h1 class="sec-title c-red">${esc(t.thanksTitle)}</h1><p>${esc(t.thanksBody)}</p><p><a class="pill yellow" href="${rel}${lang}/">${esc(t.backHome)}</a></p></div></section>`);
}

const notFound = () => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>404 — ${esc(site.fullName)}</title><meta name="robots" content="noindex"><link rel="icon" href="/assets/img/brand/favicon.png">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,500..900&family=Source+Sans+3:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/styles.css"></head><body><main class="page-top center thanks"><div class="wrap">
<img src="/assets/img/brand/mireya1.GIF" alt="" style="width:180px;margin:0 auto 16px">
<h1 class="sec-title c-red">${esc(ui.en.notFoundTitle)}</h1>
<p><a class="pill yellow" href="/en/">${esc(ui.en.notFoundCta)}</a> <a class="pill blue" href="/es/">${esc(ui.es.notFoundCta)}</a></p>
</div></main></body></html>`;

// English is the default language (Mireya's request); ES is one click away.
const rootRedirect = () => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(site.fullName)}</title>
<meta http-equiv="refresh" content="0;url=en/"><link rel="canonical" href="${site.domain}/en/"><script>location.replace('en/'+location.hash)</script></head>
<body><a href="en/">English</a> · <a href="es/">Español</a></body></html>`;

// Netlify only detects forms that exist in the deployed HTML; the contact
// form is in /en/ and /es/, so nothing else is needed here.

// ------------------------------------------------------------- build
async function out(p, content) {
  const full = path.join(DIST, p);
  await mkdir(path.dirname(full), { recursive: true });
  await writeFile(full, content);
}
async function copyOver(from, to) {             // overwrite-friendly copy (no unlink)
  for (const e of await readdir(from, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const src = path.join(from, e.name), dst = path.join(to, e.name);
    if (e.isDirectory()) { await mkdir(dst, { recursive: true }); await copyOver(src, dst); }
    else await writeFile(dst, await readFile(src));
  }
}

let aboutPhotos = [];
console.log('Building Mireya Rojas Fenoy portfolio…');
try { await rm(DIST, { recursive: true, force: true }); } catch { console.log('  (could not clear ./dist — rebuilding over it)'); }
await mkdir(path.join(DIST, 'assets'), { recursive: true });
if (existsSync('./assets-src')) await copyOver('./assets-src', path.join(DIST, 'assets'));
await writeFile(path.join(DIST, 'assets/styles.css'), await readFile('./src/styles.css'));
await writeFile(path.join(DIST, 'assets/site.js'), await readFile('./src/site.js'));

if (existsSync('assets-src/img/about')) {
  aboutPhotos = (await readdir('assets-src/img/about')).filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f)).sort().map((f) => `/assets/img/about/${f}`);
}

await out('index.html', rootRedirect());
await out('404.html', notFound());
const urls = [];
for (const lang of site.langs) {
  await out(`${lang}/index.html`, homePage(lang)); urls.push(`${lang}/`);
  await out(`${lang}/illustration/index.html`, illustrationPage(lang)); urls.push(`${lang}/illustration/`);
  await out(`${lang}/motion-design/index.html`, motionPage(lang)); urls.push(`${lang}/motion-design/`);
  for (const [i, m] of motion.entries()) { await out(`${lang}/motion-design/${m.slug}/index.html`, motionDetail(lang, m, i)); urls.push(`${lang}/motion-design/${m.slug}/`); }
  for (const p of projects) { await out(`${lang}/projects/${p.slug}/index.html`, projectPage(lang, p)); urls.push(`${lang}/projects/${p.slug}/`); }
  await out(`${lang}/thanks/index.html`, thanksPage(lang));
}
await out('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site.domain}/sitemap.xml\n`);
await out('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${site.domain}/${u}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log(`✓ Built ${urls.length + 6} pages into ./dist${has(site.demoReel) ? '' : '  (demo reel not found yet → empty slot shown)'}`);
