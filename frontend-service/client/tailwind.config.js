/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'kanit': ['Kanit', 'sans-serif'],
      },
      colors: {
        deficiente: '#154FAD',
        bajo: '#41AEE8',
        adecuado: '#6CBE35',
        alto: '#E89F41',
        excesivo: '#E04E3E',
        agro: '#96C21F',
        pred: '#8A5D13'
      },
    },
  },
  plugins: [],
}
