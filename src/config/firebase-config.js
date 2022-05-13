// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyCqolKvhxzuDMW38pbbP-GergQW_O8GL34",
  authDomain: "react-team3-forum.firebaseapp.com",
  databaseURL: "https://react-team3-forum-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-team3-forum",
  storageBucket: "react-team3-forum.appspot.com",
  messagingSenderId: "602768559676",
  appId: "1:602768559676:web:ac2a3f4ef5141e587ebd39",
  measurementId: "G-5EHZ0L0DCF"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
