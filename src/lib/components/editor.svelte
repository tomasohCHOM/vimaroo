<script lang="ts">
  import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
  import { onDestroy, onMount } from "svelte";
  import Spinner from "./spinner.svelte";

  export let initialPrompt: string;
  export let textArray: string[];
  export let characterCondition: string;
  export let updateArray: (currentDeletePos: number) => void;

  let editor: Monaco.editor.IStandaloneCodeEditor;
  let editorContainer: HTMLElement;
  let language: string = "html";
  let theme: string = "Nord";
  let monaco: typeof Monaco;

  let vimMode: any;
  let loaded: boolean = false;
  let gameStarted: boolean = false;
  let gameOver: boolean = false;

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

    editor.focus();

    editor.getModel()?.onDidChangeContent(() => {
      if (!gameStarted) {
        gameStarted = true;
        startTime = performance.now();
        updateArray(currentDeletePos);
        editor.setValue(textArray.join(""));
        return;
      }
      if (gameOver && !editor.getValue().includes("Want to play again?")) {
        gameOver = false;
        score = 0;
        startTime = performance.now();
        updateArray(currentDeletePos);
        editor.setValue(textArray.join(""));
        return;
      }
      if (score >= 5) {
        return;
      }
      if (editor.getValue().includes(characterCondition)) {
        return;
      }
      score++, total++;
      if (score >= 5) {
        gameOver = true;
        let endTime = performance.now();
        let totalTime = ((endTime - startTime) / 1000).toFixed(2);
        const scoreSummary = `Congrats! Your score is ${score}/${total}`;
        const timeSummary = `Total time = ${totalTime} seconds`;
        const playAgainPrompt = `Want to play again? [Delete this line]`;
        editor.setValue(`${scoreSummary}\n${timeSummary}\n${playAgainPrompt}`);
        return;
      }
      updateArray(currentDeletePos);
      editor.setValue(textArray.join(""));
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

<div class="w-full h-full" bind:this={editorContainer} />
<p class="mt-1 mb-4" id="status-bar" />
