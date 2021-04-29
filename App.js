import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import SignInButton from "./components/SignInButton";
import { firebase } from "./firebase";
import CourseDetailScreen from "./screens/CourseDetailScreen";
import CourseEditScreen from "./screens/CourseEditScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import UserContext from "./UserContext";

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState({ role: "admin" });

  const [auth, setAuth] = useState();
  console.log(auth);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((auth) => {
      console.log(auth);
      setAuth(auth);
    });
  }, []);

  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ScheduleScreen"
            component={ScheduleScreen}
            options={({ navigation }) => ({
              title: "Schedule",
              headerRight: () => (
                <SignInButton navigation={navigation} user={user} />
              ),
            })}
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
