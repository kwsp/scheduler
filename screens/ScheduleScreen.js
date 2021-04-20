import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { CourseList } from "../components/CourseList";
import UserContext from "../UserContext";

const Banner = ({ title }) => (
  <Text style={styles.bannerStyle}>{title || "[loading...]"}</Text>
);

const ScheduleScreen = ({ navigation }) => {
  const user = useContext(UserContext);
  const canEdit = user && user.role === "admin";
  const [schedule, setSchedule] = useState({ title: "", courses: [] });

  const view = (course) => {
    navigation.navigate(canEdit ? "CourseEditScreen" : "CourseDetailScreen", {
      course,
    });
  };

  const url = "https://courses.cs.northwestern.edu/394/data/cs-courses.php";

  useEffect(() => {
    const fetchSchedule = async () => {
      const resp = await fetch(url);
      if (!resp.ok) throw resp;
      const json = await resp.json();
      setSchedule(json);
    };
    fetchSchedule();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} view={view} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  bannerStyle: {
    color: "#888",
    fontSize: 32,
  },
});

export default ScheduleScreen;
