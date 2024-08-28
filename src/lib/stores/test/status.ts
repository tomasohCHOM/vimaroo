import { writable } from "svelte/store";

export const testStarted = writable(false);
export const testOver = writable(false);
export const testCancelled = writable(false);
