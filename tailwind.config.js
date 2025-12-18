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
          DEFAULT: "#1e293b",
          light: "#334155",
          dark: "#0f172a"
        },
        secondary: {
          DEFAULT: "#0d9488",
          light: "#14b8a6",
          dark: "#0f766e"
        },
        accent: "#5eead4"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};