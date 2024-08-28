<script lang="ts">
	import TestSettings from "$lib/components/test-settings.svelte";
	import { testOver, testStarted } from "$lib/stores/test/status.js";
	import { timer } from "$lib/stores/test/timer.js";
	import { rounds } from "$lib/stores/test/rounds.js";
	import { scores } from "$lib/stores/test/scores.js";
	import {
		selectedTestIndex,
		selectedModeIndex,
		selectedTimeIndex,
		selectedRoundsIndex
	} from "$lib/stores/test/opts-index.js";
	import { testOptions, modeOptions, roundOptions, timeOptions } from "$lib/test/options";
	import Editor from "$lib/components/editor.svelte";
	import { handleTestModeChange } from "$lib/test/tests";
	import type { Test } from "$lib/types/test";
	import { asciiLogoEnabled } from "$lib/stores/settings/ascii-logo.js";
	import { browser } from "$app/environment";
	import { onDestroy } from "svelte";
	import { fontSize } from "$lib/stores/settings/font.js";

	export let data;

	const unsubscribeTestIndex = selectedTestIndex.subscribe((value) => {
		if (browser) {
			window.localStorage.setItem("test-index", JSON.stringify(value));
		}
	});
	const unsubscribeModeIndex = selectedModeIndex.subscribe((value) => {
		if (browser) {
			window.localStorage.setItem("mode-index", JSON.stringify(value));
		}
	});
	const unsubscribeTimeIndex = selectedTimeIndex.subscribe((value) => {
		if (browser) {
			window.localStorage.setItem("time-index", JSON.stringify(value));
		}
	});
	const unsubscribeRoundsIndex = selectedRoundsIndex.subscribe((value) => {
		if (browser) {
			window.localStorage.setItem("rounds-index", JSON.stringify(value));
		}
	});

	// Clean up
	onDestroy(() => {
		unsubscribeTestIndex();
		unsubscribeModeIndex();
		unsubscribeTimeIndex();
		unsubscribeRoundsIndex();
	});

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
		{#key [testMode, typeMode, testTypeAmount, $asciiLogoEnabled, $fontSize]}
			<Editor {test} {testMode} testType={typeMode} {testTypeAmount} session={data.session} />
		{/key}
	</div>
</section>
