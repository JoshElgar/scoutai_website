/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "var(--color-border)",
        textbox: "var(--color-textbox)",
        text: "var(--color-text)",
        background: "var(--color-background)",
      },
      fontFamily: {
        "pokemon-pixel": ["var(--font-pokemon-pixel)"],
      },
    },
  },
  plugins: [],
};
