const termMap = { F: "Fall", W: "Winter", S: "Spring" };

export const terms = Object.values(termMap);

/**
 * getCourseTerm
 * @param {course} course
 * @returns {String} term - the term the course is in
 */
export const getCourseTerm = (course) => termMap[course.id.charAt(0)];

/**
 * getCourseNumber
 * @param {course} course
 * @returns {String} course number
 */
export const getCourseNumber = (course) => course.id.slice(1);

const allDays = ["M", "Tu", "W", "Th", "F", "Sa", "Su"];
const timesPat = /(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d)/;

/**
 * addTimes
 * given a course with a meeting time, e.g., "MTuWF 9:00-10:30"
 * adds a days value, e.g., ["M", "Tu", "W", "F"] and an hours value,
 * e.g., { start: 540, end: 630 }, with start and end in minutes past midnight
 * @param {course} course
 */
const addTimes = (course) => {
  course.days = allDays.filter((day) => course.meets.includes(day));

  const [match, hh1, mm1, hh2, mm2] = timesPat.exec(course.meets);
  if (match) {
    course.hours = {
      start: hh1 * 60 + mm1 * 1,
      end: hh2 * 60 + mm2 * 1,
    };
  }
};

const daysOverlap = (days1, days2) =>
  days1 && days2 && days2.some((day) => days1.includes(day));

const hoursOverlap = (hours1, hours2) =>
  hours1 &&
  hours2 &&
  Math.max(hours1.start, hours2.start) < Math.min(hours1.end, hours2.end);

const timeConflict = (course1, course2) =>
  daysOverlap(course1.days, course2.days) &&
  hoursOverlap(course1.hours, course2.hours);

const courseConflict = (course1, course2) =>
  course1 != course2 &&
  getCourseTerm(course1) === getCourseTerm(course2) &&
  timeConflict(course1, course2);

/**
 * hasConflict
 * given a course and list of courses, returns true if course conflicts with
 * any items in selected
 * SIDE EFFECT: the first time a course is compared to other courses, its
 * meeting times are parsed and added, so that this work doesn't need to be
 * done again. Clear the days field if changing meeting times
 * @param {course} course
 * @param {Array<course>} selected
 * @returns {Boolean}
 */
export const hasConflict = (course, selected) => {
  if (!course.days) addTimes(course);
  return selected.some((selection) => courseConflict(course, selection));
};
