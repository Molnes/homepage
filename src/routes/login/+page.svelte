<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div class="signupForm">
	<h1>Sign in</h1>
	<form method="POST" use:enhance>
		<label for="username">Username</label><br />
		<input id="username" name="username" /><br />
		<label for="password">Password</label><br />
		<input type="password" id="password" name="password" /><br />
		<input type="submit" value="Continue" />
	</form>
	<p>
		Don't have an account? <a href="/signup">Sign up</a>
	</p>
</div>

<style>
	.signupForm {
		margin: 0 auto;
		max-width: 400px;
		padding: 20px;
		background-color: #c05746;
		border-radius: 10px;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
	}

	form {
		display: flex;
		flex-direction: column;
	}

	label {
		font-size: 16px;
		color: var(--Primary);
		margin-bottom: 5px;
		font-weight: bold;
	}

	input {
		padding: 10px;
		border-radius: 5px;
		border: none;
		margin-bottom: 20px;
		background-color: var(--Primary);
		color: var(--Secondary);
		font-size: 16px;
	}

	input[type='submit'] {
		background-color: var(--Primary-Button);
		color: var(--Secondary);
		font-weight: bold;
		cursor: pointer;
		transition: all 0.3s ease-in-out;
	}

	input[type='submit']:hover {
		background-color: var(--Accent);
	}

	p {
		margin-top: 20px;
		font-size: 14px;
		color: var(--Secondary);
	}

	a {
		color: var(--Accent);
		text-decoration: none;
		font-weight: bold;
	}
</style>
