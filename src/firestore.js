// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2uceaMMMQyypuZ7jbPsmZEaddKfphUSM",
  authDomain: "notes-database-81ecb.firebaseapp.com",
  projectId: "notes-database-81ecb",
  storageBucket: "notes-database-81ecb.appspot.com",
  messagingSenderId: "637036823700",
  appId: "1:637036823700:web:699e5cc018733334dbe081"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
