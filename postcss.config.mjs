/** @type {import('postcss').Config} */
const config = {
  plugins: {
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
