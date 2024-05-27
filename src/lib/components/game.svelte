<script lang="ts">
  import { type TypeMode, GameModes } from "$lib/types";
  import Editor from "./editor.svelte";

  export let gameMode: string;
  export let typeMode: TypeMode;
  export let typeModeVariant: number;

  let initialPrompt: string;
  let textArray: string[];
  let characterCondition: string;
  let updateArray: (currentDeletePos: number) => void;
  let timer: number = 0;

  // let scoreCondition: string;
  // let currentScore = 0;

  $: switch (gameMode) {
    case GameModes.WORDS:
      initialPrompt = "Navigate through the words";
      textArray = new Array(10).fill("\n");
      characterCondition = "_";
      updateArray = (currentDeletePos: number) => {
        const previousDeletePos = currentDeletePos ?? 0;
        currentDeletePos = Math.round(Math.random() * textArray.length);
        textArray[previousDeletePos] = "\n";
        textArray[currentDeletePos] = "DELETE_ME";
      };
      break;
    case GameModes.CONTAINERS:
      initialPrompt = "ci inside the containers";
      textArray = new Array(10).fill("\n");
      characterCondition = "_";
      updateArray = (currentDeletePos: number) => {
        const previousDeletePos = currentDeletePos ?? 0;
        currentDeletePos = Math.round(Math.random() * textArray.length);
        textArray[previousDeletePos] = "\n";
        textArray[currentDeletePos] = "DELETE_ME";
      };
      break;
    case GameModes.RELATIVE:
      initialPrompt = "Delete the lines";
      textArray = new Array(10).fill("\n");
      characterCondition = "_";
      updateArray = (currentDeletePos: number) => {
        const previousDeletePos = currentDeletePos ?? 0;
        currentDeletePos = Math.round(Math.random() * textArray.length);
        textArray[previousDeletePos] = "\n";
        textArray[currentDeletePos] = "DELETE_ME";
      };
      break;
    case GameModes.MOVEMENT:
      initialPrompt = "Delete single characters in the word";
      textArray = new Array(10).fill("\n");
      characterCondition = "_";
      updateArray = (currentDeletePos: number) => {
        const previousDeletePos = currentDeletePos ?? 0;
        currentDeletePos = Math.round(Math.random() * textArray.length);
        textArray[previousDeletePos] = "\n";
        textArray[currentDeletePos] = "DELETE_ME";
      };
      break;
    case GameModes.MIXED:
      initialPrompt = "Mixed exercises";
      textArray = new Array(10).fill("\n");
      updateArray = (currentDeletePos: number) => {
        const previousDeletePos = currentDeletePos ?? 0;
        currentDeletePos = Math.round(Math.random() * textArray.length);
        textArray[previousDeletePos] = "\n";
        textArray[currentDeletePos] = "DELETE_ME";
      };
      break;
    default:
      break;
  }

  $: if (typeMode.type === "time" || typeMode.type === "amount") {
    timer = typeModeVariant;
  }
</script>

<div class="w-[min(1000px,_90vw)] h-[400px]">
  {#key [gameMode, typeMode]}
    <Editor {initialPrompt} {textArray} {characterCondition} {updateArray} />
  {/key}
</div>
