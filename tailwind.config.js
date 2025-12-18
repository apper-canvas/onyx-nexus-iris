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
          DEFAULT: "#1e3a8a",
          light: "#3b5ab8",
          dark: "#0f1f4f"
        },
        secondary: {
          DEFAULT: "#0891b2",
          light: "#06b6d4",
          dark: "#0e7490"
        },
        accent: "#06b6d4"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};