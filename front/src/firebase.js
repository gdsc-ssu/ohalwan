// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1XLCr37TWA6L4lSBNlNiXY8mrk_mBHEQ",
  authDomain: "ohalwan-f9dcf.firebaseapp.com",
  projectId: "ohalwan-f9dcf",
  storageBucket: "ohalwan-f9dcf.appspot.com",
  messagingSenderId: "483380013709",
  appId: "1:483380013709:web:9665c14854736607ce50c4",
  measurementId: "G-2PX6P5J8P1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, analytics, auth };
