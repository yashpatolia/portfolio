import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'

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
  const [active, setActive] = useState(0)

  useEffect(() => {
    const ids = marks.map((m) => m.href.slice(1))
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (els.length === 0) return

    const onScroll = () => {
      let current = 0
      els.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = i
      })
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
              className={`block w-[7px] h-[7px] rounded-full border transition-colors duration-300 ${
                i === active
                  ? 'bg-signal border-signal'
                  : 'bg-canvas border-line group-hover:border-ink-faint'
              }`}
            />
            <span
              className={`font-mono text-[11px] tracking-[0.14em] transition-colors duration-300 ${
                i === active ? 'text-signal' : 'text-ink-faint group-hover:text-ink-dim'
              }`}
            >
              {m.n}
            </span>
          </a>
        ))}
      </div>
    </nav>
  )
}
