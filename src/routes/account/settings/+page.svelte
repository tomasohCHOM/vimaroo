<script lang="ts">
	import { getFlash } from "sveltekit-flash-message";
	import { beforeNavigate } from "$app/navigation";
	import Icon from "@iconify/svelte";
	import { fly } from "svelte/transition";
	import { page } from "$app/stores";
	import { enhance } from "$app/forms";
	import Popover from "$lib/components/popover.svelte";
	import Spinner from "$lib/components/spinner.svelte";
	import type { SubmitFunction } from "@sveltejs/kit";

	const flash = getFlash(page);
	beforeNavigate((navigation) => {
		if ($flash && navigation.from?.url.toString() != navigation.to?.url.toString()) {
			$flash = undefined;
		}
	});

	let formLoading = false;
	let playFlashAnimation = false;

	let isDeleteOpen = false;
	let isResetStatsOpen = false;

	const handleSubmit: SubmitFunction = () => {
		formLoading = true;
		return async ({ update }) => {
			await update();
			formLoading = false;
		};
	};

	// Deteremines delay and how long the toast notification is on for
	$: if ($flash) {
		setTimeout(() => {
			playFlashAnimation = true;
			setTimeout(() => {
				playFlashAnimation = false;
			}, 5000);
		}, 500);
	}
</script>

{#if $flash && playFlashAnimation}
	<div
		transition:fly={{ y: 10, duration: 75 }}
		class="fixed bottom-12 right-8 z-9999 rounded-md bg-background-600 p-3"
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

<section class="mx-auto flex w-full max-w-160 flex-col justify-center gap-6 md:gap-8">
	{#if formLoading}
		<div class="grid items-center justify-center">
			<Spinner />
		</div>
	{:else}
		<h1 class="text-2xl font-semibold md:text-3xl">Account Settings</h1>

		<div class="flex flex-col gap-2">
			<h3 class="text-lg font-semibold">Change username</h3>
			<form method="POST" action="?/updateUsername" class="flex gap-2" use:enhance={handleSubmit}>
				<input
					type="text"
					name="update-username"
					placeholder="Enter you new username"
					class="w-full rounded-lg bg-background-400 p-2 outline-hidden"
				/>
				<button
					type="submit"
					class="rounded-lg p-2 font-semibold text-foreground-neutral transition hover:bg-background-600"
				>
					Update
				</button>
			</form>
		</div>

		<h3 class="text-lg font-semibold text-foreground-neutral">Danger Zone</h3>

		<div class="flex flex-col gap-2">
			<div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
				<h3 class="font-medium">Reset user statistics</h3>
				<button
					on:click={() => (isResetStatsOpen = true)}
					class="rounded-lg border-2 border-foreground-red bg-background-500 p-2
          font-semibold text-foreground-red transition hover:brightness-110"
				>
					Reset User Stats
				</button>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
				<h3 class="font-medium">Delete vimaroo account</h3>
				<button
					on:click={() => (isDeleteOpen = true)}
					class="rounded-lg border-2 border-foreground-red bg-foreground-red p-2
         font-semibold text-foreground-neutral transition hover:brightness-110"
				>
					Delete Account
				</button>
			</div>
		</div>
	{/if}
</section>

<Popover containerWidth="w-[min(30rem,90vw)]" bind:isOpen={isResetStatsOpen}>
	<form method="POST" action="?/resetStats" use:enhance={handleSubmit}>
		<p class="font-medium">
			Are you sure you want to reset your vimaroo stats. <b>This action is irreversible!</b>
		</p>
		<div class="mt-4 flex items-center justify-center gap-2">
			<button
				type="submit"
				on:click={() => (isResetStatsOpen = false)}
				class="rounded-md bg-red-400 p-2 font-semibold text-slate-50 transition hover:brightness-110"
			>
				Yes, Reset Stats
			</button>
			<button
				on:click|preventDefault={() => (isResetStatsOpen = false)}
				class="rounded-md p-2 font-semibold transition hover:bg-background-600"
			>
				No, Nevermind
			</button>
		</div>
	</form>
</Popover>

<Popover containerWidth="w-[min(30rem,90vw)]" bind:isOpen={isDeleteOpen}>
	<form method="POST" action="?/deleteAccount" use:enhance={handleSubmit}>
		<p class="font-medium">
			Are you sure you want to delete your vimaroo account. <b>This action is irreversible!</b>
		</p>
		<div class="mt-4 flex items-center justify-center gap-2">
			<button
				type="submit"
				on:click={() => (isDeleteOpen = false)}
				class="rounded-md bg-red-400 p-2 font-semibold text-slate-50 transition hover:brightness-110"
			>
				Yes, Delete
			</button>
			<button
				on:click|preventDefault={() => (isDeleteOpen = false)}
				class="rounded-md p-2 font-semibold transition hover:bg-background-600"
			>
				No, Nevermind
			</button>
		</div>
	</form>
</Popover>
