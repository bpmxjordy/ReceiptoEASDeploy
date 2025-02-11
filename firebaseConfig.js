import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBZLhnMDDo96aQe8RrD13lMJUHxSUK4v-M",
  authDomain: "receipto-cf572.firebaseapp.com",
  projectId: "receipto-cf572",
  storageBucket: "receipto-cf572.appspot.com",
  messagingSenderId: "301633608453",
  appId: "1:301633608453:web:533e4dcf3c35758ab0f56c",
  measurementId: "G-YT45YN2LD3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
//export const db = getFirestore(app);