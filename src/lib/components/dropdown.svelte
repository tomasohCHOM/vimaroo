<script lang="ts">
	import Icon from "@iconify/svelte";

	export let dropdownOptions: string[] | number[];
	export let selectedOption: number = 0;

	let isDropdownOpen = false;

	const handleDropdownFocusLoss = ({
		relatedTarget,
		currentTarget
	}: {
		relatedTarget: EventTarget | null;
		currentTarget: EventTarget & HTMLElement;
	}) => {
		// use "focusout" event to ensure that we can close the dropdown when
		// clicking outside or when we leave the dropdown with the "Tab" button

		// check if the new focus target doesn't present in the dropdown tree (exclude ul\li padding
		// area because relatedTarget, in this case, will be null)
		if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) return;
		isDropdownOpen = false;
	};
</script>

<div
	on:focusout={handleDropdownFocusLoss}
	class="relative w-24 cursor-pointer rounded-md bg-background-400 p-2"
>
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
