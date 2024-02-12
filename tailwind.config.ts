import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ['"Paytone One"', "sans-serif"],
      },
      colors: {
        "baby-blue": "#9DCEF9",
        ash: "#9EADBD",
        "dark-ash": "#869fac",
        "dark-blue": "#3A4856",
      },
      animation: {
        loading: "loading 1.5s linear infinite",
        "mobileDrawer-open": "slideDown 0.1s linear forwards",
        "mobileDrawer-closed": "slideUp 0.1s linear forwards",
      },
      aspectRatio: {
        "4/5": "4 / 5",
      },
    },
  },
  plugins: [],
};
export default config;
