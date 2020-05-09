<script>
  import { onMount } from "svelte";
  import { getGames, startGame } from "../../games";
  import LobbyGameItem from "./LobbyGameItem.svelte";

  let games = [];

  onMount(async () => {
    games = await getGames();
  });

  async function onStartGame () {
    try {
      await startGame();
    } catch (e) {
      console.error(e);
    }

  }
</script>

<style>
  ul {
    @apply shadow bg-white mb-4;
  }
</style>

<div class="container mx-auto mt-24">
  <h1>Lobby</h1>

  <ul class="list">
    {#each games as game}
      <LobbyGameItem game={game} />
    {/each}
  </ul>

  <button on:click={onStartGame}>
    New game
  </button>
</div>