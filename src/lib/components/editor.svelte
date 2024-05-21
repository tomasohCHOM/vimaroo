<script lang="ts">
  import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
  import { onDestroy, onMount } from "svelte";

  export let language: string = "html";
  export let theme: string = "Nord";

  let editor: Monaco.editor.IStandaloneCodeEditor;
  let monaco: typeof Monaco;
  let editorContainer: HTMLElement;
  let vimMode: any;

  function generateRandomArray() {
    let textArray = new Array(10).fill("\n");
    textArray[Math.round(Math.random() * textArray.length)] = "DELETE_ME";
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

    // Create editor & model to be displayed
    const editor = monaco.editor.create(editorContainer, {
      value: generateRandomArray().join(""),
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

    editor.getModel()?.onDidChangeContent(() => {
      console.log(editor.getValue());
      editor.setValue(generateRandomArray().join(""));
    });
  });

  onDestroy(() => {
    monaco?.editor.getModels().forEach((model) => model.dispose());
    if (vimMode) vimMode.dispose();
    editor?.dispose();
  });
</script>

<div class="w-full h-full" bind:this={editorContainer} />
<p class="mt-1 mb-4" id="status-bar" />
