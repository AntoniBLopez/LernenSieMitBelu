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
        'bluishIconsColor': '#1d9bf0',
        'grayColor': '#cfcfcf',
      },
      backgroundColor: {
        'blackColor': '#212121', // black claro
        'bluishBlackColor': '#202327', // bluish black claro | Probar si contrasta mejor este con el azul o el black claro
        'black2Color': '#171717', // black oscuro
        'bluishSelectedColor': '#031018',
      },
      spacing: {
        desktop: '8rem',
        tablet: '6rem',
        mobile: '4rem',
        fixed: '1.5rem',
      },
      screens: {
        'mobile': '440px',
        'tablet': '640px',
        'laptop': '1024px',
        'desktop': '1280px',
      },
    },
  },
  plugins: [],
};
export default config;
