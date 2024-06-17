import { TestType } from "../types";
import type {
  Test,
  WordsTest,
  ContainersTest,
  RelativeTest,
  MovementTest,
  MixedTest,
} from "../types";
import {
  EXTRA_DELETE_SENTENCES,
  EXTRA_SENTENCES,
  EXTRA_SYMBOLS,
  EXTRA_WORDS,
} from "./utils";

export function handleGameModeChange(gameMode: string): Test {
  switch (gameMode) {
    case TestType.WORDS:
      return wordTest;
    case TestType.CONTAINERS:
      return containersTest;
    case TestType.RELATIVE:
      return relativeTest;
    case TestType.MOVEMENT:
      return movementTest;
    case TestType.MIXED:
      return mixedTest;
  }
  return wordTest;
}

const wordTest: Test = {
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
      wordTest.targetWord =
        EXTRA_WORDS[Math.floor(Math.random() * EXTRA_WORDS.length)];
    } while (wordTest.populateWord === wordTest.targetWord);

    wordTest.textBuffer = Array(10).fill(wordTest.populateWord);
    wordTest.targetPosition = Math.floor(
      Math.random() * wordTest.textBuffer.length
    );
    wordTest.textBuffer[wordTest.targetPosition] = wordTest.targetWord;
  },
} satisfies WordsTest;

const containersTest: Test = {
  type: TestType.CONTAINERS,
  initialPrompt: "Delete the contents of the containers (tip: use di)",
  textBuffer: ["[", "DELETE_ME", "]"],
  condition: (currentBuffer: string) => {
    const wrapper =
      containersTest.textBuffer[0] +
      containersTest.textBuffer[containersTest.textBuffer.length - 1];
    return currentBuffer.includes(wrapper);
  },
  joinCharacter: "",
  updateBuffer: () => {
    const containerTypes = ["[]", "{}", "()", "''", '""'];
    const containerType =
      containerTypes[Math.floor(Math.random() * containerTypes.length)];

    containersTest.textBuffer[0] = containerType[0];
    containersTest.textBuffer[containersTest.textBuffer.length - 1] =
      containerType[1];
    containersTest.textBuffer[1] =
      EXTRA_SENTENCES[Math.floor(Math.random() * EXTRA_SENTENCES.length)];
  },
} satisfies ContainersTest;

const relativeTest: Test = {
  type: TestType.RELATIVE,
  targetWord: EXTRA_DELETE_SENTENCES[1],
  targetPosition: 0,
  initialPrompt: "Delete the lines by using relative line jumping",
  textBuffer: new Array(10).fill("\n"),
  joinCharacter: "",
  condition: (currentBuffer: string) => {
    if (currentBuffer.length === 0) return false;
    if (relativeTest.type !== TestType.RELATIVE) return false;

    return !currentBuffer.includes(relativeTest.targetWord);
  },
  updateBuffer: () => {
    if (relativeTest.type !== TestType.RELATIVE) return;

    relativeTest.textBuffer = Array(10).fill("\n");
    relativeTest.targetPosition = Math.floor(
      Math.random() * relativeTest.textBuffer.length
    );
    const randomTarget =
      EXTRA_DELETE_SENTENCES[
        Math.floor(Math.random() * EXTRA_DELETE_SENTENCES.length)
      ];
    relativeTest.targetWord = randomTarget;
    relativeTest.textBuffer[relativeTest.targetPosition] = randomTarget;
  },
} satisfies RelativeTest;

const movementTest: Test = {
  type: TestType.MOVEMENT,
  targetCharacter: EXTRA_SYMBOLS[0],
  populateCharacter: EXTRA_SYMBOLS[1],
  targetPosition: 0,
  initialPrompt: "Remove the odd character by moving around with hjkl",
  textBuffer: new Array(8).fill(".........."),
  joinCharacter: "\n",
  condition: (currentBuffer: string) => {
    if (movementTest.type !== TestType.MOVEMENT) return false;

    const parsedBuffer = currentBuffer.split("\n").join("");
    const rowLength = movementTest.textBuffer.length;
    const columnLength = movementTest.textBuffer[0].length;
    return (
      parsedBuffer ===
      movementTest.populateCharacter.repeat(rowLength * columnLength - 1)
    );
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
  },
} satisfies MovementTest;

let mixedTest: Test = {
  type: TestType.MIXED,
  targetWord: "",
  populateWord: "",
  targetCharacter: "",
  populateCharacter: "",
  targetPosition: 0,
  initialPrompt: "A combination of all other tests into one!",
  textBuffer: [],
  joinCharacter: "",
  condition: (currrentBuffer: string) => false,
  updateBuffer: () => {
    const testTypes = [
      TestType.WORDS,
      TestType.CONTAINERS,
      TestType.RELATIVE,
      TestType.MOVEMENT,
    ];
    const randomTest = testTypes[Math.floor(Math.random() * testTypes.length)];
    const savedUpdatedBuffer = mixedTest.updateBuffer;
    switch (randomTest) {
      case TestType.WORDS:
        wordTest.updateBuffer();
        mixedTest = wordTest;
        break;
      case TestType.CONTAINERS:
        containersTest.updateBuffer();
        mixedTest = containersTest;
        break;
      case TestType.RELATIVE:
        relativeTest.updateBuffer();
        mixedTest = relativeTest;
        break;
      case TestType.MOVEMENT:
        movementTest.updateBuffer();
        mixedTest = movementTest;
        break;
    }
    mixedTest.updateBuffer = savedUpdatedBuffer;
  },
} satisfies MixedTest;
