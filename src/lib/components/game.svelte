<script lang="ts">
  import { type TypeMode, GameModes } from "$lib/types";
  import Editor from "./editor.svelte";

  export let gameMode: string;
  export let typeMode: TypeMode;
  export let typeModeVariant: number;

  let initialPrompt: string;
  let textArray: string[];
  let stringCondition: string;
  let joinCharacter: string = "";
  let updateBuffer: (currentDeletePos: number) => void;

  // let scoreCondition: string;
  // let currentScore = 0;

  $: switch (gameMode) {
    case GameModes.WORDS:
      initialPrompt = "Navigate through the words";
      textArray = new Array(10).fill("bar");
      stringCondition = "zar";
      joinCharacter = " ";
      updateBuffer = (currentDeletePos: number) => {
        const previousDeletePos = currentDeletePos ?? 0;
        currentDeletePos = Math.floor(Math.random() * textArray.length);
        textArray[previousDeletePos] = "bar";
        textArray[currentDeletePos] = "zar";
      };
      break;
    case GameModes.CONTAINERS:
      initialPrompt = "ci inside the containers";
      textArray = new Array(10).fill("\n");
      stringCondition = "DELETE_ME";
      joinCharacter = "";
      updateBuffer = (currentDeletePos: number) => {
        const previousDeletePos = currentDeletePos ?? 0;
        currentDeletePos = Math.floor(Math.random() * textArray.length);
        textArray[previousDeletePos] = "\n";
        textArray[currentDeletePos] = "DELETE_ME";
      };
      break;
    case GameModes.RELATIVE:
      initialPrompt = "Delete the lines";
      textArray = new Array(10).fill("\n");
      stringCondition = "DELETE_ME";
      joinCharacter = "";
      updateBuffer = (currentDeletePos: number) => {
        const previousDeletePos = currentDeletePos ?? 0;
        currentDeletePos = Math.floor(Math.random() * textArray.length);
        textArray[previousDeletePos] = "\n";
        textArray[currentDeletePos] = "DELETE_ME";
      };
      break;
    case GameModes.MOVEMENT:
      initialPrompt = "Delete single characters in the word";
      textArray = new Array(10).fill("\n");
      stringCondition = "DELETE_ME";
      joinCharacter = "";
      updateBuffer = (currentDeletePos: number) => {
        const previousDeletePos = currentDeletePos ?? 0;
        currentDeletePos = Math.floor(Math.random() * textArray.length);
        textArray[previousDeletePos] = "\n";
        textArray[currentDeletePos] = "DELETE_ME";
      };
      break;
    case GameModes.MIXED:
      initialPrompt = "Mixed exercises";
      textArray = new Array(10).fill("\n");
      updateBuffer = (currentDeletePos: number) => {
        const previousDeletePos = currentDeletePos ?? 0;
        currentDeletePos = Math.floor(Math.random() * textArray.length);
        textArray[previousDeletePos] = "\n";
        textArray[currentDeletePos] = "DELETE_ME";
      };
      break;
    default:
      break;
  }
</script>

<div class="w-[min(1000px,_90vw)] h-[400px]">
  {#key [gameMode, typeMode]}
    <Editor
      {initialPrompt}
      {textArray}
      {stringCondition}
      {joinCharacter}
      {updateBuffer}
      testType={typeMode.type}
      testTypeAmount={typeModeVariant}
    />
  {/key}
</div>
