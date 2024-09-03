import { TestType, type LinesTest } from "$lib/types/test";
import { EXTRA_DELETE_SENTENCES } from "../constants";

export const linesTest: LinesTest = {
	type: TestType.LINES,
	targetLine: EXTRA_DELETE_SENTENCES[1],
	targetPosition: 0,
	prompt: "Remove the sentences from the buffer (you can ONLY delete the sentence itself).",
	tip: "Tip: j and k are fast, but relative line jumping can be faster.",
	textBuffer: new Array(10).fill(".".repeat(EXTRA_DELETE_SENTENCES[1].length)),
	joinCharacter: "\n",
	condition: (currentBuffer: string) => {
		if (currentBuffer.length === 0) return false;
		if (linesTest.type !== TestType.LINES) return false;

		const parsedBuffer = currentBuffer.split("\n").join("");
		const rowLength = linesTest.textBuffer.length;
		const columnLength = linesTest.targetLine.length;
		return parsedBuffer === ".".repeat((rowLength - 1) * columnLength);
	},
	updateBuffer: () => {
		if (linesTest.type !== TestType.LINES) return;

		linesTest.targetPosition = Math.floor(Math.random() * linesTest.textBuffer.length);
		const randomTarget =
			EXTRA_DELETE_SENTENCES[Math.floor(Math.random() * EXTRA_DELETE_SENTENCES.length)];
		linesTest.targetLine = randomTarget;
		linesTest.textBuffer = Array(10).fill(".".repeat(linesTest.targetLine.length));
		linesTest.textBuffer[linesTest.targetPosition] = randomTarget;
	}
};
