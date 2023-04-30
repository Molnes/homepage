<script lang="ts">
	import { enhance } from '$app/forms';

	import type { PageData } from './$types';

	export let data: PageData;

	import { writable, derived } from 'svelte/store';

	export const term = writable('');
	export const items = writable(data.availableCourses.data);
	export const filtered = derived([term, items], ([$term, $items]) => {
		if ($term.length < 2) return [];
		// filter the items by id and name, and only return 10 items
		let filtered = $items
			.filter((item) => {
				return (
					item.id.toLowerCase().includes($term.toLowerCase()) ||
					item.name.toLowerCase().includes($term.toLowerCase())
				);
			})
			.slice(0, 10);

		//remove courses that are already in the user's list
		filtered = filtered.filter((item) => {
			return !data.user.courses.some((course) => {
				return course.id === item.id;
			});
		});

		return filtered;
	});

	let val = '';
	$: term.set(val);
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
	<h3>Course list</h3>
	<div>
		<!-- searchable list -->
		<label for="searchInput">Search</label>
		<input
			type="text"
			id="searchInput"
			bind:value={val}
			on:input={() => term.set(val)}
			placeholder={`\"IDATA2302\" or \"Data Science\"`}
		/>
		<ul id="courseList">
			{#each $filtered as course}
				<li>
					<div class="courseCard">
						<p>{course.id} - {course.name}</p>
						<form action="?/addCourse" method="post" use:enhance>
							<button>
								Add
								<input type="hidden" name="courseId" value={course.id} />
							</button>
						</form>
					</div>
				</li>
			{/each}
		</ul>
	</div>
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
	#searchInput {
		width: 100%;
		padding: 12px 20px;
		margin: 8px 0;
		box-sizing: border-box;
	}
</style>
