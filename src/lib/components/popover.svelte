<script lang="ts">
	import Icon from "@iconify/svelte";
	import { fade, fly } from "svelte/transition";

	export let locked: boolean = false;
	export let isOpen: boolean = locked;
	export let containerWidth: string = "w-[min(23rem,_80vw)]";
	export let extraStyles: string = "";

	function toggleContainer() {
		if (locked) return;
		isOpen = !isOpen;
	}
</script>

{#key isOpen}
	<div
		class="{containerWidth} {extraStyles} fixed left-1/2 top-[55%] z-20 hidden
    -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background-500 p-6 font-general
    shadow-lg transition-all"
		class:containerOpen={isOpen}
		in:fly={{ y: 40, duration: 150 }}
		out:fly={{ y: 40, duration: 150 }}
	>
		{#if !locked}
			<button class="absolute right-4 top-4" on:click={toggleContainer}>
				<Icon icon="mdi:close" width={24} />
			</button>
		{/if}
		<slot />
	</div>

	<div
		class:hidden={!isOpen}
		class="fixed left-0 top-0 z-10 h-screen w-screen bg-slate-950/25"
		on:click={toggleContainer}
		on:keydown={toggleContainer}
		role="presentation"
		tabindex="-1"
		in:fade={{ duration: 100 }}
		out:fade={{ duration: 100 }}
	/>
{/key}

<style>
	.containerOpen {
		top: 50%;
		display: block;
	}
</style>
