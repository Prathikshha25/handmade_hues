/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FBF5E8",
        sand: "#E7D6B4",
        sage: "#4E6E52",
        teal: "#3E7A72",
        mustard: "#D69A22",
        terracotta: "#A84E31",
        burgundy: "#7B2E3A",
        olive: "#2B3327",
        brown: "#4A3B33",
        beige: "#D8C7A4",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'Poppins'", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 30px -12px rgba(43, 51, 39, 0.25)",
        card: "0 4px 20px -8px rgba(43, 51, 39, 0.2)",
        lift: "0 20px 40px -16px rgba(43, 51, 39, 0.35)",
      },
      keyframes: {
        stitchdraw: {
          "0%": { strokeDashoffset: "60" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        stitchdraw: "stitchdraw 1s ease forwards",
      },
    },
  },
  plugins: [],
};
