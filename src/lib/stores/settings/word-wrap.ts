import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const enableWordWrapOptions = ["Yes", "No"];
const DEFAULT_INDEX = 1;
let wordWrapOptionIndex: number = 0;

if (browser) {
	const storedWordWrapOptionIndex = window.localStorage.getItem("word-wrap-option");
	wordWrapOptionIndex =
		storedWordWrapOptionIndex != null ? JSON.parse(storedWordWrapOptionIndex) : DEFAULT_INDEX;
}

export const wordWrapEnabled = writable(wordWrapOptionIndex);
