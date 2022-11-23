import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD0-U4CwvPzwMDUsI0-Svcc8Ca1AtpN_i4',
  authDomain: 'e-tronic.firebaseapp.com',
  projectId: 'e-tronic',
  storageBucket: 'e-tronic.appspot.com',
  messagingSenderId: '1057955998375',
  appId: '1:1057955998375:web:9c08214d650883aab28982',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore();
