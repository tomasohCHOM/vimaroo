import { GameModes, type Test } from "./types";

export function handleGameModeChange(test: Test, gameMode: string) {
  switch (gameMode) {
    case GameModes.WORDS:
      test.initialPrompt = "Navigate through the words";
      test.textBuffer = new Array(10).fill("bar");
      test.stringCondition = "zar";
      test.joinCharacter = " ";
      test.updateBuffer = (currentDeletePos: number | undefined) => {
        const previousDeletePos = currentDeletePos ?? 0;
        currentDeletePos = Math.floor(Math.random() * test.textBuffer.length);
        test.textBuffer[previousDeletePos] = "bar";
        test.textBuffer[currentDeletePos] = "zar";
      };
      break;
    case GameModes.CONTAINERS:
      test.initialPrompt =
        "Delete the contents of the containers (tip: use di)";
      test.textBuffer = ["[", "DELETE_ME", "]"];
      test.stringCondition = "";
      test.joinCharacter = "";
      test.updateBuffer = (currentDeletePos: number | undefined) => {
        const containerTypes = ["[]", "{}", "()", "''", '""'];
        const containerType =
          containerTypes[Math.floor(Math.random() * containerTypes.length)];

        const sampleText = ["Hello there", "Delete me", "foo", "bar"];
        test.textBuffer[0] = containerType[0];
        test.textBuffer[test.textBuffer.length - 1] = containerType[1];
        test.textBuffer[1] =
          sampleText[Math.floor(Math.random() * sampleText.length)];
      };
      break;
    case GameModes.RELATIVE:
      test.initialPrompt = "Delete the lines";
      test.textBuffer = new Array(10).fill("\n");
      test.stringCondition = "DELETE_ME";
      test.joinCharacter = "";
      test.updateBuffer = (currentDeletePos: number | undefined) => {
        const previousDeletePos = currentDeletePos ?? 0;
        currentDeletePos = Math.floor(Math.random() * test.textBuffer.length);
        test.textBuffer[previousDeletePos] = "\n";
        test.textBuffer[currentDeletePos] = "DELETE_ME";
      };
      break;
    case GameModes.MOVEMENT:
      test.initialPrompt = "Delete single characters in the word";
      test.textBuffer = new Array(10).fill("\n");
      test.stringCondition = "DELETE_ME";
      test.joinCharacter = "";
      test.updateBuffer = (currentDeletePos: number | undefined) => {
        const previousDeletePos = currentDeletePos ?? 0;
        currentDeletePos = Math.floor(Math.random() * test.textBuffer.length);
        test.textBuffer[previousDeletePos] = "\n";
        test.textBuffer[currentDeletePos] = "DELETE_ME";
      };
      break;
    case GameModes.MIXED:
      test.initialPrompt = "Mixed exercises";
      test.textBuffer = new Array(10).fill("\n");
      test.updateBuffer = (currentDeletePos: number | undefined) => {
        const previousDeletePos = currentDeletePos ?? 0;
        currentDeletePos = Math.floor(Math.random() * test.textBuffer.length);
        test.textBuffer[previousDeletePos] = "\n";
        test.textBuffer[currentDeletePos] = "DELETE_ME";
      };
      break;
    default:
      break;
  }
}
