import { TestType } from "./types";
import type {
  Test,
  WordsTest,
  ContainersTest,
  RelativeTest,
  MovementTest,
} from "./types";

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
      return movementTest;
    default:
      return movementTest;
  }
}

const POPULATE_WORDS = ["zar"];
const TARGET_WORDS = ["bar"];

const wordTest: Test = {
  type: TestType.WORDS,
  targetWord: TARGET_WORDS[0],
  populateWord: POPULATE_WORDS[0],
  targetPosition: 0,
  initialPrompt: "Remove the word that is different from the rest",
  textBuffer: new Array(10).fill(POPULATE_WORDS[0]),
  joinCharacter: " ",
  condition: (currentBuffer: string) => {
    if (currentBuffer.length === 0) return false;
    if (wordTest.type !== TestType.WORDS) return false;

    return !currentBuffer.includes(wordTest.targetWord);
  },
  updateBuffer: () => {
    if (wordTest.type !== TestType.WORDS) return;

    const previousDeletePos = wordTest.targetPosition;
    wordTest.targetPosition = Math.floor(
      Math.random() * wordTest.textBuffer.length
    );
    wordTest.textBuffer[previousDeletePos] = wordTest.populateWord;
    wordTest.textBuffer[wordTest.targetPosition] = wordTest.targetWord;
  },
} satisfies WordsTest;

const containersTest: Test = {
  type: TestType.CONTAINERS,
  initialPrompt: "Delete the contents of the containers (tip: use di)",
  textBuffer: ["[", "DELETE_ME", "]"],
  condition: (currentBuffer: string) => {
    const wrapper = containersTest.textBuffer[0] + containersTest.textBuffer[2];
    return !currentBuffer.includes(wrapper);
  },
  joinCharacter: "",
  updateBuffer: () => {
    const containerTypes = ["[]", "{}", "()", "''", '""'];
    const containerType =
      containerTypes[Math.floor(Math.random() * containerTypes.length)];

    const sampleText = ["Hello there", "Delete me", "foo", "bar"];
    containersTest.textBuffer[0] = containerType[0];
    containersTest.textBuffer[containersTest.textBuffer.length - 1] =
      containerType[1];
    containersTest.textBuffer[1] =
      sampleText[Math.floor(Math.random() * sampleText.length)];
  },
} satisfies ContainersTest;

const relativeTest: Test = {
  type: TestType.RELATIVE,
  targetPosition: 0,
  initialPrompt: "Delete the lines by using relative line jumping",
  textBuffer: new Array(10).fill("\n"),
  joinCharacter: "",
  condition: (currentBuffer: string) => {
    if (currentBuffer.length === 0) return false;
    if (relativeTest.type !== TestType.RELATIVE) return false;

    return !currentBuffer.includes("DELETE_ME");
  },
  updateBuffer: () => {
    if (relativeTest.type !== TestType.RELATIVE) return;
    const previousDeletePos = relativeTest.targetPosition;
    relativeTest.targetPosition = Math.floor(
      Math.random() * relativeTest.textBuffer.length
    );
    relativeTest.textBuffer[previousDeletePos] = "\n";
    relativeTest.textBuffer[relativeTest.targetPosition] = "DELETE_ME";
  },
} satisfies RelativeTest;

const movementTest: Test = {
  type: TestType.MOVEMENT,
  targetPosition: 0,
  initialPrompt: "Remove the odd character by moving around with hjkl",
  textBuffer: new Array(10).fill("\n"),
  joinCharacter: "",
  condition: (currentBuffer: string) => {
    if (currentBuffer.length === 0) return false;
    if (movementTest.type !== TestType.MOVEMENT) return false;

    return !currentBuffer.includes("DELETE_ME");
  },
  updateBuffer: () => {
    if (movementTest.type !== TestType.MOVEMENT) return;
    const previousDeletePos = movementTest.targetPosition;
    movementTest.targetPosition = Math.floor(
      Math.random() * movementTest.textBuffer.length
    );
    movementTest.textBuffer[previousDeletePos] = "\n";
    movementTest.textBuffer[movementTest.targetPosition] = "DELETE_ME";
  },
} satisfies MovementTest;
