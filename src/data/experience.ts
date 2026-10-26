export interface Role {
  company: string
  /** Optional logo under public/logos, shown top right of the card. */
  logo?: { src: string; width: number; height: number }
  role: string
  dateStart: string
  dateEnd: string
  location: string
  stack: string[]
  /** One short sentence that rolls up the highlights; the resume has the full bullets. */
  summary: string
}

export const experience: Role[] = [
  {
    company: 'PointClickCare',
    logo: { src: '/logos/pointclickcare.webp', width: 238, height: 238 },
    role: 'Software Engineer Intern',
    dateStart: 'May 2026',
    dateEnd: 'Aug 2026',
    location: 'Toronto, ON',
    stack: ['Java', 'Spring Boot', 'Kotlin', 'TypeScript'],
    summary: 'Migrated legacy SQL to Java on the core EHR platform (25% fewer database round trips), fixed 10+ scheduling defects, and cut team onboarding time 70%+ with a Claude skill.',
  },
  {
    company: 'PointClickCare',
    logo: { src: '/logos/pointclickcare.webp', width: 238, height: 238 },
    role: 'Software Engineer Intern',
    dateStart: 'Sept 2025',
    dateEnd: 'Dec 2025',
    location: 'Toronto, ON',
    stack: ['Java', 'Spring Boot', 'Kotlin', 'TypeScript', 'React'],
    summary: 'Shipped feature-flagged React and Kotlin features, cut report page count 50%+ with a JasperReports redesign, and load-tested backend services at 100+ concurrent requests.',
  },
  {
    company: 'Jiyash Auto',
    logo: { src: '/logos/jiyash-auto.webp', width: 288, height: 288 },
    role: 'Full-Stack Developer',
    dateStart: 'May 2025',
    dateEnd: 'Aug 2025',
    location: 'Cambridge, ON',
    stack: ['SvelteKit', 'TypeScript', 'SQLite', 'Docker', 'Nginx'],
    summary: 'Built a full-stack dealership platform on SvelteKit and SQLite with 75%+ faster page loads, deployed through Docker and a GitHub Actions CI/CD pipeline.',
  },
]
