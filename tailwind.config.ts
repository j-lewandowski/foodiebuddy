import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FBFBFE",
        primary: "#3A4855",
        secondary: "#9FCFF9",
      },
      fontFamily: {
        logo: "var(--font-paytone)",
      },
    },
  },
  plugins: [],
};
export default config;
