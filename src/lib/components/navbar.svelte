<script lang="ts">
  import Icon from "@iconify/svelte";

  export let isLoginOpen: boolean;
</script>

<nav class="flex items-center justify-between px-4 md:px-14">
  <h1 class="font-bold text-3xl">vimaroo</h1>
  <div class="flex gap-1 items-center justify-center">
    <button>
      <Icon icon="mdi:about-circle-outline" width={24} />
    </button>
    <button on:click={() => (isLoginOpen = true)}>
      <Icon icon="mdi:settings" width={24} />
    </button>
    <button on:click={() => (isLoginOpen = true)}>
      <Icon icon="mdi:user-outline" width={24} />
    </button>
  </div>
</nav>
