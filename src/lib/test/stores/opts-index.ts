import { browser } from "$app/environment";
import { writable } from "svelte/store";

const DEFAULT_INDEX = 0;
let testIndex: number = 0;
let modeIndex: number = 0;
let timeIndex: number = 0;
let roundsIndex: number = 0;

if (browser) {
	const storedtestIndex = window.localStorage.getItem("test-index");
	const storedTypeIndex = window.localStorage.getItem("mode-index");
	const storedTimeIndex = window.localStorage.getItem("time-index");
	const storedRoundsIndex = window.localStorage.getItem("rounds-index");

	testIndex = storedtestIndex != null ? JSON.parse(storedtestIndex) : DEFAULT_INDEX;
	modeIndex = storedTypeIndex != null ? JSON.parse(storedTypeIndex) : DEFAULT_INDEX;
	timeIndex = storedTimeIndex != null ? JSON.parse(storedTimeIndex) : DEFAULT_INDEX;
	roundsIndex = storedRoundsIndex != null ? JSON.parse(storedRoundsIndex) : DEFAULT_INDEX;
}

// Create the test index store
export const selectedTestIndex = writable(testIndex);
selectedTestIndex.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem("test-index", JSON.stringify(value));
	}
});

// Create the mode index store
export const selectedModeIndex = writable(modeIndex);
selectedModeIndex.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem("mode-index", JSON.stringify(value));
	}
});

// Create a time index store (when user selects time mode)
export const selectedTimeIndex = writable(timeIndex);
selectedTimeIndex.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem("time-index", JSON.stringify(value));
	}
});

// Create a rounds index store (when user selects rounds mode)
export const selectedRoundsIndex = writable(roundsIndex);
selectedRoundsIndex.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem("rounds-index", JSON.stringify(value));
	}
});
