/* Mireya Rojas portfolio — interactions. No dependencies. */
(function () {
  'use strict';
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const I18N = window.MR_I18N || { close: 'Close', prev: 'Previous', next: 'Next' };

  /* ---------- mobile nav ---------- */
  const toggle = $('.nav-toggle');
  const nav = $('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  /* ---------- animation dropdown (click + keyboard; hover handled in CSS) ---------- */
  $$('.has-sub').forEach((li) => {
    const btn = $(':scope > button', li);
    if (!btn) return;
    btn.addEventListener('click', () => {
      const open = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { li.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
    });
  });
  document.addEventListener('click', (e) => {
    $$('.has-sub.open').forEach((li) => {
      if (!li.contains(e.target)) { li.classList.remove('open'); const b = $(':scope > button', li); if (b) b.setAttribute('aria-expanded', 'false'); }
    });
  });

  /* ---------- lightbox (blue 80% bg, arrows — per Mireya's wireframe) ---------- */
  const lb = $('.lightbox');
  if (lb) {
    const lbImg = $('.lightbox img');
    const lbCap = $('.lightbox figcaption');
    let items = [];
    let idx = 0;
    let lastFocus = null;

    function collect(card) {
      const scope = card.closest('[data-gallery]') || document;
      // exclude infinite-gallery clones so each artwork appears once
      return $$('.card[data-full]', scope).filter((c) => !c.closest('[data-clone]'));
    }
    function show(i) {
      idx = (i + items.length) % items.length;
      const el = items[idx];
      lbImg.src = el.getAttribute('data-full');
      lbImg.alt = el.getAttribute('data-caption') || '';
      lbCap.textContent = el.getAttribute('data-caption') || '';
    }
    function open(card) {
      items = collect(card);
      lastFocus = card;
      let i = items.indexOf(card);
      if (i < 0 && card.dataset.idx !== undefined) i = items.findIndex((o) => o.dataset.idx === card.dataset.idx);
      show(Math.max(0, i));
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
      $('.lb-close', lb).focus();
    }
    function close() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.card[data-full]');
      if (card) { e.preventDefault(); open(card); }
    });
    document.addEventListener('keydown', (e) => {
      const card = e.target.closest && e.target.closest('.card[data-full]');
      if (card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); open(card); }
    });
    $('.lb-close', lb).addEventListener('click', close);
    $('.lb-btn.prev', lb).addEventListener('click', () => show(idx - 1));
    $('.lb-btn.next', lb).addEventListener('click', () => show(idx + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  /* ---------- hover video on animation tiles ---------- */
  $$('.tile').forEach((tile) => {
    const video = $('video.tile-video', tile);
    if (!video || reduced) return;
    let ready = false;
    tile.addEventListener('pointerenter', () => {
      if (!ready) { video.load(); ready = true; }
      video.play().then(() => video.classList.add('playing')).catch(() => {});
    });
    tile.addEventListener('pointerleave', () => {
      video.pause(); video.classList.remove('playing');
    });
  });

  /* ---------- slideshows: auto-advance + arrows + dots ---------- */
  $$('.slideshow').forEach((box) => {
    const track = $('.slides-track', box);
    const slides = $$(':scope > *', track);
    if (slides.length < 2) return;
    let i = 0, timer = null;
    const dots = $$('.slide-dots button', box);
    function go(n, user) {
      i = (n + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + i * 100 + '%)';
      dots.forEach((d, di) => d.setAttribute('aria-current', String(di === i)));
      if (user) restart();
    }
    function restart() {
      if (timer) clearInterval(timer);
      if (!reduced) timer = setInterval(() => go(i + 1), 4500);
    }
    $('.slide-btn.prev', box).addEventListener('click', () => go(i - 1, true));
    $('.slide-btn.next', box).addEventListener('click', () => go(i + 1, true));
    dots.forEach((d, di) => d.addEventListener('click', () => go(di, true)));
    box.addEventListener('pointerenter', () => timer && clearInterval(timer));
    box.addEventListener('pointerleave', restart);
    restart();
  });

  /* ---------- gallery "see more": reveal the next batch, drop the
     fade veil when everything is visible ---------- */
  $$('[data-seemore]').forEach((btn) => {
    const sel = btn.getAttribute('data-seemore');
    const batch = parseInt(btn.getAttribute('data-batch') || '6', 10);
    btn.addEventListener('click', () => {
      const hidden = $$(sel + ' .is-hidden');
      hidden.slice(0, batch).forEach((el, i) => {
        el.classList.remove('is-hidden');
        el.classList.add('reveal');
        setTimeout(() => el.classList.add('in'), 45 * i);
      });
      if (hidden.length <= batch) {
        const veil = btn.closest('.fade-veil');
        if (veil) veil.classList.add('gone');
      }
    });
  });

  /* ---------- illustration detail: arrows cycle the featured image,
     thumbnails set it (per Mireya's wireframe) ---------- */
  const stage = $('.illu-stage');
  if (stage) {
    const featured = $('.illu-featured', stage);
    const thumbs = $$('.illu-grid button');
    const counter = $('.illu-counter');
    const srcs = thumbs.length ? thumbs.map((b) => $('img', b).getAttribute('src')) : [featured.getAttribute('src')];
    let i = 0;
    function setFeatured(n) {
      i = (n + srcs.length) % srcs.length;
      featured.src = srcs[i];
      thumbs.forEach((b, bi) => b.setAttribute('aria-current', String(bi === i)));
      if (counter) counter.textContent = (i + 1) + ' / ' + srcs.length;
    }
    $$('.illu-arrow', stage).forEach((btn) => {
      btn.addEventListener('click', () => setFeatured(i + (btn.classList.contains('next') ? 1 : -1)));
    });
    thumbs.forEach((b, bi) => b.addEventListener('click', () => {
      setFeatured(bi);
      featured.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
    }));
    document.addEventListener('keydown', (e) => {
      if ($('.lightbox.open')) return;
      if (e.key === 'ArrowLeft') setFeatured(i - 1);
      if (e.key === 'ArrowRight') setFeatured(i + 1);
    });
    if (thumbs.length) setFeatured(0);
  }

  /* ---------- reveal on scroll (progressive enhancement: content is
     visible by default; JS opts elements into the animation) ---------- */
  if (!reduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    $$('[data-reveal]').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) return; // already on screen: skip animation
      el.classList.add('reveal');
      io.observe(el);
    });
  }
})();
