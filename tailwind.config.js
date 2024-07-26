/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				"background-400": "rgb(var(--color-background-400))",
				"background-500": "rgb(var(--color-background-500))",
				"background-600": "rgb(var(--color-background-600))",

				"foreground-neutral": "rgb(var(--color-foreground-neutral))",
				"foreground-red": "rgb(var(--color-foreground-red))",
				"foreground-green": "rgb(var(--color-foreground-green))",
				"foreground-blue": "rgb(var(--color-foreground-blue))"
			},
			fontFamily: {
				general: "var(--ff-general)",
				code: "var(--ff-code)"
			}
		}
	},
	plugins: []
};
