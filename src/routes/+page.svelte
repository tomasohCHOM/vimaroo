<script lang="ts">
  import Editor from "$lib/components/editor.svelte";

  let modes = [
    "words",
    "containers",
    "relative",
    "hjkl",
    "whackamole",
    "mixed",
  ];
  let selectedOption = 0;
</script>

<main class="grid justify-center items-center gap-6">
  <div class="flex justify-center bg-secondary gap-3 rounded-lg p-2">
    {#each modes as mode, i}
      <button
        class="font-semibold transition
        {i === selectedOption ? 'text-contrast_b' : 'hover:text-contrast_g'}"
        on:click={() => (selectedOption = i)}
      >
        {mode}
      </button>
    {/each}
  </div>

  <div class="w-[min(1000px,_90vw)] h-[400px]">
    <Editor />
  </div>
</main>
