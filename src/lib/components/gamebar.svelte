<script lang="ts">
  import type { TestType, TypeMode } from "$lib/types";

  export let gameModes: TestType[];
  export let typeModes: TypeMode[];

  export let selectedGameIndex: number;
  export let selectedTypeIndex: number;
  export let selectedVariantIndex: number;
</script>

<div
  class="fixed md:static bg-background-400 flex justify-center bg-secondary gap-3 rounded-lg p-[10px]"
>
  <div class="flex gap-4 text-sm pr-4 border-r-4 border-background-600">
    {#each gameModes as gameMode, i}
      <button
        class="font-semibold transition duration-150
        {i === selectedGameIndex ? 'text-contrast_b' : 'hover:text-contrast_g'}"
        on:click={() => (selectedGameIndex = i)}
      >
        {gameMode}
      </button>
    {/each}
  </div>
  <div
    class="flex gap-4 text-sm pr-4 {typeModes[selectedTypeIndex].type !== 'zen'
      ? 'border-background-600 border-r-4'
      : ''}"
  >
    {#each typeModes as typeMode, i}
      <button
        class="font-semibold transition duration-150
        {i === selectedTypeIndex ? 'text-contrast_b' : 'hover:text-contrast_g'}"
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
          class="font-semibold transition duration-150 text-sm
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
