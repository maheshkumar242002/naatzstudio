/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#FACC15',
          neon: '#FEE715',
          gold: '#EAB308',
          black: '#090A0F',
          dark: '#12131A',
          card: '#181924',
          border: '#27293D',
          muted: '#94A3B8'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        brush: ['"Permanent Marker"', 'cursive', 'sans-serif'],
      },
      boxShadow: {
        'yellow-glow': '0 0 25px -5px rgba(250, 204, 21, 0.4)',
        'yellow-glow-lg': '0 0 45px -5px rgba(250, 204, 21, 0.6)',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}
