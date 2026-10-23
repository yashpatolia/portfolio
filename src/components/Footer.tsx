import { site } from '../data/site'

export default function Footer() {
  return (
    <footer className="foot">
      &copy; {new Date().getFullYear()} {site.name}
    </footer>
  )
}
