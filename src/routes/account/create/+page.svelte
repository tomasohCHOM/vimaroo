<script lang="ts">
	import { enhance } from "$app/forms";
	import Popover from "$lib/components/popover.svelte";
	import type { SubmitFunction } from "@sveltejs/kit";

	export let form;

	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	};
</script>

<Popover locked={true}>
	<h2 class="text-center text-lg font-semibold md:text-xl">Account Username</h2>
	<p class="mt-1 text-center">Please provide a username to continue</p>
	<form
		method="post"
		action="?/createAccount"
		class="mt-4 flex flex-col items-center gap-2 rounded-xl"
		use:enhance={handleSubmit}
	>
		<input
			type="text"
			name="username"
			placeholder="username"
			class="w-full rounded-xl bg-background-400 p-2 shadow-sm outline-none transition"
		/>
		<button
			type="submit"
			class="w-full rounded-xl bg-foreground-neutral py-1 font-semibold text-background-400 transition"
		>
			{#if loading}
				Loading...
			{:else}
				Continue
			{/if}
		</button>
		{#if form && form.message}
			<p class="text-sm font-semibold text-red-400">{form.message}</p>
		{/if}
	</form>
</Popover>
