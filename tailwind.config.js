/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        brandColor: "#EF4444",
        darkColor: "#18181B",
        midColor: "#D4D4D8",
        lightColor: "#F8FAFC"
      }
    },
    fontFamily : {
      poppins : ['Poppins', 'sans-serif']
    }
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
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
