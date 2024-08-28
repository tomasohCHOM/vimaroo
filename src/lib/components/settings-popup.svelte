<script lang="ts">
	import Popover from "./popover.svelte";
	import Dropdown from "./dropdown.svelte";
	import { asciiLogoEnabled, enableAsciiLogoOptions } from "$lib/stores/settings/ascii-logo";
	import { onDestroy } from "svelte";
	import { browser } from "$app/environment";
	import { fontSize, fontSizeOptions } from "$lib/stores/settings/font";

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

	onDestroy(() => {
		unsubscribeAscii();
		unsubscribeFontSize();
	});

	const themeOptions = ["Light", "Dark"];
</script>

<Popover bind:isOpen={isSettingsOpen} containerWidth="w-[min(40rem,_90vw)]">
	<h2 class="text-2xl font-semibold md:text-3xl">Settings</h2>
	<div class="mt-4 flex flex-col gap-4">
		<div class="flex items-center justify-between">
			<div class="flex flex-col">
				<h3 class="text-lg font-semibold">Switch Theme</h3>
				<p class="text-sm">Switch between light / dark mode for this site</p>
			</div>
			<Dropdown dropdownOptions={themeOptions} />
		</div>
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
	</div>
</Popover>
