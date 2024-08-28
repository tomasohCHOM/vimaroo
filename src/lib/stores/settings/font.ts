import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const fontSizeOptions = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
const DEFAULT_INDEX = fontSizeOptions.indexOf(16);
let fontSizeIndex: number = 0;
if (browser) {
	const storedFontSizeOptions = window.localStorage.getItem("font-size-option");
	fontSizeIndex = storedFontSizeOptions != null ? JSON.parse(storedFontSizeOptions) : DEFAULT_INDEX;
}

export const fontSize = writable(fontSizeIndex);
