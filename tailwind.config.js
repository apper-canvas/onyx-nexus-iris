/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
colors: {
        primary: {
          DEFAULT: "#ea580c",
          light: "#fb923c",
          dark: "#c2410c"
        },
        secondary: {
          DEFAULT: "#f97316",
          light: "#fb923c",
          dark: "#ea580c"
        },
        accent: "#fed7aa"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};