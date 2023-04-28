/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/Components/**/*.{js,jsx,ts,tsx}",
    "./src/Pages/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      '2xl': { 'min': '1535px' },
      'xl': { 'min': '1279px' },
      'lg': { 'min': '1023px' },
      '2md': { 'min': '870px' },
      'md': { 'min': '767px' },
      '2sm': { 'min': '710px' },
      'sm': { 'min': '639px' },
    },
    extend: {
      colors: {
        db: "#121316",
        'db-1': "#191a1d",
        'db-2': "#202124",
        dv: '#6E3AFF',
      },
      spacing: {
        '225': '56.25rem',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ]
}