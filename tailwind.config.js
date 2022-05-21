/* 
  Explore configuration options docs https://tailwindcss.com/docs/configuration#configuration-options
  Or check the default configuration https://unpkg.com/browse/tailwindcss@latest/stubs/defaultConfig.stub.js
*/

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'my-black': '#29292E',
        'my-shadow': '#050206',
        'my-purple': '#835AFD',
        'my-red': '#EA4335',
        'my-danger': '#E73F5D',
        'my-gray': {
          dark: '#737380',
          medium: '#A8A8B3',
          light: '#DBDCDD'
        },
        'my-white': {
          background: '#F8F8F8',
          details: '#FEFEFE'
        },
        'my-pink': {
          dark: '#E559F9',
          light: '#D67EE2'
        },
        'my-hover': {
          purple: '#6F4BD8',
          danger: '#D73754',
          gray: {
            medium: '#7E7E86',
            light: '#CECECE'
          }
        }
      }
    },
    fontFamily: {
      pop: '[Poppins, sans-serif]',
      rob: '[Roboto, sans-serif]'
    }
  },
  plugins: []
}
