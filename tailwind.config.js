/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#006cac',
        secondary: '#03f1fd',
        tertiary: '#034289',
      },
    },
    plugins: [],
  }
}