<script>
  export let errors;
</script>

<style>
  ul {
    @apply mt-2 mb-2;
  }
  ul li {
    @apply p-2 text-red-800;
  }
</style>

{#if errors}
  <ul class="error-messages">
    {#each Object.keys(errors) as key}
      <li>{" "} {errors[key]}</li>
    {/each}
  </ul>
{/if}