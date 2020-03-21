<script>
	import Login from "./Login.svelte";
	import { session } from "../stores";
</script>


<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		margin: 14px 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 200px;
		@apply mx-auto;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<div class="container mx-auto mt-24">
	<figure class="my-8">
		<img alt='Cicero' src='cicero.png'>
	</figure>

	<h1>Rome Simulator 20</h1>
	<p>
		This is a game about politics, intreague, wealth building and power.
	</p>

	<p>
		{#if $session.user}
		<h2>Welcome {$session.user.email}</h2>
		{:else}
		<Login />
		{/if}
	</p>
</div>
