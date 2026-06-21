import { useEffect, useState } from 'react'

export function useScrollSpy(ids: string[], offset = 0.4) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (els.length === 0) return

    const onScroll = () => {
      let current = 0
      els.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= window.innerHeight * offset) current = i
      })
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids, offset])

  return active
}
