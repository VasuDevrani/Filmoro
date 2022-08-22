module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
    },
    extend: {
      gridTemplateColumns:{
          '10': 'repeat(auto-fill, minmax(170px, 1fr))',
          '11': 'repeat(auto-fill, minmax(100px, 1fr))'
      },
      screens: {
        mid: '900px'
      },
      colors: {
        "sitePink": "rgb(156, 39, 176)",
        "siteGreen": "rgba(0, 255, 0, 0.25)",
        "siteGrey": "rgba(0, 0, 0, 0.8)"
      }
    },
  },
  plugins: [],
}
