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

		--Primary: #ffffff;
		--Secondary: #1f2041;
		--Primary-Button: #ffc857;
		--Secondary-Button: #4b3f72;
		--Accent: #ffc857;

		background-color: var(--Secondary);

		font-family: Roboto, sans-serif;
	}

	/* get the clients prefferred light mode */
	@media (prefers-color-scheme: light) {
		:root {
			--Primary: #383838;
			--Secondary: #f4f4f4;
			--Primary-Button: #c0b283;
			--Secondary-Button: #ddd1c1;
			--Accent: #b2a792;

			background-color: var(--Secondary);
		}
	}

	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px;
		background-color: var(--Secondary);
		color: var(--Primary);
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
		color: var(--Primary);
		text-decoration: none;
	}

	nav a:hover {
		color: var(--Accent);
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
			background-color: var(--Secondary);
			padding: 10px;
			border-radius: 10px;
		}

		nav a {
			margin: 5px;
		}
	}

	main {
		padding: 20px;
		background-color: var(--Secondary);
		color: var(--Primary);

		/*  center the main content  */
		display: flex;
		justify-content: center;
		align-items: center;

		/*  align text to center  */
		text-align: center;
	}
</style>
