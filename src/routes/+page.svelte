<script lang="ts">
	import TestSettings from "$lib/components/test-settings.svelte";
	import { testOver, testStarted } from "$lib/stores/test/status";
	import { timer } from "$lib/stores/test/timer";
	import { rounds } from "$lib/stores/test/rounds";
	import { scores } from "$lib/stores/test/scores";
	import {
		TEST_INDEX_KEY,
		MODE_INDEX_KEY,
		TIME_INDEX_KEY,
		ROUNDS_INDEX_KEY,
		selectedTestIndex,
		selectedModeIndex,
		selectedTimeIndex,
		selectedRoundsIndex
	} from "$lib/stores/test/options";
	import { fontSize, wordWrapEnabled, asciiLogoEnabled } from "$lib/stores/settings/settings";
	import { testOptions, modeOptions, roundOptions, timeOptions } from "$lib/test/options";
	import Editor from "$lib/components/editor.svelte";
	import { handleTestModeChange } from "$lib/test/tests";
	import type { Test } from "$lib/types/test";
	import { onDestroy } from "svelte";
	import { syncStoresToLocalStorage } from "$lib/stores/persistent.js";

	export let data;

	const unsubscribeAll = syncStoresToLocalStorage({
		[TEST_INDEX_KEY]: selectedTestIndex,
		[MODE_INDEX_KEY]: selectedModeIndex,
		[TIME_INDEX_KEY]: selectedTimeIndex,
		[ROUNDS_INDEX_KEY]: selectedRoundsIndex
	});

	// Clean up
	onDestroy(unsubscribeAll);

	let testTypeAmount: number;
	let test: Test = handleTestModeChange(testOptions[$selectedTestIndex]);

	$: testMode = testOptions[$selectedTestIndex];
	$: typeMode = modeOptions[$selectedModeIndex];
	$: test = handleTestModeChange(testMode);

	$: if (modeOptions[$selectedModeIndex] === "time") {
		testTypeAmount = timeOptions[$selectedTimeIndex];
	} else if (modeOptions[$selectedModeIndex] === "rounds") {
		testTypeAmount = roundOptions[$selectedRoundsIndex];
	} else {
		testTypeAmount = 0;
	}

	test.updateBuffer();
</script>

<section class="grid items-center justify-center gap-6 md:gap-8">
	{#if !$testStarted || $testOver}
		<TestSettings />
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

	<div class="h-[400px] w-[min(1000px,_90vw)]">
		{#key [testMode, typeMode, testTypeAmount, $asciiLogoEnabled, $fontSize, $wordWrapEnabled]}
			<Editor {test} {testMode} testType={typeMode} {testTypeAmount} session={data.session} />
		{/key}
	</div>
</section>
