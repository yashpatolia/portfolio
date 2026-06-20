import { motion } from 'framer-motion'
import { skillGroups } from '../data/skills'

const categoryAccent: Record<string, string> = {
  blue: 'text-accent border-accent/30',
  violet: 'text-violet border-violet/30',
  emerald: 'text-emerald border-emerald/30',
  amber: 'text-amber border-amber/30',
}

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
    <section id="skills" className="py-28 px-6 max-w-5xl mx-auto">
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
        <h2 className="text-4xl font-bold text-text">What I Use</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-5">
        {skillGroups.map((group) => {
          const accentCls = categoryAccent[group.color]

          return (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="rounded-xl border border-surface-2/70 bg-surface shadow-card overflow-hidden"
            >
              {/* Card header */}
              <div className={`px-5 py-3.5 border-b border-surface-2/60 flex items-center gap-2`}>
                <span className={`font-mono text-xs tracking-[0.15em] uppercase font-medium ${accentCls.split(' ')[0]}`}>
                  {group.label}
                </span>
              </div>

              {/* Skills grid */}
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-2"
              >
                {group.skills.map((skill) => {
                  const Icon = skill.icon
                  return (
                    <motion.div
                      key={skill.name}
                      variants={item}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-surface-2/50 bg-bg/40 hover:border-surface-3 hover:bg-surface-2/30 transition-all cursor-default group"
                    >
                      {Icon && (
                        <Icon
                          size={16}
                          style={{ color: skill.iconColor, flexShrink: 0 }}
                        />
                      )}
                      <span className="text-xs text-text-dim group-hover:text-text transition-colors truncate">
                        {skill.name}
                      </span>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
