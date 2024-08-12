<script lang="ts">
	import Login from "$lib/components/login.svelte";
	import Navbar from "$lib/components/navbar.svelte";
	import { onMount } from "svelte";
	import "../globals.css";
	import { invalidate } from "$app/navigation";

	let isLoginOpen: boolean = false;

	export let data;
	$: ({ session, supabase } = data);

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

<Navbar bind:isLoginOpen />

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
