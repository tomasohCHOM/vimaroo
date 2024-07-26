import { browser } from "$app/environment";
import { writable } from "svelte/store";

const DEFAULT_INDEX = 0;
let gameIndex: number = 0;
let modeIndex: number = 0;

if (browser) {
	const storedGameIndex = window.localStorage.getItem("game-index");
	const storedTypeIndex = window.localStorage.getItem("mode-index");

	console.log(storedTypeIndex);

	gameIndex = storedGameIndex != null ? JSON.parse(storedGameIndex) : DEFAULT_INDEX;
	modeIndex = storedTypeIndex != null ? JSON.parse(storedTypeIndex) : DEFAULT_INDEX;
}

// Create the game index store
export const selectedGameIndex = writable(gameIndex);
selectedGameIndex.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem("game-index", JSON.stringify(value));
	}
});

// Create the mode index store
export const selectedModeIndex = writable(modeIndex);
selectedModeIndex.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem("mode-index", JSON.stringify(value));
	}
});
