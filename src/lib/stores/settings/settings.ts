import { createPersistentStore } from "../persistent";

export const ASCII_OPTION_KEY = "ascii-option";
export const FONT_SIZE_OPTION_KEY = "font-size-option";
export const WORD_WRAP_OPTION_KEY = "word-wrap-option";
export const RELATIVE_LINES_OPTION_KEY = "relative-lines-option";

// Options for each of the editor customization settings
export const fontSizeOptions = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
export const enableAsciiLogoOptions = ["Yes", "No"];
export const enableWordWrapOptions = ["Yes", "No"];
export const enableRelativeLinesOptions = ["Yes", "No"];

const DEFAULT_FONT_SIZE_INDEX = fontSizeOptions.indexOf(16);
const DEFAULT_ASCII_OPTION_INDEX = enableAsciiLogoOptions.indexOf("Yes");
const DEFAULT_WORD_WRAP_OPTION_INDEX = enableWordWrapOptions.indexOf("No");
const DEFAULT_RELATIVE_LINES_OPTION_INDEX = enableRelativeLinesOptions.indexOf("Yes");

// Create the editor setting stores
export const fontSize = createPersistentStore<number>(
	FONT_SIZE_OPTION_KEY,
	DEFAULT_FONT_SIZE_INDEX
);
export const asciiLogoEnabled = createPersistentStore<number>(
	ASCII_OPTION_KEY,
	DEFAULT_ASCII_OPTION_INDEX
);
export const wordWrapEnabled = createPersistentStore<number>(
	WORD_WRAP_OPTION_KEY,
	DEFAULT_WORD_WRAP_OPTION_INDEX
);
export const relativeLinesEnabled = createPersistentStore<number>(
	RELATIVE_LINES_OPTION_KEY,
	DEFAULT_RELATIVE_LINES_OPTION_INDEX
);
