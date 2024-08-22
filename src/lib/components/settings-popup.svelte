<script lang="ts">
	import Popover from "./popover.svelte";

	export let isSettingsOpen: boolean = false;
</script>

<Popover bind:isOpen={isSettingsOpen}>
	<h2 class="font-semibold">Settings</h2>
</Popover>
