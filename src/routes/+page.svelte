<script lang="ts">
	import Test from "$lib/components/test.svelte";
	import TestSettings from "$lib/components/test-settings.svelte";
	import { testOver, testStarted } from "$lib/test/stores/status";
	import { timer } from "$lib/test/stores/timer";
	import { rounds } from "$lib/test/stores/rounds";
	import { scores } from "$lib/test/stores/scores";
	import { selectedTestIndex, selectedModeIndex } from "$lib/test/stores/opts-index";
	import { testOptions, modeOptions } from "$lib/test/options";
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

	<Test testMode={testOptions[$selectedTestIndex]} typeMode={modeOptions[$selectedModeIndex]} />
</section>
