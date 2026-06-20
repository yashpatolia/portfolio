import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, GitCommitVertical } from 'lucide-react'
import { experience, type Role } from '../data/experience'
import StackPill from './StackPill'

const accent = ['#3b82f6', '#8b5cf6', '#10b981'] as const
const commitIds = ['c57bry4', 'a91kq2f', 'd8m4t1x'] as const

function ExperienceCard({ role, i }: { role: Role; i: number }) {
  const color = accent[i]
  const commitMessage = i === 0
    ? 'feat: backend service work and stored procedure migrations'
    : i === 1
      ? 'feat: assessment reports, patient scheduling, and app integration'
      : 'feat: platform work and deployment setup'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: i * 0.1 }}
      className="rounded-xl overflow-hidden border border-surface-2/70 hover:border-surface-3 transition-colors duration-300 shadow-card hover:shadow-card-hover"
      style={{ background: 'linear-gradient(160deg, #111827 0%, #0d1526 100%)' }}
    >
      <div
        className="h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${color}80, transparent)` }}
      />

      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-surface-2/60 bg-surface/50">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="font-mono text-[11px] px-2 py-0.5 rounded-full border text-text-dim"
            style={{ borderColor: `${color}40`, background: `${color}10` }}
          >
            {commitIds[i] ?? commitIds[0]}
          </span>
          <div className="min-w-0">
            <div className="font-semibold text-text text-sm md:text-base truncate">
              {role.company}
            </div>
            <div className="font-mono text-[11px] text-text-faint truncate">
              {role.location}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-dim truncate">
              {role.role}
            </div>
          </div>
        </div>
        <span className="font-mono text-[11px] text-text-faint uppercase tracking-[0.16em]">
          commit
        </span>
      </div>

      <div className="p-4 md:p-5">
        <div className="flex items-start gap-3 mb-3">
          <div
            className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border bg-bg/60 shrink-0"
            style={{ borderColor: `${color}40` }}
          >
            <GitCommitVertical size={14} style={{ color }} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-mono text-sm text-text leading-tight mb-1">{commitMessage}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 pl-11">
          {role.stack.map((s) => <StackPill key={s} label={s} />)}
        </div>
      </div>
    </motion.div>
  )
}

function DatePill({ role, i }: { role: Role; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: i * 0.1 + 0.1 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-surface-2 bg-surface font-mono text-xs text-text-dim shadow-card"
    >
      <Calendar size={11} style={{ color: accent[i] }} />
      {role.dateStart} - {role.dateEnd}
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="py-28 px-6 max-w-5xl mx-auto">
      <div className="section-divider mb-16" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <p className="font-mono text-accent text-xs tracking-[0.2em] mb-3 uppercase">02 / Experience</p>
        <h2 className="text-4xl font-bold text-gradient-blue">Where I've Worked</h2>
      </motion.div>

      <div className="relative" ref={ref}>
        <div className="hidden md:block absolute left-1/2 top-0 bottom-16 w-px bg-surface-2 -translate-x-1/2" />
        <motion.div
          className="hidden md:block absolute left-1/2 top-0 w-px origin-top -translate-x-1/2"
          style={{
            background: 'linear-gradient(180deg, #3b82f6 0%, #8b5cf6 55%, #10b981 100%)',
            height: 'calc(100% - 64px)',
          }}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="md:hidden absolute left-0 top-0 bottom-16 w-px bg-surface-2" />
        <motion.div
          className="md:hidden absolute left-0 top-0 w-px origin-top"
          style={{
            background: 'linear-gradient(180deg, #3b82f6 0%, #8b5cf6 55%, #10b981 100%)',
            height: 'calc(100% - 64px)',
          }}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="space-y-10">
          {experience.map((role, i) => {
            const isLeft = i % 2 === 0
            return (
              <div key={i}>
                <div className="hidden md:grid grid-cols-[1fr_48px_1fr] items-center gap-4">
                  <div className={isLeft ? '' : 'flex justify-end'}>
                    {isLeft
                      ? <ExperienceCard role={role} i={i} />
                      : <DatePill role={role} i={i} />}
                  </div>

                  <div className="flex justify-center z-10">
                    <div
                      className="w-4 h-4 rounded-full border-2 bg-bg"
                      style={{
                        borderColor: accent[i],
                        boxShadow: `0 0 12px 3px ${accent[i]}44`,
                      }}
                    />
                  </div>

                  <div>
                    {isLeft
                      ? <DatePill role={role} i={i} />
                      : <ExperienceCard role={role} i={i} />}
                  </div>
                </div>

                <div className="md:hidden flex gap-5 items-start pl-5">
                  <div
                    className="w-3 h-3 rounded-full border-2 bg-bg shrink-0 mt-4 -ml-[22px]"
                    style={{ borderColor: accent[i], boxShadow: `0 0 8px 2px ${accent[i]}44` }}
                  />
                  <div className="flex-1 space-y-2">
                    <DatePill role={role} i={i} />
                    <ExperienceCard role={role} i={i} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-surface-2 bg-surface font-mono text-xs text-text-faint shadow-card">
            <span className="text-base leading-none">⊙</span>
            Timeline in progress
          </div>
        </motion.div>
      </div>
    </section>
  )
}
