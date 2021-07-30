module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'red': '#853435',
        'green': '#58804D',
        'black': '#000000',
        'primary': '#7fca49',
        'primary-alt': '#54b67a',
        'secondary': '#27a2ac',
        'gray': '#0d5651',
        'yellow': '#b8a984',
        'brown': '#211c17'
      },
      width: {
        '1/7': '14.2857142857%',
        '2/7': '28.5714285714%',
        '3/7': '42.8571428571%',
        '4/7': '57.1428571429%',
        '5/7': '71.4285714286%',
        '6/7': '85.7142857143%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
