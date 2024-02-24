// IOS: 533028887636-h4soebmski6pobpbvot28752d5rjataa.apps.googleusercontent.com
//ANDROID: 533028887636-vrs7jo8dbsce6thti3fhdj9rkjuhcqpf.apps.googleusercontent.com

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwLNtc_ZJaZdQwxKVqJMQIvO6B7ZsmvHs",
  authDomain: "gourmet-app-c1191.firebaseapp.com",
  projectId: "gourmet-app-c1191",
  storageBucket: "gourmet-app-c1191.appspot.com",
  messagingSenderId: "170528340388",
  appId: "1:170528340388:web:cafcfd1aa7af599f04a931"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);