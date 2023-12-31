/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'akrasia': ["AkrasiaVP Demo"],
        'dillan': ["MADE Dillan"],
        'kento': ["Kento"],
        'helveticaneue': ["Helvetica Neue"]
      }
    },
  },
  plugins: [],
}

