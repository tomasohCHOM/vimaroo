<script lang="ts">
  import { type TypeMode, GameModes } from "$lib/types";
  import Editor from "./editor.svelte";

  export let gameMode: string;
  export let typeMode: TypeMode;
  export let typeModeVariant: number;

  let prompt: string;
  let textArray: string[];
  let timer: number = 0;
  // let scoreCondition: string;
  // let currentScore = 0;

  $: switch (gameMode) {
    case GameModes.WORDS:
      prompt = "Navigate through the words";
      textArray = new Array(10).fill("\n");
      break;
    case GameModes.CONTAINERS:
      prompt = "ci inside the containers";
      textArray = new Array(10).fill("\n");
      break;
    case GameModes.RELATIVE:
      prompt = "Delete the lines";
      textArray = new Array(10).fill("\n");
      break;
    case GameModes.MOVEMENT:
      prompt = "Delete single characters in the word";
      textArray = new Array(10).fill("\n");
      break;
    case GameModes.MIXED:
      prompt = "Mixed exercises";
      textArray = new Array(10).fill("\n");
      break;
    default:
      break;
  }

  $: if (typeMode.type === "time" || typeMode.type === "amount") {
    timer = typeModeVariant;
  }
</script>

<div class="w-[min(1000px,_90vw)] h-[400px]">
  <Editor initalPrompt={prompt} />
</div>
