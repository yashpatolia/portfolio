import { useState } from 'react'
import { projects } from '../data/projects'
import { useProjectImages } from '../lib/projectImages'
import Gallery from './Gallery'

const tones = ['t-ink', 't-sage', 't-clay', '', 't-sage', 't-clay']
const pad = (n: number) => String(n).padStart(2, '0')

interface Props {
  filter: string | null
  onTag: (tag: string) => void
  onClear: () => void
}

export default function Projects({ filter, onTag, onClear }: Props) {
  const [open, setOpen] = useState<number | null>(null)
  // Galleries mount on first open so their large images are not downloaded up front.
  const [seen, setSeen] = useState<number[]>([])
  const images = useProjectImages()

  return (
    <>
      <h2 className="h" id="projects">
        Projects <small>{pad(projects.length)} selected</small>
        {filter && (
          <span className="flt">
            Filtering: {filter}
            <button type="button" onClick={onClear} aria-label="Clear filter">&times;</button>
          </span>
        )}
      </h2>
      <p className="hint">Click a project to open its gallery. Click any skill or stack tag to filter the projects that use it.</p>
      <div className="plist">
        {projects.map((p, i) => {
          const slides = p.slug ? images[p.slug] : undefined
          const isOpen = open === i
          const dim = filter !== null && !p.stack.includes(filter)
          return (
            <article
              key={p.name}
              className={`c pj ${tones[i % tones.length]}${isOpen ? ' open' : ''}${dim ? ' dim' : ''}`}
              style={{ '--i': i % 3 } as React.CSSProperties}
            >
              <button type="button" className="pj-h" aria-expanded={isOpen} aria-controls={`pj-${i}`} onClick={() => { setOpen(isOpen ? null : i); setSeen((v) => (v.includes(i) ? v : [...v, i])) }}>
                <span className="pn">{pad(i + 1)}</span>
                <span>
                  <span className="pname">{p.name}</span>
                  {p.note && <span className="pnote">{p.note}</span>}
                  {p.summary && <span className="pdesc">{p.summary}</span>}
                </span>
                <span className="pstack">
                  {p.stack.slice(0, 4).join(' · ')}
                  {p.stack.length > 4 && ` · +${p.stack.length - 4}`}
                </span>
                {slides?.[0] ? <img className="thumb" src={slides[0].small} width={slides[0].width} height={slides[0].height} alt="" loading="lazy" /> : <span className="thumb-ph" />}
                <span className="chev"><span>+</span></span>
              </button>
              <div className="pj-m" id={`pj-${i}`}>
                <div>
                  <div className={`pj-in${slides ? '' : ' nog'}`}>
                    {slides && slides.length > 0 && (
                      <div className="gal-slot">{seen.includes(i) && <Gallery slides={slides} title={p.name} active={isOpen} />}</div>
                    )}
                    <div>
                      <p>{p.description}</p>
                      <div className="tags">
                        {p.stack.map((s) => (
                          <button key={s} type="button" className={`tag${filter === s ? ' act' : ''}`} onClick={() => onTag(s)}>{s}</button>
                        ))}
                      </div>
                      {p.metrics.length > 0 && (
                        <div className="mets">
                          {p.metrics.map((m) => (
                            <div key={m.label}>
                              <b>{m.prefix}{m.value}{m.suffix}</b>
                              <span>{m.label}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {p.links.length > 0 && (
                        <div className="go">
                          {p.links.map((l) => (
                            <a key={l.url} className="pill" href={l.url} target="_blank" rel="noreferrer">{l.label} &#8599;</a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </>
  )
}
