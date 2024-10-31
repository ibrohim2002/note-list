// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtJ7b2fXLfVRmNNignl0avJ6jCGFfmEHI",
  authDomain: "notes-list-8e6b8.firebaseapp.com",
  projectId: "notes-list-8e6b8",
  storageBucket: "notes-list-8e6b8.appspot.com",
  messagingSenderId: "744734996360",
  appId: "1:744734996360:web:83818637d6764b0430ec3d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export {db, auth}