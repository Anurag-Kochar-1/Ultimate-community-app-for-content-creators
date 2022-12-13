/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      colors: {
        brandColor: "#FACC15",
        darkColor: "#18181B",
        midColor: "#E4E4E7",
        lightColor: "#F8FAFC"
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
