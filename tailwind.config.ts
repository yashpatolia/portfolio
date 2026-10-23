import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Newsreader', 'serif'],
        sans: ['"Hanken Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
