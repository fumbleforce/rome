<script>
	import Login from "./login/Login.svelte";
</script>


<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		margin: 1rem 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 200px;
		@apply mx-auto;
	}

	cite {
		margin: 1rem 0;
		text-align: center;
		display: block;
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

	<cite>
		"If you must break the law, do it to seize power: in all other cases observe it."<br>
		- Julius Caesar
	</cite>

	<p>
		<Login />
	</p>
</div>
