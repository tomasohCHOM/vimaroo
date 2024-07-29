import { writable } from "svelte/store";

export const gameStarted = writable(false);
export const gameOver = writable(false);
