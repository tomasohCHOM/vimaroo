<script lang="ts">
	import Icon from "@iconify/svelte";
	import Popover from "./popover.svelte";
	import Dropdown from "./dropdown.svelte";

	export let isSettingsOpen: boolean = false;

	const themeOptions = ["Light", "Dark"];
	const fontSizeOptions = Array.from({ length: 24 - 12 + 1 }, (_, i) => i + 12);
	const disableAsciiLogo = ["Yes", "No"];
</script>

<Popover bind:isOpen={isSettingsOpen} containerWidth="w-[min(40rem,_90vw)]">
	<h2 class="text-2xl font-semibold md:text-3xl">Settings</h2>
	<div class="mt-4 flex flex-col gap-4">
		<div class="flex items-center justify-between">
			<div class="flex flex-col">
				<h3 class="text-lg font-semibold">Switch Theme</h3>
				<p class="text-sm">Switch between light / dark mode for this site</p>
			</div>
			<Dropdown dropdownOptions={themeOptions}>
				<button>
					<Icon icon="mdi:moon" />
				</button>
			</Dropdown>
		</div>
		<div class="flex items-center justify-between">
			<div class="flex flex-col">
				<h3 class="text-lg font-semibold">Font Size</h3>
				<p class="text-sm">Change the editor font size</p>
			</div>
			<Dropdown dropdownOptions={fontSizeOptions}>
				<button>
					<Icon icon="mdi:moon" />
				</button>
			</Dropdown>
		</div>
		<div class="flex items-center justify-between">
			<div class="flex flex-col">
				<h3 class="text-lg font-semibold">Disable ASCII Logo</h3>
				<p class="text-sm">Disable the ASCII logo inside the editor</p>
			</div>
			<Dropdown dropdownOptions={disableAsciiLogo}>
				<button>
					<Icon icon="mdi:moon" />
				</button>
			</Dropdown>
		</div>
	</div>
</Popover>
