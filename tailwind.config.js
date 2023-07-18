/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./input.css", "./input.js"],
  theme: {
    extend: {
      colors: {
        'dark': '#1A2A33',
        'middle': '#1F3540',
        'turquoise': '#30C3BF',
        'yellow': '#F1B236',
        'light': '#A9BDC9'
      }
    },
  },
  plugins: [],
};
