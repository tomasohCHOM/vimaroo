<script lang="ts">
	import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
	import { onDestroy, onMount } from "svelte";
	import Spinner from "./spinner.svelte";
	import type { Test } from "$lib/types/test";
	import { timer } from "$lib/stores/test/timer";
	import { testCancelled, testOver, testStarted } from "$lib/stores/test/status";
	import { scores } from "$lib/stores/test/scores";
	import { rounds } from "$lib/stores/test/rounds";
	import { editorTheme } from "$lib/editor/theme";
	import { BEGIN_TEST_LINE } from "$lib/test/constants";
	import { incrementTestsStarted, updateStats } from "$lib/db/update";
	import { ASCII_LOGO } from "$lib/editor/ascii";
	import type { Session } from "@supabase/supabase-js";
	import {
		fontSizeOptions,
		enableAsciiLogoOptions,
		enableWordWrapOptions,
		fontSize,
		wordWrapEnabled,
		asciiLogoEnabled
	} from "$lib/stores/settings/settings";

	export let session: Session | null;

	export let test: Test;
	export let testMode: string;
	export let testType: string;
	export let testTypeAmount: number;

	let editor: Monaco.editor.IStandaloneCodeEditor;
	let editorContainer: HTMLElement;
	let monaco: typeof Monaco;

	let asciiLogo = enableAsciiLogoOptions[$asciiLogoEnabled] === "Yes" ? ASCII_LOGO : "";
	let vimMode: any;
	let loaded: boolean = false;

	onMount(async () => {
		// Import monaco code editor
		const imports = (await import("$lib/editor/monaco")).default;
		monaco = imports.monaco;

		// Import editor theme
		monaco.editor.defineTheme("Theme", editorTheme);

		// Set editor creation event to set theme
		monaco.editor.onDidCreateEditor((_) => {
			monaco.editor.setTheme("Theme");
		});

		// Create editor & model to be displayed
		const editor = monaco.editor.create(editorContainer, {
			value: [test.prompt, test.tip, BEGIN_TEST_LINE, asciiLogo].join("\n"),
			minimap: { enabled: false },
			scrollBeyondLastLine: false,
			automaticLayout: true,
			lineNumbers: "relative",
			fontFamily: "Fira Code",
			fontSize: fontSizeOptions[$fontSize],
			wordWrap: enableWordWrapOptions[$wordWrapEnabled] === "Yes" ? "on" : "off",
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

		editor.getModel()?.onDidChangeContent(async () => {
			// User decides to end the test early
			imports.VimMode.Vim.defineEx("quit", "q", async () => {
				if (!$testStarted) return;
				timer.clear();
				testCancelled.set(true);
				testOver.set(true);
				triggeredByEditor = true;

				editor.setValue(`Test cancelled!\n${BEGIN_TEST_LINE}\n${asciiLogo}`);
				if (session) await incrementTestsStarted();
			});

			// Helper function for updating the editor contents via the
			// test object updateBuffer() method
			const updateEditorContents = () => {
				test.updateBuffer();
				triggeredByEditor = true;
				editor.setValue(test.textBuffer.join(test.joinCharacter));
			};

			// Prompt message is displayed, start the test now
			if (!$testOver && !$testStarted) {
				if (editor.getValue().includes(BEGIN_TEST_LINE)) return;

				$testStarted = true;
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

			// Test is over and user wants to play again
			if ($testOver && !editor.getValue().includes(BEGIN_TEST_LINE)) {
				$testOver = false;
				$testStarted = false;
				timer.setInitivalValue(testTypeAmount);
				rounds.setRounds(testTypeAmount);
				scores.reset();
				startTime = performance.now();
				updateEditorContents();
				return;
			}

			if ($testOver) {
				return;
			}

			let [score, total] = $scores;

			// The user has reached the end of the test
			// Case 1: test is type = "time"
			if (testType === "time" && $timer <= 0) {
				$testOver = true;
				const accuracy = !total ? "-.-" : ((score / total) * 100).toFixed(2);

				const scoreSummary = `Your score is ${score}/${total} for the ${testTypeAmount} seconds test`;
				const accuracySummary = `Your accuracy was ${accuracy}%`;

				triggeredByEditor = true;
				editor.setValue(`${scoreSummary}\n${accuracySummary}\n${BEGIN_TEST_LINE}\n${asciiLogo}`);
				if (session) await updateStats(testMode, score, total, testTypeAmount);
				return;
			}

			// Check if we count it as a success or failure
			// In either case, increment the total count
			if (test.condition(editor.getValue())) {
				scores.incrementScore();
			}
			scores.incrementTotal();

			rounds.updateRounds();

			[score, total] = $scores;

			// Case 2: test is type = "rounds"
			if (testType === "rounds" && total >= testTypeAmount) {
				$testOver = true;
				const endTime = performance.now();
				const totalTime = ((endTime - startTime) / 1000).toFixed(2);
				const accuracy = ((score / total) * 100).toFixed(2);

				const scoreSummary = `Your score is ${score}/${total}`;
				const accuracySummary = `Your accuracy was ${accuracy}%`;
				const timeSummary = `Total time = ${totalTime} seconds`;

				triggeredByEditor = true;
				editor.setValue(
					`${scoreSummary}\n${timeSummary}\n${accuracySummary}\n${BEGIN_TEST_LINE}\n${ASCII_LOGO}`
				);
				if (session) await updateStats(testMode, score, total, parseFloat(totalTime));
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
<div class="flex flex-col md:flex-row md:items-center md:justify-between">
	<p
		class="mb-4 mt-1 max-w-max rounded-lg bg-background-400 px-2 text-foreground-blue"
		id="status-bar"
	></p>
	<p class="text-sm">Tip: You can reset tests by using :q</p>
</div>
