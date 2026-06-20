import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react'

const links = [
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:yashpatolia1@gmail.com',
    display: 'yashpatolia1@gmail.com',
    color: 'hover:text-accent hover:border-accent/40 hover:bg-accent/5',
  },
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/yashpatolia',
    display: 'github.com/yashpatolia',
    color: 'hover:text-text hover:border-surface-3 hover:bg-surface-2/60',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/yash-patolia',
    display: 'linkedin.com/in/yash-patolia',
    color: 'hover:text-accent hover:border-accent/40 hover:bg-accent/5',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-6 max-w-3xl mx-auto">
      <div className="section-divider mb-16" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <p className="font-mono text-violet text-xs tracking-[0.2em] mb-3 uppercase">
          06 / Contact
        </p>
        <h2 className="text-4xl font-bold text-text mb-4">Get in Touch</h2>
        <p className="text-text-dim leading-relaxed max-w-md mx-auto">
          I'm open to new opportunities, interesting problems, and good conversations.
          Reach out. I'll get back to you.
        </p>
      </motion.div>

      <div className="grid gap-3 max-w-md mx-auto">
        {links.map(({ icon: Icon, label, href, display, color }, i) => (
          <motion.a
            key={label}
            href={href}
            target={label !== 'Email' ? '_blank' : undefined}
            rel="noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl border border-surface-2 bg-surface text-text-dim transition-all duration-200 group ${color}`}
          >
            <div className="p-2 rounded-lg bg-surface-2/60 group-hover:bg-transparent transition-colors">
              <Icon size={16} />
            </div>
            <div className="flex-1 text-left">
              <p className="font-mono text-xs text-text-faint mb-0.5">{label}</p>
              <p className="font-mono text-sm">{display}</p>
            </div>
            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>
        ))}
      </div>
    </section>
  )
}
