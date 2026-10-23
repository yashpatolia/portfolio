export interface SkillGroup {
  label: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'Java', 'Kotlin', 'SQL'],
  },
  {
    label: 'Frameworks',
    skills: ['React', 'Spring Boot', 'FastAPI', 'Node.js', 'SvelteKit', 'Vite', 'JUnit', 'pytest'],
  },
  {
    label: 'Databases & Infrastructure',
    skills: [
      'PostgreSQL', 'MongoDB', 'SQLite', 'Docker', 'Nginx', 'Git',
      'GitHub Actions', 'Linux', 'Azure', 'Grafana', 'AppDynamics',
    ],
  },
  {
    label: 'AI & Machine Learning',
    skills: ['Qdrant', 'RAG Pipelines', 'Vector Search', 'LLMs', 'Claude', 'Codex'],
  },
]
