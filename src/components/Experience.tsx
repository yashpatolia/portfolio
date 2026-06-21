import { motion } from 'framer-motion'
import { experience, type Role } from '../data/experience'
import StackPill from './StackPill'

function ExperienceRow({ role, i }: { role: Role; i: number }) {
  const current = role.dateEnd === 'Present'

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: i * 0.08 }}
      className="grid md:grid-cols-[10rem_1fr] gap-3 md:gap-8 py-7 border-b border-line last:border-b-0"
    >
      <div className="flex md:flex-col items-baseline md:items-start gap-2 md:gap-1">
        <span className="font-mono text-xs text-ink-faint tracking-wide">
          {role.dateStart} – {role.dateEnd}
        </span>
        {current && (
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal border border-signal/40 rounded px-1.5 py-0.5">
            current
          </span>
        )}
      </div>

      <div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
          <h3 className="font-display text-2xl text-ink">{role.company}</h3>
          <span className="font-mono text-xs text-ink-faint">{role.location}</span>
        </div>
        <p className="text-sm text-ink-dim mb-3">{role.role}</p>

        <ul className="space-y-1.5 mb-4">
          {role.bullets.map((b) => (
            <li key={b} className="text-sm text-ink-dim leading-relaxed pl-4 relative">
              <span className="absolute left-0 text-ink-faint">—</span>
              {b}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5">
          {role.stack.map((s) => <StackPill key={s} label={s} />)}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-6 xl:pl-32 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="font-mono text-signal text-xs tracking-[0.2em] mb-3 uppercase">01 / Experience</p>
        <h2 className="font-display text-4xl text-ink">Where I've Worked</h2>
      </motion.div>

      <div>
        {experience.map((role, i) => (
          <ExperienceRow key={role.company + role.dateStart} role={role} i={i} />
        ))}
      </div>
    </section>
  )
}
