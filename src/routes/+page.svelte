<script lang="ts">
	import Game from "$lib/components/game.svelte";
	import Gamebar from "$lib/components/gamebar.svelte";
	import { gameOver, gameStarted } from "$lib/test/status";
	import { timer } from "$lib/test/timer";
	import { rounds } from "$lib/test/rounds";
	import { scores } from "$lib/test/scores";
	import { selectedGameIndex, selectedModeIndex } from "$lib/test/game-index";
	import { gameOptions, modeOptions } from "$lib/test/options";
</script>

<main class="grid items-center justify-center gap-6 md:gap-8">
	{#if !$gameStarted || $gameOver}
		<Gamebar />
	{:else}
		<div class="flex items-center justify-between p-2">
			{#if ["time", "rounds"].includes(modeOptions[$selectedModeIndex])}
				<span class="font-semibold text-foreground-blue">
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

	<Game gameMode={gameOptions[$selectedGameIndex]} typeMode={modeOptions[$selectedModeIndex]} />
</main>
