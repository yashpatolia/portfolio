export interface Extra {
  name: string
  tag: string
  url: string
  repo: string
  stack: string[]
}

export const extras: Extra[] = [
  {
    name: 'Tracklane',
    tag: 'Tracks job applications through each pipeline stage with deadlines and status.',
    url: 'https://tracklane.yashpatolia.dev/',
    repo: 'https://github.com/yashpatolia/tracklane',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
  },
  {
    name: 'Interview Prep Hub',
    tag: 'Notes and practice problems for DSA and quant interviews.',
    url: 'https://resource.yashpatolia.dev/',
    repo: 'https://github.com/yashpatolia/interview-prep',
    stack: ['JavaScript', 'Vite', 'Docker'],
  },
]
