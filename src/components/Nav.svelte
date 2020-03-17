<script>
	import { stores } from '@sapper/app';

	const { page, session } = stores();

	export let segment;
</script>


<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<nav>
	<ul>
		<li><a aria-current='{segment === undefined ? "page" : undefined}' href='.'>home</a></li>
		<li><a aria-current='{segment === "about" ? "page" : undefined}' href='about'>about</a></li>

		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<li><a rel=prefetch aria-current='{segment === "blog" ? "page" : undefined}' href='blog'>blog</a></li>

		{#if $session.user}
			<li class="nav-item">
				<a rel='prefetch' href="/editor" class="nav-link" class:active="{$page.path === '/editor'}">
					<i class="ion-compose"></i>&nbsp;New Post
				</a>
			</li>

			<li class="nav-item">
				<a rel='prefetch' href="/settings" class="nav-link" class:active="{$page.path === '/settings'}">
					<i class="ion-gear-a"></i>&nbsp;Settings
				</a>
			</li>

			<li class="nav-item">
				<a rel='prefetch' href='/profile/@{$session.user.username}' class="nav-link">
					<!-- <img src={$user.image} class="user-pic" alt={$user.username}> -->
					{$session.user.username}
				</a>
			</li>
		{:else}
			<li class="nav-item">
				<a rel='prefetch' href="/login" class="nav-link" class:active="{$page.path === '/login'}">
					Sign in
				</a>
			</li>

			<li class="nav-item">
				<a rel='prefetch' href="/register" class="nav-link" class:active="{$page.path === '/register'}">
					Sign up
				</a>
			</li>
		{/if}
	</ul>
</nav>
