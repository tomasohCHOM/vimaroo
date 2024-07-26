<script lang="ts">
	import Game from "$lib/components/game.svelte";
	import Gamebar from "$lib/components/gamebar.svelte";
	import { gameOver, gameStarted } from "$lib/test/status";
	import { timer } from "$lib/test/timer";
	import { rounds } from "$lib/test/rounds";
	import { scores } from "$lib/test/scores";
	import { TestType, type TypeMode } from "$lib/types";
	import { selectedGameIndex, selectedModeIndex } from "$lib/test/game-index";
	import { gameOptions, modeOptions } from "$lib/test/options";

	const typeModes: TypeMode[] = [
		{
			type: "time",
			variances: [15, 30, 60, 120]
		},
		{
			type: "rounds",
			variances: [10, 25, 50, 100]
		},
		{
			type: "zen",
			variances: []
		}
	];

	let selectedVariantIndex = 0; // This will change

	let selectedTimeIndex = 0;
	let selectedRoundsIndex = 0;
</script>

<main class="grid items-center justify-center gap-6 md:gap-8">
	{#if !$gameStarted || $gameOver}
		<Gamebar {gameOptions} {typeModes} bind:selectedVariantIndex />
	{:else}
		<div class="flex items-center justify-between p-2">
			{#if ["time", "rounds"].includes(modeOptions[$selectedModeIndex])}
				<span class="text-foreground-blue font-semibold">
					{#if modeOptions[$selectedModeIndex] === "time"}
						{$timer}
					{:else}
						{$rounds}
					{/if}
				</span>
				<span class="font-semibold">
					{$scores[0]} / {$scores[1]}
				</span>
			{/if}
		</div>
	{/if}

	<Game
		gameMode={gameOptions[$selectedGameIndex]}
		typeMode={typeModes[$selectedModeIndex]}
		typeModeVariant={typeModes[$selectedModeIndex].variances[selectedVariantIndex]}
	/>
</main>
