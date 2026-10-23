// Celestial mockups: Discord-style renders of the bot's real embed layouts (cogs/skyblock/*.py in
// github.com/yashpatolia/celestial). Every name and number below is invented.

const GOLD = '#f1c40f'; // discord.Colour.gold(), the colour the bot uses for every embed
const md = (s) => s.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/`(.+?)`/g, '<code>$1</code>').replace(/\n/g, '<br>');

const field = (name, value, inline = true) => `<div class="f${inline ? ' in' : ''}">${name ? `<div class="fn">${md(name)}</div>` : ''}<div class="fv">${md(value)}</div></div>`;
const spacer = () => '<div class="f in"><div class="fn">&nbsp;</div><div class="fv">&nbsp;</div></div>';

function embed({ author, desc, fields = [], footer, thumb }) {
  return `<div class="embed"><div class="ebody">
    ${author ? `<div class="ea">${md(author)}</div>` : ''}
    ${desc ? `<div class="ed">${md(desc)}</div>` : ''}
    <div class="fields">${fields.join('')}</div>
    <div class="ef">${footer} <span>&bull;</span> Today at 2:14 PM</div>
  </div>${thumb ? `<div class="thumb">${thumb}</div>` : ''}</div>`;
}

function exchange(cmd, who, embedHtml, reactions = []) {
  return `
  <div class="msg"><div class="av u" style="background:${who.color}">${who.name[0]}</div><div class="mb"><div class="mh"><span class="un" style="color:${who.color}">${who.name}</span><span class="ts">Today at 2:14 PM</span></div><div class="mt">${cmd}</div></div></div>
  <div class="msg"><div class="av bot">&#10022;</div><div class="mb"><div class="mh"><span class="bn">Celestial</span><span class="tag">BOT</span><span class="ts">Today at 2:14 PM</span></div>${embedHtml}
    ${reactions.length ? `<div class="rx">${reactions.map((r, i) => `<span class="${i === 0 ? 'me' : ''}">${r}&nbsp;1</span>`).join('')}</div>` : ''}</div></div>`;
}

const css = `
*{box-sizing:border-box;margin:0}
body{width:1440px;height:900px;overflow:hidden;background:#1e1f22;color:#dbdee1;font:16px/1.375 -apple-system,"Helvetica Neue",Helvetica,Arial,sans-serif;display:flex}
.rail{width:72px;background:#1e1f22;padding:12px 0;display:flex;flex-direction:column;align-items:center;gap:8px}
.rail i{width:48px;height:48px;border-radius:50%;background:#313338;display:grid;place-items:center;font:600 15px sans-serif;color:#b5bac1;font-style:normal}
.rail i.on{border-radius:16px;background:#5865f2;color:#fff}.rail hr{width:32px;border:0;border-top:2px solid #35363c;margin:2px 0}
.side{width:240px;background:#2b2d31;display:flex;flex-direction:column}
.side .top{height:48px;padding:0 16px;display:flex;align-items:center;font-weight:600;border-bottom:1px solid #1f2023;box-shadow:0 1px 0 rgba(0,0,0,.2)}
.side .ch{padding:16px 8px;display:flex;flex-direction:column;gap:2px;color:#949ba4;font-weight:500}
.side .ch div{padding:6px 8px;border-radius:4px}.side .ch .on{background:#404249;color:#fff}.side .cat{font-size:12px;letter-spacing:.02em;text-transform:uppercase;font-weight:700;padding:14px 8px 4px;color:#949ba4}
.main{flex:1;background:#313338;display:flex;flex-direction:column;min-width:0}
.hd{height:48px;padding:0 16px;display:flex;align-items:center;gap:10px;border-bottom:1px solid #26272b;box-shadow:0 1px 0 rgba(0,0,0,.15);font-weight:600}.hd span{color:#80848e;font-weight:400}
.feed{flex:1;overflow:hidden;padding:20px 0 0;display:flex;flex-direction:column;justify-content:flex-end}
.msg{display:flex;gap:16px;padding:6px 16px 6px 16px;position:relative}
.av{width:40px;height:40px;border-radius:50%;flex:none;display:grid;place-items:center;font-weight:700;color:#14141c;margin-top:2px}.av.bot{background:${GOLD};font-size:20px;color:#3a2f05}
.mb{min-width:0;flex:1}.mh{display:flex;align-items:baseline;gap:8px;margin-bottom:2px}.un,.bn{font-weight:500}.bn{color:#fff}.ts{font-size:12px;color:#949ba4}
.tag{font-size:10px;font-weight:600;line-height:15px;padding:0 5px;border-radius:3px;background:#5865f2;color:#fff;position:relative;top:-1px}
.mt{color:#dbdee1}
.embed{display:flex;max-width:560px;background:#2b2d31;border-left:4px solid ${GOLD};border-radius:4px;margin-top:4px;box-shadow:0 0 0 1px rgba(0,0,0,.1)}
.ebody{padding:8px 16px 16px 12px;flex:1;min-width:0}.ea{font-weight:600;font-size:14px;margin:8px 0 4px;color:#fff}
.ed{font-size:14px;line-height:1.3;margin-top:8px;color:#dbdee1}.ed b,.fv b{font-weight:600;color:#fff}
.fields{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px}.f{grid-column:1/-1;min-width:0}.f.in{grid-column:auto}
.fn{font-weight:600;font-size:14px;color:#fff;margin-bottom:2px}.fv{font-size:14px;line-height:1.35;color:#dbdee1}
.ef{font-size:12px;color:#b5bac1;margin-top:10px}.ef span{margin:0 4px}
.thumb{padding:16px 16px 0 0}.thumb svg{width:80px;height:80px;border-radius:6px;display:block}
code{background:#1e1f22;border-radius:3px;padding:0 4px;font:13px ui-monospace,Menlo,monospace}
.rx{display:flex;gap:6px;margin-top:6px}.rx span{display:flex;align-items:center;gap:4px;padding:2px 8px;border-radius:8px;background:#2b2d31;border:1px solid #2b2d31;font-size:14px;color:#b5bac1}.rx .me{background:#3b405a;border-color:#5865f2;color:#dee0fc}
.box{margin:0 16px 24px;height:44px;border-radius:8px;background:#383a40;display:flex;align-items:center;padding:0 16px;color:#6d6f78}
.mem{width:240px;background:#2b2d31;padding:24px 8px;color:#949ba4;font-weight:600;font-size:12px;text-transform:uppercase}
.mem div{display:flex;align-items:center;gap:12px;padding:6px 8px;font-size:15px;text-transform:none;font-weight:500;color:#949ba4}.mem i{width:32px;height:32px;border-radius:50%;display:block}
`;

const members = [['PixelFern', '#7aa2f7'], ['CobaltMoth', '#e0af68'], ['TidalRook', '#9ece6a'], ['AshenQuill', '#f7768e'], ['NimbusTea', '#bb9af7'], ['GlitchOtter', '#73daca']];

const chat = (n, c, t) => `<div class="msg"><div class="av u" style="background:${c}">${n[0]}</div><div class="mb"><div class="mh"><span class="un" style="color:${c}">${n}</span><span class="ts">Today at 2:1${t}</span></div><div class="mt">`;
const FILLER = chat('TidalRook', '#9ece6a', 1) + 'anyone up for a floor 7 run tonight?</div></div></div>' + chat('AshenQuill', '#f7768e', 2) + 'give me ten minutes, checking where my class levels are at</div></div></div>';

function page(inner) {
  inner = FILLER + inner;
  return `<!doctype html><meta charset="utf-8"><style>${css}</style>
  <div class="rail"><i class="on">&#10022;</i><hr><i>SB</i><i>MC</i><i>GG</i><i>+</i></div>
  <div class="side"><div class="top">Skyblock Hub</div><div class="ch"><div class="cat">Text channels</div><div># announcements</div><div># general</div><div class="on"># skyblock-bots</div><div># dungeon-runs</div><div># market-talk</div></div></div>
  <div class="main"><div class="hd"># skyblock-bots <span>Look up stats with the sb! prefix</span></div><div class="feed">${inner}</div><div class="box">Message #skyblock-bots</div></div>
  <div class="mem">Online, ${members.length}${members.map(([n, c]) => `<div><i style="background:${c}"></i>${n}</div>`).join('')}</div>`;
}

const who = { name: 'CobaltMoth', color: '#e0af68' };
const cap = (s) => s;
const head = 'PixelFern [🥭Mango]';

const helpEmbed = embed({
  desc: '`<>: Required` **|** `[]: Optional`\nJoin the discord: https://discord.gg/…\nSupport Celestial: https://ko-fi.com/…',
  footer: 'Created by: the Celestial team',
  fields: [
    field('__Main Commands__', '**Config\nInvite Celestial\nCelestial Stats**'), field('', 'sb!config\nsb!invite\nsb!stats'), spacer(),
    field('__Skyblock Commands__', '**👤 Profiles\n💰 Bank / Purse\n🧟 Slayers\n🐬 Pet Milestones\n⛏ Coop Upgrades\n💀 Catacombs\n⚔ Skills\n🌾 Jacobs Events\n⚗ Alchemy Calculator\n🥇 Bazaar\n⚖ Weight**'),
    field('', 'sb!profiles <name>\nsb!money <name> [profile]\nsb!slayer <name> [profile]\nsb!milestone <name> [profile]\nsb!upgrades <name> [profile]\nsb!cata <name> [profile]\nsb!skills <name> [profile]\nsb!jacob <name> [profile]\nsb!alch <name> [wanted level] [profile]\nsb!bz [amount] <item>\nsb!we <name> [profile]'), spacer(),
  ],
});

const weightEmbed = embed({
  author: head, footer: 'sb!weight <name> [profile]',
  desc: 'Total Weight: **8,914.6** with **2,061.3** being overflow!',
  fields: [
    field('Skills: 3,402.8', '⚔ Combat: **412.6** + **88.1**\n⛏ Mining: **391.2** + **120.4**\n🌲 Foraging: **338.9**\n🌾 Farming: **444.7** + **61.0**'), spacer(),
    field('', '🎣 Fishing: **301.4**\n🐾 Taming: **322.8** + **17.2**\n⚗ Alchemy: **286.5**\n✨ Enchanting: **304.7** + **9.9**'),
    field('Dungeons: 4,126.5', '💀 Catacombs: **1,204.3** + **402.7**\n🧙 Mage: **598.2** + **210.5**\n🗡 Berserk: **471.0**\n🏹 Archer: **388.6**\n🛡 Tank: **352.9**\n❤ Healer: **265.8** + **44.0**'), spacer(),
    field('Slayers: 1,385.3', '🧟 Revenant: **440.1** + **96.2**\n🕷 Tarantula: **402.7** + **55.4**\n🐺 Sven: **218.9**\n🔮 Voidgloom: **172.0**'),
  ],
});

const classes = [['🧙', 'Mage', '47.62', '28.4M', '1.2M / 3.1M', '38.70'], ['🗡', 'Berserk', '44.10', '19.8M', '0.6M / 2.2M', '27.31'], ['🏹', 'Archer', '42.88', '17.3M', '1.1M / 1.9M', '57.14'], ['🛡', 'Tank', '40.05', '14.1M', '0.1M / 1.5M', '6.70'], ['❤', 'Healer', '38.93', '12.6M', '0.9M / 1.4M', '64.25']];
const cataEmbed = embed({
  author: head, footer: 'sb!cata <name> [profile]',
  desc: 'Secrets: **61,408**\nClass: 🧙 **Mage**\nCata Level: **49** (**2.1M** / 2.8M) **76.12**%',
  fields: [
    ...classes.map(([e, n, lv, tot, xp, pr]) => field(`${e} ${n} ${lv}`, `Total XP: **${tot}**\nXP: (**${xp.split(' / ')[0]}** / ${xp.split(' / ')[1]})\nProgress: **${pr}**%`)),
    spacer(),
  ],
});

const diamond = `<svg viewBox="0 0 80 80"><rect width="80" height="80" fill="#1f2a33"/><path d="M40 12l22 18-22 38L18 30z" fill="#4be3d8"/><path d="M40 12l22 18H18z" fill="#9ff5ee"/><path d="M40 30l22 0-22 38z" fill="#27b8ae"/></svg>`;
const bazaarEmbed = embed({
  author: 'Bazaar', footer: 'sb!bazaar [amount] <item>', thumb: diamond,
  desc: 'Item: **Enchanted Diamond |** Quantity: **64**',
  fields: [field('Product Info', 'Instant Buy: **1.27M**\nInstant Sell: **1.19M**', false)],
});

export const celestial = {
  slug: 'celestial', title: 'Celestial', host: 'Discord, #skyblock-bots', noLock: true,
  scenes: [
    { alt: 'Weight command: skills, dungeons and slayers (mockup)', run: async (p) => { await p.setContent(page(exchange('sb!weight PixelFern', who, weightEmbed))); } },
    { alt: 'Catacombs command: class levels and progress (mockup)', run: async (p) => { await p.setContent(page(exchange('sb!cata PixelFern', who, cataEmbed, ['🛡', '🅵', '🅼']))); } },
    { alt: 'Bazaar command: instant buy and sell prices (mockup)', run: async (p) => { await p.setContent(page(exchange('sb!bz 64 Enchanted Diamond', who, bazaarEmbed))); } },
    { alt: 'Help command listing every command (mockup)', run: async (p) => { await p.setContent(page(exchange('sb!help', who, helpEmbed))); } },
  ],
};
