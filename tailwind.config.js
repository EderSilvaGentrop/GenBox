/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // As cores agora vêm do globals.css, mas mantemos aqui por segurança
      colors: {
        brand: {
          yellow: "#FFD11D",
          black: "#000000",
        },
      },
    },
  },
  plugins: [],
};