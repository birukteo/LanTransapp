import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getAuth as getFirestoreAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNuYfhphYFxE8ep123jdQ9HXP53gJoTPo",
    authDomain: "fir-auth-9ac22.firebaseapp.com",
    projectId: "fir-auth-9ac22",
    storageBucket: "fir-auth-9ac22.appspot.com",
    messagingSenderId: "120590863354",
    appId: "1:120590863354:web:dd0cf63d7b46c3f63c3243"
};

// Initialize Firebase
export const FireBase_App = initializeApp(firebaseConfig);
export const FireBase_Auth = initializeAuth(FireBase_App, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FireStore = getFirestore(FireBase_App);
