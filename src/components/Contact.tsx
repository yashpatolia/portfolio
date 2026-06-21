import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react'
import SectionHeader from './SectionHeader'

const links = [
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:yashpatolia1@gmail.com',
    display: 'yashpatolia1@gmail.com',
  },
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/yashpatolia',
    display: 'github.com/yashpatolia',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/yash-patolia',
    display: 'linkedin.com/in/yash-patolia',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 px-6 xl:pl-32 max-w-3xl mx-auto">
      <SectionHeader n="05" label="Contact" title="Get in Touch">
        <p className="text-ink-dim leading-relaxed max-w-md">
          I'm open to new opportunities, interesting problems, and good conversations.
          Reach out. I'll get back to you.
        </p>
      </SectionHeader>

      <div className="border-t border-line">
        {links.map(({ icon: Icon, label, href, display }, i) => (
          <motion.a
            key={label}
            href={href}
            target={label !== 'Email' ? '_blank' : undefined}
            rel="noreferrer"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="flex items-center gap-4 py-5 border-b border-line text-ink-dim hover:text-ink transition-colors group"
          >
            <Icon size={16} className="text-ink-faint group-hover:text-signal transition-colors" />
            <div className="flex-1">
              <p className="font-mono text-[11px] text-ink-faint mb-0.5">{label}</p>
              <p className="font-mono text-sm">{display}</p>
            </div>
            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 text-signal transition-opacity" />
          </motion.a>
        ))}
      </div>
    </section>
  )
}
