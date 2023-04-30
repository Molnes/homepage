export interface CourseList {
	name: string;
	version: string;
	timestamp: string;
	data: parCourse[];
}

export interface parCourse {
	id: string;
	name: string;
}

/* Actual course */
export interface Course {
	name: string;
	courseid: string;
	courseversion: string;
	coursename: string;
	title: string;
	'detail-type': string;
	'interval-start': string;
	'interval-end': string;
	semesters: Semester[];
	lastchanged: string;
	error: string[];
	events: Event[];
}

export interface Semester {
	id: string;
	publish_timetable: boolean;
	href: string;
}

export interface Event {
	id: string;
	weekday: number;
	courseid: string;
	courseversion: string;
	weeknr: string;
	eventid: string;
	'teaching-title': string;
	dtstart: string;
	dtend: string;
	summary: string;
	status: string;
	terminnr: number;
	staffs: Staff[] | undefined;
	room: Room[];
	title: string;
	curr: string;
	editurl: string;
	tag: string[];
	discipline: string[];
	notes: string;
	'candidates-reg': number;
	'virtual-course-name': string;
	multiday: boolean;
	publish: boolean;
	compulsory: boolean;
	alerts: Alert[];
}

export interface Staff {
	id: string;
	lastname: string;
	firstname: string;
	shortname: string;
	url: string;
}

export interface Room {
	id: string;
	roomid: string;
	roomurl: string;
	roomname: string;
	roomacronym: string;
	buildingid: string;
	buildingname: string;
	buildingacronym: string;
	buildingurl: string;
	campusid: string;
	videolink: boolean;
	showforstudent: boolean;
	equipment_function: EquipmentFunction[];
}

export interface EquipmentFunction {
	function: string;
	equipment: string;
}

export interface Alert {
	id: number;
	deleted: boolean;
	message: string;
	expire_date: string;
}
