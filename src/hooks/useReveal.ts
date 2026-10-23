import { useEffect } from 'react'

// Fades tiles in as they scroll into view. Uses a data attribute (not a class) so React
// re-renders that change className never wipe it.
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.c')
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            ;(e.target as HTMLElement).dataset.in = ''
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// Soft spotlight that follows the pointer inside any tile.
export function useSpotlight() {
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const c = (e.target as Element | null)?.closest?.('.c') as HTMLElement | null
      if (!c) return
      const r = c.getBoundingClientRect()
      c.style.setProperty('--mx', `${e.clientX - r.left}px`)
      c.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    document.addEventListener('pointermove', move)
    return () => document.removeEventListener('pointermove', move)
  }, [])
}
