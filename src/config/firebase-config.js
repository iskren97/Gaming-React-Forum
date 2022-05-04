// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyCqolKvhxzuDMW38pbbP-GergQW_O8GL34',
  authDomain: 'react-team3-forum.firebaseapp.com',
  projectId: 'react-team3-forum',
  storageBucket: 'react-team3-forum.appspot.com',
  messagingSenderId: '602768559676',
  appId: '1:602768559676:web:47c92e222fe0f90f7ebd39',
  measurementId: 'G-L8K310Z1J2',
  databaseURL:
    'https://react-team3-forum-default-rtdb.europe-west1.firebasedatabase.app/',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
