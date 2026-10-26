# Yash Patolia | SWE Portfolio

Personal site and portfolio.

Resume: `public/resume.pdf` (single source of truth, replace this file to update the download link)
GitHub: `github.com/yashpatolia`
LinkedIn: `linkedin.com/in/yash-patolia`
Email: `yashpatolia1@gmail.com`

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Vite + React 18 + TypeScript |
| Styling | Tailwind CSS v3 + hand-written CSS in `src/index.css` |
| Motion | CSS keyframes / transitions + small IntersectionObserver hooks. No animation library. |
| Icons | Small inline SVGs in the component (no icon library) for the GitHub, LinkedIn and Resume links; typographic glyphs (↗ ↓ ●) elsewhere. |
| Deploy | GitHub Actions → VPS (`.github/workflows/deploy.yml`, `scripts/deploy-vps.sh`) |

---

## Writing rule

Never use em dashes (the long dash character) anywhere: site copy, code comments,
commit messages, docs, or replies. Use commas, periods, colons or parentheses instead.

## Frontend design: read this before touching any UI

This file is the **only** source of frontend design direction. Do not invoke design
skills (frontend-design, impeccable, etc.) for this repo, and do not add separate
design docs. If the direction changes, change it here.

Earlier designs (a dark teal one and a brick-red poster) were thrown away on purpose. Do not
reintroduce them.

<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight. Focus on:
Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.
Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.
Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.
Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.
Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character
Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!
</frontend_aesthetics>

### Why this exists
Per Anthropic's "Prompting Claude for Frontend Aesthetics" cookbook: left alone, Claude
drifts to conservative, on-distribution UI (default fonts, purple-on-white, stock
layouts) and keeps converging on the same "alternative" picks across generations.
The fix is to steer each dimension explicitly (typography, color, motion,
backgrounds), name the defaults to avoid, and lock a theme so it stays consistent.

### Current style: "Oat Bento"
Soft, neutral, rounded bento tiles with a serif display face. Calm and readable first,
with a few well-chosen interactions. Light and dark themes (toggle in the nav, saved in
`localStorage` as `oat-theme`, defaults to the system preference).

- **Palette** (CSS variables in `src/index.css`, light under `:root`, dark under `[data-theme='dark']`):
  `--bg` oat, `--card` / `--card2` warm paper, `--ink` near-black brown, `--sage` and
  `--clay` as the two soft accents (plus `--sage-s` / `--clay-s` tints for tiles),
  `--tile` / `--tile-t` for the dark hero and contact tiles. No saturated colors, no purple.
- **Type**: Newsreader for display and large numbers, Hanken Grotesk for body and labels.
  Body text 17px, muted text must keep at least 4.5:1 contrast, labels no smaller than 12.5px.
  Never Inter/Roboto/Arial/system/Space Grotesk.
- **Layout**: full-width 12-column bento (no centered max-width column), 32px rounded
  tiles, compact accordion for projects (collapsed rows with a thumbnail and one-line
  summary, open to a gallery plus details).
- **Motion**: staggered tile reveal on scroll (IntersectionObserver sets `data-in`),
  cursor spotlight inside tiles, animated mesh in the hero, a Spotify "On repeat" tile
  (track id in `Hero.tsx`), skills marquee, gallery crossfade with progress dots. Always honor `prefers-reduced-motion`.
- **Interactions**: clicking any skill or stack tag filters the project list; project
  galleries support dots, arrows, swipe and arrow keys.
- **Content-first rules**: real copy and metrics live in `src/data/*`. Never invent
  numbers, employers or links; only add a metric once the owner has confirmed it is real.
  Mobile-first: must be clean at 375px with no horizontal scroll.

### Process for any UI change
1. State the aesthetic choice (font, palette, motion) in a sentence before coding.
2. Edit tokens in `src/index.css` / `tailwind.config.ts` rather than hard-coding hex values.
3. Check it in the browser at desktop and 375px before calling it done.

---

## Sections
Hero tiles (name, about, on repeat, now, local time, links, skills marquee) · Experience ·
Projects · Skills · Education and Contact (+ Footer)

Content lives in `src/data/` as typed plain data: `site.ts`, `experience.ts`, `projects.ts`,
`skills.ts`, `education.ts`.

## Project images
`public/projects/*.webp` and `public/projects/manifest.json` are generated by `tools/capture`
(dev-only Playwright + sharp, see its README). Each project in `projects.ts` has a `slug`
that keys into the manifest. Screenshots come from live sites or from local copies running
on invented data; Celestial uses rendered Discord mockups (captions say "mockup"). Never
put real people's data in an image.

## Key metrics
The numbers shown on the site are in `src/data/projects.ts` (the source of truth). The
owner confirmed them as real.

## File structure

```
src/
  components/   Navbar, Hero, Experience, Projects, Gallery, Skills, Education, Contact, Footer
  data/         site.ts, experience.ts, projects.ts, skills.ts, skillIcons.ts, education.ts
  hooks/        useReveal.ts (reveal + spotlight)
  lib/          projectImages.ts (manifest loader)
  App.tsx  main.tsx  index.css
public/         resume.pdf, favicon.svg, me.webp, projects/, logos/ (employer logos), skills/ (marquee icons)
tools/capture/  dev-only image pipeline (own package.json)
```
