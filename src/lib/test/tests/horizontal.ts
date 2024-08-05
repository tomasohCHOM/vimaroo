import { TestType, type HorizontalTest } from "$lib/types";
import { EXTRA_SYMBOLS, EXTRA_WORDS } from "../constants";

export const horizontalTest: HorizontalTest = {
	type: TestType.HORIZONTAL,
	targetCharacter: EXTRA_SYMBOLS[0],
	populateWord: EXTRA_WORDS[Math.floor(Math.random() * EXTRA_WORDS.length)],
	targetPosition: 0,
	initialPrompt: "Remove the odd character in a sequence of words",
	textBuffer: new Array(10).fill(EXTRA_WORDS[1]),
	joinCharacter: " ",
	condition: (currentBuffer: string) => {
		if (currentBuffer.length === 0) return false;
		if (horizontalTest.type !== TestType.HORIZONTAL) return false;

		return currentBuffer.split(" ").join("") === horizontalTest.populateWord.repeat(10);
	},
	updateBuffer: () => {
		if (horizontalTest.type !== TestType.HORIZONTAL) return;

		// Select a new random character and position to be inserted into textBuffer
		horizontalTest.targetCharacter =
			EXTRA_SYMBOLS[Math.floor(Math.random() * EXTRA_SYMBOLS.length)];
		horizontalTest.targetPosition = Math.floor(Math.random() * horizontalTest.textBuffer.length);

		// Update the position of the new character
		horizontalTest.textBuffer = Array(10).fill(horizontalTest.populateWord);
		const targetPosition = horizontalTest.targetPosition;
		const targetCharacter = horizontalTest.targetCharacter;
		horizontalTest.textBuffer.splice(targetPosition, 0, targetCharacter);
	}
};
