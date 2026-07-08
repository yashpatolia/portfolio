import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import { extras } from '../data/extras'
import SectionHeader from './SectionHeader'
import StackPill from './StackPill'

export default function Extras() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="extras" className="relative py-20 px-6 xl:pl-32 max-w-5xl mx-auto">
      <SectionHeader n="03" label="Extras" title="Also Building" />

      <div ref={sectionRef} className="divide-y divide-line border-y border-line">
        {extras.map((extra, i) => (
          <motion.div
            key={extra.name}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group py-5"
          >
            <div className="flex items-center justify-between gap-4 mb-2">
              <a
                href={extra.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 min-w-0"
              >
                <h3 className="font-display text-lg text-ink group-hover:text-signal transition-colors shrink-0">
                  {extra.name}
                </h3>
                <span className="font-mono text-[11px] text-ink-faint">[live]</span>
              </a>
              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={extra.repo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${extra.name} repo`}
                  className="text-ink-faint hover:text-ink transition-colors"
                >
                  <Github size={15} />
                </a>
                <a
                  href={extra.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${extra.name} live site`}
                  className="text-ink-faint transition-all duration-200 group-hover:text-signal group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
            <p className="text-ink-faint text-sm mb-3 max-w-xl">{extra.tag}</p>
            <div className="flex flex-wrap gap-1.5">
              {extra.stack.map((s) => (
                <StackPill key={s} label={s} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
