/* Mireya Rojas Fenoy — portfolio interactions. No dependencies. */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover)').matches;

  /* ---------- mobile menu ---------- */
  var toggle = $('.nav-toggle'), menu = $('.hdr-right');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }); });
  }

  /* ---------- video players: sound + full screen ---------- */
  $$('.player').forEach(function (p) {
    var v = $('video', p); if (!v) return;
    var snd = $('.snd', p), fs = $('.fs', p);
    if (snd) snd.addEventListener('click', function () {
      v.muted = !v.muted;
      if (!v.muted && v.paused) v.play().catch(function () {});
      snd.setAttribute('aria-pressed', String(!v.muted));
      snd.setAttribute('aria-label', v.muted ? snd.dataset.off : snd.dataset.on);
    });
    if (fs) fs.addEventListener('click', function () {
      if (v.requestFullscreen) v.requestFullscreen();
      else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
    });
    if (reduced && v.autoplay) { v.pause(); v.controls = true; }
  });

  /* ---------- motion design grid: preview plays on hover ---------- */
  $$('.vcard').forEach(function (card) {
    var v = $('video', card); if (!v || !canHover || reduced) return;
    card.addEventListener('pointerenter', function () {
      if (!v.src) v.src = v.dataset.src;
      v.currentTime = 0;
      v.play().then(function () { card.classList.add('playing'); }).catch(function () {});
    });
    card.addEventListener('pointerleave', function () { v.pause(); card.classList.remove('playing'); });
  });

  /* ---------- about: a new photo fades in every few seconds ---------- */
  var photos = $('.about-photos');
  if (photos) {
    var imgs = $$('img', photos), i = 0, every = +photos.dataset.interval || 3000, timer = null;
    var load = function (img) { if (img && img.dataset.src && !img.src) img.src = img.dataset.src; };
    load(imgs[1]);
    var step = function () {
      var next = (i + 1) % imgs.length;
      load(imgs[next]); load(imgs[(next + 1) % imgs.length]);
      var go = function () { imgs[i].classList.remove('on'); imgs[next].classList.add('on'); i = next; };
      if (imgs[next].complete && imgs[next].naturalWidth) go(); else imgs[next].addEventListener('load', go, { once: true });
    };
    var start = function () { if (!timer && imgs.length > 1 && !reduced) timer = setInterval(step, every); };
    var stop = function () { clearInterval(timer); timer = null; };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { en[0].isIntersecting ? start() : stop(); }, { threshold: 0.15 }).observe(photos);
    } else start();
  }

  /* ---------- illustration viewer ---------- */
  var viewer = $('.viewer');
  if (viewer) {
    var tiles = $$('.tile');
    var vImg = $('.v-main img', viewer), vTitle = $('.v-title', viewer), vDesc = $('.v-desc', viewer), vMore = $('.v-more', viewer);
    var sheet = $('.viewer-sheet', viewer), cur = 0, lastFocus = null;
    var show = function (n) {
      cur = (n + tiles.length) % tiles.length;
      var t = tiles[cur];
      vImg.src = t.dataset.full; vImg.alt = t.dataset.title;
      vTitle.textContent = t.dataset.title;
      vDesc.textContent = t.dataset.desc || '';
      vDesc.hidden = !t.dataset.desc;
      vMore.innerHTML = '';
      (t.dataset.more || '').split('|').filter(Boolean).forEach(function (src) {
        var im = document.createElement('img'); im.src = src; im.alt = t.dataset.title; im.loading = 'lazy'; vMore.appendChild(im);
      });
      sheet.scrollTop = 0;
    };
    var open = function (n) {
      lastFocus = document.activeElement;
      show(n); viewer.hidden = false; document.body.style.overflow = 'hidden';
      $('.v-close', viewer).focus();
    };
    var close = function () { viewer.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); };
    tiles.forEach(function (t, n) { t.addEventListener('click', function () { open(n); }); });
    $('.v-close', viewer).addEventListener('click', close);
    $('.v-arrow.prev', viewer).addEventListener('click', function () { show(cur - 1); });
    $('.v-arrow.next', viewer).addEventListener('click', function () { show(cur + 1); });
    viewer.addEventListener('click', function (e) { if (e.target === viewer) close(); });
    document.addEventListener('keydown', function (e) {
      if (viewer.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(cur - 1);
      if (e.key === 'ArrowRight') show(cur + 1);
    });
  }

  /* ---------- gentle reveal on scroll ---------- */
  if (!reduced && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.1 });
    $$('.sec-title, .mosaic .tile, .banner, .vcard, .about-text, .contact-panel').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) return;           // already visible: don't hide it
      el.classList.add('reveal'); io.observe(el);
    });
  }
})();
