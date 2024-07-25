import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
import { writable } from "svelte/store";

function createTimer(initialValue: number = 15) {
	const { subscribe, set, update } = writable(initialValue);
	let intervalId: number;

	// Starts the timer using setInterval, clear when it reaches 0
	const start = (editor: Monaco.editor.IStandaloneCodeEditor) => {
		clear(); // Ensure no duplicate intervals
		intervalId = setInterval(() => {
			update((n) => {
				n -= 1;
				if (n === 0) {
					clear();
					set(n);
					editor.setValue("");
					return n;
				}
				return n;
			});
		}, 1000);
	};
	const clear = () => {
		if (intervalId) clearInterval(intervalId);
	};
	const setInitivalValue = (value: number) => {
		set(value);
	};
	return {
		subscribe,
		start,
		clear,
		setInitivalValue
	};
}

export const timer = createTimer();
