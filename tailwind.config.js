/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "input.css", "tictactoe.js"],
  theme: {
    extend: {
      colors: {
        'dark': '#1A2A33',
        'darkest': '#0b131a',
        'middle': '#1F3540',
        'orange': '#F48730',
        'grey': '#5A5555',
        'light': '#F6F1E7'
      }
    },
  },
  plugins: [],
};
