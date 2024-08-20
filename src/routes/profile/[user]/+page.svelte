<script lang="ts">
	import { TestType } from "$lib/types";
	import type { PageData } from "./$types";

	export let data: PageData;

	const profile = data.profile;

	const createdAtDateObj = new Date(profile.created_at);
	const createdAt = createdAtDateObj.toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	});

	const tests = Object.values(TestType);
</script>

<main class="mx-12 grid max-w-screen-xl items-center gap-6 md:gap-8">
	<div class="flex flex-col gap-4 md:flex-row">
		<div class="flex gap-4 rounded-md bg-background-400 p-4 md:w-2/5 lg:w-1/3">
			<img src={profile.avatar_url} alt="User profile" class="w-24 rounded-full" />
			<div class="flex flex-col gap-1 text-sm">
				<span class="text-xl font-semibold text-foreground-blue">{profile.username}</span>
				<span>Joined in: {createdAt}</span>
			</div>
		</div>
		<div
			class="flex items-center justify-around gap-4 rounded-md bg-background-400 p-4 md:w-3/5 lg:w-2/3"
		>
			<div class="flex flex-col gap-1 font-semibold">
				<span class="text-sm md:text-[1rem]">Tests started:</span>
				<span class="text-3xl text-foreground-blue md:text-5xl">308</span>
			</div>
			<div class="flex flex-col gap-1 font-semibold">
				<span class="text-sm md:text-[1rem]">Tests completed:</span>
				<span class="text-3xl text-foreground-blue md:text-5xl">214</span>
			</div>
		</div>
	</div>

	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each tests as test}
			<div class="rounded-md bg-background-400 p-4">
				<span class="text-sm font-semibold md:text-[1rem]">{test}:</span>
				<div class="mt-4 flex flex-col justify-around gap-4 sm:flex-row">
					<div class="flex items-center gap-1 sm:flex-col">
						<span class="text-3xl font-semibold">109</span>
						<span class="text-sm">tests</span>
					</div>
					<div class="flex items-center gap-1 sm:flex-col">
						<span class="text-3xl font-semibold text-foreground-blue">2.5</span>
						<span class="text-sm">dps</span>
					</div>
					<div class="flex items-center gap-1 sm:flex-col">
						<span class="text-3xl font-semibold text-foreground-green">94%</span>
						<span class="text-sm">accuracy</span>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<form action="/logout" method="post" class="flex items-center">
		<button type="submit" class="border-contrast rounded-lg border-2 px-3 py-2 font-medium">
			Log Out
		</button>
	</form>
</main>
