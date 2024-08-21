<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;

	const profile = data.profile;
	const overallStats = data.overallStats;
	const testStats = data.testStats;

	const createdAtDateObj = new Date(profile.created_at);
	const createdAt = createdAtDateObj.toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	});
</script>

<section class="mx-auto flex w-full max-w-screen-xl flex-col justify-center gap-6 md:gap-8">
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
				<span class="text-3xl text-foreground-blue md:text-5xl">{overallStats.testsStarted}</span>
			</div>
			<div class="flex flex-col gap-1 font-semibold">
				<span class="text-sm md:text-[1rem]">Tests completed:</span>
				<span class="text-3xl text-foreground-blue md:text-5xl">{overallStats.testsCompleted}</span>
			</div>
		</div>
	</div>

	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each testStats as test}
			<div class="rounded-md bg-background-400 p-4">
				<span class="text-sm font-semibold md:text-[1rem]">{test.testName}:</span>
				<div class="mt-4 flex flex-row justify-around gap-4 sm:flex-row">
					<div class="flex flex-col items-center gap-1">
						<span class="text-3xl font-semibold">{test.testsCompleted ?? "-"}</span>
						<span class="text-sm">tests</span>
					</div>
					<div class="flex flex-col items-center gap-1">
						<span class="text-3xl font-semibold text-foreground-blue">{test.dps ?? "-"}</span>
						<span class="text-sm">dps</span>
					</div>
					<div class="flex flex-col items-center gap-1">
						<span class="text-3xl font-semibold text-foreground-green">{test.accuracy ?? "-"}</span>
						<span class="text-sm">accuracy</span>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
