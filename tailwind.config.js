/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      colors: {
        brandColor: "#E4295D",
        darkColor: "#060910",
        midColor: "#C8CFDF",
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
