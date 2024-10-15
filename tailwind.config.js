/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        md: "780px",
        // => @media (min-width: 780px) { ... }
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
