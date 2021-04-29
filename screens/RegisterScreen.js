import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from "yup";
import Form from "../components/Form";
import { firebase } from "../firebase";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string()
    .required()
    .min(6, "Password must have at least 6 characters")
    .label("Password"),
  confirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Confirmation password must match password"
  ),
});

export default function RegisterScreen({ navigation, route }) {
  const [signInError, setSignInError] = useState("");

  const loginWithEmail = async (email, password) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const registerWithEmail = async (email, password) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  async function handleOnLogin({ email, password }) {
    setSignInError(null);
    try {
      await loginWithEmail(email, password);
      navigation.navigate("ScheduleScreen");
    } catch (err) {
      const code = err.code;
      const msg = err.message;
      console.log(code, msg);
      setSignInError(msg);
    }
  }

  async function handleOnSignUp({ name, email, password }) {
    setSignInError(null);
    try {
      await registerWithEmail(email, password);
      const user = authCredential.user;
      await user.updateProfile({ displayName: name });
      navigation.navigate("ScheduleScreen");
    } catch (err) {
      const code = err.code;
      const msg = err.message;
      console.log(code, msg);
      setSignInError(msg);
    }
  }

  const handleSubmit = async (values) => {
    return values.confirm ? handleOnSignUp(values) : handleOnLogin(values);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Form
          initialValues={{ email: "", password: "", confirm: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form.Field
            name="email"
            leftIcon="email"
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <Form.Field
            name="password"
            leftIcon="lock"
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
          />
          <Form.Field
            name="confirm"
            leftIcon="lock"
            placeholder="Confirm password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
          />
          <Form.Button
            title={(values) => (values.confirm ? "Register" : "Login")}
          />
          {<Form.ErrorMessage error={signInError} visible={true} />}
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
}
