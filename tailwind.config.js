/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  darkMode: "class", // Enable class-based dark mode
  content: [
    "./src/**/*.{js,ts,jsx,tsx,css}", // Add "css" for global styles
  ],
  
  theme: {
    extend: {
      // Custom Colors
      colors: {
        primary: {
          DEFAULT: "#16a34a", // Green-600
          light: "#22c55e", // Green-500
          dark: "#15803d", // Green-700
        },
        secondary: {
          DEFAULT: "#1e293b", // Gray-800
          light: "#334155", // Gray-700
          dark: "#0f172a", // Gray-900
        },
        background: {
          DEFAULT: "#ffffff", // White
          dark: "#0a0a0a", // Black
        },
        foreground: {
          DEFAULT: "#171717", // Gray-900
          dark: "#ededed", // Gray-100
        },
      },
      // Custom Fonts
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
        serif: ["Georgia", "serif"],
        mono: ["Menlo", "monospace"],
      },
      // Custom Animations
      animation: {
        fadeIn: "fadeIn 1s ease-out",
        rotate: "rotate 6s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      // Custom Spacing and Sizing
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
    },
  },
  plugins: [],
};