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
  apiKey: "AIzaSyCsPt8Uh7wldWVUTBprl5Uw-yVHSN4FS_M",
  authDomain: "ohalwan-sso.firebaseapp.com",
  projectId: "ohalwan-sso",
  storageBucket: "ohalwan-sso.appspot.com",
  messagingSenderId: "1012971131565",
  appId: "1:1012971131565:web:f0d8820f741e57c1ec6c24",
  measurementId: "G-H06S5LCNRE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, analytics, auth };
