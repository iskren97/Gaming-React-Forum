import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyDXep-3TJWEtqx934Z1PcHmgt2ZIh1zZ84',
  authDomain: 'team3forum.firebaseapp.com',
  databaseURL:
    'https://team3forum-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'team3forum',
  storageBucket: 'team3forum.appspot.com',
  messagingSenderId: '231058361849',
  appId: '1:231058361849:web:f29cb9fe759a0405948128',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
