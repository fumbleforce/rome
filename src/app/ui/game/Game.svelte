<script>
  import { game, gamePage } from "../../stores";
  import GameBar from "./GameBar.svelte";
  import GameHome from "./GameHome.svelte";
  import GameSenate from "./GameSenate.svelte";

  const pages = {
    home: GameHome,
    senate: GameSenate,
  };

  $: pageComponent = pages[$gamePage];
</script>

<style>
  main {
    padding: 1rem;
  }
</style>

{#if $game}
<div class="">
  <GameBar />

  <main>
    <svelte:component this={pageComponent} />
  </main>
</div>
{:else}
Loading game
{/if}