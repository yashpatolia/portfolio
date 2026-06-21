import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

interface TiltPanelProps {
  children: ReactNode
  className?: string
}

export default function TiltPanel({ children, className = '' }: TiltPanelProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const x = useSpring(rawX, { stiffness: 220, damping: 24 })
  const y = useSpring(rawY, { stiffness: 220, damping: 24 })

  const rotateX = useTransform(y, [-0.5, 0.5], [3, -3])
  const rotateY = useTransform(x, [-0.5, 0.5], [-3, 3])
  const glowX = useTransform(x, [-0.5, 0.5], [0, 100])
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100])
  const sheen = useTransform([glowX, glowY], ([gx, gy]) =>
    `radial-gradient(circle at ${gx}% ${gy}%, rgba(198,143,46,0.08) 0%, transparent 55%)`
  )

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const onMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={
        reduceMotion
          ? undefined
          : { rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }
      }
      className={`relative group ${className}`}
    >
      {!reduceMotion && (
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: sheen }}
        />
      )}
      {children}
    </motion.div>
  )
}
