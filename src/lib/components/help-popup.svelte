<script lang="ts">
	import Popover from "./popover.svelte";

	export let isHelpOpen: boolean;
</script>

<Popover bind:isOpen={isHelpOpen}>
	<h2 class="font-semibold">Help</h2>
</Popover>
