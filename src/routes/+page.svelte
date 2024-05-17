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
  let selectedOption = 2;
</script>

<main class="max-w-screen-lg flex flex-col pt-12">
  <h1 class="font-bold text-3xl">VIMaestro</h1>

  <div
    class="flex items-center justify-center bg-secondary gap-2 rounded-lg px-4 py-2"
  >
    {#each modes as mode, i}
      <button
        class="font-semibold {i === selectedOption ? 'text-contrast_b' : ''}"
        >{mode}</button
      >
    {/each}
  </div>

  <div class="editor">
    <Editor />
  </div>
</main>

<style>
  .editor {
    height: 400px;
  }
</style>
