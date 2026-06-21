import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionHeaderProps {
  n: string
  label: string
  title: string
  children?: ReactNode
}

export default function SectionHeader({ n, label, title, children }: SectionHeaderProps) {
  return (
    <div className="relative mb-12">
      <span
        aria-hidden
        className="font-display absolute -top-10 -left-2 text-[7rem] md:text-[9rem] leading-none text-ink select-none opacity-[0.035] pointer-events-none"
      >
        {n}
      </span>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <p className="font-mono text-signal text-xs tracking-[0.2em] mb-3 uppercase">
          {n} / {label}
        </p>
        <h2 className="font-display text-4xl text-ink mb-3">{title}</h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.65, 0, 0.35, 1] }}
          className="h-px w-16 bg-signal origin-left mb-4"
        />
        {children}
      </motion.div>
    </div>
  )
}
