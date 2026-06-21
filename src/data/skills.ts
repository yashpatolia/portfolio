import type { IconType } from 'react-icons'
import {
  SiPython, SiKotlin, SiTypescript, SiJavascript,
  SiReact, SiSvelte, SiFastapi, SiSpring, SiNodedotjs, SiVite, SiJunit5,
  SiPostgresql, SiMongodb, SiSqlite, SiDocker, SiNginx, SiGit,
  SiGithubactions, SiLinux, SiGrafana,
} from 'react-icons/si'
import { Database, Code, Cloud, Activity, Brain, Layers, Search, FlaskConical } from 'lucide-react'

export interface Skill {
  name: string
  icon?: IconType | React.ComponentType<{ size?: number; className?: string }>
  iconColor?: string
}

export interface SkillGroup {
  label: string
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    skills: [
      { name: 'Python', icon: SiPython, iconColor: '#3776AB' },
      { name: 'TypeScript', icon: SiTypescript, iconColor: '#3178C6' },
      { name: 'JavaScript', icon: SiJavascript, iconColor: '#F7DF1E' },
      { name: 'Java', icon: Code, iconColor: '#E76F00' },
      { name: 'Kotlin', icon: SiKotlin, iconColor: '#7F52FF' },
      { name: 'SQL', icon: Database, iconColor: '#336791' },
    ],
  },
  {
    label: 'Frameworks',
    skills: [
      { name: 'React', icon: SiReact, iconColor: '#61DAFB' },
      { name: 'Spring Boot', icon: SiSpring, iconColor: '#6DB33F' },
      { name: 'FastAPI', icon: SiFastapi, iconColor: '#009688' },
      { name: 'Node.js', icon: SiNodedotjs, iconColor: '#339933' },
      { name: 'SvelteKit', icon: SiSvelte, iconColor: '#FF3E00' },
      { name: 'Vite', icon: SiVite, iconColor: '#646CFF' },
      { name: 'JUnit', icon: SiJunit5, iconColor: '#25A162' },
      { name: 'pytest', icon: FlaskConical, iconColor: '#0A9EDC' },
    ],
  },
  {
    label: 'Databases & Infrastructure',
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql, iconColor: '#4169E1' },
      { name: 'MongoDB', icon: SiMongodb, iconColor: '#47A248' },
      { name: 'Docker', icon: SiDocker, iconColor: '#2496ED' },
      { name: 'Git', icon: SiGit, iconColor: '#F05032' },
      { name: 'GitHub Actions', icon: SiGithubactions, iconColor: '#2088FF' },
      { name: 'Linux', icon: SiLinux, iconColor: '#FCC624' },
      { name: 'Azure', icon: Cloud, iconColor: '#0078D4' },
      { name: 'Nginx', icon: SiNginx, iconColor: '#009639' },
      { name: 'SQLite', icon: SiSqlite, iconColor: '#003B57' },
      { name: 'Grafana', icon: SiGrafana, iconColor: '#F46800' },
      { name: 'AppDynamics', icon: Activity, iconColor: '#43A0E5' },
    ],
  },
  {
    label: 'AI & Machine Learning',
    skills: [
      { name: 'Qdrant', icon: Database, iconColor: '#DC244C' },
      { name: 'RAG Pipelines', icon: Layers, iconColor: '#F59E0B' },
      { name: 'Vector Search', icon: Search, iconColor: '#F59E0B' },
      { name: 'LLMs', icon: Brain, iconColor: '#F59E0B' },
    ],
  },
]
