import { useEffect, useRef, useState } from 'react'
import { site } from '../data/site'
import { projects } from '../data/projects'
import { skillGroups } from '../data/skills'

const highlight = projects[0].metrics[0]
const marquee = skillGroups.flatMap((g) => g.skills)

function useCountUp(to: number) {
  const ref = useRef<HTMLElement>(null)
  const [n, setN] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting) return
      io.disconnect()
      if (reduce) { setN(to); return }
      const t0 = performance.now()
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / 1600)
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [to])
  return [ref, n] as const
}

function RoleCycle() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % site.roles.length), 2600)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="rolebox" aria-live="off">
      {site.roles.map((r, k) => (
        <span key={r} className={k === i ? 'on' : undefined}>{r}</span>
      ))}
    </div>
  )
}

function Clock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 10_000)
    return () => clearInterval(id)
  }, [])
  const tz = 'America/Toronto'
  return (
    <>
      <div className="t">{now.toLocaleTimeString('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit' })}</div>
      <div style={{ marginTop: 6, color: 'var(--mute)' }}>
        {now.toLocaleDateString('en-CA', { timeZone: tz, weekday: 'long', month: 'long', day: 'numeric' })}
      </div>
    </>
  )
}

export default function Hero() {
  const [cntRef, n] = useCountUp(highlight.value)
  const doubled = [...marquee, ...marquee]
  return (
    <div className="bento" id="top">
      <div className="c name s8" style={{ '--i': 0 } as React.CSSProperties}>
        <div className="mesh" aria-hidden><i /><i /><i /></div>
        <div>
          <div className="lbl">Software engineer</div>
          <RoleCycle />
        </div>
        <h1>Yash<br /><em>Patolia</em></h1>
      </div>

      <div className="c bio s4" style={{ '--i': 1 } as React.CSSProperties}>
        <div className="lbl">About</div>
        <p>{site.bio}</p>
        <div className="lbl" style={{ marginTop: 22 }}>McMaster &middot; Software Eng. Co-op</div>
      </div>

      <div className="c big s3" style={{ '--i': 2 } as React.CSSProperties}>
        <div className="lbl">Highlight</div>
        <div>
          <b ref={cntRef}>{n}{highlight.suffix}</b>
          <div style={{ marginTop: 6 }}>{highlight.label} by {projects[0].name}</div>
        </div>
      </div>

      <div className="c now s3" style={{ '--i': 3 } as React.CSSProperties}>
        <div className="lbl">Now</div>
        <div>
          <h3>Study term</h3>
          <div>Back at McMaster after a PointClickCare internship, May to Aug 2026</div>
        </div>
      </div>

      <div className="c clock s3" style={{ '--i': 4 } as React.CSSProperties}>
        <div className="lbl">Local time</div>
        <div><Clock /></div>
      </div>

      <div className="c s3" style={{ '--i': 5 } as React.CSSProperties}>
        <a className="lk" href={site.github} target="_blank" rel="noreferrer">GitHub <span>&#8599;</span></a>
        <a className="lk" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn <span>&#8599;</span></a>
        <a className="lk p" href={site.resume} download>Resume <span>&#8595;</span></a>
      </div>

      <div className="c mq s12" style={{ padding: '22px 0' }} aria-hidden>
        <div className="tr">
          {doubled.map((s, i) => <span key={i}>{s}</span>)}
        </div>
      </div>
    </div>
  )
}
