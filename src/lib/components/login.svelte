<script lang="ts">
	import Icon from "@iconify/svelte";
	import PopupContainer from "$lib/components/popover.svelte";
	export let isLoginOpen = false;
</script>

<PopupContainer bind:isOpen={isLoginOpen}>
	<h2 class="text-center text-2xl font-semibold md:text-3xl">User Login</h2>
	<p class="mt-2 text-center">Continue with one of the following social login providers</p>

	<form method="post" class="mt-4 flex flex-col items-center gap-2 rounded-xl">
		<button
			type="submit"
			formaction="/login/?/login&provider=google"
			class="flex w-full items-center justify-center gap-4 rounded-xl bg-slate-50 py-1 text-background-400 transition"
		>
			<Icon class="inline-block" width={32} inline={true} icon="logos:google-icon" />
			<span class="align-middle font-medium">Continue with Google</span>
		</button>
		<button
			type="submit"
			formaction="/login/?/login&provider=github"
			class="flex w-full items-center justify-center gap-4 rounded-xl bg-[#24292e] py-1 text-slate-50 transition"
		>
			<Icon class="inline-block" width={32} inline={true} icon="mdi:github" />
			<span class="align-middle font-medium">Continue with GitHub</span>
		</button>
		<button
			type="submit"
			formaction="/login/?/login&provider=discord"
			class="flex w-full items-center justify-center gap-4 rounded-xl bg-[#7289da] py-1 text-slate-50 transition"
		>
			<Icon class="inline-block" width={32} inline={true} icon="ic:baseline-discord" />
			<span class="align-middle font-medium">Continue with Discord</span>
		</button>
	</form>
</PopupContainer>
