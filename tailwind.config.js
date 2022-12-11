/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      colors: {
        brandColor: "#F59E0B",
        darkColor: "#18181B",
        midColor: "#A1A1AA",
        lightColor: "#F8F8F8"
      }
    },
  },
  safelist: [
  {
    pattern: /(bg|text|border)-brandColor/,    
  },
  {
    pattern: /(bg|text|border)-darkColor/,
  },
  {
    pattern: /(bg|text|border)-midColor/,
  },
  {
    pattern: /(bg|text|border)-lightColor/,
  }
],
  plugins: [],
}
