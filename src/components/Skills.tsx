import { motion } from 'framer-motion'
import { skillGroups } from '../data/skills'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
}

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6 xl:pl-32 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="font-mono text-signal text-xs tracking-[0.2em] mb-3 uppercase">03 / Skills</p>
        <h2 className="font-display text-4xl text-ink">What I Use</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-px bg-line border border-line rounded-lg overflow-hidden">
        {skillGroups.map((group) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="bg-canvas p-5"
          >
            <span className="font-mono text-xs tracking-[0.15em] uppercase text-ink-faint">
              {group.label}
            </span>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2"
            >
              {group.skills.map((skill) => {
                const Icon = skill.icon
                return (
                  <motion.div
                    key={skill.name}
                    variants={item}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-md border border-line bg-panel hover:border-signal/40 transition-colors cursor-default group"
                  >
                    {Icon && <Icon size={15} style={{ color: skill.iconColor, flexShrink: 0 }} />}
                    <span className="text-xs text-ink-dim group-hover:text-ink transition-colors truncate">
                      {skill.name}
                    </span>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
