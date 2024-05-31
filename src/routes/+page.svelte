<script lang="ts">
  import Game from "$lib/components/game.svelte";
  import { GameModes, type TypeMode } from "$lib/types";

  const gameModes = Object.values(GameModes);
  const typeModes: TypeMode[] = [
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
      variances: [],
    },
  ];

  let selectedGameIndex = 0;
  let selectedTypeIndex = 0;
  let selectedVariantIndex = 0;
</script>

<main class="grid justify-center items-center">
  <div class="flex justify-center bg-secondary gap-3 rounded-lg p-[10px]">
    <div class="flex gap-4 pr-4 border-r-4 border-slate-700">
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
    <div
      class="flex gap-4 pr-4 {typeModes[selectedTypeIndex].type !== 'zen'
        ? 'border-slate-700 border-r-4'
        : ''}"
    >
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
    {#if typeModes[selectedTypeIndex].variances.length !== 0}
      <div class="flex gap-3">
        {#each typeModes[selectedTypeIndex].variances as variant, i}
          <button
            class="font-semibold transition duration-150
            {i === selectedVariantIndex
              ? 'text-contrast_b'
              : 'hover:text-contrast_g'}"
            on:click={() => (selectedVariantIndex = i)}
          >
            {variant}
          </button>
        {/each}
      </div>
    {/if}
  </div>

  <Game
    gameMode={gameModes[selectedGameIndex]}
    typeMode={typeModes[selectedTypeIndex]}
    typeModeVariant={typeModes[selectedTypeIndex].variances[
      selectedVariantIndex
    ]}
  />
</main>
