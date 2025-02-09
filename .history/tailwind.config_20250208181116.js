/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxe: {
          50: '#f8f5f2',
          100: '#e9ddd2',
          200: '#d4bba6',
          300: '#c49a7a',
          400: '#b37a4e',
          500: '#8c5836',
          600: '#6b4228',
          700: '#4a2d1c',
          800: '#2c1a10',
          900: '#1a0f09',
        },
      },
    },
  },
  plugins: [],
} 