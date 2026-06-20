export interface SkillGroup {
  label: string
  color: 'blue' | 'violet' | 'emerald' | 'amber'
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    color: 'blue',
    skills: ['Python', 'Java', 'TypeScript', 'JavaScript', 'SQL', 'Kotlin'],
  },
  {
    label: 'Frameworks',
    color: 'violet',
    skills: ['React', 'SvelteKit', 'FastAPI', 'Spring Boot', 'Node.js', 'Vite.js', 'JUnit', 'pytest'],
  },
  {
    label: 'Databases & Infrastructure',
    color: 'emerald',
    skills: [
      'PostgreSQL',
      'MongoDB',
      'SQLite',
      'Docker',
      'Nginx',
      'Git',
      'GitHub Actions',
      'Linux',
      'Azure',
      'Grafana',
      'AppDynamics',
    ],
  },
  {
    label: 'AI & Machine Learning',
    color: 'amber',
    skills: [
      'Claude API',
      'Azure OpenAI',
      'RAG Pipelines',
      'Vector Search',
      'Qdrant',
      'LLMs',
      'Prompt Engineering',
    ],
  },
]
