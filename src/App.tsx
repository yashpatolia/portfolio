import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useReveal, useSpotlight } from './hooks/useReveal'

export default function App() {
  const [filter, setFilter] = useState<string | null>(null)
  useReveal()
  useSpotlight()

  const toggleTag = (tag: string) => {
    const next = filter === tag ? null : tag
    setFilter(next)
    if (next) document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects filter={filter} onTag={toggleTag} onClear={() => setFilter(null)} />
        <Skills filter={filter} onTag={toggleTag} />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
