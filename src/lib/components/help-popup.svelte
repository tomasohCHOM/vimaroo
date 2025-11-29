<script lang="ts">
	import Popover from "./popover.svelte";

	export let isHelpOpen: boolean;
</script>

<Popover
	bind:isOpen={isHelpOpen}
	containerWidth="w-[min(35rem,90vw)]"
	extraStyles="h-120 overflow-y-auto"
>
	<h2 class="text-2xl font-semibold md:text-3xl">Help❓</h2>
	<p class="mt-4">
		A brief guide to the tests in <code><b>vimaroo</b></code>. Start by selecting a test, then
		locate and delete the specified line using <code>dd</code> to start the test. If you need to
		exit early, use <code>:q</code>. Follow the instructions and complete each test using Vim
		motions!
	</p>
	<div class="mt-4 flex flex-col gap-4">
		<div class="flex flex-col gap-2">
			<h3 class="text-xl font-semibold">Horizontal ⬅️➡️</h3>
			<p>
				Remove the special character ('*', '#', '@', etc.) from the sequence of words. You can move
				between words with <code>w</code> (go one word forward) or <code>b</code> (go one word
				backward). You can also use <code>f</code>/<code>F</code> to go directly to that character,
				or <code>^</code> to go to the beginning of the line, and <code>$</code> to go to the end of
				the line.
			</p>
		</div>
		<div class="flex flex-col gap-2">
			<h3 class="text-xl font-semibold">Containers 🫙</h3>
			<p>
				Delete the inside contents of the container. You can do this with the <code>di</code>
				command followed by the opening character of the container ("delete inside" the container). For
				example, use <code>di"</code> to delete everything inside the double quotes.
			</p>
		</div>
		<div class="flex flex-col gap-2">
			<h3 class="text-xl font-semibold">Lines ⬆️⬇️</h3>
			<p>
				Delete the line with the sentence (you can ONLY delete that single line). Move up and down
				with <code>k</code> and <code>j</code>, but relative line jumping can be helpful as well
				(e.g., <code>6j</code> will go down 6 lines).
			</p>
		</div>
		<div class="flex flex-col gap-2">
			<h3 class="text-xl font-semibold">Movement ⬅️⬇️⬆️➡️</h3>
			<p>
				Move within the dot grid with <code>h</code><code>j</code><code>k</code><code>l</code>
				and remove the special character ('*', '#', '@', etc.) using <code>x</code>. If it's faster,
				you can also search for the character itself using <code>/</code>.
			</p>
		</div>
		<div class="flex flex-col gap-2">
			<h3 class="text-xl font-semibold">Mixed 🥗</h3>
			<p>
				All tests combined into one! Any of the tests above will be randomly chosen for each round
				(horizontal, containers, lines, or movement tests).
			</p>
		</div>
	</div>
</Popover>
