<script lang="ts">
	import { enhance } from '$app/forms';

	import type { PageData } from './$types';

	export let data: PageData;

	/* remove the last trhe characters of data.Courses.dtstart and data.Courses.dtend*/
	data.Courses.forEach((course) => {
		course.dtstart = course.dtstart.slice(0, -3);
		course.dtend = course.dtend.slice(0, -3);
	});

	/* sort data.Courses. by the data.Courses.dtstart */
	data.Courses.sort((a, b) => {
		return Date.parse(a.dtstart) - Date.parse(b.dtstart);
	});

	/* remove events where the dtend has passed */
	data.Courses = data.Courses.filter((course) => {
		return Date.parse(course.dtend) > Date.now();
	});

	function parseTime(time: Date) {
		const hours = time.getHours();
		const minutes = time.getMinutes();
		if (hours < 10 && minutes < 10) {
			return `0${hours}:0${minutes}`;
		} else if (hours < 10) {
			return `0${hours}:${minutes}`;
		} else if (minutes < 10) {
			return `${hours}:0${minutes}`;
		} else {
			return `${hours}:${minutes}`;
		}
	}

	function parseWeekDay(day: number) {
		switch (day) {
			case 0:
				return 'Monday';
			case 1:
				return 'Tuesday';
			case 2:
				return 'Wednesday';
			case 3:
				return 'Thursday';
			case 4:
				return 'Friday';
			case 5:
				return 'Saturday';
			case 6:
				return 'Sunday';

			default:
				return 'Error';
		}
	}
</script>

<h1>Schedule for {data.user.username}</h1>
<div>
	{#if data.user.courses.length == 0}
		<p>You have no courses in your schedule</p>
		<p>Add some here on your <a href="/profile">profile</a></p>
	{:else}
		{#each data.Courses as courses}
			<div class="card">
				<div class="header">
					<h3>{courses.courseid}</h3>
					<p>{courses.summary}</p>
				</div>
				<div class="body">
					<p><strong>Weekday:</strong> {parseWeekDay(courses.weekday)}</p>
					<p>
						<strong>Time:</strong>
						{parseTime(new Date(courses.dtstart))} - {parseTime(new Date(courses.dtend))}
					</p>

					<p>
						<strong>Location:</strong>
						<a href={courses.room[0].roomurl}>{courses.room[0].roomname} </a>
					</p>
					<p>
						{#if courses.staffs == undefined}
							<strong>Instructor:</strong>
							TBA
						{:else if courses.staffs.length > 1}
							<strong>Instructors:</strong>
							{#each courses.staffs as staff}
								{staff.firstname} {staff.lastname}
							{/each}
						{:else}
							<strong>Instructor:</strong>
							{courses.staffs[0].firstname}
							{courses.staffs[0].lastname}
						{/if}
					</p>
				</div>
			</div>
		{/each}
	{/if}
</div>

<style>
	.card {
		background-color: white;
		border: 1px solid #ddd;
		border-radius: 4px;
		box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
		margin: 10px;
		overflow: hidden;
		width: 300px;
	}

	.header {
		background-color: #f5f5f5;
		padding: 10px;
	}

	.header h3 {
		margin: 0;
	}

	.body {
		padding: 10px;
	}

	.body p {
		margin: 5px 0;
	}

	.body strong {
		margin-right: 5px;
	}

	@media (max-width: 767px) {
		.card {
			width: 100%;
		}
	}
</style>
