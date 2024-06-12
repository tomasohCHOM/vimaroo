<script lang="ts">
  import { handleGameModeChange } from "$lib/test/game";
  import { type Test, type TypeMode } from "$lib/types";
  import Editor from "./editor.svelte";

  export let gameMode: string;
  export let typeMode: TypeMode;
  export let typeModeVariant: number;

  let test: Test = handleGameModeChange(gameMode);
  $: test = handleGameModeChange(gameMode);
</script>

<div class="w-[min(1000px,_90vw)] h-[400px]">
  {#key [gameMode, typeMode]}
    <Editor {test} testType={typeMode.type} testTypeAmount={typeModeVariant} />
  {/key}
</div>
