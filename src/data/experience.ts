export interface Role {
  company: string
  role: string
  dateStart: string
  dateEnd: string
  location: string
  stack: string[]
  bullets: string[]
}

export const experience: Role[] = [
  {
    company: 'PointClickCare',
    role: 'Software Engineer Intern',
    dateStart: 'May 2026',
    dateEnd: 'Present',
    location: 'Toronto, ON',
    stack: ['Java', 'Spring Boot', 'Kotlin', 'TypeScript'],
    bullets: [
      'Worked on backend service logic and SQL migration paths for a Java-based system',
    ],
  },
  {
    company: 'PointClickCare',
    role: 'Software Engineer Intern',
    dateStart: 'Sept 2025',
    dateEnd: 'Dec 2025',
    location: 'Toronto, ON',
    stack: ['Java', 'Spring Boot', 'Kotlin', 'TypeScript', 'React'],
    bullets: [
      'Worked on report generation, scheduling logic, and frontend/backend integration',
    ],
  },
  {
    company: 'Jiyash Auto',
    role: 'Full-Stack Developer',
    dateStart: 'May 2025',
    dateEnd: 'Aug 2025',
    location: 'Cambridge, ON',
    stack: ['SvelteKit', 'TypeScript', 'SQLite', 'Docker', 'Nginx'],
    bullets: [
      'Worked on the dealership platform, admin tools, and deployment setup',
    ],
  },
]
