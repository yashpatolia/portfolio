import { useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'

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
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => setScrolled(v > 0.01))
    return unsub
  }, [scrollYProgress])

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
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-xs text-ink-dim hover:text-ink transition-colors tracking-wide relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-signal group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>
        <a
          href={resumeHref}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 border border-line text-ink-dim font-mono text-xs rounded-md hover:border-signal/50 hover:text-signal transition-all duration-200"
        >
          Resume ↗
        </a>
      </nav>

      <motion.div
        className="h-px bg-signal origin-left"
        style={{ scaleX: scrollYProgress, opacity: scrollYProgress }}
      />
    </header>
  )
}
