import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen, green } from './Constants';
import Field from './Field';
import { useState, useEffect } from 'react';
import { FireBase_Auth } from "../FirebaseConfig";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import Main from './Main';
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const auth = FireBase_Auth;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const signIn = async () => {
    setLoading(true);

    try {
      if (!email.trim() || !password.trim()) {
        alert("Email and password are required");
        return;
      }

      if (!validateEmail(email)) {
        setEmailError("Invalid email format");
        return;
      }
      const response = await signInWithEmailAndPassword(auth, email, password);
      

      // console.log(response);
      props.navigation.navigate("Main");
    } catch (error) {
      console.log(error);
      alert("Authentication Failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent. Check your inbox.');
    } catch (error) {
      console.log(error);
      alert('Error sending password reset email.');
    }
  };

  //To reload the page after SignIn
  const resetState = () => {
    setEmail("");
    setPassword("");
    setLoading(false);
    setEmailError("");
  };

  useFocusEffect(
    React.useCallback(() => {
      resetState();
    }, [props.navigation])
  );
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Background>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View style={{ alignItems: 'center', width: 400 }}>
            <Text
              style={{
                color: 'white',
                fontSize: 64,
                fontWeight: 'bold',
                // marginTop: 20,
              }}>
              Login
            </Text>
            <View
              style={{
                backgroundColor: 'white',
                height: 700,
                width: 460,
                borderTopLeftRadius: 130,
                paddingTop: 100,
                alignItems: 'center'
              }}>
              <Text
                style={{
                  color: green,
                  fontSize: 22,
                  fontWeight: 'bold',
                  marginBottom: 20,
                }}>
                Language Exchanging Application
              </Text>
              <Text style={{ fontSize: 40, color: darkGreen, fontWeight: 'bold' }}>
                Welcome Back
              </Text>

              <Text
                style={{
                  color: 'grey',
                  fontSize: 19,
                  fontWeight: 'bold',
                  marginBottom: 20,
                }}>
                Login to your account
              </Text>
              <Field
                //onChangeText ={(text)=> setEmail(text)}
                placeholder="Enter Email "
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailError("");
                }}
                keyboardType={"email-address"}
                autoCapitalize="none"
              />
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
              <Field
                placeholder="Enter Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true} />
              <View style={{ alignItems: 'flex-end', width: '78%', paddingRight: 16, marginBottom: 200 }}>
                <TouchableOpacity onPress={resetPassword}>
                  <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16, marginVertical: 10 }}>Forgot Password ?</Text>
                </TouchableOpacity>
              </View>

<View style={{  marginVertical: -60 }}>
              {loading ? (
                <ActivityIndicator size="large" color="#FF0000" />
              ) : (
                <Btn
                  textColor='white' bgColor={darkGreen} btnLabel="Login"
                  Press={signIn}
                />
              )}
              </View>

              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", marginVertical: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>Don't have an account ? </Text>
                <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
                  <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Background>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  errorText: {
    color: "red",

  },

});
export default Login;
