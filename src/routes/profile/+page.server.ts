import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { client } from '$lib/server/prisma';
import type { CourseList } from '$lib/types/interfaces';
import { env } from '$env/dynamic/private';

const institution = '194';
const semester = '23v';

/** @type {import('./$types').PageLoad} */
export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw redirect(302, '/login');
	const courseUsers = await client.course_user.findMany({
		where: {
			user_id: user.userId
		}
	});

	const courses = await Promise.all(
		courseUsers.map(async (courseUser) => {
			const course = await client.course.findUnique({
				where: {
					id: courseUser.course_id
				}
			});
			return course;
		})
	);

	user.courses = courses;

	const availableCourses = await fetchAvailableCourses();

	return {
		user: user,
		availableCourses: availableCourses
	};
};

export const actions = {
	addCourse: async ({ locals, request }) => {
		const { user } = await locals.auth.validateUser();
		if (!user) throw redirect(302, '/login');

		const formData = await request.formData();

		const courseId = formData.get('courseId')?.toString();
		if (!courseId) throw redirect(302, '/profile');

		//create a course if it doesn't exist
		const course = await client.course.upsert({
			where: {
				id: courseId
			},
			update: {},
			create: {
				id: courseId,
				name: formData.get('courseName')?.toString() || 'Unknown Course Name'
			}
		});

		const courseUser = await client.course_user.create({
			data: {
				id: `${user.userId}-${courseId}`,
				user_id: user.userId,
				course_id: courseId
			}
		});

		if (!course || !courseUser) throw redirect(302, '/profile');

		return {
			body: course
		};
	},

	removeCourse: async ({ locals, request }) => {
		const { user } = await locals.auth.validateUser();
		if (!user) throw redirect(302, '/login');

		const courseId = (await request.formData()).get('courseId')?.toString();
		if (!courseId) throw redirect(302, '/profile');

		const course = await client.course_user.delete({
			where: {
				id: `${user.userId}-${courseId}`
			}
		});
		return {
			body: course
		};
	},

	logout: async ({ locals }) => {
		await locals.auth.setSession(null);
		throw redirect(302, '/login');
	}
};

async function fetchAvailableCourses() {
	const response = await fetch(`${env.TP_URL}/ws/course/?id=${institution}&sem=${semester}`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			'X-Gravitee-Api-Key': env.TP_TOKEN
		}
	});
	const data: CourseList = await response.json();
	return data;
}
