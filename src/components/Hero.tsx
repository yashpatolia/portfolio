import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, FileText } from 'lucide-react'
import MagneticLink from './MagneticLink'

const taglines = ['Software Engineer', 'Backend Developer', 'Full-Stack Builder']
const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`

export default function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = taglines[taglineIndex]
    if (!deleting && displayed.length < target.length) {
      const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 70)
      return () => clearTimeout(t)
    }
    if (!deleting && displayed.length === target.length) {
      const t = setTimeout(() => setDeleting(true), 2200)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false)
      setTaglineIndex((i) => (i + 1) % taglines.length)
    }
  }, [displayed, deleting, taglineIndex])

  return (
    <section id="top" className="relative min-h-screen flex items-center px-6 xl:pl-32 max-w-5xl mx-auto">
      <div className="w-full">
          <div className="relative overflow-hidden mb-5 inline-block">
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-medium leading-none tracking-tight text-ink">
              Yash Patolia
            </h1>
            <motion.span
              aria-hidden
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              style={{ transformOrigin: 'right' }}
              className="absolute inset-0 bg-signal"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="h-7 flex items-center mb-3"
          >
            <span className="font-mono text-base text-signal">
              {displayed}
              <motion.span
                className="inline-block w-px h-4 bg-signal ml-0.5 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'steps(1)' }}
              />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="font-mono text-sm text-ink-faint mb-10"
          >
            McMaster University &middot; Software Engineering Co-op
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex items-center gap-3 flex-wrap"
          >
            <a
              href="https://github.com/yashpatolia"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 px-4 py-2 border border-line text-ink-dim rounded-md hover:border-line-bright hover:text-ink active:scale-[0.97] transition-all text-sm"
            >
              <Github size={15} className="transition-transform group-hover:rotate-[-8deg]" />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yash-patolia"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 px-4 py-2 border border-line text-ink-dim rounded-md hover:border-line-bright hover:text-ink active:scale-[0.97] transition-all text-sm"
            >
              <Linkedin size={15} className="transition-transform group-hover:rotate-[-8deg]" />
              LinkedIn
            </a>
            <MagneticLink
              href={resumeHref}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 px-4 py-2 bg-signal text-canvas rounded-md hover:bg-signal-dim transition-colors text-sm font-medium"
            >
              <FileText size={15} className="transition-transform group-hover:-translate-y-0.5" />
              Resume
            </MagneticLink>
          </motion.div>
      </div>
    </section>
  )
}
