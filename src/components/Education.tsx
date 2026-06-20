import { motion } from 'framer-motion'
import { GraduationCap, BookOpen } from 'lucide-react'

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
    <section id="education" className="py-28 px-6 max-w-4xl mx-auto">
      <div className="section-divider mb-16" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <p className="font-mono text-amber text-xs tracking-[0.2em] mb-3 uppercase">
          05 / Education
        </p>
        <h2 className="text-4xl font-bold text-gradient-blue">Background</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-px rounded-xl bg-gradient-to-br from-amber/20 via-surface-3/30 to-transparent shadow-card">
          <div className="card-gradient rounded-[11px] p-8">
            <div className="flex items-start gap-5">
              <div className="p-3 rounded-xl bg-amber/10 border border-amber/20 shrink-0">
                <GraduationCap size={22} className="text-amber" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-semibold text-text">McMaster University</h3>
                    <p className="text-amber font-medium mt-0.5">
                      BEng Software Engineering (Co-op)
                    </p>
                  </div>
                  <span className="font-mono text-xs text-text-faint border border-surface-3 rounded-full px-3 py-1 bg-surface">
                    Expected May 2028
                  </span>
                </div>
                <p className="text-text-dim text-sm mt-2">Minor in Mathematics</p>

                <div className="mt-6 pt-6 border-t border-surface-2">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen size={14} className="text-text-faint" />
                    <p className="font-mono text-xs text-text-faint tracking-widest uppercase">
                      Relevant Coursework
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {courses.map((c) => (
                      <span
                        key={c}
                        className="font-mono text-xs px-3 py-1.5 bg-surface-2/50 text-text-dim rounded-lg border border-surface-3 hover:border-amber/30 hover:text-amber transition-colors"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
