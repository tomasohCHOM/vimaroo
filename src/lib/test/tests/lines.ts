import { TestType, type LinesTest } from "$lib/types";
import { EXTRA_DELETE_SENTENCES } from "../constants";

export const linesTest: LinesTest = {
	type: TestType.LINES,
	targetWord: EXTRA_DELETE_SENTENCES[1],
	targetPosition: 0,
	initialPrompt: "Delete the lines by using relative line jumping",
	textBuffer: new Array(10).fill("\n"),
	joinCharacter: "",
	condition: (currentBuffer: string) => {
		if (currentBuffer.length === 0) return false;
		if (linesTest.type !== TestType.LINES) return false;

		return !currentBuffer.includes(linesTest.targetWord);
	},
	updateBuffer: () => {
		if (linesTest.type !== TestType.LINES) return;

		linesTest.textBuffer = Array(10).fill("\n");
		linesTest.targetPosition = Math.floor(Math.random() * linesTest.textBuffer.length);
		const randomTarget =
			EXTRA_DELETE_SENTENCES[Math.floor(Math.random() * EXTRA_DELETE_SENTENCES.length)];
		linesTest.targetWord = randomTarget;
		linesTest.textBuffer[linesTest.targetPosition] = randomTarget;
	}
};
