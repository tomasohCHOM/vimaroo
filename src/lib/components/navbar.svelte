<script lang="ts">
	import Icon from "@iconify/svelte";
	import type { User } from "@supabase/supabase-js";

	export let isLoginOpen: boolean;
	export let user: User | null;
</script>

<nav class="flex items-center justify-between px-4 md:px-14">
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
		{#if user}
			<a href="profile/{user.user_metadata.user_name}">
				<img src={user.user_metadata.avatar_url} alt="User Icon" class="w-6 rounded-[50%]" />
			</a>
		{:else}
			<button on:click={() => (isLoginOpen = true)}>
				<Icon icon="mdi:user-outline" width={24} />
			</button>
		{/if}
	</div>
</nav>
