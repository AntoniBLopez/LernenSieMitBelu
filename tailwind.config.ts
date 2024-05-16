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
        'primaryColor': '#50c9a4',
        'grayColor': '#696969',
      },
      backgroundColor: {
        // 'bgColor': '#f7fcf9',
        'bgColor': '#f2f2f2',
        'bgPrimaryColor': '#50c9a4',
        'bluishSelectedColor': '#031018',
      },
      spacing: {
        desktop: '8rem',
        tablet: '6rem',
        mobile: '4rem',
        fixed: '1.5rem',
        fixedDesktop: '6rem',
        contentMargin: '6rem',
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
