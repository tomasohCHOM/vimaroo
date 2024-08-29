<script lang="ts">
	import Popover from "./popover.svelte";
	import Dropdown from "./dropdown.svelte";
	import { asciiLogoEnabled, enableAsciiLogoOptions } from "$lib/stores/settings/ascii-logo";
	import { onDestroy } from "svelte";
	import { browser } from "$app/environment";
	import { fontSize, fontSizeOptions } from "$lib/stores/settings/font";
	import { enableWordWrapOptions, wordWrapEnabled } from "$lib/stores/settings/word-wrap";

	export let isSettingsOpen: boolean = false;

	const unsubscribeAscii = asciiLogoEnabled.subscribe((value) => {
		if (browser) {
			window.localStorage.setItem("ascii-option", JSON.stringify(value));
		}
	});
	const unsubscribeFontSize = fontSize.subscribe((value) => {
		if (browser) {
			window.localStorage.setItem("font-size-option", JSON.stringify(value));
		}
	});

	const unsubscribeWordWrap = wordWrapEnabled.subscribe((value) => {
		if (browser) {
			window.localStorage.setItem("word-wrap-option", JSON.stringify(value));
		}
	});

	onDestroy(() => {
		unsubscribeAscii();
		unsubscribeFontSize();
		unsubscribeWordWrap();
	});
</script>

<Popover bind:isOpen={isSettingsOpen} containerWidth="w-[min(35rem,_90vw)]">
	<h2 class="text-2xl font-semibold md:text-3xl">Editor Settings</h2>
	<div class="mt-4 flex flex-col gap-4">
		<div class="flex items-center justify-between">
			<div class="flex flex-col">
				<h3 class="text-lg font-semibold">Font Size</h3>
				<p class="text-sm">Change the editor font size</p>
			</div>
			<Dropdown dropdownOptions={fontSizeOptions} bind:selectedOption={$fontSize} />
		</div>
		<div class="flex items-center justify-between">
			<div class="flex flex-col">
				<h3 class="text-lg font-semibold">Enable ASCII Logo</h3>
				<p class="text-sm">Enable the ASCII logo inside the editor</p>
			</div>
			<Dropdown dropdownOptions={enableAsciiLogoOptions} bind:selectedOption={$asciiLogoEnabled} />
		</div>
		<div class="flex items-center justify-between">
			<div class="flex flex-col">
				<h3 class="text-lg font-semibold">Enable Word Wrap</h3>
				<p class="text-sm">Enable word wrapping for the editor</p>
			</div>
			<Dropdown dropdownOptions={enableWordWrapOptions} bind:selectedOption={$wordWrapEnabled} />
		</div>
	</div>
</Popover>
