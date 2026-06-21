import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#181613',
        panel: '#1F1B16',
        'panel-2': '#262019',
        line: '#39332A',
        'line-bright': '#4E4636',
        ink: '#F1EAD9',
        'ink-dim': '#A89D87',
        'ink-faint': '#6B6354',
        signal: '#C68F2E',
        'signal-dim': '#8C631C',
        'signal-soft': '#C68F2E1A',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['Fraunces', 'serif'],
      },
      boxShadow: {
        panel: '0 1px 0 rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
} satisfies Config
