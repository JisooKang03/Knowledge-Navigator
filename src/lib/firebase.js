// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiv8HUz7TzB70Osn3aspmkwVYsL5tXMeU",
  authDomain: "knowledge-navigator-afe56.firebaseapp.com",
  projectId: "knowledge-navigator-afe56",
  storageBucket: "knowledge-navigator-afe56.firebasestorage.app",
  messagingSenderId: "88158605319",
  appId: "1:88158605319:web:bb8c0d7811593b977e1aa2",
  measurementId: "G-8F3E0M5P1K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);