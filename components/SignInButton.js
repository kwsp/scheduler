import React from "react";
import { Button } from "react-native";
import { firebase } from "../firebase";

const SignInButton = ({ navigation, user }) =>
  user && user.uid ? (
    <Button
      title="Logout"
      color="#448aff"
      onPress={() => firebase.auth().signOut()}
    />
  ) : (
    <Button
      title="Sign in"
      color="#448aff"
      onPress={() => navigation.navigate("RegisterScreen")}
    />
  );

export default SignInButton;
