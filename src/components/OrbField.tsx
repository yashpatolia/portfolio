import { motion, useScroll, useTransform } from 'framer-motion'

interface OrbConfig {
  size: number
  left: string
  top: string
  color: string
  parallax: number
  floatRange: number
  floatDuration: number
  blur: number
}

const orbs: OrbConfig[] = [
  { size: 480, left: '8%', top: '4%', color: 'rgba(198,143,46,0.16)', parallax: -0.06, floatRange: 28, floatDuration: 13, blur: 90 },
  { size: 360, left: '78%', top: '22%', color: 'rgba(198,143,46,0.1)', parallax: 0.1, floatRange: 22, floatDuration: 16, blur: 80 },
  { size: 320, left: '15%', top: '55%', color: 'rgba(241,234,217,0.05)', parallax: 0.05, floatRange: 18, floatDuration: 11, blur: 70 },
  { size: 420, left: '70%', top: '72%', color: 'rgba(198,143,46,0.12)', parallax: -0.08, floatRange: 26, floatDuration: 15, blur: 90 },
  { size: 280, left: '35%', top: '90%', color: 'rgba(241,234,217,0.04)', parallax: 0.12, floatRange: 20, floatDuration: 12, blur: 60 },
]

function Orb({ orb }: { orb: OrbConfig }) {
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, (v) => v * orb.parallax)

  return (
    <motion.div
      className="absolute"
      style={{ width: orb.size, height: orb.size, left: orb.left, top: orb.top, y: parallaxY }}
    >
      <motion.div
        className="w-full h-full rounded-full"
        style={{
          background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          filter: `blur(${orb.blur}px)`,
        }}
        animate={{ y: [0, -orb.floatRange, 0], x: [0, orb.floatRange * 0.4, 0] }}
        transition={{ duration: orb.floatDuration, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

export default function OrbField() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <Orb key={i} orb={orb} />
      ))}
    </div>
  )
}
