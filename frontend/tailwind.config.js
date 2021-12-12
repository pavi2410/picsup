const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.jsx'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        green: colors.emerald,
      }
    },
  },
  plugins: [],
}
