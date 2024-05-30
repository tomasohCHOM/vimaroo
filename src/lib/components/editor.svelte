<script lang="ts">
  import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
  import { onDestroy, onMount } from "svelte";
  import Spinner from "./spinner.svelte";

  export let initialPrompt: string;
  export let textArray: string[];
  export let stringCondition: string;
  export let joinCharacter: string = "";
  export let updateBuffer: (currentDeletePos: number) => void;
  export let testType: string;
  export let testTypeAmount;

  let editor: Monaco.editor.IStandaloneCodeEditor;
  let editorContainer: HTMLElement;
  let language: string = "html";
  let theme: string = "Nord";
  let monaco: typeof Monaco;

  let vimMode: any;
  let loaded: boolean = false;
  let gameStarted: boolean = false;
  let gameOver: boolean = false;
  let startInterval: number;

  let currentDeletePos: number;
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
      value: initialPrompt,
      language: language,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      lineNumbers: "relative",
      fontFamily: "Fira Code",
      fontSize: 16,
    });
    // Initialize vim mode
    vimMode = imports.initVimMode(
      editor,
      document.getElementById("status-bar")
    );

    loaded = true;
    let startTime: number;
    let timer: number = testTypeAmount;
    let triggeredByEditor = false;

    editor.focus();

    editor.getModel()?.onDidChangeContent(() => {
      // Prompt message is displayed, start the game now
      if (!gameOver && !gameStarted) {
        gameStarted = true;
        startTime = performance.now();
        if (testType === "time") {
          timer = testTypeAmount;
          startInterval = setInterval(() => {
            timer -= 1;
            if (timer === 0) {
              editor.setValue("");
            }
          }, 1000);
        }
        updateBuffer(currentDeletePos);
        triggeredByEditor = true;
        editor.setValue(textArray.join(joinCharacter));
        return;
      }
      // If changes were triggered by the editor, ignore
      if (triggeredByEditor) {
        triggeredByEditor = false;
        return;
      }

      // Game is over and user wants to play again
      if (gameOver && !editor.getValue().includes("Want to play again?")) {
        gameOver = false;
        gameStarted = false;
        timer = testTypeAmount;
        (score = 0), (total = 0);
        startTime = performance.now();
        updateBuffer(currentDeletePos);
        triggeredByEditor = true;
        editor.setValue(textArray.join(joinCharacter));
        return;
      }

      if (gameOver) {
        return;
      }

      // If the user has changed the buffer, count it as a miss
      if (
        editor.getValue().includes(stringCondition) &&
        editor.getValue().length !== textArray.join(joinCharacter).length
      ) {
        total++;
        updateBuffer(currentDeletePos);
        triggeredByEditor = true;
        editor.setValue(textArray.join(joinCharacter));
        // Otherwise, the editor changed itself automatically
        return;
      }

      score++, total++;
      // The user has reached the end of the test
      // Case 1: test is type = "time"
      if (testType === "time" && timer <= 0) {
        gameOver = true;
        clearInterval(startInterval);
        const accuracy = ((score / total) * 100).toFixed(2);

        const scoreSummary = `Your score is ${score}/${total} for the ${testTypeAmount} seconds test`;
        const accuracySummary = `Your accuracy was ${accuracy}%`;
        const playAgainPrompt = `Want to play again? [Delete this line]`;

        triggeredByEditor = true;
        editor.setValue(
          `${scoreSummary}\n${accuracySummary}\n${playAgainPrompt}`
        );
        return;
      }

      // Case 2: test is type = "amount"
      if (testType === "amount" && total >= testTypeAmount) {
        gameOver = true;
        clearInterval(startInterval);
        const endTime = performance.now();
        const totalTime = ((endTime - startTime) / 1000).toFixed(2);
        const accuracy = ((score / total) * 100).toFixed(2);

        const scoreSummary = `Your score is ${score}/${total}`;
        const accuracySummary = `Your accuracy was ${accuracy}%`;
        const timeSummary = `Total time = ${totalTime} seconds`;
        const playAgainPrompt = `Want to play again? [Delete this line]`;

        triggeredByEditor = true;
        editor.setValue(
          `${scoreSummary}\n${timeSummary}\n${accuracySummary}\n${playAgainPrompt}`
        );
        return;
      }

      // Update buffer and set it as the new editor value
      updateBuffer(currentDeletePos);
      triggeredByEditor = true;
      editor.setValue(textArray.join(joinCharacter ?? ""));
    });
  });

  onDestroy(() => {
    monaco?.editor.getModels().forEach((model) => model.dispose());
    if (vimMode) vimMode.dispose();
    clearInterval(startInterval);
    editor?.dispose();
  });
</script>

{#if !loaded}
  <div class="grid justify-center">
    <Spinner />
  </div>
{/if}

<div class="w-full h-full" bind:this={editorContainer} />
<p class="mt-1 mb-4" id="status-bar" />
