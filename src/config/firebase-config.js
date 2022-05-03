// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCqolKvhxzuDMW38pbbP-GergQW_O8GL34",
  authDomain: "react-team3-forum.firebaseapp.com",
  projectId: "react-team3-forum",
  storageBucket: "react-team3-forum.appspot.com",
  messagingSenderId: "602768559676",
  appId: "1:602768559676:web:47c92e222fe0f90f7ebd39",
  measurementId: "G-L8K310Z1J2",
  databaseURL: "https://react-team3-forum-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// the Firebase authentication handler
export const auth = getAuth(app);
// the Realtime Database handler
export const db = getDatabase(app);