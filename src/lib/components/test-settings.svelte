<script lang="ts">
	import {
		selectedTestIndex,
		selectedModeIndex,
		selectedRoundsIndex,
		selectedTimeIndex
	} from "$lib/stores/test/options";
	import { testOptions, modeOptions, roundOptions, timeOptions } from "$lib/test/options";
</script>

<!-- SMALL SCREN SIZES -->
<div class="mr-auto flex w-full flex-col gap-2 font-semibold md:hidden">
	<div
		class="flex flex-wrap items-center justify-center gap-2 rounded-md bg-background-400 p-2 text-sm"
	>
		{#each testOptions as testMode, i}
			<button
				class="font-semibold transition duration-150
        {i === $selectedTestIndex ? 'text-foreground-blue' : 'hover:text-foreground-green'}"
				on:click={() => selectedTestIndex.set(i)}
			>
				{testMode}
			</button>
		{/each}
	</div>
	<div class="flex items-center justify-center gap-2 rounded-md bg-background-400 p-2">
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
		<div class="flex items-center justify-center gap-2 rounded-md bg-background-400 p-2">
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

<!-- DESKTOP SCREN SIZES -->
<div class="hidden justify-center gap-3 rounded-lg bg-background-400 p-[10px] md:static md:flex">
	<div class="flex gap-4 border-r-4 border-background-600 pr-4 text-sm">
		{#each testOptions as testMode, i}
			<button
				class="font-semibold transition duration-150
        {i === $selectedTestIndex ? 'text-foreground-blue' : 'hover:text-foreground-green'}"
				on:click={() => selectedTestIndex.set(i)}
			>
				{testMode}
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
