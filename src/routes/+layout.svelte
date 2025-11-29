<script lang="ts">
	import Login from "$lib/components/login.svelte";
	import Navbar from "$lib/components/navbar.svelte";
	import { onMount } from "svelte";
	import { invalidate, invalidateAll } from "$app/navigation";
	import { navigating } from "$app/stores";
	import Footer from "$lib/components/footer.svelte";
	import SettingsPopup from "$lib/components/settings-popup.svelte";
	import HelpPopup from "$lib/components/help-popup.svelte";
	import { blur, fly } from "svelte/transition";
	import "../globals.css";
	import Spinner from "$lib/components/spinner.svelte";

	let isHelpOpen: boolean = false;
	let isSettingsOpen: boolean = false;
	let isLoginOpen: boolean = false;

	export let data;
	$: ({ session, supabase, profile } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession) invalidateAll();
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

<main id="app" class="max-w-(--breakpoint-2xl) px-4 md:px-14">
	{#key data.url}
		<Navbar bind:isHelpOpen bind:isSettingsOpen bind:isLoginOpen {profile} />
		{#if $navigating}
			<div class="grid items-center justify-center">
				<Spinner />
			</div>
		{:else}
			<div in:blur={{ duration: 100, delay: 125 }}>
				<slot />
			</div>
		{/if}
		<Footer />
	{/key}
</main>

<HelpPopup bind:isHelpOpen />
<SettingsPopup bind:isSettingsOpen />
<Login bind:isLoginOpen />
