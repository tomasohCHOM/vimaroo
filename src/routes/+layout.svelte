<script lang="ts">
	import Login from "$lib/components/login.svelte";
	import Navbar from "$lib/components/navbar.svelte";
	import { onMount } from "svelte";
	import "../globals.css";
	import { invalidate } from "$app/navigation";
	import Footer from "$lib/components/footer.svelte";

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

<main id="app" class="max-w-screen-2xl px-4 md:px-14">
	<Navbar bind:isLoginOpen {profile} />
	<slot />
	<Footer />
</main>

<Login bind:isLoginOpen />
