import { TestType, type WordsTest } from "$lib/types";
import { EXTRA_WORDS } from "../constants";

export const wordTest: WordsTest = {
	type: TestType.WORDS,
	targetWord: EXTRA_WORDS[0],
	populateWord: EXTRA_WORDS[Math.floor(Math.random() * EXTRA_WORDS.length)],
	targetPosition: 0,
	initialPrompt: "Remove the word that is different from the rest",
	textBuffer: new Array(10).fill(EXTRA_WORDS[1]),
	joinCharacter: " ",
	condition: (currentBuffer: string) => {
		if (currentBuffer.length === 0) return false;
		if (wordTest.type !== TestType.WORDS) return false;

		return !currentBuffer.includes(wordTest.targetWord);
	},
	updateBuffer: () => {
		if (wordTest.type !== TestType.WORDS) return;

		do {
			wordTest.targetWord = EXTRA_WORDS[Math.floor(Math.random() * EXTRA_WORDS.length)];
		} while (wordTest.populateWord === wordTest.targetWord);

		wordTest.textBuffer = Array(10).fill(wordTest.populateWord);
		wordTest.targetPosition = Math.floor(Math.random() * wordTest.textBuffer.length);
		wordTest.textBuffer[wordTest.targetPosition] = wordTest.targetWord;
	}
};
