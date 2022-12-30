/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {},
    screens: {
      'sm': { 'max': '600px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': {'min': '601px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      // 'lg': {'min': '769px', 'max': '1509px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      // 'xl': {'min': '1029px', 'max': '1279px'},
      // // => @media (min-width: 1280px and max-width: 1535px) { ... }

      // '2xl': {'min': '1536px'},
      // // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
