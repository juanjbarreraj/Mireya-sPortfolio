// Interaction smoke test via CDP (v3: link cards, arrow-only gallery, illu detail pages)
import { spawn } from 'node:child_process';
const CH = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const port = 9455;
const chrome = spawn(CH, ['--headless=new', '--no-sandbox', '--disable-gpu', `--remote-debugging-port=${port}`, 'about:blank'], { stdio: 'ignore' });
await new Promise(r => setTimeout(r, 1500));
const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
const ws = new WebSocket(list[0].webSocketDebuggerUrl);
let id = 0; const pend = new Map();
const send = (m, p) => new Promise(res => { const i = ++id; pend.set(i, res); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m.result); pend.delete(m.id); } };
await new Promise(r => ws.onopen = r);
const errors = [];
await send('Runtime.enable');
ws.addEventListener('message', e => {
  const m = JSON.parse(e.data);
  if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.text + ' ' + (m.params.exceptionDetails.exception?.description || ''));
});
await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: 'http://localhost:8321/en/' });
await new Promise(r => setTimeout(r, 2500));
const ev = async (expr) => {
  const r = await send('Runtime.evaluate', { returnByValue: true, expression: expr, awaitPromise: true });
  return r.result?.value !== undefined ? r.result.value : (r.exceptionDetails ? 'EXC: ' + (r.exceptionDetails.exception?.description || r.exceptionDetails.text) : null);
};

const results = {};
results.home = await ev(`(async function(){
  const masonry = document.querySelector('#illustration .masonry');
  const card = masonry.querySelector('a.card');
  const linksOk = card && /illustration\\/[a-z-]+\\/$/.test(card.getAttribute('href'));
  const total = masonry.querySelectorAll('a.card').length;
  const hiddenBefore = masonry.querySelectorAll('.is-hidden').length;
  const btn = document.querySelector('[data-seemore]');
  btn.click(); await new Promise(r=>setTimeout(r,500));
  const hiddenAfter = masonry.querySelectorAll('.is-hidden').length;
  const veilStays = !document.querySelector('.fade-veil').classList.contains('gone');
  const navDoodles = document.querySelectorAll('.main-nav .nav-doodle').length;
  const logoGifs = document.querySelectorAll('.logo-gif img').length;
  const heroWordmark = !!document.querySelector('.hero-name img');
  const socials = document.querySelectorAll('.header-social a').length;
  const tiktokGone = !document.querySelector('a[href*="tiktok"]');
  const icoDoodles = document.querySelectorAll('.header-social .ico-doodle').length;
  // removed features stay removed
  const removed = ['.scroll-progress','.side-tabs','.pattern-band','.live-gallery'].map(s=>!document.querySelector(s));
  // hero: no parallax transform on the reel
  scrollTo(0, 600); await new Promise(r=>setTimeout(r,300));
  const reelStatic = !document.querySelector('.hero .reel').style.transform;
  const wordbands = document.querySelectorAll('.wordband').length;
  const wbMoving = getComputedStyle(document.querySelector('.wb-track')).animationName !== 'none';
  const frame = !!document.querySelector('.fancy-frame img.frame-art');
  const curtainLinks = [...document.querySelectorAll('.curtain a.tile')].every(a=>/work\\/[a-z0-9-]+\\/$/.test(a.getAttribute('href')));
  return {linksOk, total, hiddenBefore, hiddenAfter, veilStays, navDoodles, logoGifs, heroWordmark, socials, tiktokGone, icoDoodles, removed, reelStatic, wordbands, wbMoving, frame, curtainLinks};
})()`);

await send('Page.navigate', { url: 'http://localhost:8321/en/illustration/mireya-bookcover/' });
await new Promise(r => setTimeout(r, 2000));
results.illuDetail = await ev(`(function(){
  const featured = document.querySelector('.illu-featured');
  const realImg = featured && featured.src.includes('/work/mireya-bookcover');
  const pager = document.querySelectorAll('.pager a').length;
  return {realImg, noArrows: !document.querySelector('.illu-arrow'), pager};
})()`);

await send('Page.navigate', { url: 'http://localhost:8321/en/illustration/poster-smallersize/' });
await new Promise(r => setTimeout(r, 1500));
results.singleImage = await ev(`(function(){
  return {noArrows: !document.querySelector('.illu-arrow'), noGrid: !document.querySelector('.illu-grid'),
          hasImg: !!document.querySelector('.illu-featured'), pager: document.querySelectorAll('.pager a').length};
})()`);

await send('Page.navigate', { url: 'http://localhost:8321/en/work/6233-km/' });
await new Promise(r => setTimeout(r, 1500));
results.project = await ev(`(function(){
  const g = document.querySelector('.project-gallery');
  return {stacked: g.classList.contains('stack'), pics: g.querySelectorAll('img').length,
          pager: [...document.querySelectorAll('.pager a')].map(a=>a.getAttribute('href'))};
})()`);
results.jsErrors = errors;
console.log(JSON.stringify(results, null, 1));
chrome.kill(); process.exit(0);
