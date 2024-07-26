<script lang="ts">
	import { selectedGameIndex, selectedModeIndex } from "$lib/test/game-index";
	import type { TestType, TypeMode } from "$lib/types";

	export let gameOptions: TestType[];
	export let typeModes: TypeMode[];

	export let selectedVariantIndex: number;
</script>

<div
	class="text-foreground-blue mr-auto flex items-center justify-center gap-2 font-semibold md:hidden"
>
	<div class="rounded-md bg-background-400 p-2">{gameOptions[$selectedGameIndex]}</div>
	<div class="rounded-md bg-background-400 p-2">{typeModes[$selectedModeIndex].type}</div>
</div>

<div class="hidden justify-center gap-3 rounded-lg bg-background-400 p-[10px] md:static md:flex">
	<div class="flex gap-4 border-r-4 border-background-600 pr-4 text-sm">
		{#each gameOptions as gameMode, i}
			<button
				class="font-semibold transition duration-150
        {i === $selectedGameIndex ? 'text-foreground-blue' : 'hover:text-foreground-green'}"
				on:click={() => selectedGameIndex.set(i)}
			>
				{gameMode}
			</button>
		{/each}
	</div>
	<div
		class="flex gap-4 pr-4 text-sm {typeModes[$selectedModeIndex].type !== 'zen'
			? 'border-r-4 border-background-600'
			: ''}"
	>
		{#each typeModes as typeMode, i}
			<button
				class="font-semibold transition duration-150
        {i === $selectedModeIndex ? 'text-foreground-blue' : 'hover:text-foreground-green'}"
				on:click={() => selectedModeIndex.set(i)}
			>
				{typeMode.type}
			</button>
		{/each}
	</div>
	{#if typeModes[$selectedModeIndex].variances.length !== 0}
		<div class="flex gap-3">
			{#each typeModes[$selectedModeIndex].variances as variant, i}
				<button
					class="text-sm font-semibold transition duration-150
          {i === selectedVariantIndex ? 'text-foreground-blue' : 'hover:text-foreground-green'}"
					on:click={() => (selectedVariantIndex = i)}
				>
					{variant}
				</button>
			{/each}
		</div>
	{/if}
</div>
