<script lang="ts">
	import Icon from "@iconify/svelte";

	export let dropdownOptions: string[] | number[];

	let isDropdownOpen = false;
	let selectedOption = 0;
</script>

<div class="relative w-24 cursor-pointer rounded-md bg-background-400 p-2">
	<div
		class="flex items-center justify-between"
		role="button"
		on:click={() => (isDropdownOpen = true)}
		on:keydown={() => (isDropdownOpen = true)}
		aria-pressed="false"
		tabindex="0"
	>
		<span>{dropdownOptions[selectedOption]}</span>
		<Icon icon="mdi:keyboard-arrow-down" width={20} />
	</div>
	<div
		class="absolute left-0 top-0 z-10 max-h-[20rem] w-full flex-col gap-2
      overflow-y-auto rounded-md border-2 border-background-600 bg-background-400
      p-2 {isDropdownOpen ? 'flex' : 'hidden'}"
	>
		{#each dropdownOptions as option, i}
			<button
				on:click={() => {
					selectedOption = i;
					isDropdownOpen = false;
				}}
				class="px-2 text-left"
			>
				{option}
				{#if selectedOption === i}
					<Icon class="inline" icon="mdi:tick" />
				{/if}
			</button>
		{/each}
	</div>
</div>
