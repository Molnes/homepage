<nav>
	<div>
		<img src="/favicon.svg" alt="logo" width="50px" />
		<h1>Dirik</h1>
	</div>
	<ul>
		<a href="/">Home</a>
		<a href="/about">About</a>
		<a href="/education">Education</a>
	</ul>
</nav>

<slot />

<style>
	:root {
		margin: 0;
		padding: 0;
		--bg-color: #0b3954;
		--text-color: #e91e63;
		--longer-text-color: #ffcdd2;

		background-color: var(--bg-color);

		font-family: Roboto, sans-serif;
	}

	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px;
		background-color: var(--bg-color);
		color: var(--text-color);
	}
	nav ul {
		display: flex;
	}

	nav div {
		display: flex;
		align-items: center;
	}
	nav a {
		display: block;
		padding: 10px 20px;
		color: var(--text-color);
		text-decoration: none;
	}

	nav a:hover {
		color: var(--longer-text-color);
	}
</style>
