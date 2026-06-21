import { motion, useScroll } from 'framer-motion'
import { useScrollSpy } from '../hooks/useScrollSpy'

const marks = [
  { n: '00', label: 'Hero', href: '#top' },
  { n: '01', label: 'Experience', href: '#experience' },
  { n: '02', label: 'Projects', href: '#projects' },
  { n: '03', label: 'Skills', href: '#skills' },
  { n: '04', label: 'Education', href: '#education' },
  { n: '05', label: 'Contact', href: '#contact' },
]

export default function ScrollRail() {
  const { scrollYProgress } = useScroll()
  const active = useScrollSpy(marks.map((m) => m.href.slice(1)))

  return (
    <nav
      aria-label="Section index"
      className="hidden xl:flex fixed left-10 top-0 h-full flex-col justify-center z-40"
    >
      <div className="relative flex flex-col gap-[3.6rem] py-2">
        <div className="absolute left-[3px] top-0 bottom-0 w-px bg-line" />
        <motion.div
          className="absolute left-[3px] top-0 w-px bg-signal origin-top"
          style={{ scaleY: scrollYProgress, height: '100%' }}
        />
        {marks.map((m, i) => (
          <a
            key={m.href}
            href={m.href}
            className="group flex items-center gap-3"
          >
            <span
              className={`block w-[7px] h-[7px] rounded-full border transition-all duration-300 ${
                i === active
                  ? 'bg-signal border-signal scale-110'
                  : 'bg-canvas border-line group-hover:border-ink-faint group-hover:scale-110'
              }`}
            />
            <span
              className={`font-mono text-[11px] tracking-[0.14em] transition-colors duration-300 ${
                i === active ? 'text-signal' : 'text-ink-faint group-hover:text-ink-dim'
              }`}
            >
              {m.n}
            </span>
            <span className="font-mono text-[11px] text-ink-faint tracking-[0.1em] uppercase opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
              {m.label}
            </span>
          </a>
        ))}
      </div>
    </nav>
  )
}
