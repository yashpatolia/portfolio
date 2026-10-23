import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { launch } from './lib.mjs';

// Wraps a raw screenshot in a neutral browser window with layered shadow on a transparent
// canvas, so it sits on any page background. Exports full (2x) and small (1x) WebP.
const PAD = 56, W = 1200;

function html(dataUrl, host, noLock) {
  return `<!doctype html><meta charset="utf-8"><style>
  html,body{margin:0;background:transparent}
  .stage{padding:${PAD}px;width:${W}px}
  .win{width:${W}px;border-radius:16px;overflow:hidden;background:#f6f3ee;
    box-shadow:0 0 0 1px rgba(40,34,48,.10),0 2px 4px rgba(40,34,48,.06),0 18px 36px -10px rgba(40,34,48,.22),0 50px 90px -28px rgba(40,34,48,.30)}
  .bar{height:46px;display:flex;align-items:center;padding:0 18px;gap:8px;background:linear-gradient(#f8f5f0,#efebe4);border-bottom:1px solid rgba(40,34,48,.10);position:relative}
  .bar i{width:12px;height:12px;border-radius:50%;background:#d9d3c9;box-shadow:inset 0 0 0 1px rgba(40,34,48,.08)}
  .url{position:absolute;left:50%;transform:translateX(-50%);height:28px;min-width:300px;padding:0 16px;border-radius:99px;background:rgba(255,255,255,.75);box-shadow:inset 0 0 0 1px rgba(40,34,48,.08);display:flex;align-items:center;justify-content:center;gap:8px;font:500 13px/1 ui-sans-serif,system-ui,-apple-system,sans-serif;color:#5c5666;letter-spacing:.01em}
  .url svg{width:11px;height:11px;opacity:.6}
  img{display:block;width:${W}px;height:auto}
  </style><div class="stage"><div class="win"><div class="bar"><i></i><i></i><i></i>
  <div class="url">${noLock ? '' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>'}${host}</div></div>
  <img src="${dataUrl}"></div></div>`;
}

export async function frameAll(jobs, outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  const b = await launch();
  const out = [];
  for (const j of jobs) {
    const raw = fs.readFileSync(j.raw).toString('base64');
    const p = await b.newPage({ viewport: { width: W + PAD * 2, height: 1200 }, deviceScaleFactor: 2 });
    await p.setContent(html(`data:image/png;base64,${raw}`, j.host, j.noLock));
    await p.evaluate(() => Promise.all([...document.images].map((i) => i.decode())));
    const el = await p.$('.stage');
    const png = await el.screenshot({ omitBackground: true });
    await p.close();
    const base = path.join(outDir, j.name);
    const big = sharp(png);
    const meta = await big.metadata();
    await big.webp({ quality: 86, effort: 5 }).toFile(base + '.webp');
    await sharp(png).resize({ width: Math.round(meta.width / 2) }).webp({ quality: 84, effort: 5 }).toFile(base + '-sm.webp');
    out.push({ name: j.name, width: meta.width / 2, height: meta.height / 2 });
  }
  await b.close();
  return out;
}
