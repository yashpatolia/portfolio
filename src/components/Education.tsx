import { motion } from 'framer-motion'

const courses = [
  'Data Structures & Algorithms',
  'Object-Oriented Programming',
  'Operating Systems',
  'Software Development',
  'Databases',
  'Software Testing',
]

export default function Education() {
  return (
    <section id="education" className="py-28 px-6 xl:pl-32 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="font-mono text-signal text-xs tracking-[0.2em] mb-3 uppercase">04 / Education</p>
        <h2 className="font-display text-4xl text-ink">Background</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="border border-line rounded-lg p-7 md:p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
          <h3 className="font-display text-2xl text-ink">McMaster University</h3>
          <span className="font-mono text-xs text-ink-faint border border-line rounded px-2.5 py-1">
            Expected May 2028
          </span>
        </div>
        <p className="text-signal font-medium text-sm mb-0.5">BEng Software Engineering (Co-op)</p>
        <p className="text-ink-dim text-sm">Minor in Mathematics</p>

        <div className="mt-7 pt-7 border-t border-line">
          <p className="font-mono text-xs text-ink-faint tracking-widest uppercase mb-4">
            Relevant Coursework
          </p>
          <div className="flex flex-wrap gap-2">
            {courses.map((c) => (
              <span
                key={c}
                className="font-mono text-xs px-3 py-1.5 border border-line rounded-md text-ink-dim hover:border-signal/40 hover:text-ink transition-colors"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
