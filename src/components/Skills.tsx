import { skillGroups } from '../data/skills'

interface Props {
  filter: string | null
  onTag: (tag: string) => void
}

export default function Skills({ filter, onTag }: Props) {
  return (
    <>
      <h2 className="h" id="skills">Skills <small>click to filter</small></h2>
      <div className="bento">
        {skillGroups.map((g, i) => (
          <div key={g.label} className="c sk s3" style={{ '--i': i } as React.CSSProperties}>
            <h4>{g.label}</h4>
            <div className="tags">
              {g.skills.map((s) => (
                <button key={s} type="button" className={`tag${filter === s ? ' act' : ''}`} onClick={() => onTag(s)}>{s}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
