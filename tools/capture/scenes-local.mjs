import { sleep } from './lib.mjs';
import { settle } from './scenes-live.mjs';

/* ------------------------------------------------------------------ */
/* Everything below uses invented names and data. No real players,     */
/* Discord users, companies or applications ever reach a screenshot.   */
/* ------------------------------------------------------------------ */

const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
const PAL = ['#7aa2f7', '#e0af68', '#9ece6a', '#f7768e', '#bb9af7', '#73daca', '#ff9e64', '#7dcfff'];

function svgHead(seed) {
  const h = hash(seed), skin = ['#e8c39e', '#c68e63', '#f1d3b3', '#9a6b47'][h % 4], hair = PAL[(h >> 3) % PAL.length], eye = '#2a2a38';
  const cells = [];
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
    let c = skin;
    if (y < 2 || (y < 3 && (x < 1 || x > 6))) c = hair;
    if (y === 4 && (x === 2 || x === 5)) c = eye;
    if (y === 6 && x > 2 && x < 5) c = '#b8745a';
    cells.push(`<rect x="${x}" y="${y}" width="1" height="1" fill="${c}"/>`);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" shape-rendering="crispEdges">${cells.join('')}</svg>`;
}

function discordAvatar(name) {
  const c = PAL[hash(name) % PAL.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="${c}"/><text x="32" y="42" font-family="sans-serif" font-size="30" font-weight="700" fill="#14141c" text-anchor="middle">${name[0].toUpperCase()}</text></svg>`;
  return 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');
}

/* ------------------------------ Game Chat Bridge ------------------------------ */
const IGNS = ['PixelFern', 'CobaltMoth', 'TidalRook', 'AshenQuill', 'NimbusTea', 'GlitchOtter', 'MossyLantern', 'VelvetAnvil', 'SolarPickle', 'HushedComet', 'BramblePaw', 'IronLullaby', 'QuartzHeron', 'DuskCrumpet', 'TinselWolf', 'FableKnot', 'OrbitMuffin', 'SlateWren', 'CinderBloom', 'MapleSprite', 'JuniperAsh', 'PocketNova', 'WillowByte', 'RustyHalo'];
const RANKS = ['Guild Master', 'Officer', 'Officer', 'Veteran', 'Veteran', 'Veteran', ...Array(30).fill('Member')];
const HANDLES = ['pixelfern', 'cobaltmoth', 'tidalrook', 'ashenquill', 'nimbustea', 'glitch.otter', 'mossy_lantern', 'velvetanvil', 'solarpickle', 'hushedcomet', 'bramblepaw', 'ironlullaby', 'quartzheron', 'duskcrumpet', 'tinselwolf', 'fableknot', 'orbitmuffin', 'slatewren', 'cinderbloom', 'maple', 'juniperash', 'pocketnova', 'willowbyte', 'rustyhalo'];
const fakeUuid = (n) => { let h = ''; for (let i = 0; h.length < 32; i++) h += (hash(n + i) >>> 0).toString(16).padStart(8, '0'); h = h.slice(0, 32); return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`; };
const NOW = Date.now();
const DAY = 86400000;
const OFFLINE_DAYS = { 20: 6, 21: 16, 22: 34, 23: 68 }; // lowest-level players, so the attention lists have content
const members = (off) => IGNS.map((ign, i) => {
  const dn = HANDLES[i];
  const linked = i % 5 !== 4;
  const k = (i + off) % IGNS.length;
  const m90 = 4200 - i * 173 + k * 11;
  const last = i % 3 === 0 ? 120000 : (OFFLINE_DAYS[i] ? OFFLINE_DAYS[i] * DAY : (i + 1) * 5400000);
  return {
    rank: RANKS[i], ign, uuid: fakeUuid(ign), discord_name: linked ? dn : null, discord_id: linked ? String(1000 + i) : null, discord_avatar: linked ? discordAvatar(dn) : null,
    online: i % 3 === 0, skyblock_level: 280 - i * 7 + ((k * 5) % 11), last_login: NOW - last, stats_fetched_at: NOW - 600000,
    messages_90d: m90, messages_total: m90 * 3 + 800 + i * 40, is_bot: false,
    excused: ign === 'SlateWren' ? { reason: 'Exam season', until: new Date(NOW + 20 * DAY).toISOString().slice(0, 10), by: 'maple' } : null,
    level_gain_90d: 18 - (i % 9) + (k % 4), level_gain_days: 90,
  };
});
const isoDay = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const activityPoints = () => { const end = new Date(); end.setMinutes(0, 0, 0); return Array.from({ length: 24 }, (_, h) => { const t = new Date(end.getTime() - (23 - h) * 3600000); const hr = t.getHours(); const base = 4 + 10 * Math.exp(-Math.pow((hr - 20) / 4.2, 2)) + 3 * Math.exp(-Math.pow((hr - 13) / 3, 2)); return { t: t.toISOString(), online: Math.round(base + ((hash('h' + h) % 3) - 1)) }; }); };
const levelTrend = () => Array.from({ length: 30 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (29 - i)); return { t: isoDay(d), avg: +(188.4 + i * 0.22 + Math.sin(i / 3) * 0.25).toFixed(2), members: IGNS.length }; });
const person = (x, gain) => ({ ign: x.ign, rank: x.rank, level: x.skyblock_level, uuid: x.uuid, discord_name: x.discord_name, discord_avatar: x.discord_avatar, gain, days_covered: 30 });
const levelBoard = (days) => { const ms = members(0); return { days, top: [...ms].sort((a, b) => b.skyblock_level - a.skyblock_level).slice(0, 10).map((x) => person(x, null)), climbers: [...ms].sort((a, b) => b.level_gain_90d - a.level_gain_90d).slice(0, 10).map((x) => person(x, +(x.level_gain_90d * days / 90).toFixed(1))) }; };
const GUILD_CONFIG = {
  ranks: [{ key: 'member', label: 'Member', level: 0, default_level: 0, editable: false }, { key: 'veteran', label: 'Veteran', level: 150, default_level: 150, editable: true }, { key: 'officer', label: 'Officer', level: 220, default_level: 220, editable: true }, { key: 'guild_master', label: 'Guild Master', level: 260, default_level: 260, editable: true }],
  attention: { kick_risk_days: 60, inactive_days: 30, low_activity_days: 14, bottom_n: 20, stale_hours: 2, level_drop: 0 },
  attention_defaults: { kick_risk_days: 60, inactive_days: 30, low_activity_days: 14, bottom_n: 20, stale_hours: 2, level_drop: 0 },
  activity: { d90: { red: 10, yellow: 100, green: 250, blue: 500, white: 1000 }, total: { red: 50, yellow: 500, green: 1250, blue: 2500, white: 5000 } },
  activity_defaults: { d90: { red: 10, yellow: 100, green: 250, blue: 500, white: 1000 }, total: { red: 50, yellow: 500, green: 1250, blue: 2500, white: 5000 } },
  updated_by: 'maple', updated_at: new Date(NOW - 3 * DAY).toISOString(),
};
const CHAT = [['14:02', 'PixelFern', 'anyone up for a dungeon run?'], ['14:03', 'CobaltMoth', 'give me 5 min, finishing a slayer'], ['14:03', 'TidalRook', 'gg on the f7 earlier everyone'], ['14:05', 'AshenQuill', 'new guild event this weekend, details in the announcements'], ['14:06', 'NimbusTea', 'just hit level 250, thanks for the carry'], ['14:08', 'GlitchOtter', '.lvl MossyLantern'], ['14:08', 'MossyLantern', 'level 241 checking in'], ['14:11', 'VelvetAnvil', 'who wants to farm mining for the lobby?'], ['14:12', 'SolarPickle', 'in, joining now'], ['14:15', 'HushedComet', 'welcome to the guild BramblePaw'], ['14:16', 'BramblePaw', 'thanks! glad to be here'], ['14:18', 'IronLullaby', 'bumble university is hosting a dungeon night friday'], ['14:21', 'QuartzHeron', 'count me in'], ['14:22', 'DuskCrumpet', 'same, bringing two friends'], ['14:25', 'TinselWolf', '.nw FableKnot'], ['14:26', 'FableKnot', 'networth is climbing nicely']];
const DYES = ['Aquamarine', 'Bone', 'Brick Red', 'Byzantium', 'Carmine', 'Celadon', 'Celeste', 'Chocolate', 'Copper', 'Cyclamen', 'Dark Purple', 'Dung', 'Emerald', 'Flame', 'Fossil', 'Frog', 'Holly', 'Iceberg', 'Jade', 'Lava', 'Midnight', 'Mocha', 'Nadeshiko', 'Necron', 'Pearlescent', 'Pelt', 'Periwinkle', 'Rose', 'Sangria', 'Tentacle'].map((n, i) => ({ dye_id: 'dye' + i, dye_name: n, hex: '#' + ((hash(n) & 0xffffff) | 0x404040).toString(16).slice(0, 6).padStart(6, '4'), weight: 100 - i * 3, odds: '1 in ' + (200 + i * 450).toLocaleString('en-US'), unlocked: i % 3 !== 1 }));

const ME = { discord_id: '1', discord_name: 'maple', is_admin: true, can_control_bots: true, can_fetch_api: true, can_manage_links: true, can_manage_members: true, can_manage_config: true, avatar_url: discordAvatar('maple'), is_owner: true };
const BOTS = { bk: { key: 'bk', name: 'Bumble Kindergarten', short_name: 'BK', username: 'BumbleKG', connected: true }, bu: { key: 'bu', name: 'Bumble University', short_name: 'BU', username: 'BumbleUni', connected: true } };

async function mockBumble(page) {
  await page.route('**/mc-heads.net/**', (r) => { const seed = r.request().url().split('/avatar/')[1]?.split('/')[0] || 'x'; r.fulfill({ status: 200, contentType: 'image/svg+xml', body: svgHead(seed) }); });
  await page.route('**/hypixelskyblock.minecraft.wiki/**', (r) => {
    const name = decodeURIComponent(r.request().url().split('/images/')[1] || '').replace(/_/g, ' ').replace('.png', '');
    const hex = (DYES.find((d) => d.dye_name === name) || { hex: '#888888' }).hex;
    r.fulfill({ status: 200, contentType: 'image/svg+xml', body: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 3c5 7 9 11 9 16a9 9 0 0 1-18 0c0-5 4-9 9-16z" fill="${hex}"/><path d="M12 20a4 4 0 0 0 3 4" stroke="rgba(255,255,255,.55)" stroke-width="2" fill="none" stroke-linecap="round"/></svg>` });
  });
  await page.route('**/api/**', (r) => {
    const u = new URL(r.request().url()), p = u.pathname, json = (b) => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(b) });
    if (p === '/api/me') return json(ME);
    if (p === '/api/bots') return json(BOTS);
    if (p === '/api/bots/api-usage') return json({ local: { last_minute: 6, last_5min: 41, last_hour: 388, today: 2410 }, hypixel: { queries_in_past_minute: 6, total_queries: 98211, limit: 300 }, rate_limit: { requests: 300, window_minutes: 5 } });
    let m;
    if ((m = p.match(/^\/api\/bots\/(\w+)\/overview$/))) return json({ ...BOTS[m[1]], member_count: IGNS.length, recent_chat: CHAT.map(([time, player, message]) => ({ time, player, message })) });
    if ((m = p.match(/^\/api\/bots\/(\w+)\/members$/))) return json({ members: members(m[1] === 'bk' ? 0 : 5) });
    if ((m = p.match(/^\/api\/bots\/(\w+)\/leaderboard$/))) return json({ leaderboard: members(0).sort((a, b) => b.messages_90d - a.messages_90d).map((x) => ({ ign: x.ign, count: x.messages_90d, uuid: x.uuid, discord_name: x.discord_name, discord_id: x.discord_id, discord_avatar: x.discord_avatar })) });
    if ((m = p.match(/^\/api\/bots\/(\w+)\/activity$/))) return json({ points: activityPoints() });
    if ((m = p.match(/^\/api\/bots\/(\w+)\/level-trend$/))) return json({ points: levelTrend() });
    if ((m = p.match(/^\/api\/bots\/(\w+)\/level-leaderboard$/))) return json(levelBoard(+(u.searchParams.get('days') || 30)));
    if ((m = p.match(/^\/api\/bots\/(\w+)\/config$/))) return json(GUILD_CONFIG);
    if (p === '/api/dyes/me') return json({ linked: true, uuid: fakeUuid('MapleSprite'), ign: 'MapleSprite', discord_name: 'maple', discord_avatar: discordAvatar('maple'), dyes: DYES });
    if (p === '/api/dyes/recent') return json({ drops: DYES.filter((d) => d.unlocked).slice(0, 8).map((d, i) => ({ dye_id: d.dye_id, dye_name: d.dye_name, hex: d.hex, unlocked_at: new Date(NOW - i * 3600000 * 5).toISOString(), uuid: fakeUuid(IGNS[i]), ign: IGNS[i], discord_name: HANDLES[i], discord_avatar: discordAvatar(HANDLES[i]) })) });
    if (p === '/api/dyes/search') return json({ results: [] });
    if (p === '/api/users') return json([]);
    return json({});
  });
  await page.addInitScript(() => { localStorage.setItem('token', 'capture'); });
}

export const bumble = {
  slug: 'game-chat-bridge', title: 'Game Chat Bridge', host: 'bumble.seazyns.dev',
  server: { cwd: '/Users/yashpatolia/Documents/github/bumble-unified/frontend', cmd: 'npx', args: ['vite', '--port', '5185', '--strictPort'], url: 'http://localhost:5185/' },
  prepare: mockBumble,
  scenes: [
    // Signed-out landing page: opened in a fresh page of the same context because the mocked page always carries a token.
    { alt: 'Landing page: run the guild calmly', run: async (p) => {
        const q = await p.context().newPage();
        await q.goto('http://localhost:5185/'); await settle(q, 1200);
        await q.evaluate(() => { for (const b of document.querySelectorAll('button, a')) if (/dev only/i.test(b.textContent || '')) b.style.display = 'none'; });
        return q; } },
    { alt: 'Guild overview: activity, average level, needs-attention list and top climbers', run: async (p) => { await p.goto('http://localhost:5185/guilds/bk'); await settle(p, 1400); } },
    { alt: 'Live guild chat relayed between Minecraft and Discord', run: async (p) => { await p.goto('http://localhost:5185/guilds/bk'); await settle(p, 1000);
        await p.evaluate(() => { const h = [...document.querySelectorAll('.card-title')].find((e) => e.textContent === 'Guild chat'); h?.scrollIntoView({ block: 'start' }); window.scrollBy(0, -110); }); await sleep(600); } },
    { alt: 'Member table with Discord links, activity tiers and status filters', run: async (p) => { await p.goto('http://localhost:5185/guilds/bk/members'); await settle(p, 1000); } },
    { alt: 'Leaderboards: fastest climbers and highest levels', run: async (p) => { await p.goto('http://localhost:5185/guilds/bk/leaderboard'); await settle(p, 1000); } },
    { alt: 'Guild config: rank requirements, attention rules and activity tiers', run: async (p) => { await p.goto('http://localhost:5185/guilds/bk/config'); await settle(p, 1000); } },
    { alt: 'The same overview in the dark theme', run: async (p) => { await p.goto('http://localhost:5185/guilds/bk'); await settle(p, 1000); await p.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark')); await sleep(1100); } },
  ],
};

/* ---------------------------------- Tracklane --------------------------------- */
const d = (m, day) => `2026-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
const APPS = [
  ['Northwind Labs', 'Software Engineer Intern', 'Summer', 'Toronto, ON', 'Python, React', 'Offer', d(9, 3), d(9, 12), d(9, 24), d(10, 8), '48', 'Hourly', 'Review offer details', d(10, 24)],
  ['Acme Robotics', 'Backend Developer Intern', 'Summer', 'Waterloo, ON', 'Go, PostgreSQL', 'Interview', d(9, 8), d(9, 18), d(10, 14), '', '44', 'Hourly', 'Prep system design round', d(10, 22)],
  ['Quill Analytics', 'Data Platform Intern', 'Summer', 'Remote', 'Python, Spark', 'Interview', d(9, 10), d(9, 21), d(10, 17), '', '42', 'Hourly', 'Send thank-you note', d(10, 20)],
  ['Brightpath Health', 'Software Engineer Intern', 'Summer', 'Ottawa, ON', 'Java, Spring Boot', 'OA', d(9, 15), d(10, 9), '', '', '40', 'Hourly', 'Finish online assessment', d(10, 21)],
  ['Vertex Cloud', 'Platform Engineering Intern', 'Summer', 'Vancouver, BC', 'Kubernetes, Go', 'Phone Screen', d(9, 17), d(10, 1), '', '', '46', 'Hourly', 'Recruiter call Thursday', d(10, 23)],
  ['Cobalt Payments', 'Full-Stack Intern', 'Summer', 'Toronto, ON', 'TypeScript, Node.js', 'Applied', d(10, 2), '', '', '', '45', 'Hourly', 'Follow up in a week', d(10, 28)],
  ['Fernway Data', 'ML Engineering Intern', 'Summer', 'Montreal, QC', 'Python, PyTorch', 'Applied', d(10, 5), '', '', '', '43', 'Hourly', '', ''],
  ['Lattice Works', 'Software Developer Intern', 'Winter', 'Kitchener, ON', 'C++, Linux', 'Rejected', d(8, 20), d(9, 2), '', '', '38', 'Hourly', '', ''],
  ['Orbit Commerce', 'Frontend Intern', 'Summer', 'Toronto, ON', 'React, TypeScript', 'Applied', d(10, 9), '', '', '', '41', 'Hourly', '', ''],
  ['Meridian Systems', 'Backend Intern', 'Summer', 'Calgary, AB', 'Kotlin, AWS', 'Not Applied', '', '', '', '', '', 'Hourly', 'Tailor resume then apply', d(10, 25)],
  ['Pinecone Mobility', 'Embedded Software Intern', 'Winter', 'Ottawa, ON', 'C, Rust', 'Withdrawn', d(9, 1), '', '', '', '39', 'Hourly', '', ''],
].map(([company, role, season, location, stack, status, applied, oa, interview, offer, comp, compPeriod, nextAction, nextActionDue]) => ({
  company, role, season, location, stack, status, applied, oa, interview, offer, comp, compPeriod, platform: 'Company site', link: '', nextAction, nextActionDue, updatedAt: new Date(NOW - hash(company) % 9 * 86400000).toISOString(), notes: '',
}));

async function demoName(page) { await page.evaluate(() => { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) if (n.nodeValue.trim() === 'Local Dev') n.nodeValue = 'Demo account'; }); }

async function prepTracklane(page) {
  await page.route(/google\.com\/s2\/favicons|gstatic\.com\/faviconV2/, (r) => r.abort());
  await page.goto('http://localhost:3001/auth/google');
  await sleep(500);
  await page.evaluate(async (rows) => { await fetch('/api/applications', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(rows) }); }, APPS).catch(() => {});
}

export const tracklane = {
  slug: 'tracklane', title: 'Tracklane', host: 'tracklane.yashpatolia.dev',
  servers: [
    { cwd: '/Users/yashpatolia/Documents/github/tracklane', cmd: 'node', args: ['server/index.js'], url: 'http://localhost:3001/api/me' },
    { cwd: '/Users/yashpatolia/Documents/github/tracklane', cmd: 'npx', args: ['vite', '--port', '5174', '--strictPort'], url: 'http://localhost:5174/' },
  ],
  // DATABASE_URL and GOOGLE_* are forced empty so dotenv never loads real credentials: in-memory store plus local login only.
  env: { DATABASE_URL: '', GOOGLE_CLIENT_ID: '', GOOGLE_CLIENT_SECRET: '', SESSION_SECRET: 'capture', PORT: '3001', CLIENT_URL: 'http://localhost:5174', NODE_ENV: 'development' },
  prepare: prepTracklane,
  scenes: [
    { alt: 'Tracklane application board with stats and pipeline', run: async (p) => { await p.goto('http://localhost:5174/'); await settle(p, 900); await demoName(p); } },
    { alt: 'Tracklane new entry dialog', run: async (p) => { await p.goto('http://localhost:5174/'); await settle(p, 600); await demoName(p); await p.getByText('+ New Entry').first().click(); await sleep(700);
      await p.evaluate(() => { document.documentElement.style.zoom = '0.72'; });
      await p.getByPlaceholder('e.g. Shopify').fill('Northwind Labs');
      await p.getByPlaceholder('e.g. Software Engineer Intern').fill('Backend Developer Intern');
      await p.getByPlaceholder('e.g. Toronto (Hybrid)').fill('Toronto, ON (Hybrid)');
      await p.getByPlaceholder('e.g. Go/React/TypeScript').fill('Go, PostgreSQL, React');
      await p.getByText('Summer', { exact: true }).last().click();
      await p.getByPlaceholder('e.g. 32').fill('46');
      await p.getByPlaceholder('e.g. Follow up with recruiter').fill('Send thank-you note after the interview');
      await sleep(500); } },
  ],
};
