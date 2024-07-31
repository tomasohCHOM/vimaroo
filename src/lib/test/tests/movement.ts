import { TestType, type MovementTest } from "$lib/types";
import { EXTRA_SYMBOLS } from "../constants";

export const movementTest: MovementTest = {
	type: TestType.MOVEMENT,
	targetCharacter: EXTRA_SYMBOLS[0],
	populateCharacter: EXTRA_SYMBOLS[1],
	targetPosition: 0,
	initialPrompt: "Remove the odd character by moving around with hjkl (or use '/')",
	textBuffer: new Array(8).fill(".........."),
	joinCharacter: "\n",
	condition: (currentBuffer: string) => {
		if (movementTest.type !== TestType.MOVEMENT) return false;

		const parsedBuffer = currentBuffer.split("\n").join("");
		const rowLength = movementTest.textBuffer.length;
		const columnLength = movementTest.textBuffer[0].length;
		return parsedBuffer === movementTest.populateCharacter.repeat(rowLength * columnLength - 1);
	},
	updateBuffer: () => {
		if (movementTest.type !== TestType.MOVEMENT) return;

		const rowLength = movementTest.textBuffer.length;
		const columnLength = movementTest.textBuffer[0].length;

		// Populate the text buffer with a new random character
		movementTest.populateCharacter = ".";
		movementTest.textBuffer = Array(rowLength).fill(
			movementTest.populateCharacter.repeat(columnLength)
		);

		// Randomly select a new target position
		const randomPosition = Math.random() * rowLength * columnLength;
		movementTest.targetPosition = Math.floor(randomPosition);

		// Change new target position to a new random target character
		const row = Math.floor(movementTest.targetPosition / columnLength);
		const column = Math.floor(movementTest.targetPosition % columnLength);
		do {
			movementTest.targetCharacter =
				EXTRA_SYMBOLS[Math.floor(Math.random() * EXTRA_SYMBOLS.length)];
		} while (movementTest.populateCharacter === movementTest.targetCharacter);

		let targetRow: string | string[] = [...movementTest.textBuffer[row]];
		targetRow[column] = movementTest.targetCharacter;
		targetRow = targetRow.join("");
		movementTest.textBuffer[row] = targetRow;
	}
};
