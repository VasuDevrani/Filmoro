module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      logo: ['Rubik Dirt', 'cursive']
    },
    extend: {
      gridTemplateColumns:{
          '10': 'repeat(auto-fill, minmax(200px, 1fr))',
          '11': 'repeat(auto-fill, minmax(110px, 1fr))'
      },
      screens: {
        mid: '970px'
      },
      colors: {
        "sitePink": "rgb(156, 39, 176)",
        "siteGreen": "rgba(0, 255, 0, 0.25)",
        "siteGrey": "rgba(0, 0, 0, 0.8)"
      },
      dropShadow: {
        '4xl': '17px 17px 4px rgba(0, 0, 0, 0.65)'
      }
    },
  },
  plugins: [],
}
