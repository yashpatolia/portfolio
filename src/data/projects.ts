export interface Metric {
  /** Optional leading symbol such as '<' or '~'. */
  prefix?: string
  value: number
  suffix: string
  label: string
}

export interface Project {
  name: string
  /** Key into public/projects/manifest.json for this project's screenshots. */
  slug?: string
  /** Optional small context line, e.g. where the project came from. */
  note?: string
  /** One-line summary shown before a project is expanded. */
  summary?: string
  description: string
  stack: string[]
  metrics: Metric[]
  links: { label: string; url: string }[]
}

export const projects: Project[] = [
  {
    name: 'Game Chat Bridge',
    slug: 'game-chat-bridge',
    summary: 'Live bridge between Hypixel guild chat and Discord, with a web control panel.',
    description:
      'A real-time bridge between Hypixel Skyblock guild chat and Discord, with a React panel, FastAPI backend, and Node.js gateway built for production traffic.',
    stack: ['Python', 'TypeScript', 'React', 'FastAPI', 'PostgreSQL', 'Node.js'],
    metrics: [
      { value: 230, suffix: 'K+', label: 'messages relayed' },
      { value: 250, suffix: '+', label: 'members managed automatically' },
      { prefix: '~', value: 5, suffix: ' hrs/wk', label: 'staff time saved (est.)' },
    ],
    links: [
      { label: 'Live', url: 'https://bumble.seazyns.dev/' },
      { label: 'Repo', url: 'https://github.com/yashpatolia/bumble-unified' },
    ],
  },
  {
    name: 'Patient Discharge Assistant',
    note: 'Internal company hackathon',
    summary: 'AI workflow that extracts structured patient data to speed up discharge review.',
    description:
      'An AI discharge workflow that extracts structured patient data with Azure OpenAI and Qdrant, then surfaces it in a React interface to reduce review time.',
    stack: ['Python', 'React', 'Qdrant', 'Azure OpenAI', 'Docker'],
    metrics: [
      { value: 70, suffix: '%+', label: 'review time saved' },
      { value: 90, suffix: '%+', label: 'extraction accuracy' },
    ],
    links: [],
  },
  {
    name: 'Anidex',
    slug: 'anidex',
    summary: 'Minimalist anime tracker with two-way AniList sync.',
    description:
      'A minimalist anime tracker for watch lists, ratings, and episode progress, backed by the AniList API and a self-hosted Postgres database, with AniList and MyAnimeList import.',
    stack: ['TypeScript', 'Next.js', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'Docker'],
    metrics: [
      { value: 500, suffix: '+', label: 'registered users' },
      { prefix: '<', value: 10, suffix: 's', label: 'to import 1,000 titles' },
      { prefix: '~', value: 220, suffix: ' hrs', label: 'of manual entry avoided' },
    ],
    links: [
      { label: 'Live', url: 'https://anidex.ca/' },
      { label: 'Repo', url: 'https://github.com/yashpatolia/anidex' },
    ],
  },
  {
    name: 'Bellhop',
    slug: 'bellhop',
    note: 'Cal Hacks 13.0',
    summary: 'Robot fleet that answers non-urgent call bells in care homes and escalates urgent ones to nurses.',
    description:
      'An autonomous robot fleet built at Cal Hacks 13.0 that answers non-urgent care home call bells, scores each call for urgency, and alerts a nurse only when something needs one. A FastAPI backend dispatches the nearest free robot, a Raspberry Pi handles speech and driving, and a live React dashboard keeps nurses in control.',
    stack: ['Python', 'FastAPI', 'React', 'TypeScript', 'Raspberry Pi', 'SpacetimeDB'],
    metrics: [
      { value: 40, suffix: '%', label: 'of calls resolved by the robot alone' },
      { value: 100, suffix: '%', label: 'of urgent calls escalated to a nurse' },
      { prefix: '~', value: 5, suffix: ' hrs', label: 'nurse time saved per 8-hr shift' },
    ],
    links: [
      { label: 'Devpost', url: 'https://devpost.com/software/bellhop' },
      { label: 'Repo', url: 'https://github.com/yashpatolia/bellhop' },
    ],
  },
  {
    name: 'Celestial',
    slug: 'celestial',
    summary: 'Discord bot for Hypixel Skyblock player stats, weight and market prices.',
    description:
      'A Python Discord bot that visualizes Minecraft server stats, tracks auction history, and surfaces data-driven item insights for Hypixel players.',
    stack: ['Python', 'MongoDB'],
    metrics: [
      { value: 200, suffix: 'K+', label: 'users reached' },
      { value: 1, suffix: 'M+', label: 'auction listings' },
      { value: 80, suffix: '%+', label: 'pattern accuracy' },
    ],
    links: [
      { label: 'Repo', url: 'https://github.com/yashpatolia/celestial' },
    ],
  },
  {
    name: 'Tracklane',
    slug: 'tracklane',
    summary: 'Application tracker with pipeline stages, deadlines and filters.',
    description:
      'Tracks job applications through each pipeline stage with deadlines and status, built to stay on top of a high-volume co-op search.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    metrics: [],
    links: [
      { label: 'Live', url: 'https://tracklane.yashpatolia.dev/' },
      { label: 'Repo', url: 'https://github.com/yashpatolia/tracklane' },
    ],
  },
  {
    name: 'Interview Prep Hub',
    slug: 'interview-prep',
    summary: 'Lessons, diagrams and practice problems for DSA and quant interviews.',
    description:
      'Notes and practice problems for DSA and quant interviews, organized for fast review before a technical screen.',
    stack: ['JavaScript', 'Vite', 'Docker'],
    metrics: [],
    links: [
      { label: 'Live', url: 'https://resource.yashpatolia.dev/' },
      { label: 'Repo', url: 'https://github.com/yashpatolia/interview-prep' },
    ],
  },
]
