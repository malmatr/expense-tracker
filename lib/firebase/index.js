// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4mEwN1klHvLAD1RvQXkcBvIQs5YAmv0w",
  authDomain: "expense-tracker-b7029.firebaseapp.com",
  projectId: "expense-tracker-b7029",
  storageBucket: "expense-tracker-b7029.firebasestorage.app",
  messagingSenderId: "390797086762",
  appId: "1:390797086762:web:18c29b04c9c8c6f6b53353",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
