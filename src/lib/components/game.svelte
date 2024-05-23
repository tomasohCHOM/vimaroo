<script lang="ts">
  import Editor from "./editor.svelte";

  export let gameMode: string;
  export let typeMode: string;
</script>

<div class="w-[min(1000px,_90vw)] h-[400px]">
  <Editor />
</div>
