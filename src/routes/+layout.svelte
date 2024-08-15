<script lang="ts">
	import Login from "$lib/components/login.svelte";
	import Navbar from "$lib/components/navbar.svelte";
	import { onMount } from "svelte";
	import "../globals.css";
	import { invalidate } from "$app/navigation";
	import Popover from "$lib/components/popover.svelte";

	let isLoginOpen: boolean = false;

	export let data;
	$: ({ session, supabase, profile } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth");
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Vimaroo | Practice your VIM skills</title>
</svelte:head>

{#if session && profile && profile.username == null}
	<Popover isOpen={true}>
		<h2 class="text-center text-lg font-semibold md:text-xl">Account Username</h2>
		<p class="mt-1 text-center">Please provide a username to continue</p>
		<form
			method="post"
			action="/user/change-username"
			class="mt-4 flex flex-col items-center gap-2 rounded-xl"
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
				Continue
			</button>
		</form>
	</Popover>
{/if}

<Navbar bind:isLoginOpen {profile} />

<slot />

<footer class="mt-auto flex items-center justify-between px-4 pt-8 text-sm md:px-14">
	<div>
		Developed with 🔥 by
		<a href="https://github.com/tomasohCHOM" target="_blank" class="underline"> Chom </a>
		<span class="font-semibold">@ 2024</span>
	</div>
	<div>
		<a href="https://github.com/tomasohCHOM/vimaroo" class="underline" target="_blank"> GitHub </a>
	</div>
</footer>

<Login bind:isLoginOpen />
