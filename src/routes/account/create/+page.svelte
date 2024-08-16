<script lang="ts">
	import { enhance } from "$app/forms";
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

<div class="floating ng z-20 flex max-w-96 flex-col gap-4 rounded-lg bg-background-400 shadow-lg">
	<h2 class="text-center text-lg font-semibold md:text-xl">Account Username</h2>
	<p class="mt-1 text-center">Please provide a username to continue</p>
	<form
		method="post"
		action="?/createUsername"
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
</div>

<style>
	.floating {
		width: min(23rem, 80vw);
		padding: 1.5rem;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		transition: all 0.125s ease-in;
	}
</style>
