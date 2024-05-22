<script lang="ts">
  import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
  import { onDestroy, onMount } from "svelte";
  import Spinner from "./spinner.svelte";
  import { text } from "@sveltejs/kit";

  export let language: string = "html";
  export let theme: string = "Nord";

  let editor: Monaco.editor.IStandaloneCodeEditor;
  let monaco: typeof Monaco;
  let editorContainer: HTMLElement;
  let vimMode: any;

  const textArray = new Array(10).fill("\n");
  let currentDeletePos: number;
  let loaded: boolean = false;

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
    const res = await fetch(`src/lib/${theme}.json`);
    const data = await res.json();
    monaco.editor.defineTheme(theme, data);

    // Set editor creation event to set theme
    monaco.editor.onDidCreateEditor((_) => {
      monaco.editor.setTheme(theme);
    });

    updateArray();
    console.log(textArray);

    // Create editor & model to be displayed
    const editor = monaco.editor.create(editorContainer, {
      value: textArray.join(""),
      language: language,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      lineNumbers: "relative",
    });
    // Initialize vim mode
    vimMode = imports.initVimMode(
      editor,
      document.getElementById("status-bar")
    );

    loaded = true;

    editor.getModel()?.onDidChangeContent(() => {
      if (editor.getValue().includes("_")) return;
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
