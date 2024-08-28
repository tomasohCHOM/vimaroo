import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const enableAsciiLogoOptions = ["Yes", "No"];
const DEFAULT_INDEX = 0;
let asciiOptionIndex: number = 0;

if (browser) {
	const storedAsciiOptionIndex = window.localStorage.getItem("ascii-option");
	asciiOptionIndex =
		storedAsciiOptionIndex != null ? JSON.parse(storedAsciiOptionIndex) : DEFAULT_INDEX;
}

export const asciiLogoEnabled = writable(asciiOptionIndex);
