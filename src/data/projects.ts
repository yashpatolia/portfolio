export interface Metric {
  value: number
  suffix: string
  label: string
}

export interface Project {
  name: string
  description: string
  stack: string[]
  metrics: Metric[]
  links: { label: string; url: string }[]
}

export const projects: Project[] = [
  {
    name: 'Game Chat Bridge',
    description:
      'A real-time bridge between Hypixel Skyblock guild chat and Discord, with a React panel, FastAPI backend, and Node.js gateway built for production traffic.',
    stack: ['Python', 'TypeScript', 'React', 'FastAPI', 'PostgreSQL', 'Node.js'],
    metrics: [
      { value: 230, suffix: 'K+', label: 'messages relayed' },
      { value: 570, suffix: 'K+', label: 'API calls' },
      { value: 99, suffix: '%+', label: 'success rate' },
    ],
    links: [
      { label: 'Live', url: 'https://bumble.seazyns.dev/' },
      { label: 'Repo', url: 'https://github.com/yashpatolia/bumble-unified' },
    ],
  },
  {
    name: 'Patient Discharge Assistant',
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
    name: 'Celestial',
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
]
