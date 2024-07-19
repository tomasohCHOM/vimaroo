<script lang="ts">
	import { fade, fly } from "svelte/transition";

	export let isOpen: boolean = false;
	function toggleContainer() {
		isOpen = !isOpen;
	}
</script>

{#key isOpen}
	<div
		class="floating z-20 flex flex-col gap-4 rounded-lg bg-background-500 shadow-lg"
		class:active={isOpen}
		in:fly={{ y: 40, duration: 150 }}
		out:fly={{ y: 40, duration: 150 }}
	>
		<slot />
	</div>

	<div
		class:hidden={!isOpen}
		class="fixed left-0 top-0 z-10 h-screen w-screen bg-white/15"
		on:click={toggleContainer}
		on:keydown={toggleContainer}
		role="presentation"
		tabindex="-1"
		in:fade={{ duration: 100 }}
		out:fade={{ duration: 100 }}
	/>
{/key}

<style>
	.floating {
		display: none;
		width: min(23rem, 80vw);
		padding: 1.5rem;
		position: fixed;
		left: 50%;
		top: 55%;
		transform: translate(-50%, -50%);
		transition: all 0.125s ease-in;
	}

	.floating.active {
		top: 50%;
		display: block;
	}
</style>
