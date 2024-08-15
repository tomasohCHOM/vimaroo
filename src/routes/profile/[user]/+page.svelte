<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;

	$: ({ profile } = data);
</script>

<main class="mx-12 grid items-center gap-6 md:gap-8">
	<section>
		<div class="flex gap-4 rounded-md bg-background-400 p-4">
			<img src={profile.avatar_url} alt="User profile" class="w-24 rounded-full" />
			<div class="flex flex-col">
				<span>Username: {profile.username}</span>
				<span>Account created in: {profile.created_at}</span>
			</div>
		</div>
	</section>

	<form action="/logout" method="post" class="flex items-center">
		<button type="submit" class="border-contrast rounded-lg border-2 px-3 py-2 font-medium">
			Log Out
		</button>
	</form>
</main>
