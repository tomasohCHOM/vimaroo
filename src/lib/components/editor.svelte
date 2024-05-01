<script lang="ts">
  export let language: string = "python";
  export let theme: string = "Monokai";
  const themes: string[] = ["Monokai"];

  import { onDestroy, onMount } from "svelte";

  // Monaco deps and declarations
  import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
  let editor: Monaco.editor.IStandaloneCodeEditor;
  let monaco: typeof Monaco;
  let editorContainer: HTMLElement;
  // let vimMode: any;

  onMount(async () => {
    // Import monaco code editor
    const imports = (await import("$lib/monaco")).default;
    monaco = imports.monaco;
    // Import all themes stored in static/themes
    for (let i = 0; i < themes.length; i++) {
      const theme_ = themes[i];
      await fetch(`/themes/${theme_}.json`)
        .then((response) => response.json())
        .then((data) => {
          monaco.editor.defineTheme(theme_, data);
        });
    }
    if (!theme || !themes.includes(theme)) {
      theme = themes[0];
    }
    // Set editor creation event to set theme
    monaco.editor.onDidCreateEditor((_) => {
      monaco.editor.setTheme(theme);
    });
    // Create editor & model to be displayed
    const editor = monaco.editor.create(editorContainer);
    const model = monaco.editor.createModel('print("Hello, World!")', language);
    editor.setModel(model);
    // Initialize vim mode
    // vimMode = imports.initVimMode(editor, document.getElementById("status-bar")); // UNCOMMENT ME FOR VIM
    // Focus
    editor.focus();
  });

  onDestroy(() => {
    monaco?.editor.getModels().forEach((model) => model.dispose());
    //if (vimMode) vimMode.dispose(); // UNCOMMENT ME FOR VIM
    editor?.dispose();
  });
</script>

<div class="editor" bind:this={editorContainer} />
<p id="status-bar" />

<style>
  .editor {
    width: 100%;
    height: 100%;
  }
</style>
