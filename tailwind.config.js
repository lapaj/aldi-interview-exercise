/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffc800'
      }
    },
  },
  plugins: [],
}

