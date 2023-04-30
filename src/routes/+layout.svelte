<nav>
	<div>
		<img src="/favicon.svg" alt="logo" width="50px" />
		<h1>Dirik</h1>
	</div>
	<ul>
		<a href="/">Home</a>
		<a href="/about">About</a>
		<a href="/education">Education</a>
		<a href="/profile">Profile</a>
		<a href="/schedule">Schedule</a>
	</ul>
</nav>
<main>
	<div>
		<slot />
	</div>
</main>

<style>
	:root {
		margin: 0;
		padding: 0;
		--bg-color: #0b3954;
		--text-color: #e91e63;
		--longer-text-color: #ffcdd2;
		--accent-color: #ff5722;

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

	nav div {
		display: flex;
		align-items: center;
	}

	nav img {
		margin-right: 10px;
	}

	nav h1 {
		margin: 0;
	}

	nav ul {
		display: flex;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	nav li {
		margin-right: 20px;
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

	/* mobile styles */
	@media (max-width: 600px) {
		nav {
			flex-direction: column;
			padding: 10px;
		}

		nav div {
			margin-bottom: 10px;
		}

		nav ul {
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: var(--bg-color);
			padding: 10px;
			border-radius: 10px;
		}

		nav a {
			margin: 5px;
		}
	}

	main {
		padding: 20px;
		background-color: var(--bg-color);
		color: var(--text-color);

		/*  center the main content  */
		display: flex;
		justify-content: center;
		align-items: center;

		/*  align text to center  */
		text-align: center;
	}
</style>
