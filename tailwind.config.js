/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#1a1612",
        golden: "#d4843a",
        caramel: "#c8956b",
        cream: "#f0ebe4",
      },
      fontFamily: {
        sans: ["'DM Sans'", "sans-serif"],
        script: ["'Dancing Script'", "cursive"],
        display: ["'Syne'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
