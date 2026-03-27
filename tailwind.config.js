/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        future: {
          surface: '#060b14',
          elevated: '#0f172a',
          muted: '#64748b',
          cyan: '#22d3ee',
          violet: '#8b5cf6',
          fuchsia: '#e879f9',
          accent: '#5651e5',
        },
      },
      backgroundImage: {
        'grid-future':
          'linear-gradient(rgba(34, 211, 238, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.04) 1px, transparent 1px)',
        'radial-glow':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(34, 211, 238, 0.15), transparent 50%), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(139, 92, 246, 0.12), transparent 45%), radial-gradient(ellipse 50% 30% at 0% 80%, rgba(232, 121, 249, 0.1), transparent 50%)',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(34, 211, 238, 0.35)',
        'glow-violet': '0 0 40px -10px rgba(139, 92, 246, 0.35)',
        'card-dark': '0 0 0 1px rgba(148, 163, 184, 0.08), 0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        'card-light': '0 0 0 1px rgba(15, 23, 42, 0.06), 0 20px 40px -20px rgba(15, 23, 42, 0.12)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2.5s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
      },
    },
  },
  plugins: [],
}
