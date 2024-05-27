<script lang="ts">
  import "../globals.css";
</script>

<svelte:head>
  <title>Vimaroo | Practice your VIM skills</title>
</svelte:head>

<nav class="px-4 md:px-14">
  <h1 class="font-bold text-3xl">vimaroo</h1>
</nav>

<slot />

<footer class="flex px-4 md:px-14 items-center justify-between text-sm">
  <div>
    Developed with 🔥 by
    <a href="https://github.com/tomasohCHOM" target="_blank" class="underline">
      Chom
    </a>
    <span class="font-semibold">@ 2024</span>
  </div>
  <div>
    <a
      href="https://github.com/tomasohCHOM/vimaroo"
      class="underline"
      target="_blank"
    >
      GitHub
    </a>
  </div>
</footer>
