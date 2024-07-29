<script lang="ts">
	import { handleGameModeChange } from "$lib/test/game";
	import { selectedRoundsIndex, selectedTimeIndex } from "$lib/test/game-index";
	import { roundOptions, timeOptions } from "$lib/test/options";
	import { type Test } from "$lib/types";
	import Editor from "./editor.svelte";

	export let gameMode: string;
	export let typeMode: string;

	let testTypeAmount: number;

	let test: Test = handleGameModeChange(gameMode);
	$: test = handleGameModeChange(gameMode);
	$: if (typeMode === "time") {
		testTypeAmount = timeOptions[$selectedTimeIndex];
	} else if (typeMode === "rounds") {
		testTypeAmount = roundOptions[$selectedRoundsIndex];
	} else {
		testTypeAmount = 0;
	}

	test.updateBuffer();
</script>

<div class="h-[400px] w-[min(1000px,_90vw)]">
	{#key [gameMode, typeMode, testTypeAmount]}
		<Editor {test} testType={typeMode} {testTypeAmount} />
	{/key}
</div>
