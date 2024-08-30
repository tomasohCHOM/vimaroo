import { browser } from "$app/environment";
import { writable, type Writable } from "svelte/store";

/**
 * Create a persistent svelte store using local storage.
 * @param key local storage key
 * @param initialValue store initial value
 * @returns a writable store
 */
export function createPersistentStore<T>(key: string, initialValue: T) {
	let storedValue = initialValue;
	if (browser) {
		const storedItem = window.localStorage.getItem(key);
		if (storedItem != null) {
			storedValue = JSON.parse(storedItem);
		}
	}
	return writable(storedValue);
}

/**
 * Subscribes to stores and syncs them in local storage
 * @param stores records with local storage key and the store itself as value
 * @returns unsubscriber for all stores
 */
export function syncStoresToLocalStorage(stores: Record<string, Writable<any>>) {
	const unsubscribers = Object.entries(stores).map(([key, store]) => {
		return store.subscribe((value) => {
			if (browser) {
				window.localStorage.setItem(key, JSON.stringify(value));
			}
		});
	});
	return () => {
		unsubscribers.forEach((unsubscribe) => {
			unsubscribe();
		});
	};
}
