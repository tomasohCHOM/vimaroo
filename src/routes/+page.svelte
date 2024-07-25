<script lang="ts">
	import Game from "$lib/components/game.svelte";
	import Gamebar from "$lib/components/gamebar.svelte";
	import { gameOver, gameStarted } from "$lib/test/status";
	import { timer } from "$lib/test/timer";
	import { TestType, type TypeMode } from "$lib/types";

	const gameModes = Object.values(TestType);
	const typeModes: TypeMode[] = [
		{
			type: "time",
			variances: [15, 30, 60, 120]
		},
		{
			type: "amount",
			variances: [10, 25, 50, 100]
		},
		{
			type: "zen",
			variances: []
		}
	];

	let selectedGameIndex = 0;
	let selectedTypeIndex = 0;
	let selectedVariantIndex = 0;
</script>

<main class="grid items-center justify-center gap-8">
	{#if !$gameStarted || $gameOver}
		<Gamebar
			{gameModes}
			{typeModes}
			bind:selectedGameIndex
			bind:selectedTypeIndex
			bind:selectedVariantIndex
		/>
	{:else}
		<div>{$timer}</div>
	{/if}

	<Game
		gameMode={gameModes[selectedGameIndex]}
		typeMode={typeModes[selectedTypeIndex]}
		typeModeVariant={typeModes[selectedTypeIndex].variances[selectedVariantIndex]}
	/>
</main>
