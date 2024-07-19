<script lang="ts">
	import Login from "$lib/components/login.svelte";
	import Navbar from "$lib/components/navbar.svelte";
	import "../globals.css";

	let isLoginOpen: boolean = false;
</script>

<svelte:head>
	<title>Vimaroo | Practice your VIM skills</title>
</svelte:head>

<Navbar bind:isLoginOpen />

<slot />

<footer class="flex items-center justify-between px-4 text-sm md:px-14">
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
