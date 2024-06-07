<script lang="ts">
  import { handleGameModeChange } from "$lib/game";
  import { type Test, type TypeMode } from "$lib/types";
  import Editor from "./editor.svelte";

  export let gameMode: string;
  export let typeMode: TypeMode;
  export let typeModeVariant: number;

  let test: Test = {
    initialPrompt: "",
    textBuffer: [],
    joinCharacter: "",
    stringCondition: "",
    updateBuffer: function () {},
  };

  $: handleGameModeChange(test, gameMode);
</script>

<div class="w-[min(1000px,_90vw)] h-[400px]">
  {#key [gameMode, typeMode]}
    <Editor {test} testType={typeMode.type} testTypeAmount={typeModeVariant} />
  {/key}
</div>
