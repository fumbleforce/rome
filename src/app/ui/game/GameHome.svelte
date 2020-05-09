<script>
  import { game } from "../../stores";
</script>

<h2>Home</h2>

<ul>
  {#each $game.players as userId}
  <li>{userId}</li>
  {/each}
</ul>