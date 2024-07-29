<script lang="ts">
	import {
		selectedGameIndex,
		selectedModeIndex,
		selectedRoundsIndex,
		selectedTimeIndex
	} from "$lib/test/stores/opts-index";
	import { gameOptions, modeOptions, roundOptions, timeOptions } from "$lib/test/options";
</script>

<div
	class="mr-auto flex items-center justify-center gap-2 font-semibold text-foreground-blue md:hidden"
>
	<div class="rounded-md bg-background-400 p-2">{gameOptions[$selectedGameIndex]}</div>
	<div class="rounded-md bg-background-400 p-2">{modeOptions[$selectedModeIndex]}</div>
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
		class="flex gap-4 pr-4 text-sm {modeOptions[$selectedModeIndex] !== 'zen'
			? 'border-r-4 border-background-600'
			: ''}"
	>
		{#each modeOptions as modeOption, i}
			<button
				class="font-semibold transition duration-150
        {i === $selectedModeIndex ? 'text-foreground-blue' : 'hover:text-foreground-green'}"
				on:click={() => selectedModeIndex.set(i)}
			>
				{modeOption}
			</button>
		{/each}
	</div>
	{#if ["time", "rounds"].includes(modeOptions[$selectedModeIndex])}
		<div class="flex gap-3">
			{#if modeOptions[$selectedModeIndex] === "time"}
				{#each timeOptions as timeOption, i}
					<button
						class="text-sm font-semibold transition duration-150
            {i === $selectedTimeIndex ? 'text-foreground-blue' : 'hover:text-foreground-green'}"
						on:click={() => ($selectedTimeIndex = i)}
					>
						{timeOption}
					</button>
				{/each}
			{/if}
			{#if modeOptions[$selectedModeIndex] === "rounds"}
				{#each roundOptions as roundOption, i}
					<button
						class="text-sm font-semibold transition duration-150
            {i === $selectedRoundsIndex ? 'text-foreground-blue' : 'hover:text-foreground-green'}"
						on:click={() => ($selectedRoundsIndex = i)}
					>
						{roundOption}
					</button>
				{/each}
			{/if}
		</div>
	{/if}
</div>
