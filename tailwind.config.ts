import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // Doesn't work
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: {
        'primaryColor': '#50c9a4',
        'primaryDarkColor': '#34ba91',
        'primaryExtraDarkColor': '#1f8767',
        'grayColor': '#696969',
        'darkColor': '#141723',
        'darkCardColor': '#1e2530',
        'profileGrayColor': '#b4b4b4',
        /* Landing page */
        'LPGrayColor': '#c9c9c9',
      },
      backgroundColor: {
        'primaryColor': '#50c9a4',
        'primaryDarkColor': '#34ba91',
        'primaryExtraDarkColor': '#1f8767',
        'disabledPrimaryColor': '#b2ebd9',
        // 'disabledPrimaryColor': '#a1cfc0',
        'bgColorLight': '#f2f2f2',
        'bgColorDark': '#141723',
        'bgColorCardDark': '#1f2937',
        'bgColorCardHoverDark': '#181a1c',
        'selectedPrimaryColor': '#adf7e1',
        'graySelectedColor': '#ebebeb',
        'selectedColor': '#e8f0fe',
        /* Landing page */
        'LPPrimaryColor': '#68f2c8',
        'LPPrimaryColorHover': '#7ef7d2',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        fixed: '1.5rem',
        mobile: '2rem',
        tablet: '4rem',
        laptop: '5rem',
        desktop: '60rem',
      },
      screens: {
        'mobile': '440px',
        'tablet': '640px',
        'laptop': '1024px',
        'desktop': '1280px',
      },
      // dropShadow: {
      //   'PaymentButton': '4px 4px 0px rgba(41, 207, 156, 1)',
      //   'PaymentButtonHover': '4px 4px 0px rgba(55, 219, 169, 1)',
      // },
      borderColor: {
        'primaryColor': '#7ef7d2',
        'primaryDarkColor': '#34ba91',
        'primaryExtraDarkColor': '#1f8767',
      },
      width: {
        desktop: '1200px',
      },
    },
  },
  plugins: [],
};
export default config;
