<script>
  import { leaveGame } from "../../games";
  import { game } from "../../stores";
  import BarButton from "./BarButton.svelte";

  async function onLeaveGame () {
    await leaveGame($game.id);
  }

</script>

<style>
  nav {
    padding: 1rem;
    background: rgba(0, 0, 0, 0.1);
  }

  .leave {
    float: right;
  }
</style>

<nav>
  <BarButton
    name="Home"
    page="home"
  />
  <BarButton
    name="Senate"
    page="senate"
  />

  <button class="leave" on:click={onLeaveGame}>
    Leave game
  </button>
</nav>