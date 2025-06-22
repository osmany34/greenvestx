/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-primary': '#10B981',
        'green-secondary': '#059669',
        'green-light': '#D1FAE5',
        'blue-primary': '#3B82F6',
        'blue-secondary': '#1D4ED8',
      }
    },
  },
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
} 