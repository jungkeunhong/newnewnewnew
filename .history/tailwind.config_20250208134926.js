/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxe: {
          50: '#fdf6f1',
          100: '#f9e5d3',
          200: '#f3d1b4',
          300: '#e08543',
          400: '#ac6531',
          500: '#7b4721',
          600: '#4e2b11',
          700: '#3a2010',
          800: '#2a170c',
          900: '#1a0f08',
        },
      },
    },
  },
  plugins: [],
} 