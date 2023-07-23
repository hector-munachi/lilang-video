import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "lilang-video.firebaseapp.com",
  projectId: "lilang-video",
  storageBucket: "lilang-video.appspot.com",
  messagingSenderId: "722544021704",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-818HYT3TF4"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");
export const meetingsRef = collection(firebaseDB, "meetings");
