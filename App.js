import "react-native-gesture-handler";
import React, { useState } from "react";
import ScheduleScreen from "./screens/ScheduleScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import CourseDetailScreen from "./screens/CourseDetailScreen";
import UserContext from "./UserContext";
import CourseEditScreen from "./screens/CourseEditScreen";
import RegisterScreen from "./screens/RegisterScreen";

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState({ role: "admin" });

  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ScheduleScreen"
            component={ScheduleScreen}
            options={{ title: "Schedule" }}
          />
          <Stack.Screen
            name="CourseDetailScreen"
            component={CourseDetailScreen}
            options={{ title: "Course Detail" }}
          />
          <Stack.Screen
            name="CourseEditScreen"
            component={CourseEditScreen}
            options={{ title: "Course Editor" }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ title: "Register" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
