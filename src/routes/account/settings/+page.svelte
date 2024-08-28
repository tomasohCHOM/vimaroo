<script lang="ts">
	import { getFlash } from "sveltekit-flash-message";
	import { beforeNavigate } from "$app/navigation";
	import Icon from "@iconify/svelte";
	import { fly } from "svelte/transition";

	export let page;

	const flash = getFlash(page);
	beforeNavigate((navigation) => {
		if ($flash && navigation.from?.url.toString() != navigation.to?.url.toString()) {
			$flash = undefined;
		}
	});

	let playAnimation = false;

	// Deteremines delay and how long the toast notification is on for
	$: if ($flash) {
		setTimeout(() => {
			playAnimation = true;
			setTimeout(() => {
				playAnimation = false;
			}, 5000);
		}, 500);
	}
</script>

{#if $flash && playAnimation}
	<div
		transition:fly={{ y: 10, duration: 75 }}
		class="fixed bottom-12 left-8 z-[9999] rounded-md bg-background-600 p-3"
	>
		<span>
			{#if $flash.type === "success"}
				<Icon
					inline
					icon="mdi:tick"
					class="inline rounded-[50%] border-2 border-green-500 text-green-500"
				/>
			{:else}
				<Icon
					inline
					icon="mdi:close"
					class="inline rounded-[50%] border-2 border-red-400 text-red-400"
				/>
			{/if}
		</span>
		<span>{$flash.message}</span>
		<button on:click={() => ($flash = undefined)}>
			<Icon class="ml-2 inline" width={18} icon="mdi:close" />
		</button>
	</div>
{/if}

<section class="mx-auto flex w-full max-w-[40rem] flex-col justify-center gap-6 md:gap-8">
	<h1 class="text-2xl font-semibold md:text-3xl">Account Settings</h1>

	<div class="flex flex-col gap-2">
		<h3 class="text-lg font-semibold">Change username</h3>
		<form method="POST" action="?/updateUsername" class="flex gap-2">
			<input
				type="text"
				name="update-username"
				placeholder="Enter you new username"
				class="w-full rounded-lg bg-background-400 p-2 outline-none"
			/>
			<button
				type="submit"
				class="rounded-lg border-2 border-foreground-neutral bg-background-500 p-2
         font-semibold text-foreground-neutral transition hover:bg-background-600"
			>
				Update
			</button>
		</form>
	</div>

	<h3 class="text-lg font-semibold text-foreground-neutral">Danger Zone</h3>

	<div class="flex flex-col gap-2">
		<form
			method="POST"
			action="?/resetStats"
			class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
		>
			<h3 class="font-medium">Reset user statistics</h3>
			<button
				type="submit"
				class="rounded-lg border-2 border-foreground-red bg-background-500 p-2
         font-semibold text-foreground-red transition"
			>
				Reset User Stats
			</button>
		</form>
	</div>

	<div class="flex flex-col gap-2">
		<form
			method="POST"
			action="?/deleteAccount"
			class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
		>
			<h3 class="font-medium">Delete vimaroo account</h3>
			<button
				type="submit"
				class="rounded-lg border-2 border-foreground-red bg-foreground-red p-2
         font-semibold text-foreground-neutral transition"
			>
				Delete Account
			</button>
		</form>
	</div>
</section>
