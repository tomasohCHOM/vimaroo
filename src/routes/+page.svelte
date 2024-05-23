<script lang="ts">
  import Editor from "$lib/components/editor.svelte";
  import Game from "$lib/components/game.svelte";

  const gameModes = [
    "words",
    "containers",
    "relative",
    "hjkl",
    "whackamole",
    "mixed",
  ];
  const typeModes = [
    {
      type: "time",
      variances: [15, 30, 60, 120],
    },
    {
      type: "amount",
      variances: [10, 25, 50, 100],
    },
    {
      type: "zen",
    },
  ];

  let selectedGameIndex = 0;
  let selectedTypeIndex = 0;
</script>

<main class="grid justify-center items-center">
  <div class="flex justify-center bg-secondary gap-3 rounded-lg p-2">
    <div class="flex gap-3 pr-3 border-r-4 border-slate-700">
      {#each gameModes as gameMode, i}
        <button
          class="font-semibold transition duration-150
          {i === selectedGameIndex
            ? 'text-contrast_b'
            : 'hover:text-contrast_g'}"
          on:click={() => (selectedGameIndex = i)}
        >
          {gameMode}
        </button>
      {/each}
    </div>
    <div class="flex gap-3">
      {#each typeModes as typeMode, i}
        <button
          class="font-semibold transition duration-150
          {i === selectedTypeIndex
            ? 'text-contrast_b'
            : 'hover:text-contrast_g'}"
          on:click={() => (selectedTypeIndex = i)}
        >
          {typeMode.type}
        </button>
      {/each}
    </div>
  </div>

  <Game
    gameMode={gameModes[selectedGameIndex]}
    typeMode={gameModes[selectedTypeIndex]}
  />
</main>
