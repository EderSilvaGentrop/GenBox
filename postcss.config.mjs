/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // Motor obrigatório para o Tailwind 4
    autoprefixer: {},
  },
};

export default config;