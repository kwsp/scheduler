import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { getCourseTerm, terms } from "../utils/course";
import { Course } from "./Course";
import CourseSelector from "./CourseSelector";
import TermSelector from "./TermSelector";

export function CourseList({ courses }) {
  const [selectedTerm, setSelectedTerm] = useState("Fall");

  const termCourses = courses.filter(
    (course) => selectedTerm === getCourseTerm(course)
  );

  return (
    <ScrollView>
      <TermSelector
        terms={terms}
        selectedTerm={selectedTerm}
        setSelectedTerm={setSelectedTerm}
      />
      <CourseSelector courses={termCourses} />
    </ScrollView>
  );
}
