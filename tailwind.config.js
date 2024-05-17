/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary))",
        secondary: "rgb(var(--color-secondary))",
        contrast: "rgb(var(--color-contrast))",
        contrast_g: "rgb(var(--color-contrast-g))",
        contrast_b: "rgb(var(--color-contrast-b))",
      },
      fontFamily: {
        general: "var(--ff-general)",
        code: "var(--ff-code)",
      },
    },
  },
  plugins: [],
};
