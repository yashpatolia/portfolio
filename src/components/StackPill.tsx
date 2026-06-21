import type { IconType } from 'react-icons'
import {
  SiPython, SiKotlin, SiTypescript, SiJavascript,
  SiReact, SiSvelte, SiFastapi, SiSpring, SiNodedotjs, SiVite, SiJunit5,
  SiPostgresql, SiMongodb, SiSqlite, SiDocker, SiNginx, SiGit,
  SiGithubactions, SiLinux, SiGrafana, SiOpenai,
} from 'react-icons/si'
import { Database, Code, Cloud, FlaskConical } from 'lucide-react'

type LucideIcon = React.ComponentType<{ size?: number; color?: string; className?: string }>

const techIcons: Record<string, { icon: IconType | LucideIcon; color: string }> = {
  Python:           { icon: SiPython,        color: '#3776AB' },
  TypeScript:       { icon: SiTypescript,    color: '#3178C6' },
  JavaScript:       { icon: SiJavascript,    color: '#F7DF1E' },
  Java:             { icon: Code,            color: '#E76F00' },
  Kotlin:           { icon: SiKotlin,        color: '#7F52FF' },
  React:            { icon: SiReact,         color: '#61DAFB' },
  'Spring Boot':    { icon: SiSpring,        color: '#6DB33F' },
  FastAPI:          { icon: SiFastapi,       color: '#009688' },
  'Node.js':        { icon: SiNodedotjs,     color: '#339933' },
  SvelteKit:        { icon: SiSvelte,        color: '#FF3E00' },
  Vite:             { icon: SiVite,          color: '#646CFF' },
  JUnit:            { icon: SiJunit5,        color: '#25A162' },
  pytest:           { icon: FlaskConical,    color: '#0A9EDC' },
  PostgreSQL:       { icon: SiPostgresql,    color: '#4169E1' },
  MongoDB:          { icon: SiMongodb,       color: '#47A248' },
  SQLite:           { icon: SiSqlite,        color: '#003B57' },
  Docker:           { icon: SiDocker,        color: '#2496ED' },
  Nginx:            { icon: SiNginx,         color: '#009639' },
  Git:              { icon: SiGit,           color: '#F05032' },
  'GitHub Actions': { icon: SiGithubactions, color: '#2088FF' },
  Linux:            { icon: SiLinux,         color: '#FCC624' },
  Azure:            { icon: Cloud,           color: '#0078D4' },
  'Azure OpenAI':   { icon: SiOpenai,        color: '#412991' },
  Grafana:          { icon: SiGrafana,       color: '#F46800' },
  Qdrant:           { icon: Database,        color: '#DC244C' },
}

export default function StackPill({ label }: { label: string }) {
  const tech = techIcons[label]
  const Icon = tech?.icon

  return (
    <span className="group inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-md border border-line text-ink-dim hover:border-line-bright hover:text-ink transition-colors">
      {Icon && (
        <Icon
          size={12}
          color={tech.color}
          className="transition-transform duration-200 group-hover:scale-125"
        />
      )}
      {label}
    </span>
  )
}
