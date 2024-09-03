<script lang="ts">
	import type { UserProfile } from "$lib/types/profile";
	import Icon from "@iconify/svelte";

	export let isHelpOpen: boolean;
	export let isSettingsOpen: boolean;
	export let isLoginOpen: boolean;
	export let profile: UserProfile | null;

	let isDropdownOpen: boolean = false;

	const handleDropdownFocusLoss = ({
		relatedTarget,
		currentTarget
	}: {
		relatedTarget: EventTarget | null;
		currentTarget: EventTarget & HTMLElement;
	}) => {
		// use "focusout" event to ensure that we can close the dropdown when
		// clicking outside or when we leave the dropdown with the "Tab" button

		// check if the new focus target doesn't present in the dropdown tree (exclude ul\li padding
		// area because relatedTarget, in this case, will be null)
		if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) return;
		isDropdownOpen = false;
	};
</script>

<nav class="flex items-center justify-between">
	<h1 class="flex gap-2 text-3xl font-bold">
		<a href="/">
			<span class="z-10">vimaroo</span>
		</a>
		<img src="/favicon.svg" alt="Favicon" class="w-10" />
	</h1>
	<div class="flex items-center justify-center gap-1">
		<button on:click={() => (isHelpOpen = true)}>
			<Icon icon="mdi:help-circle-outline" width={24} />
		</button>
		<button on:click={() => (isSettingsOpen = true)}>
			<Icon icon="mdi:settings" width={24} />
		</button>
		{#if profile}
			<div class="userProfileElem relative py-2" on:focusout={handleDropdownFocusLoss}>
				<button class="block" on:click={() => (isDropdownOpen = !isDropdownOpen)}>
					<img src={profile.avatar_url} alt="User Icon" class="w-6 rounded-[50%]" />
				</button>
				<div
					class="userOptions absolute right-0 top-11 z-30 w-max flex-col
          gap-1 rounded-md bg-background-400 p-4 text-sm font-semibold"
					class:userOptionsActive={isDropdownOpen}
				>
					<a href="/profile/{profile.username}" on:click={() => (isDropdownOpen = false)}>
						<span class="transition hover:text-foreground-green">
							<Icon icon="mdi:chart-line" class="inline" /> User Stats
						</span>
					</a>
					<a href="/account/settings" on:click={() => (isDropdownOpen = false)}>
						<span class="transition hover:text-foreground-green">
							<Icon icon="mdi:settings" class="inline" /> Account Settings
						</span>
					</a>
					<form method="post" action="/api/logout">
						<button type="submit" class="transition hover:text-foreground-green">
							<Icon icon="mdi:sign-out" class="inline" /> Sign Out
						</button>
					</form>
				</div>
			</div>
		{:else}
			<button on:click={() => (isLoginOpen = true)}>
				<Icon icon="mdi:user-outline" width={24} />
			</button>
		{/if}
	</div>
</nav>

<style>
	.userOptions {
		visibility: hidden;
		opacity: 0;
		transition: opacity 150ms;
	}

	.userOptionsActive {
		visibility: visible;
		opacity: 1;
		display: flex;
	}
</style>
