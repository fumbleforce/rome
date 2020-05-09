<script>
	import Login from "./login/Login.svelte";
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

	<h1>Dignitas</h1>
	<p>
		This is a game about politics, intreague, wealth building and power.
	</p>

	<p>
		<Login />
	</p>
</div>
