import React ,{ useState } from 'react';
import {View, Text,StyleSheet, Touchable,ActivityIndicator, TouchableOpacity} from 'react-native';
import Background from './Background';
import { useFocusEffect } from "@react-navigation/native";
import Btn from './Btn';
import {darkGreen} from './Constants';
import Field from './Field';
import { FireBase_Auth, FireStore } from "../FirebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
const Signup = props => {
  const [UName, setUName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [avatar, setAvatar] = useState(null);

  const auth = FireBase_Auth;

  const validateEmail = (email) => {
    const emailRegex = /^[^A-Z][^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // const pickAvatar = async () => {
  //   try {
  //     const options = {
  //       title: "Pick Avatar",
  //       storageOptions: {
  //         skipBackup: true,
  //         path: "images",
  //       },
  //     };

  //     const result = await ImagePicker.launchImageLibraryAsync(options);

  //     if (!result.canceled) {
  //       const selectedAsset = result.assets[0];
  //       setAvatar(selectedAsset.uri);
  //     }
  //   } catch (error) {
  //     console.error("Image picker error:", error);
  //   }
  // };

  const signup = async () => {
    setLoading(true);

    try {
      //|| !avatar
      if (!UName || !Email || !Password || !Confirm ) {
        alert("All fields are required");
        return;
      }

      if (!validateEmail(Email)) {
        setEmailError("Invalid email format");
        return;
      }

      if (Password !== Confirm) {
        setPasswordError("Passwords do not match");
        return;
      }

      const response = await createUserWithEmailAndPassword(
        auth,
        Email,
        Password
      );

      if (response && response.user) {
        await updateProfile(response.user, {
          displayName: UName,
          //photoURL: avatar,
        });

        await addDoc(collection(FireStore, "users"), {
          uid: response.user.uid,
          displayName: UName,
          email: Email,
         
          createdAt: serverTimestamp(),
        });
        props.navigation.navigate("Login");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setUName("");
    setEmail("");
    setPassword("");
    setConfirm("");
    //setAvatar(null);
    setLoading(false);
    setPasswordError("");
    setEmailError("");
  };

  useFocusEffect(
    React.useCallback(() => {
      resetState();
    }, [props.navigation])
  );

  return (
    <Background>
      <View style={{alignItems: 'center', width: 390}}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          Register
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          Create a new account
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center',
          }}>
          <Field placeholder="User Name"
                keyboardType={"default"}
                value={UName}
                onChangeText={(text) => setUName(text)} />
          
          <Field
            placeholder="Email"
            keyboardType="email-address"
            value={Email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError("");
            }}
            autoCapitalize="none"
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
          <Field placeholder="Password"  
                secureTextEntry={true}
                value={Password}
                onChangeText={(text) => setPassword(text)}
              />
          <Field placeholder="Confirm Password"
                secureTextEntry
                value={Confirm}
                onChangeText={(text) => {
                  setConfirm(text);
                  setPasswordError("");
                }}
              />
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '78%',
              paddingRight: 16
            }}>
            <Text style={{color: 'grey', fontSize: 16}}>
              By signing in, you agree to our{' '}
            </Text>
            <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
              Terms & Conditions
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent :"center",
              width: '78%',
              paddingRight: 16,
              marginBottom: 10
            }}>
            <Text style={{color: 'grey', fontSize: 16}}>
              and {" "}
            </Text>
            <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
              Privacy Policy
            </Text>
          </View>
          <View  style={{
              marginVertical:100
            }}>
          {loading ? (
              <ActivityIndicator size="large" color="#FF0000" />
            ) : (
              <Btn
              textColor='white' bgColor={darkGreen} btnLabel="Sign up" 
              Press={signup}
              />
            )}
            </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical:-150
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Already have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text
                style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
    </Background>
  );
};


const styles = StyleSheet.create({
  errorText: {
    color: "red",

  },});

export default Signup;
