/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        secondary: 'rgb(13, 17, 23)',
      },
      boxShadow: {
        solid: '13px 13px 0 0 rgb(0,0,0)',
      },
    },
  },
  plugins: [],
};
