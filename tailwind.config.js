/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        md: "821px",
        // => @media (min-width: 821px) { ... }
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
