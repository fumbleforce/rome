<script>
  import { gamePage } from "../../stores";

  export let name;
  export let page;

  function changePage () {
    $gamePage = page;
  }
</script>

<style>
  button {
    margin-right: 0.5rem;
  }

  button.active {
    @apply text-white bg-teal-700;
  }
</style>

<button class:active={page === $gamePage} class="game-nav-button" on:click={changePage}>
  {name}
</button>