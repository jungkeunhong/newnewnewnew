/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxe: {
          50: '#f3f0ed',
          100: '#e2d5c8',
          200: '#c4a99c',
          300: '#a67d6f',
          400: '#8b5d4e',
          500: '#6f3d2e',
          600: '#5a2f22',
          700: '#452116',
          800: '#2f130c',
          900: '#1a0805',
        },
      },
    },
  },
  plugins: [],
} 