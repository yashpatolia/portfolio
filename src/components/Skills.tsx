import { motion } from 'framer-motion'
import { skillGroups } from '../data/skills'

const colorMap = {
  blue: {
    label: 'text-accent',
    pill: 'border-accent/25 text-text-dim bg-accent/5 hover:border-accent/60 hover:text-accent hover:bg-accent/10',
    dot: 'bg-accent',
  },
  violet: {
    label: 'text-violet',
    pill: 'border-violet/25 text-text-dim bg-violet/5 hover:border-violet/60 hover:text-violet hover:bg-violet/10',
    dot: 'bg-violet',
  },
  emerald: {
    label: 'text-emerald',
    pill: 'border-emerald/25 text-text-dim bg-emerald/5 hover:border-emerald/60 hover:text-emerald hover:bg-emerald/10',
    dot: 'bg-emerald',
  },
  amber: {
    label: 'text-amber',
    pill: 'border-amber/25 text-text-dim bg-amber/5 hover:border-amber/60 hover:text-amber hover:bg-amber/10',
    dot: 'bg-amber',
  },
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
}
const pill = {
  hidden: { opacity: 0, scale: 0.8, y: 6 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 22 } },
}

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6 max-w-4xl mx-auto">
      <div className="section-divider mb-16" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <p className="font-mono text-emerald text-xs tracking-[0.2em] mb-3 uppercase">
          04 / Skills
        </p>
        <h2 className="text-4xl font-bold text-gradient-blue">What I Use</h2>
      </motion.div>

      <div className="space-y-12">
        {skillGroups.map((group) => {
          const colors = colorMap[group.color]
          return (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className={`w-2 h-2 rounded-full ${colors.dot} glow-dot`} />
                <p className={`font-mono text-xs tracking-[0.15em] uppercase font-medium ${colors.label}`}>
                  {group.label}
                </p>
              </div>
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                {group.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={pill}
                    className={`font-mono text-sm px-3.5 py-1.5 rounded-lg border transition-all cursor-default ${colors.pill}`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
