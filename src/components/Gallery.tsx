import { useEffect, useMemo, useRef, useState } from 'react'
import type { Slide } from '../lib/projectImages'

const AUTOPLAY_MS = 5200
const pad = (n: number) => String(n).padStart(2, '0')

interface Props {
  slides: Slide[]
  title: string
  /** True while the parent panel is open; autoplay only runs then. */
  active: boolean
}

// Slideshow with progress dots, arrows, swipe, arrow keys and pointer parallax.
export default function Gallery({ slides, title, active }: Props) {
  const n = slides.length
  const [cur, setCur] = useState(0)
  const [tick, setTick] = useState(0) // bumps whenever the progress fill should restart
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const startX = useRef<number | null>(null)
  const reduce = useMemo(() => matchMedia('(prefers-reduced-motion: reduce)').matches, [])

  const go = (i: number) => { setCur(((i % n) + n) % n); setTick((t) => t + 1) }
  const playing = active && visible && !paused && !reduce && n > 1

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver((es) => setVisible(es[0].isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => { setCur((c) => (c + 1) % n); setTick((v) => v + 1) }, AUTOPLAY_MS)
    return () => clearTimeout(t)
  }, [playing, cur, tick, n])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { go(cur - 1); e.preventDefault() }
    if (e.key === 'ArrowRight') { go(cur + 1); e.preventDefault() }
  }

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !stageRef.current) return
    const r = stageRef.current.getBoundingClientRect()
    stageRef.current.style.setProperty('--px', `${((e.clientX - r.left) / r.width - 0.5) * 14}px`)
    stageRef.current.style.setProperty('--py', `${((e.clientY - r.top) / r.height - 0.5) * 10}px`)
  }
  const onLeave = () => {
    stageRef.current?.style.setProperty('--px', '0px')
    stageRef.current?.style.setProperty('--py', '0px')
    startX.current = null
  }
  const onUp = (e: React.PointerEvent) => {
    if (startX.current == null) return
    const dx = e.clientX - startX.current
    startX.current = null
    if (Math.abs(dx) > 48) go(cur + (dx < 0 ? 1 : -1))
  }

  return (
    <div
      ref={rootRef}
      className={`gal${playing ? ' run' : ''}${paused ? ' paused' : ''}`}
      role="group"
      aria-roledescription="carousel"
      aria-label={`${title} screenshots`}
      tabIndex={0}
      onKeyDown={onKey}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      style={{ '--dur': `${AUTOPLAY_MS}ms` } as React.CSSProperties}
    >
      <div ref={stageRef} className="gal-stage" onPointerDown={(e) => { startX.current = e.clientX }} onPointerUp={onUp} onPointerMove={onMove} onPointerLeave={onLeave}>
        {slides.map((s, i) => (
          <figure key={s.src} className={`gal-slide${i === cur ? ' on' : ''}${i < cur ? ' before' : ''}`} aria-hidden={i !== cur}>
            <img
              src={s.src}
              srcSet={`${s.small} ${s.width}w, ${s.src} ${s.width * 2}w`}
              sizes="(min-width: 1000px) 46vw, 92vw"
              alt={s.alt}
              width={s.width}
              height={s.height}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
            />
          </figure>
        ))}
        {n > 1 && (
          <>
            <button type="button" className="gal-arrow gal-prev" aria-label="Previous slide" onClick={() => go(cur - 1)}>&larr;</button>
            <button type="button" className="gal-arrow gal-next" aria-label="Next slide" onClick={() => go(cur + 1)}>&rarr;</button>
          </>
        )}
      </div>
      <div className="gal-bar">
        <div className="gal-cap">{slides[cur].alt}</div>
        {n > 1 && (
          <div className="gal-dots">
            {slides.map((s, i) => (
              <button key={s.src} type="button" className={`gal-dot${i === cur ? ' on' : ''}`} aria-label={`Show slide ${i + 1}: ${s.alt}`} aria-current={i === cur} onClick={() => go(i)}>
                <i key={i === cur ? tick : 'idle'} />
              </button>
            ))}
          </div>
        )}
        <div className="gal-count">{pad(cur + 1)} / {pad(n)}</div>
      </div>
    </div>
  )
}
