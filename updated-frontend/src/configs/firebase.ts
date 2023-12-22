
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgBeOR4M8Px1fDVPLEN5OQCXOMWByd45A",
  authDomain: "cycle-stark.firebaseapp.com",
  projectId: "cycle-stark",
  storageBucket: "cycle-stark.appspot.com",
  messagingSenderId: "1082311512878",
  appId: "1:1082311512878:web:28cd6a8ee1e353699960bf",
  measurementId: "G-K22L5F5EKK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);