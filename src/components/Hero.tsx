import { useEffect, useState } from 'react'
import { site } from '../data/site'
import { skillGroups } from '../data/skills'

const marquee = skillGroups.flatMap((g) => g.skills)

const SPOTIFY_TRACK = '7B2ygRXyWZulEpO4G1CHZf' // BOY IN RED, Isaiah Rashad and SZA

const icon = { viewBox: '0 0 24 24', 'aria-hidden': true, fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden fill="currentColor"><path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-1.9c-3.12.68-3.78-1.5-3.78-1.5-.51-1.3-1.25-1.64-1.25-1.64-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.49-.28-5.11-1.25-5.11-5.55 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.98 0 0 .94-.3 3.09 1.15a10.7 10.7 0 0 1 5.62 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.55.23 2.69.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.31-2.63 5.26-5.13 5.54.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .8Z" /></svg>
)
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" /></svg>
)
const ResumeIcon = () => (
  <svg {...icon}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></svg>
)

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
  const doubled = [...marquee, ...marquee]
  return (
    <div className="bento" id="top">
      <div className="c name s8" style={{ '--i': 0 } as React.CSSProperties}>
        <div className="mesh" aria-hidden><i /><i /><i /></div>
        <img
          className="me"
          src="/me.webp"
          srcSet="/me-sm.webp 500w, /me.webp 1000w"
          sizes="(min-width: 900px) 520px, 70vw"
          width={1000}
          height={1000}
          alt="Yash Patolia in front of the Golden Gate Bridge"
        />
        <div>
          <div className="lbl">Software engineer</div>
          <RoleCycle />
        </div>
        <h1>Yash<br /><em>Patolia</em></h1>
      </div>

      <div className="c bio s4" style={{ '--i': 1 } as React.CSSProperties}>
        <div className="lbl">About</div>
        <p>{site.bio}</p>
        <div className="lbl" style={{ marginTop: 22 }}>McMaster &middot; Software Eng. Co-op &middot; Math Minor</div>
      </div>

      <div className="c tune s4" style={{ '--i': 2 } as React.CSSProperties}>
        <div className="lbl">On repeat</div>
        <iframe
          title="BOY IN RED by Isaiah Rashad and SZA on Spotify"
          src={`https://open.spotify.com/embed/track/${SPOTIFY_TRACK}?theme=0`}
          width="100%"
          height="152"
          loading="lazy"
          allow="encrypted-media; clipboard-write; fullscreen"
        />
      </div>

      <div className="c now s3" style={{ '--i': 3 } as React.CSSProperties}>
        <div className="lbl">Now</div>
        <div>
          <h3>Study term</h3>
          <div>Back at McMaster after a PointClickCare internship, May to Aug 2026</div>
        </div>
      </div>

      <div className="c clock s2" style={{ '--i': 4 } as React.CSSProperties}>
        <div className="lbl">Local time</div>
        <div><Clock /></div>
      </div>

      <div className="c s3" style={{ '--i': 5 } as React.CSSProperties}>
        <a className="lk" href={site.github} target="_blank" rel="noreferrer"><span className="lt"><GithubIcon />GitHub</span><span>&#8599;</span></a>
        <a className="lk" href={site.linkedin} target="_blank" rel="noreferrer"><span className="lt"><LinkedinIcon />LinkedIn</span><span>&#8599;</span></a>
        <a className="lk p" href={site.resume} download><span className="lt"><ResumeIcon />Resume</span><span>&#8595;</span></a>
      </div>

      <div className="c mq s12" style={{ padding: '22px 0' }} aria-hidden>
        <div className="tr">
          {doubled.map((s, i) => <span key={i}>{s}</span>)}
        </div>
      </div>
    </div>
  )
}
