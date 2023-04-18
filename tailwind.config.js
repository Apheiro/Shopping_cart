/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/Components/**/*.{js,jsx,ts,tsx}",
    "./src/Pages/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
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
  plugins: [],
}