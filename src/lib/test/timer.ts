import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
import { writable } from "svelte/store";

function createTimer(initialValue: number = 15) {
	const { subscribe, set, update } = writable(0);
	let interval: number;
	const start = (editor: Monaco.editor.IStandaloneCodeEditor) => {
		stop(); // Ensure no duplicate intervals
		interval = setInterval(() => {
			update((n) => {
				n -= 1;
				if (n === 0) {
					stop();
					set(n);
					editor.setValue("");
					return n;
				}
				return n;
			});
		}, 1000);
	};
	const stop = () => {
		if (interval) clearInterval(interval);
	};
	const reset = () => {
		stop();
		set(initialValue);
	};
	const setInitivalValue = (value: number) => {
		set(value);
		reset();
	};
	return {
		subscribe,
		start,
		stop,
		reset,
		setInitivalValue
	};
}

export const timer = createTimer();
