<script lang="ts">
	import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
	import { onDestroy, onMount } from "svelte";
	import Spinner from "./spinner.svelte";
	import type { Test } from "$lib/types";
	import { timer } from "$lib/test/stores/timer";
	import { gameOver, gameStarted } from "$lib/test/stores/status";
	import { scores } from "$lib/test/stores/scores";
	import { rounds } from "$lib/test/stores/rounds";
	import { theme } from "$lib/editor/theme";
	import { BEGIN_TEST_LINE } from "$lib/test/constants";

	export let test: Test;
	export let testType: string;
	export let testTypeAmount: number;

	let editor: Monaco.editor.IStandaloneCodeEditor;
	let editorContainer: HTMLElement;
	let monaco: typeof Monaco;

	let vimMode: any;
	let loaded: boolean = false;

	let score = 0;
	let total = 0;

	onMount(async () => {
		// Import monaco code editor
		const imports = (await import("$lib/editor/monaco")).default;
		monaco = imports.monaco;

		// Import editor theme
		monaco.editor.defineTheme("Theme", theme);

		// Set editor creation event to set theme
		monaco.editor.onDidCreateEditor((_) => {
			monaco.editor.setTheme("Theme");
		});

		// Create editor & model to be displayed
		const editor = monaco.editor.create(editorContainer, {
			value: [test.prompt, test.tip, BEGIN_TEST_LINE].join("\n"),
			minimap: { enabled: false },
			scrollBeyondLastLine: false,
			automaticLayout: true,
			wordWrap: "on",
			lineNumbers: "relative",
			fontFamily: "Fira Code",
			fontSize: 16,
			padding: {
				top: 12
			},
			find: {
				addExtraSpaceOnTop: false,
				autoFindInSelection: "never",
				seedSearchStringFromSelection: "never"
			},
			unicodeHighlight: {
				ambiguousCharacters: false
			}
		});
		// Initialize vim mode
		vimMode = imports.initVimMode(editor, document.getElementById("status-bar"));
		// Placeholder for :q
		imports.VimMode.Vim.defineEx("quit", "q", () => {
			return;
		});

		loaded = true;
		let startTime: number;
		let triggeredByEditor = false;

		timer.setInitivalValue(testTypeAmount);
		rounds.setRounds(testTypeAmount);

		editor.focus();

		editor.getModel()?.onDidChangeContent(() => {
			// User decides to end the test early
			imports.VimMode.Vim.defineEx("quit", "q", () => {
				if (!$gameStarted) return;
				timer.clear();
				gameOver.set(true);
				triggeredByEditor = true;
				editor.setValue(`Test cancelled!\n${BEGIN_TEST_LINE}`);
			});

			// Helper function for updating the editor contents via the
			// test object updateBuffer() method
			const updateEditorContents = () => {
				test.updateBuffer();
				triggeredByEditor = true;
				editor.setValue(test.textBuffer.join(test.joinCharacter));
			};

			// Prompt message is displayed, start the game now
			if (!$gameOver && !$gameStarted) {
				if (editor.getValue().includes(BEGIN_TEST_LINE)) return;

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
			if ($gameOver && !editor.getValue().includes(BEGIN_TEST_LINE)) {
				$gameOver = false;
				$gameStarted = false;
				timer.setInitivalValue(testTypeAmount);
				rounds.setRounds(testTypeAmount);
				(score = 0), (total = 0);
				scores.reset();
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

				triggeredByEditor = true;
				editor.setValue(`${scoreSummary}\n${accuracySummary}\n${BEGIN_TEST_LINE}`);
				return;
			}

			// Check if we count it as a success or failure
			// In either case, increment the total count
			if (test.condition(editor.getValue())) {
				score++;
			}
			total++;

			scores.set([score, total]);
			rounds.updateRounds();

			// Case 2: test is type = "rounds"
			if (testType === "rounds" && total >= testTypeAmount) {
				$gameOver = true;
				const endTime = performance.now();
				const totalTime = ((endTime - startTime) / 1000).toFixed(2);
				const accuracy = ((score / total) * 100).toFixed(2);

				const scoreSummary = `Your score is ${score}/${total}`;
				const accuracySummary = `Your accuracy was ${accuracy}%`;
				const timeSummary = `Total time = ${totalTime} seconds`;

				triggeredByEditor = true;
				editor.setValue(`${scoreSummary}\n${timeSummary}\n${accuracySummary}\n${BEGIN_TEST_LINE}`);
				return;
			}

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
<div class="flex items-center justify-between">
	<p
		class="mb-4 mt-1 max-w-max rounded-lg bg-background-400 px-2 text-foreground-blue"
		id="status-bar"
	></p>
	<p class="text-sm">Tip: You can reset tests by using :q</p>
</div>
