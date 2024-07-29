import { TestType, type MixedTest, type Test } from "$lib/types";
import { containersTest } from "./containers";
import { linesTest } from "./lines";
import { movementTest } from "./movement";
import { wordTest } from "./words";

export let mixedTest: Test = {
	type: TestType.MIXED,
	targetWord: "",
	populateWord: "",
	targetCharacter: "",
	populateCharacter: "",
	targetPosition: 0,
	initialPrompt: "A combination of all other tests into one!",
	textBuffer: [],
	joinCharacter: "",
	condition: () => false,
	updateBuffer: () => {
		const testTypes = [TestType.WORDS, TestType.CONTAINERS, TestType.LINES, TestType.MOVEMENT];
		const randomTest = testTypes[Math.floor(Math.random() * testTypes.length)];
		const savedUpdatedBuffer = mixedTest.updateBuffer;
		switch (randomTest) {
			case TestType.WORDS:
				wordTest.updateBuffer();
				mixedTest.type = wordTest.type;
				if (mixedTest.type !== TestType.WORDS) break;

				mixedTest.targetWord = wordTest.targetWord;
				mixedTest.populateWord = wordTest.populateWord;
				mixedTest.targetPosition = wordTest.targetPosition;
				mixedTest.textBuffer = wordTest.textBuffer;
				mixedTest.joinCharacter = wordTest.joinCharacter;
				mixedTest.condition = wordTest.condition;
				break;
			case TestType.CONTAINERS:
				containersTest.updateBuffer();
				mixedTest.type = containersTest.type;
				if (mixedTest.type !== TestType.CONTAINERS) break;

				mixedTest.textBuffer = containersTest.textBuffer;
				mixedTest.joinCharacter = containersTest.joinCharacter;
				mixedTest.condition = containersTest.condition;
				break;
			case TestType.LINES:
				linesTest.updateBuffer();
				mixedTest.type = linesTest.type;
				if (mixedTest.type !== TestType.LINES) break;

				mixedTest.targetWord = linesTest.targetWord;
				mixedTest.targetPosition = linesTest.targetPosition;
				mixedTest.textBuffer = linesTest.textBuffer;
				mixedTest.joinCharacter = linesTest.joinCharacter;
				mixedTest.condition = linesTest.condition;
				break;
			case TestType.MOVEMENT:
				movementTest.updateBuffer();
				mixedTest.type = movementTest.type;
				if (mixedTest.type !== TestType.MOVEMENT) break;

				mixedTest.targetCharacter = movementTest.targetCharacter;
				mixedTest.populateCharacter = movementTest.populateCharacter;
				mixedTest.targetPosition = movementTest.targetPosition;
				mixedTest.textBuffer = movementTest.textBuffer;
				mixedTest.joinCharacter = movementTest.joinCharacter;
				mixedTest.condition = movementTest.condition;
				break;
		}
		mixedTest.updateBuffer = savedUpdatedBuffer;
	}
} satisfies MixedTest;
