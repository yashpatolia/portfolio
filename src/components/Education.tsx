import { education } from '../data/education'

export default function Education() {
  return (
    <div className="c edu s5">
      <div className="lbl">Education &middot; {education.date}</div>
      <h3>{education.school}</h3>
      <div>{education.degree}. {education.minor}.</div>
      <ul className="tags" style={{ marginTop: 20 }}>
        {education.courses.map((c) => <li key={c} className="tag">{c}</li>)}
      </ul>
    </div>
  )
}
