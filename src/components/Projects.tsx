import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Github, GitBranch } from 'lucide-react'
import { projects } from '../data/projects'
import { useCountUp } from '../hooks/useCountUp'

const stackColors: Record<string, string> = {
  Python: 'text-amber border-amber/25 bg-amber/5',
  TypeScript: 'text-accent border-accent/25 bg-accent/5',
  React: 'text-accent border-accent/25 bg-accent/5',
  FastAPI: 'text-emerald border-emerald/25 bg-emerald/5',
  PostgreSQL: 'text-emerald border-emerald/25 bg-emerald/5',
  MongoDB: 'text-emerald border-emerald/25 bg-emerald/5',
  'Node.js': 'text-emerald border-emerald/25 bg-emerald/5',
  Qdrant: 'text-violet border-violet/25 bg-violet/5',
  'Azure OpenAI': 'text-amber border-amber/25 bg-amber/5',
  Docker: 'text-accent border-accent/25 bg-accent/5',
}

const defaultStack = 'text-text-dim border-surface-3 bg-surface-2/30'
const accents = ['#3b82f6', '#8b5cf6'] as const

function StackPill({ label }: { label: string }) {
  const cls = stackColors[label] ?? defaultStack
  return <span className={`font-mono text-xs px-2.5 py-1 rounded-md border transition-colors ${cls}`}>{label}</span>
}

function MetricBadge({ value, suffix, label, inView }: { value: number; suffix: string; label: string; inView: boolean }) {
  const count = useCountUp(value, 1400, inView)
  const displayValue = suffix === 'M+' ? '1' : count
  return (
    <div className="min-w-[74px]">
      <div className="font-mono text-lg font-bold text-emerald leading-none">
        {displayValue}{suffix}
      </div>
      <div className="font-mono text-[11px] text-text-faint mt-1 leading-tight">{label}</div>
    </div>
  )
}

function ProjectCard({ index, inView }: { index: number; inView: boolean }) {
  const project = projects[index]
  const color = accents[index % accents.length]
  const hasRepo = project.links.length > 0
  const statusLabels = index === 0 ? ['ISSUE', 'PR', 'MERGED'] : ['ISSUE', 'PR']
  const visibilityLabel = index === 0 ? 'public / active' : index === 1 ? 'private / shipped' : 'public / shipped'
  const noteLines = index === 0
    ? [
        'Real-time relay built for always-on chat traffic.',
        'Control surface keeps the system observable.',
      ]
    : index === 1
      ? [
        'Document-heavy workflow reduced to a cleaner review loop.',
        'Built for fast extraction and low-friction handoff.',
      ]
      : [
        'Discord bot connects live stats and auction history.',
        'Pattern matching improves item identification over time.',
      ]

  const statusCopy = index === 0
    ? 'Issue-driven iteration keeps the bridge stable under load.'
    : index === 1
      ? 'PR-style workflow keeps review fast and the handoff clean.'
      : 'Live stats, auction tracking, and pattern matching'

  const badgeState = index === 0 ? 'merged' : index === 1 ? 'closed' : 'shipped'

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-[1.35rem] border border-surface-2/70 bg-surface/55 shadow-card transition-all duration-500 hover:border-surface-3 hover:shadow-card-hover"
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{ background: `radial-gradient(circle at top left, ${color}1f, transparent 36%), linear-gradient(135deg, ${color}14, transparent 58%)` }}
      />
      <div className="relative p-4 md:p-5">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full border border-surface-3 bg-bg/40 font-mono text-[11px] text-text-dim">
              <GitBranch size={12} style={{ color }} />
              README.md
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint truncate">
              {visibilityLabel}
            </span>
          </div>
          <span
            className="font-mono text-[11px] px-2 py-0.5 rounded-full border"
            style={{ borderColor: `${color}44`, color, background: `${color}10` }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1fr_1.1fr] items-start">
          <div>
            <div className="rounded-[1.1rem] border border-surface-2/70 bg-bg/45 p-4 md:p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint mb-2"># overview</p>
              <h3 className="text-xl md:text-2xl font-bold text-text leading-tight mb-2">
                {project.name}
              </h3>
              <p className="text-text-dim text-sm leading-relaxed max-w-[42ch] xl:max-w-none">
                {project.description}
              </p>
            </div>

            <div className="mt-3 rounded-[1.1rem] border border-surface-2/70 bg-surface/45 p-4 md:p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint mb-2"># notes</p>
              <div className="space-y-1.5 font-mono text-[11px] md:text-xs text-text-dim leading-relaxed">
                {noteLines.map((line, lineIndex) => (
                  <p key={lineIndex} className="flex gap-2">
                    <span className="text-text-faint select-none">-</span>
                    <span>{line}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((stack) => (
                <StackPill key={stack} label={stack} />
              ))}
            </div>
          </div>

          <div className="rounded-[1.1rem] border border-surface-2/70 bg-bg/55 p-4 md:p-5">
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint">issues & prs</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint">{badgeState}</span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {project.metrics.map((metric, metricIndex) => (
                <span
                  key={metric.label}
                  className="inline-flex items-center gap-2.5 rounded-full border border-surface-3 bg-surface/40 px-4 py-2 min-w-[132px]"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint shrink-0">
                    {statusLabels[metricIndex] ?? 'PR'}
                  </span>
                  <MetricBadge {...metric} inView={inView} />
                </span>
              ))}
            </div>

            <div className="mt-3 rounded-[1rem] border border-surface-2 bg-bg/45 p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint mb-1.5">status</p>
              <p className="text-xs text-text-dim leading-relaxed">
                {statusCopy}
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              {hasRepo ? project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-surface-3 bg-bg/40 text-text-dim font-mono text-[11px] hover:border-accent hover:text-accent transition-colors"
                  aria-label={link.label}
                >
                  <Github size={13} />
                  View repo
                  <ArrowUpRight size={12} />
                </a>
              )) : (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-surface-3 bg-bg/40 text-text-dim font-mono text-[11px]">
                  <ArrowUpRight size={12} />
                  Private build
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-28 px-6 max-w-6xl mx-auto">
      <div className="section-divider mb-16" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <p className="font-mono text-violet text-xs tracking-[0.2em] mb-3 uppercase">03 / Projects</p>
        <h2 className="text-4xl font-bold text-gradient-blue">What I've Built</h2>
      </motion.div>

      <div ref={sectionRef} className="space-y-6 md:space-y-8">
        {projects.map((_, index) => (
          <ProjectCard key={projects[index].name} index={index} inView={inView} />
        ))}
      </div>
    </section>
  )
}