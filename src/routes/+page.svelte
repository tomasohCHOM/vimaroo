<script lang="ts">
  import Editor from "$lib/components/editor.svelte";
  import "../globals.css";
</script>

<h1>VIMaestro</h1>

<div class="editor">
  <Editor />
</div>

<style>
  .editor {
    max-width: 1000px;
    height: 400px;
  }
</style>
