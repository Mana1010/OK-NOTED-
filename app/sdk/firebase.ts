import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDC0AkWUE2J5dR6vwZqetx_Mg00pMOHsas",
  authDomain: "notes-app-7169e.firebaseapp.com",
  projectId: "notes-app-7169e",
  storageBucket: "notes-app-7169e.appspot.com",
  messagingSenderId: "790092634741",
  appId: "1:790092634741:web:f4f8157445cee61c58b63c",
  measurementId: "G-P4FF6KGS23",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore();
