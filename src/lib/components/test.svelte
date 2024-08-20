<script lang="ts">
	import { handletestModeChange } from "$lib/test/tests";
	import { selectedRoundsIndex, selectedTimeIndex } from "$lib/test/stores/opts-index";
	import { roundOptions, timeOptions } from "$lib/test/options";
	import { type Test } from "$lib/types";
	import Editor from "./editor.svelte";

	export let testMode: string;
	export let typeMode: string;

	let testTypeAmount: number;

	let test: Test = handletestModeChange(testMode);
	$: test = handletestModeChange(testMode);
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
	{#key [testMode, typeMode, testTypeAmount]}
		<Editor {test} testType={typeMode} {testTypeAmount} />
	{/key}
</div>
