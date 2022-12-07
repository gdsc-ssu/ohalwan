// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjFDP-ZJqfI6D63PzKoFzmR0bsJSlTX_Q",
  authDomain: "ex-prject-20221207.firebaseapp.com",
  projectId: "ex-prject-20221207",
  storageBucket: "ex-prject-20221207.appspot.com",
  messagingSenderId: "511836804211",
  appId: "1:511836804211:web:64cafa50bfd2201307c606",
  measurementId: "G-FTC43MZN5X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
