import { experience } from '../data/experience'

export default function Experience() {
  return (
    <>
      <h2 className="h" id="experience">Experience <small>{String(experience.length).padStart(2, '0')} roles</small></h2>
      <div className="bento">
        {experience.map((r, i) => (
          <article key={r.company + r.dateStart} className="c exp s4" style={{ '--i': i } as React.CSSProperties}>
            <div className="lbl">{r.dateStart} to {r.dateEnd}</div>
            <h3>{r.company}</h3>
            <div className="rl">{r.role} &middot; {r.location}</div>
            <p>{r.summary}</p>
            <div className="tags">
              {r.stack.map((s) => <span key={s} className="tag">{s}</span>)}
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
