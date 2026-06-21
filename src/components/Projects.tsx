import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import { projects } from '../data/projects'
import { useCountUp } from '../hooks/useCountUp'
import StackPill from './StackPill'

function Metric({ value, suffix, label, inView }: { value: number; suffix: string; label: string; inView: boolean }) {
  const count = useCountUp(value, 1400, inView)
  const displayValue = suffix === 'M+' ? '1' : count
  return (
    <div className="px-4 first:pl-0 border-l border-line first:border-l-0">
      <div className="font-mono text-lg text-ink tabular-nums">
        {displayValue}<span className="text-signal">{suffix}</span>
      </div>
      <div className="font-mono text-[10px] text-ink-faint uppercase tracking-[0.1em] mt-0.5">{label}</div>
    </div>
  )
}

function ProjectCard({ index, inView }: { index: number; inView: boolean }) {
  const project = projects[index]
  const liveLink = project.links.find((l) => l.label === 'Live')
  const repoLink = project.links.find((l) => l.label === 'Repo')
  const isPrivate = project.links.length === 0

  const statusLabel = index === 0 ? 'live' : index === 1 ? 'private' : 'open-source'

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="border border-line rounded-lg hover:border-line-bright transition-colors duration-300"
    >
      <div className="p-5 md:p-7">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-display text-xl text-ink">{project.name}</h3>
            <span className="font-mono text-[11px] text-ink-faint">[{statusLabel}]</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {liveLink && (
              <a
                href={liveLink.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-line text-ink-dim font-mono text-xs hover:border-signal/50 hover:text-signal transition-colors"
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-line text-ink-dim font-mono text-xs hover:border-line-bright hover:text-ink transition-colors"
              >
                <Github size={12} />
                Repo
              </a>
            )}
            {isPrivate && (
              <span className="font-mono text-xs text-ink-faint">no public repo</span>
            )}
          </div>
        </div>

        <p className="text-ink-dim text-sm leading-relaxed mb-5 max-w-[68ch]">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-y-3 mb-5 py-4 border-y border-line">
          {project.metrics.map((metric) => (
            <Metric key={metric.label} {...metric} inView={inView} />
          ))}
        </div>

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
    <section id="projects" className="py-28 px-6 xl:pl-32 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="font-mono text-signal text-xs tracking-[0.2em] mb-3 uppercase">02 / Projects</p>
        <h2 className="font-display text-4xl text-ink">What I've Built</h2>
      </motion.div>

      <div ref={sectionRef} className="space-y-5">
        {projects.map((_, index) => (
          <ProjectCard key={projects[index].name} index={index} inView={inView} />
        ))}
      </div>
    </section>
  )
}
