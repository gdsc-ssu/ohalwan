// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxPSFL7Y6GyONHxz6gNv9hVRnTbqg-0SA",
  authDomain: "ohalwan-ex.firebaseapp.com",
  projectId: "ohalwan-ex",
  storageBucket: "ohalwan-ex.appspot.com",
  messagingSenderId: "723830195970",
  appId: "1:723830195970:web:7ead51f01adac29f81241b",
  measurementId: "G-736JV3Y906",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// db.collection("users")
//   .get()
//   .then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       console.log(`${doc.id} => ${doc.data()}`);
//     });
//   });

export { db };
