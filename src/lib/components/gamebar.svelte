<script lang="ts">
	import type { TestType, TypeMode } from "$lib/types";

	export let gameModes: TestType[];
	export let typeModes: TypeMode[];

	export let selectedGameIndex: number;
	export let selectedTypeIndex: number;
	export let selectedVariantIndex: number;
</script>

<div
	class="bg-secondary fixed flex justify-center gap-3 rounded-lg bg-background-400 p-[10px] md:static"
>
	<div class="flex gap-4 border-r-4 border-background-600 pr-4 text-sm">
		{#each gameModes as gameMode, i}
			<button
				class="font-semibold transition duration-150
        {i === selectedGameIndex ? 'text-foreground-blue' : 'hover:text-foreground-green'}"
				on:click={() => (selectedGameIndex = i)}
			>
				{gameMode}
			</button>
		{/each}
	</div>
	<div
		class="flex gap-4 pr-4 text-sm {typeModes[selectedTypeIndex].type !== 'zen'
			? 'border-r-4 border-background-600'
			: ''}"
	>
		{#each typeModes as typeMode, i}
			<button
				class="font-semibold transition duration-150
        {i === selectedTypeIndex ? 'text-foreground-blue' : 'hover:text-foreground-green'}"
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
