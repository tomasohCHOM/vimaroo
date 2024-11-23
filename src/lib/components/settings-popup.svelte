<script lang="ts">
	import Popover from "./popover.svelte";
	import Dropdown from "./dropdown.svelte";
	import { onDestroy } from "svelte";
	import { syncStoresToCookies } from "$lib/stores/persistent";
	import {
		FONT_SIZE_OPTION_KEY,
		WORD_WRAP_OPTION_KEY,
		ASCII_OPTION_KEY,
		RELATIVE_LINES_OPTION_KEY,
		fontSizeOptions,
		enableAsciiLogoOptions,
		enableWordWrapOptions,
		enableRelativeLinesOptions,
		fontSize,
		wordWrapEnabled,
		asciiLogoEnabled,
		relativeLinesEnabled
	} from "$lib/stores/settings/settings";

	export let isSettingsOpen: boolean = false;

	const unsubscribeAll = syncStoresToCookies({
		[FONT_SIZE_OPTION_KEY]: fontSize,
		[WORD_WRAP_OPTION_KEY]: wordWrapEnabled,
		[ASCII_OPTION_KEY]: asciiLogoEnabled,
		[RELATIVE_LINES_OPTION_KEY]: relativeLinesEnabled
	});

	onDestroy(unsubscribeAll);
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
				<h3 class="text-lg font-semibold">ASCII Logo</h3>
				<p class="text-sm">Enable the ASCII logo inside the editor</p>
			</div>
			<Dropdown dropdownOptions={enableAsciiLogoOptions} bind:selectedOption={$asciiLogoEnabled} />
		</div>
		<div class="flex items-center justify-between">
			<div class="flex flex-col">
				<h3 class="text-lg font-semibold">Word Wrap</h3>
				<p class="text-sm">Enable word wrapping for the editor</p>
			</div>
			<Dropdown dropdownOptions={enableWordWrapOptions} bind:selectedOption={$wordWrapEnabled} />
		</div>
		<div class="flex items-center justify-between">
			<div class="flex flex-col">
				<h3 class="text-lg font-semibold">Relative Lines</h3>
				<p class="text-sm">Enable relative lines for the editor</p>
			</div>
			<Dropdown
				dropdownOptions={enableRelativeLinesOptions}
				bind:selectedOption={$relativeLinesEnabled}
			/>
		</div>
	</div>
</Popover>
