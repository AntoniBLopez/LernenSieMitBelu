import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textColor: {
        'primaryColor': '#01b7ff', // blue oscuro
        'primary2Color': '#01cdf1', // cian
        'primaryDarkColor': '#008ba4', // cian oscuro
        'blackColor': '#212121', // black claro
        'black2Color': '#171717', // black oscuro
        'selectedColor': '#171717', // black oscuro
      }
    },
  },
  plugins: [],
};
export default config;
