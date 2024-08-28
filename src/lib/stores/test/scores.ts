import { writable } from "svelte/store";

function createScoresStore() {
	const { subscribe, set, update } = writable<[number, number]>([0, 0]);

	const incrementScore = () => {
		update(([prevScore, total]) => [prevScore + 1, total]);
	};

	const incrementTotal = () => {
		update(([prevScore, totalScore]) => [prevScore, totalScore + 1]);
	};

	const reset = () => {
		set([0, 0]);
	};

	return {
		subscribe,
		set,
		update,
		incrementScore,
		incrementTotal,
		reset
	};
}

export const scores = createScoresStore();
