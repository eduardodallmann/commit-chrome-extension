import { Config } from 'tailwindcss';

const flowbite = require('flowbite-react/tailwind');

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', flowbite.content()],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin()],
};

export default config;
