<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;

	console.log(data.user);
</script>

<h1>Profile</h1>
<div>
	<form action="?/logout" method="post" use:enhance>
		<button> Logout </button>
	</form>
	<p>User id: {data.user.userId}</p>
	<p>Username: {data.user.username}</p>
	<h4>List of courses</h4>
	{#each data.user.courses as course}
		<div class="courseCard">
			<p>{course.id}</p>
			<form action="?/removeCourse" method="post" use:enhance>
				<button>
					Remove
					<input type="hidden" name="courseId" value={course.id} />
				</button>
			</form>
		</div>
	{/each}
</div>

<div>
	<h2>Add Course to list</h2>
	<form method="post" use:enhance action="?/addCourse">
		<label
			>course:
			<input type="text" name="courseId" id="courseId" />
		</label>
	</form>
</div>

<style>
	.courseCard {
		display: flex;
		justify-content: space-between;
	}

	.courseCard button {
		background-color: var(--accent-color);
		color: white;
		border: none;
		border-radius: 5px;
		padding: 5px;
		margin-top: 25%;
	}
</style>
