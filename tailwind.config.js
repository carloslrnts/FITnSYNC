/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",           // file di root: login.html, signup.html, dashboard.html
    "./pages/**/*.html",  // semua halaman di folder pages
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
