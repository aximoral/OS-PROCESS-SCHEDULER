/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slateBase: '#0A0A0F',
        slateCard: '#1A1A24',
        amberAccent: '#F59E0B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'amber-glow': '0 0 20px rgba(245, 158, 11, 0.4)',
      },
    },
  },
  plugins: [],
}
