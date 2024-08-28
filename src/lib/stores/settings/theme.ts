import { writable } from "svelte/store";

export enum Theme {
	Light = "Light",
	Dark = "Dark"
}

const ATTRIBUTE_KEY = "data-theme";

function get(): Theme {
	const savedValue = document.documentElement.getAttribute(ATTRIBUTE_KEY);
	if (savedValue === Theme.Dark) return Theme.Dark;
	if (savedValue === Theme.Light) return Theme.Light;
	return matchMedia("(prefers-color-scheme: dark)").matches ? Theme.Dark : Theme.Light;
}

function save(value: Theme) {
	document.documentElement.setAttribute(ATTRIBUTE_KEY, value);
	// Set the cookie's max age value to a year
	const period = 60 * 60 * 24 * 365;
	document.cookie = `theme=${value}; max-age=${period}; path=/`;

	switch (value) {
		case Theme.Dark: {
			document.documentElement.setAttribute(ATTRIBUTE_KEY, Theme.Dark);
			return;
		}
		default: {
			document.documentElement.setAttribute(ATTRIBUTE_KEY, Theme.Light);
			return;
		}
	}
}

function createTheme(defaultValue = Theme.Dark) {
	const { subscribe, set, update } = writable<Theme>(defaultValue);

	function init() {
		const saved = get();
		set(saved);
		subscribe(save);
	}

	function toggle() {
		update((value) => {
			const nextValue = value === Theme.Light ? Theme.Dark : Theme.Light;
			save(nextValue);
			return nextValue;
		});
	}

	return { subscribe, set, update, init, toggle, save };
}

export const theme = createTheme();
