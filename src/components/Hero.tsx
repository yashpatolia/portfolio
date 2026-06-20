import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Download, ArrowDown } from 'lucide-react'

const taglines = ['Software Engineer', 'Backend Developer', 'Full-Stack Builder']

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Glowing orbs */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.10) 0%, transparent 65%)',
          top: '-15%',
          left: '-15%',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 65%)',
          bottom: '-5%',
          right: '-10%',
        }}
        animate={{ scale: [1.05, 0.95, 1.05], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6"
        >
          {/* Name in Space Grotesk */}
          <h1
            className="text-6xl md:text-8xl font-bold tracking-[-0.03em] leading-none text-gradient-blue"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Yash Patolia
          </h1>

          {/* Thin separator */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-surface-3 to-transparent" />

          {/* Typed tagline */}
          <div className="h-8 flex items-center justify-center">
            <span className="font-mono text-base text-text-dim">
              <span className="text-text-faint select-none">{'>'} </span>
              <span className="text-accent">{displayed}</span>
              <motion.span
                className="text-accent"
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'steps(1)' }}
              >
                _
              </motion.span>
            </span>
          </div>

          {/* One-liner */}
          <p className="font-mono text-xs text-text-faint tracking-wider">
            McMaster University · Software Engineering Co-op
          </p>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-3 flex-wrap pt-2">
            <a
              href="https://github.com/yashpatolia"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-surface border border-surface-3 text-text-dim rounded-lg hover:border-accent/50 hover:text-text hover:bg-surface-2 transition-all text-sm font-medium group"
            >
              <Github size={15} className="group-hover:text-accent transition-colors" />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yash-patolia"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-surface border border-surface-3 text-text-dim rounded-lg hover:border-violet/50 hover:text-text hover:bg-surface-2 transition-all text-sm font-medium group"
            >
              <Linkedin size={15} className="group-hover:text-violet transition-colors" />
              LinkedIn
            </a>
            <a
              href="/portfolio/resume.pdf"
              download
              className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all text-sm font-medium shadow-glow-blue"
            >
              <Download size={15} />
              Resume
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue — anchored to section bottom, not content */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-faint z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.6 },
          y: { repeat: Infinity, duration: 2.5, delay: 1.2 },
        }}
      >
        <span className="font-mono text-xs tracking-widest">scroll</span>
        <ArrowDown size={13} />
      </motion.div>
    </section>
  )
}
