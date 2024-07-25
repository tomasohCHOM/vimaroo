import { writable } from "svelte/store";

function createScoresStore() {
	const { subscribe, set, update } = writable<[number, number]>([0, 0]);

	const reset = () => {
		set([0, 0]);
	};

	return {
		subscribe,
		set,
		update,
		reset
	};
}

export const scores = createScoresStore();
