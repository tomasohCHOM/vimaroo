<script lang="ts">
	import { page } from "$app/stores";
	import Icon from "@iconify/svelte";
</script>

<section class="grid items-center justify-center gap-4">
	<div class="relative flex justify-center">
		<div class="absolute left-[40%] -translate-x-2/4 -rotate-[20deg] opacity-30">
			<Icon icon="fa:question" width={40} />
		</div>
		<Icon icon="fa:question" width={40} />
		<div class="absolute left-[60%] -translate-x-2/4 rotate-[24deg] opacity-60">
			<Icon icon="fa:question" width={40} />
		</div>
	</div>
	<h1 class="text-center text-3xl">
		<span class="font-bold">{$page.status}</span> |
		<span class="font-medium">
			{$page.error?.message}
		</span>
	</h1>
	<div class="flex flex-col items-center justify-center gap-2 sm:flex-row">
		<a href="/" class="rounded-md border-2 border-foreground-neutral p-2">Go Back Home</a>
	</div>
</section>
