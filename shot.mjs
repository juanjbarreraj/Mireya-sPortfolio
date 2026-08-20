// CDP screenshot helper with real device emulation.
// usage: node shot.mjs <url> <outfile> <width> [height] [full|viewport] [mobile]
import { spawn } from 'node:child_process';
import { writeFile } from 'node:fs/promises';

const [url, outfile, wArg, hArg, mode = 'full', mob] = process.argv.slice(2);
const width = +wArg || 1440, height = +hArg || 900;
const CH = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const port = 9000 + Math.floor(Math.random() * 900);
const chrome = spawn(CH, ['--headless=new', '--no-sandbox', '--disable-gpu', `--remote-debugging-port=${port}`, 'about:blank'], { stdio: 'ignore' });
await new Promise(r => setTimeout(r, 1500));
const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
const ws = new WebSocket(list[0].webSocketDebuggerUrl);
let id = 0; const pend = new Map();
const send = (method, params) => new Promise((res, rej) => { const i = ++id; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m.result); pend.delete(m.id); } };
await new Promise(r => ws.onopen = r);
await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 2, mobile: mob === 'mobile' });
await send('Page.navigate', { url });
await new Promise(r => setTimeout(r, 2800));
let clip;
if (mode === 'full') {
  const { result } = await send('Runtime.evaluate', { returnByValue: true, expression: 'Math.min(document.documentElement.scrollHeight, 12000)' });
  clip = { x: 0, y: 0, width, height: result.value, scale: 1 };
  await send('Emulation.setDeviceMetricsOverride', { width, height: result.value, deviceScaleFactor: 1, mobile: mob === 'mobile' });
  await new Promise(r => setTimeout(r, 800));
}
const shot = await send('Page.captureScreenshot', { format: 'png', ...(clip ? { clip } : {}) });
await writeFile(outfile, Buffer.from(shot.data, 'base64'));
console.log('saved', outfile);
chrome.kill();
process.exit(0);
