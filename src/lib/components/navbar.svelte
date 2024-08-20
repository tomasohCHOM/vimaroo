<script lang="ts">
	import Icon from "@iconify/svelte";

	export let isLoginOpen: boolean;
	export let profile: any;
</script>

<nav class="flex items-center justify-between">
	<h1 class="flex gap-2 text-3xl font-bold">
		<a href="/">
			<span class="z-10">vimaroo</span>
		</a>
		<img src="/favicon.svg" alt="Favicon" class="w-10" />
	</h1>
	<div class="flex items-center justify-center gap-1">
		<button>
			<Icon icon="mdi:about-circle-outline" width={24} />
		</button>
		<button>
			<Icon icon="mdi:settings" width={24} />
		</button>
		{#if profile}
			<a href="/profile/{profile.username}">
				<img src={profile.avatar_url} alt="User Icon" class="w-6 rounded-[50%]" />
			</a>
		{:else}
			<button on:click={() => (isLoginOpen = true)}>
				<Icon icon="mdi:user-outline" width={24} />
			</button>
		{/if}
	</div>
</nav>
