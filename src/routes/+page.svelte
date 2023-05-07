<div class="home">
	<h1>Jakob Holkestad Molnes</h1>
	<h3>Student, programmer, gamer</h3>
	<a href="/about">about</a>
</div>

<style>
	.home > a {
		background-color: var(--Primary-Button);
		border: none;
		border-radius: 5px;
		padding: 10px 20px;
		margin: 10px 0;
		color: var(--text-color);
		font-size: 1.2rem;
		font-weight: bold;
		cursor: pointer;
	}
	.home > a:hover {
		background-color: var(--Accent);
	}
	.home > a {
		color: var(--Secondary);
		text-decoration: none;
	}

	/* animate on page load 
        fade in from top to bottom
    */
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	.home {
		animation: fadeIn 1s ease-in-out;
	}
</style>
