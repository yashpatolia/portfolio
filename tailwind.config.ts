import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#080e1a',
        'bg-2': '#0d1526',
        surface: '#111827',
        'surface-2': '#1e2d45',
        'surface-3': '#263552',
        // blue — used sparingly for highlights only
        accent: '#3b82f6',
        'accent-dim': '#1d4ed8',
        // purple — secondary, richer sections
        violet: '#8b5cf6',
        'violet-dim': '#6d28d9',
        // emerald — metrics, live indicators, success
        emerald: '#10b981',
        'emerald-dim': '#059669',
        // amber — AI/ML category
        amber: '#f59e0b',
        'amber-dim': '#d97706',
        // rose — optional accent
        rose: '#f43f5e',
        muted: '#4b5563',
        text: '#e2e8f0',
        'text-dim': '#8b9ab3',
        'text-faint': '#4b5e7a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-blue-purple':
          'radial-gradient(at 27% 37%, #1d4ed8 0px, transparent 50%), radial-gradient(at 97% 21%, #6d28d9 0px, transparent 50%), radial-gradient(at 52% 99%, #0f172a 0px, transparent 50%)',
      },
      boxShadow: {
        'glow-blue': '0 0 24px rgba(59, 130, 246, 0.2)',
        'glow-violet': '0 0 24px rgba(139, 92, 246, 0.2)',
        'glow-emerald': '0 0 24px rgba(16, 185, 129, 0.15)',
        'card': '0 4px 32px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 8px 48px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
