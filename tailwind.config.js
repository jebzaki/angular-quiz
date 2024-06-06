/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    fontFamily: {
      serif: ['"Roboto", sans-serif'],
    },
    extend: {
      flex: {
        2: '2 2 0%',
      },
    },
  },
  plugins: [],
};
