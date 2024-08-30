import { createPersistentStore } from "../persistent";

export const TEST_INDEX_KEY = "test-index";
export const MODE_INDEX_KEY = "mode-index";
export const TIME_INDEX_KEY = "time-index";
export const ROUNDS_INDEX_KEY = "rounds-index";

const DEFAULT_INDEX = 0;

// Create the test, mode, time, and rounds index stores
export const selectedTestIndex = createPersistentStore<number>(TEST_INDEX_KEY, DEFAULT_INDEX);
export const selectedModeIndex = createPersistentStore<number>(MODE_INDEX_KEY, DEFAULT_INDEX);
export const selectedTimeIndex = createPersistentStore<number>(TIME_INDEX_KEY, DEFAULT_INDEX);
export const selectedRoundsIndex = createPersistentStore<number>(ROUNDS_INDEX_KEY, DEFAULT_INDEX);
