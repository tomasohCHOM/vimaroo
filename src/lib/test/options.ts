import { TestType } from "$lib/types";

const testOptions = Object.values(TestType);

const modeOptions = ["time", "rounds", "zen"];
// These options exist under modeOptions
// E.g., options for "time" include 15, 30, 60, and 120 seconds
const timeOptions = [15, 30, 60, 120];
const roundOptions = [10, 25, 50, 100];

export { testOptions, modeOptions, timeOptions, roundOptions };
