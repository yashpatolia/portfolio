import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { ChevronDown, Github, ArrowUpRight } from 'lucide-react'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { extras } from '../data/extras'

const navLinks = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]
const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const active = useScrollSpy(['top', ...navLinks.map((l) => l.href.slice(1))])

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => setScrolled(v > 0.01))
    return unsub
  }, [scrollYProgress])

  useEffect(() => {
    if (!moreOpen) return
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [moreOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-canvas/85 backdrop-blur-md border-b border-line'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-mono text-sm tracking-wider group flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-signal" />
          <span className="text-ink group-hover:text-signal transition-colors">yashpatolia.dev</span>
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => {
            const isActive = active === i + 1
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`font-mono text-xs tracking-wide relative group transition-colors ${
                    isActive ? 'text-signal' : 'text-ink-dim hover:text-ink'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-signal transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              </li>
            )
          })}
        </ul>
        <div className="hidden md:flex items-center gap-4">
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen((v) => !v)}
              className="flex items-center gap-1 font-mono text-xs tracking-wide text-ink-dim hover:text-ink transition-colors"
            >
              More
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-3 w-60 rounded-md border border-line bg-canvas/95 backdrop-blur-md p-1.5 shadow-lg"
                >
                  {extras.map((extra) => (
                    <div
                      key={extra.name}
                      className="flex items-center justify-between gap-2 px-3 py-2 rounded-md hover:bg-line/30 transition-colors"
                    >
                      <span className="font-mono text-xs text-ink-dim">{extra.name}</span>
                      <div className="flex items-center gap-2.5 shrink-0">
                        <a
                          href={extra.repo}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${extra.name} repo`}
                          className="text-ink-faint hover:text-ink transition-colors"
                        >
                          <Github size={13} />
                        </a>
                        <a
                          href={extra.url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${extra.name} live site`}
                          className="text-ink-faint hover:text-signal transition-colors"
                        >
                          <ArrowUpRight size={13} />
                        </a>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <a
            href={resumeHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-line text-ink-dim font-mono text-xs rounded-md hover:border-signal/50 hover:text-signal transition-all duration-200"
          >
            Resume ↗
          </a>
        </div>
      </nav>

      <motion.div
        className="h-px bg-signal origin-left"
        style={{ scaleX: scrollYProgress, opacity: scrollYProgress }}
      />
    </header>
  )
}
