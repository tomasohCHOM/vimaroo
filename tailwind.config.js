/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				"background-400": "rgb(var(--color-background-400))",
				"background-500": "rgb(var(--color-background-500))",
				"background-600": "rgb(var(--color-background-600))",
				contrast: "rgb(var(--color-contrast))",
				contrast_g: "rgb(var(--color-contrast-g))",
				contrast_b: "rgb(var(--color-contrast-b))"
			},
			fontFamily: {
				general: "var(--ff-general)",
				code: "var(--ff-code)"
			}
		}
	},
	plugins: []
};
