# Yash Patolia — SWE Portfolio

Personal site and portfolio. Source of truth for the build plan below.

Resume lives at: `public/resume.pdf` (single source of truth — replace this file to update the download link)
GitHub: `github.com/yashpatolia`
LinkedIn: `linkedin.com/in/yash-patolia`

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Vite + React 18 + TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Fonts | Inter (body), JetBrains Mono (code/accents) |
| Deploy | GitHub Pages via GitHub Actions |

---

## Design Direction

- Dark mode only — deep navy/slate (`#0f172a` bg), not pure black
- Accent: electric blue (`#2563eb`), secondary green for "live" indicators
- High whitespace, minimal clutter — looks like a product, not a template
- Monospace accents for anything code-adjacent (stack badges, section labels)
- Animations triggered on scroll entry — nothing plays until you see it

---

## Sections

### 1. Hero
- Name, animated typing tagline cycling through: "Software Engineer" / "Backend Developer" / "Full-Stack Builder"
- One-liner bio pulled from resume context
- CTA row: GitHub, LinkedIn, Download Resume
- Subtle animated background — floating grid or noise texture, not distracting

### 2. Experience (Timeline)
Three roles, newest first:
- PointClickCare — May 2026–Present — Java, Spring Boot, Kotlin, TypeScript
- PointClickCare — Sept 2025–Dec 2025 — Java, Spring Boot, Kotlin, TypeScript, React
- Jiyash Auto — May 2025–Aug 2025 — SvelteKit, TypeScript, SQLite, Docker, Nginx

Each card: company name, role, date range, location, stack pill row, bullet points with metrics.
Animated vertical timeline line draws down as you scroll.

### 3. Projects
Two featured cards:
- **Game Chat Bridge** — Python, TypeScript, React, FastAPI, PostgreSQL, Node.js — live site + repo links
- **Patient Discharge Assistant** — Python, React, Qdrant, Azure OpenAI, Docker

Card layout: name + stack pills + description + links. On hover: card lifts, brief detail expands.

### 4. Skills
Grouped pill grid, animated stagger on scroll entry:
- **Languages:** Python, Java, TypeScript, JavaScript, SQL, Kotlin
- **Frameworks:** React, SvelteKit, FastAPI, Spring Boot, Node.js, Vite.js, JUnit, pytest
- **Databases & Tools:** PostgreSQL, MongoDB, SQLite, Qdrant, Docker, Nginx, Git, GitHub Actions, Linux, Azure, Grafana, AppDynamics

### 5. Education
McMaster University — BEng Software Engineering (Co-op) — May 2028
Minor in Mathematics
Relevant coursework: DSA, OOP, Operating Systems, Software Development, Databases, Software Testing

### 6. Contact
Email, GitHub, LinkedIn — clean centered block, no form needed.

---

## Key Metrics to Surface (pulled from resume)

| Metric | Source |
|---|---|
| 230K+ messages relayed | Game Chat Bridge |
| 570K+ API calls at 99%+ success | Game Chat Bridge |
| 50%+ page count reduction | PCC report generation |
| 25% fewer DB round trips | PCC SQL migration |
| 75%+ page load improvement | Jiyash Auto |
| 90% image size reduction | Jiyash Auto |
| 70%+ patient review time improvement | Patient Discharge |
| 90%+ extraction accuracy | Patient Discharge |

---

## File Structure

```
portfolio/
  public/
    resume.pdf           # copy of yash_resume.pdf for download link
  src/
    components/
      Navbar.tsx
      Hero.tsx
      Experience.tsx
      Projects.tsx
      Skills.tsx
      Education.tsx
      Contact.tsx
      Footer.tsx
    data/
      experience.ts      # typed work history objects
      projects.ts        # typed project objects
      skills.ts          # skill categories
    App.tsx
    main.tsx
    index.css
  index.html
  vite.config.ts
  tailwind.config.ts
  tsconfig.json
  .github/
    workflows/
      deploy.yml         # build + push to gh-pages on push to main
```

---

## Build Order

1. `npm create vite@latest . -- --template react-ts`
2. Install deps: `tailwindcss framer-motion lucide-react`
3. Configure Tailwind + custom fonts
4. Build data files (`experience.ts`, `projects.ts`, `skills.ts`) from resume
5. Build components bottom-up: Skills → Education → Contact → Projects → Experience → Hero → Navbar → App
6. Wire animations (Framer Motion `whileInView` on each section)
7. Copy resume PDF to `public/`
8. Set up GitHub Actions deploy workflow
9. Push to GitHub, enable Pages on `gh-pages` branch

---

## Deploy Target

`https://yashpatolia.github.io` (requires a repo named `yashpatolia.github.io` on GitHub)
OR
`https://yashpatolia.github.io/portfolio` (repo named `portfolio`, set `base: '/portfolio/'` in `vite.config.ts`)
