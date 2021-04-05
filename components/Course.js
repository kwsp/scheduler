import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { getCourseNumber } from "../utils/course";

export function Course({ course, isSelected, select }) {
  return (
    <TouchableOpacity
      style={isSelected ? styles.courseButtonSelected : styles.courseButton}
      onPress={() => {
        select(course);
      }}
    >
      <Text style={styles.courseText}>
        {`CS ${getCourseNumber(course)}\n${course.meets}`}
      </Text>
    </TouchableOpacity>
  );
}

const courseButtonBase = {
  borderRadius: 5,
  justifyContent: "center",
  alignItems: "center",
  margin: 10,
  height: 60,
  padding: 10,
  minWidth: 100,
  maxWidth: 100,
};

const styles = StyleSheet.create({
  courseButton: {
    ...courseButtonBase,
    backgroundColor: "#66b0ff",
  },
  courseButtonSelected: {
    ...courseButtonBase,
    backgroundColor: "#004a99",
  },
  courseText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
});
