/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4a015f',
        secondary: '#ff3d92',
        tertiary: '#33baa5'
      }
    },
  },
  plugins: [],
}