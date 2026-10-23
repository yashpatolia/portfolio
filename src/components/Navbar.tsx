import { useEffect, useState } from 'react'

const links: [string, string][] = [
  ['Experience', '#experience'],
  ['Projects', '#projects'],
  ['Skills', '#skills'],
  ['Contact', '#contact'],
]

type Theme = 'light' | 'dark'

export default function Navbar() {
  const [theme, setTheme] = useState<Theme>(() => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'))

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('oat-theme', theme) } catch { /* storage unavailable */ }
  }, [theme])

  return (
    <nav className="nav" aria-label="Primary">
      <a className="home" href="#top">
        <span className="dot" />
        YP
      </a>
      {links.map(([name, href], i) => (
        <a key={href} href={href} className={i >= 2 ? 'hide-sm' : undefined}>
          {name}
        </a>
      ))}
      <button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle light or dark theme">
        {theme === 'dark' ? 'Light' : 'Dark'}
      </button>
    </nav>
  )
}
