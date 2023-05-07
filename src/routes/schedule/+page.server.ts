import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { client } from '$lib/server/prisma';
import type { Course, Event } from '$lib/types/interfaces';
import { env } from '$env/dynamic/private';

const institution = '194';
const semester = '23v';

/** @type {import('./$types').PageLoad} */
export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw redirect(302, '/login');
	const courses_users = await client.course_user.findMany({
		where: {
			user_id: user.userId
		}
	});

	const courses = await Promise.all(
		courses_users.map(async (course_user) => {
			const course = await client.course.findUnique({
				where: {
					id: course_user.course_id
				}
			});
			return course;
		})
	);

	user.courses = courses;

	// parse course ids from courses to remove null and undefined values
	const courseIds = courses.map((course) => course?.id).filter((id) => id) as string[];

	const Courses = await fetchCourseEvents(courseIds);

	return {
		user: user,
		Courses: Courses
	};
};

async function fetchCourseEvents(selectedCourses: string[] = []) {
	if (selectedCourses.length === 0) return [];
	const CourseEvents: Event[] = [];
	for (const course of selectedCourses) {
		const response = await fetch(`${env.TP_URL}/ws/1.4/course.php?id=${course}&sem=${semester}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'X-Gravitee-Api-Key': env.TP_TOKEN
			}
		});
		const data: Course = await response.json();

		const events = data.events;

		CourseEvents.push(...events);
	}

	return CourseEvents;
}
