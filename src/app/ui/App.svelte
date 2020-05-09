<script>
  import GlobalCSS from "./GlobalCSS.svelte";
  import Index from "./Index.svelte";
  import Game from "./game/Game.svelte";
  import Lobby from "./lobby/Lobby.svelte";

  import { user, game } from "../stores";
</script>

<GlobalCSS />

{#if !$user}
  <Index />
{:else if !$game}
  <Lobby />
{:else}
  <Game />
{/if}
