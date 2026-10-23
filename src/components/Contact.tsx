import { site } from '../data/site'
import Education from './Education'

export default function Contact() {
  return (
    <>
      <h2 className="h" id="contact">Education and contact</h2>
      <div className="bento">
        <Education />
        <div className="c mailc s7" style={{ '--i': 1 } as React.CSSProperties}>
          <div className="lbl" style={{ color: 'color-mix(in srgb, var(--tile-t) 75%, transparent)' }}>Get in touch</div>
          <a className="mail" href={`mailto:${site.email}`}>{site.email}</a>
          <div className="row">
            <a className="lk" href={site.github} target="_blank" rel="noreferrer">GitHub &#8599;</a>
            <a className="lk" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn &#8599;</a>
            <a className="lk" href={site.resume} download>Resume &#8595;</a>
          </div>
        </div>
      </div>
    </>
  )
}
