import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react'
import { projects } from '../data/projects'
import { useCountUp } from '../hooks/useCountUp'
import StackPill from './StackPill'

function Metric({ value, suffix, label, inView }: { value: number; suffix: string; label: string; inView: boolean }) {
  const count = useCountUp(value, 1400, inView)
  const displayValue = suffix === 'M+' ? '1' : count
  return (
    <div>
      <div className="text-xl font-bold text-text tabular-nums">{displayValue}{suffix}</div>
      <div className="text-xs text-text-faint mt-0.5">{label}</div>
    </div>
  )
}

function ProjectCard({ index, inView }: { index: number; inView: boolean }) {
  const project = projects[index]
  const liveLink = project.links.find((l) => l.label === 'Live')
  const repoLink = project.links.find((l) => l.label === 'Repo')
  const isPrivate = project.links.length === 0

  const statusLabel = index === 0 ? 'Live' : index === 1 ? 'Private' : 'Open Source'
  const statusClass = index === 0
    ? 'text-emerald border-emerald/30 bg-emerald/5'
    : 'text-text-faint border-surface-3 bg-surface-2/30'

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="rounded-xl border border-surface-2/70 bg-surface shadow-card hover:border-surface-3 hover:shadow-card-hover transition-all duration-300"
    >
      <div className="p-5 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-lg font-semibold text-text">{project.name}</h3>
            <span className={`font-mono text-[11px] px-2 py-0.5 rounded border ${statusClass}`}>
              {statusLabel}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {liveLink && (
              <a
                href={liveLink.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-accent/40 bg-accent/5 text-accent font-mono text-xs hover:bg-accent/10 transition-colors"
              >
                <ExternalLink size={12} />
                Live
              </a>
            )}
            {repoLink && (
              <a
                href={repoLink.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-3 bg-surface-2/30 text-text-dim font-mono text-xs hover:border-surface-3/80 hover:text-text transition-colors"
              >
                <Github size={12} />
                Repo
              </a>
            )}
            {isPrivate && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-3 bg-surface-2/30 text-text-faint font-mono text-xs">
                <ArrowUpRight size={12} />
                Private
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-text-dim text-sm leading-relaxed mb-5 max-w-[70ch]">
          {project.description}
        </p>

        {/* Metrics */}
        <div className="flex flex-wrap gap-6 mb-5 py-4 border-y border-surface-2/50">
          {project.metrics.map((metric) => (
            <Metric key={metric.label} {...metric} inView={inView} />
          ))}
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <StackPill key={s} label={s} />
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-28 px-6 max-w-5xl mx-auto">
      <div className="section-divider mb-16" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <p className="font-mono text-accent text-xs tracking-[0.2em] mb-3 uppercase">03 / Projects</p>
        <h2 className="text-4xl font-bold text-text">What I've Built</h2>
      </motion.div>

      <div ref={sectionRef} className="space-y-5">
        {projects.map((_, index) => (
          <ProjectCard key={projects[index].name} index={index} inView={inView} />
        ))}
      </div>
    </section>
  )
}
