<script lang="ts">
  import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
  import { onDestroy, onMount } from "svelte";
  import Spinner from "./spinner.svelte";

  export let initalPrompt: string;

  let editor: Monaco.editor.IStandaloneCodeEditor;
  let editorContainer: HTMLElement;
  let language: string = "html";
  let theme: string = "Nord";
  let monaco: typeof Monaco;

  let vimMode: any;
  let loaded: boolean = false;
  let gameStarted: boolean = false;
  let gameOver: boolean = false;

  const textArray = new Array(10).fill("\n");
  let currentDeletePos: number;
  let currentScore = 0;

  function updateArray() {
    const previousDeletePos = currentDeletePos ?? 0;
    currentDeletePos = Math.round(Math.random() * textArray.length);
    textArray[previousDeletePos] = "\n";
    textArray[currentDeletePos] = "DELETE_ME";
    return textArray;
  }

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
      value: initalPrompt,
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

    editor.getModel()?.onDidChangeContent(() => {
      if (!gameStarted) {
        gameStarted = true;
        startTime = performance.now();
        updateArray();
        editor.setValue(textArray.join(""));
        return;
      }
      if (gameOver && !editor.getValue().includes("Want to play again?")) {
        gameOver = false;
        currentScore = 0;
        startTime = performance.now();
        updateArray();
        editor.setValue(textArray.join(""));
        return;
      }
      if (editor.getValue().includes("_") || currentScore >= 5) {
        return;
      }
      currentScore++;
      if (currentScore >= 5) {
        gameOver = true;
        let endTime = performance.now();
        let totalTime = ((endTime - startTime) / 1000).toFixed(2);
        editor.setValue(
          `Congrats! Your score is ${currentScore}/5\nTotal time = ${totalTime} seconds\nWant to play again? [Delete this line]`
        );
        return;
      }
      updateArray();
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
