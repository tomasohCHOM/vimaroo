import { browser } from "$app/environment";
import { writable, type Writable } from "svelte/store";

/**
 * Set a cookie with a key, value, and optional expiration period in days.
 */
function setCookie(key: string, value: string, days: number) {
	if (browser) {
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		const expires = `expires=${date.toUTCString()}`;
		document.cookie = `${key}=${encodeURIComponent(value)};${expires};path=/`;
	}
}

/**
 * Get a cookie by key.
 */
function getCookie(key: string): string | null {
	if (browser) {
		const name = `${key}=`;
		const decodedCookie = decodeURIComponent(document.cookie);
		const cookieArray = decodedCookie.split(";");
		for (let i = 0; i < cookieArray.length; i++) {
			let cookie = cookieArray[i].trim();
			if (cookie.indexOf(name) === 0) {
				return cookie.substring(name.length, cookie.length);
			}
		}
	}
	return null;
}

/**
 * Create a persistent svelte store using cookies.
 * @param key cookie key
 * @param initialValue store initial value
 * @returns a writable store
 */
export function createPersistentStore<T>(key: string, initialValue: T) {
	let storedValue = initialValue;
	if (browser) {
		const cookieValue = getCookie(key);
		if (cookieValue != null) {
			storedValue = JSON.parse(cookieValue);
		}
	}
	return writable(storedValue);
}

/**
 * Subscribes to stores and syncs them in cookies.
 * @param stores records with cookie key and the store itself as value
 * @returns unsubscriber for all stores
 */
export function syncStoresToCookies(stores: Record<string, Writable<any>>, days: number = 365) {
	const unsubscribers = Object.entries(stores).map(([key, store]) => {
		return store.subscribe((value) => {
			if (browser) {
				setCookie(key, JSON.stringify(value), days);
			}
		});
	});
	return () => {
		unsubscribers.forEach((unsubscribe) => {
			unsubscribe();
		});
	};
}
