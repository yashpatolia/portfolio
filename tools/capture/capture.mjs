// Dev-only pipeline: capture raw screenshots, then frame them into site-ready WebP.
//   node capture.mjs                 everything
//   node capture.mjs tracklane       one project
//   node capture.mjs --frame-only    re-frame existing raw captures
import fs from 'node:fs';
import path from 'node:path';
import { launch, newPage, serve } from './lib.mjs';
import { frameAll } from './frame.mjs';
import { anidex, interview } from './scenes-live.mjs';
import { bumble, tracklane } from './scenes-local.mjs';
import { celestial } from './scenes-mock.mjs';
import { bellhop } from './scenes-bellhop.mjs';

const OUT_DIR = path.resolve('../../public/projects');
const projects = [bumble, tracklane, anidex, interview, celestial, bellhop];
const args = process.argv.slice(2);
const frameOnly = args.includes('--frame-only');
const only = args.filter((a) => !a.startsWith('--'));
const chosen = projects.filter((p) => !only.length || only.includes(p.slug));

fs.mkdirSync('out/raw', { recursive: true });

if (!frameOnly) {
  const browser = await launch();
  for (const proj of chosen) {
    console.log('capturing', proj.slug);
    const stops = [];
    for (const s of proj.servers || (proj.server ? [proj.server] : [])) stops.push(await serve({ ...s, env: proj.env || {} }));
    const page = await newPage(browser);
    if (proj.prepare) await proj.prepare(page);
    for (let i = 0; i < proj.scenes.length; i++) {
      // A scene may hand back a different page to photograph (for example a signed-out one).
      const shot = (await proj.scenes[i].run(page)) || page;
      await shot.screenshot({ path: `out/raw/${proj.slug}-${i + 1}.png` });
      if (shot !== page) await shot.close();
      console.log('  shot', i + 1);
    }
    await page.close();
    stops.forEach((s) => s());
  }
  await browser.close();
}

const jobs = [];
for (const proj of chosen) proj.scenes.forEach((_, i) => jobs.push({ raw: `out/raw/${proj.slug}-${i + 1}.png`, name: `${proj.slug}-${i + 1}`, host: proj.host, noLock: proj.noLock, proj }));
const framed = await frameAll(jobs.filter((j) => fs.existsSync(j.raw)), OUT_DIR);

// manifest: one entry per project, read by the site
const manifestPath = path.join(OUT_DIR, 'manifest.json');
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : {};
for (const proj of chosen) {
  manifest[proj.slug] = proj.scenes.map((s, i) => {
    const f = framed.find((x) => x.name === `${proj.slug}-${i + 1}`);
    return f && { src: `/projects/${f.name}.webp`, small: `/projects/${f.name}-sm.webp`, width: f.width, height: f.height, alt: s.alt };
  }).filter(Boolean);
}
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('wrote', framed.length, 'images to', OUT_DIR);
