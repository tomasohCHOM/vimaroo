<section class="mx-auto flex w-full max-w-[40rem] flex-col justify-center gap-6 md:gap-8">
	<h1 class="text-2xl font-semibold md:text-3xl">Account Settings</h1>

	<div class="flex flex-col gap-2">
		<h3 class="text-lg font-semibold">Change username</h3>
		<form method="POST" action="?/updateUsername" class="flex gap-2">
			<input
				type="text"
				name="update-username"
				placeholder="Enter you new username"
				class="w-full rounded-lg bg-background-400 p-2 outline-none"
			/>
			<button
				type="submit"
				class="rounded-lg border-2 border-foreground-neutral bg-background-500 p-2
         font-semibold text-foreground-neutral transition hover:bg-background-600"
			>
				Update
			</button>
		</form>
	</div>

	<h3 class="text-lg font-semibold text-foreground-neutral">Danger Zone</h3>

	<div class="flex flex-col gap-2">
		<form
			method="POST"
			action="?/resetStats"
			class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
		>
			<h3 class="font-medium">Reset user statistics</h3>
			<button
				type="submit"
				class="rounded-lg border-2 border-foreground-red bg-background-500 p-2
         font-semibold text-foreground-red transition"
			>
				Reset User Stats
			</button>
		</form>
	</div>

	<div class="flex flex-col gap-2">
		<form
			method="POST"
			action="?/deleteAccount"
			class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
		>
			<h3 class="font-medium">Delete vimaroo account</h3>
			<button
				type="submit"
				class="rounded-lg border-2 border-foreground-red bg-foreground-red p-2
         font-semibold text-foreground-neutral transition"
			>
				Delete Account
			</button>
		</form>
	</div>
</section>
