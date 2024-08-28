import { writable } from "svelte/store";

function createRoundsStore() {
	const { subscribe, set, update } = writable(0);

	const setRounds = (rounds: number) => {
		set(rounds);
	};

	const updateRounds = () => {
		update((rounds) => {
			return rounds - 1;
		});
	};

	return {
		subscribe,
		set,
		setRounds,
		updateRounds
	};
}

export const rounds = createRoundsStore();
