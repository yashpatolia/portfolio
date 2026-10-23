import { sleep } from './lib.mjs';

export async function settle(page, extra = 600) {
  await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
  // Wait for fonts and for on-screen images only (lazy images below the fold never load), capped at 8s.
  await page.evaluate(() => Promise.race([
    (async () => {
      await document.fonts.ready;
      const vis = [...document.images].filter((i) => { const r = i.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; });
      await Promise.all(vis.map((i) => (i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; }))));
    })(),
    new Promise((r) => setTimeout(r, 8000)),
  ]));
  await sleep(extra);
}

// Public sites, captured as they really are.
export const anidex = {
  slug: 'anidex', title: 'Anidex', host: 'anidex.ca',
  scenes: [
    { alt: 'Anidex home page with a trending carousel', run: async (p) => { await p.goto('https://anidex.ca/'); await settle(p, 2500); } },
    { alt: 'Anidex browse page', run: async (p) => { await p.goto('https://anidex.ca/browse'); await settle(p, 1500); } },
    { alt: 'Anidex seasonal chart', run: async (p) => { await p.goto('https://anidex.ca/seasonal'); await settle(p, 1500); } },
    { alt: 'An anime detail page on Anidex', run: async (p) => { await p.goto('https://anidex.ca/anime/195539'); await settle(p, 1500); } },
  ],
};

export const interview = {
  slug: 'interview-prep', title: 'Interview Prep Hub', host: 'resource.yashpatolia.dev',
  scenes: [
    { alt: 'A two pointers lesson with diagrams', run: async (p) => { await p.goto('https://resource.yashpatolia.dev/dsa/two-pointers'); await settle(p, 1500); } },
    { alt: 'A trees lesson with worked examples', run: async (p) => { await p.goto('https://resource.yashpatolia.dev/dsa/trees'); await settle(p, 1500); } },
    { alt: 'The track picker: data structures and quant trading', run: async (p) => { await p.goto('https://resource.yashpatolia.dev/'); await settle(p, 1200); } },
  ],
};
