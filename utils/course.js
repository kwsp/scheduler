const termMap = { F: "Fall", W: "Winter", S: "Spring" };

export const terms = Object.values(termMap);

export const getCourseTerm = (course) => termMap[course.id.charAt(0)];

export const getCourseNumber = (course) => course.id.slice(1);
