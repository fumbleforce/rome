<script>
  import { joinGame } from "../../games";
  
  export let game;

  function onJoinGame () {
    joinGame(game._id);
  }
</script>

<style>
  li {
    @apply p-4;
  }
</style>

<li>
  <time>{game.createdAt}</time>
  <span>{game.players.length} players</span>
  <button on:click={onJoinGame}>Join</button>
</li>