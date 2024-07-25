<script lang="ts">
	import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
	import { onDestroy, onMount } from "svelte";
	import Spinner from "./spinner.svelte";
	import type { Test } from "$lib/types";
	import { timer } from "$lib/test/timer";
	import { gameOver, gameStarted } from "$lib/test/status";

	export let test: Test;
	export let testType: string;
	export let testTypeAmount: number;

	let editor: Monaco.editor.IStandaloneCodeEditor;
	let editorContainer: HTMLElement;
	let language: string = "html";
	let theme: string = "Nord";
	let monaco: typeof Monaco;

	let vimMode: any;
	let loaded: boolean = false;

	let score = 0;
	let total = 0;

	onMount(async () => {
		// Import monaco code editor
		const imports = (await import("$lib/monaco")).default;
		monaco = imports.monaco;

		// Import editor theme
		const res = await fetch(`/${theme}.json`);
		const data = await res.json();
		monaco.editor.defineTheme(theme, data);

		// Set editor creation event to set theme
		monaco.editor.onDidCreateEditor((_) => {
			monaco.editor.setTheme(theme);
		});

		// Create editor & model to be displayed
		const editor = monaco.editor.create(editorContainer, {
			value: test.initialPrompt,
			language: language,
			minimap: { enabled: false },
			scrollBeyondLastLine: false,
			automaticLayout: true,
			lineNumbers: "relative",
			fontFamily: "Fira Code",
			fontSize: 16,
			padding: {
				top: 12
			}
		});
		// Initialize vim mode
		vimMode = imports.initVimMode(editor, document.getElementById("status-bar"));

		loaded = true;
		let startTime: number;
		timer.setInitivalValue(testTypeAmount);
		let triggeredByEditor = false;

		editor.focus();

		editor.getModel()?.onDidChangeContent(() => {
			// Helper function for updating the editor contents via the
			// test object updateBuffer() method
			const updateEditorContents = () => {
				test.updateBuffer();
				triggeredByEditor = true;
				editor.setValue(test.textBuffer.join(test.joinCharacter));
			};

			// Prompt message is displayed, start the game now
			if (!$gameOver && !$gameStarted) {
				$gameStarted = true;
				startTime = performance.now();
				if (testType === "time") {
					timer.start(editor);
				}
				updateEditorContents();
				return;
			}
			// If changes were triggered by the editor, ignore
			if (triggeredByEditor) {
				triggeredByEditor = false;
				return;
			}

			// Game is over and user wants to play again
			if ($gameOver && !editor.getValue().includes("Want to play again?")) {
				$gameOver = false;
				$gameStarted = false;
				timer.setInitivalValue(testTypeAmount);
				(score = 0), (total = 0);
				startTime = performance.now();
				updateEditorContents();
				return;
			}

			if ($gameOver) {
				return;
			}

			// The user has reached the end of the test
			// Case 1: test is type = "time"
			if (testType === "time" && $timer <= 0) {
				$gameOver = true;
				const accuracy = !total ? "-.-" : ((score / total) * 100).toFixed(2);

				const scoreSummary = `Your score is ${score}/${total} for the ${testTypeAmount} seconds test`;
				const accuracySummary = `Your accuracy was ${accuracy}%`;
				const playAgainPrompt = `Want to play again? [Delete this line]`;

				triggeredByEditor = true;
				editor.setValue(`${scoreSummary}\n${accuracySummary}\n${playAgainPrompt}`);
				return;
			}

			// Case 2: test is type = "amount"
			if (testType === "amount" && total >= testTypeAmount) {
				$gameOver = true;
				const endTime = performance.now();
				const totalTime = ((endTime - startTime) / 1000).toFixed(2);
				const accuracy = ((score / total) * 100).toFixed(2);

				const scoreSummary = `Your score is ${score}/${total}`;
				const accuracySummary = `Your accuracy was ${accuracy}%`;
				const timeSummary = `Total time = ${totalTime} seconds`;
				const playAgainPrompt = `Want to play again? [Delete this line]`;

				triggeredByEditor = true;
				editor.setValue(`${scoreSummary}\n${timeSummary}\n${accuracySummary}\n${playAgainPrompt}`);
				return;
			}

			// Check if we count it as a success or failure
			// In either case, increment the total count
			if (test.condition(editor.getValue())) {
				score++;
			}
			total++;
			// Update buffer and set it as the new editor value
			updateEditorContents();
		});
	});

	onDestroy(() => {
		monaco?.editor.getModels().forEach((model) => model.dispose());
		if (vimMode) vimMode.dispose();
		editor?.dispose();
	});
</script>

{#if !loaded}
	<div class="grid justify-center">
		<Spinner />
	</div>
{/if}

<div class="h-full w-full" bind:this={editorContainer} />
<p class="mb-4 mt-1" id="status-bar" />
