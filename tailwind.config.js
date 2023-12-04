/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line unused-imports/no-unused-vars
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffc800',
      },
    },
  },
  plugins: [],
}
