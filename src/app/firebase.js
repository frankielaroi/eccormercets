// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCbgxIt9QYsJvttDtcIXM_NktLuriBfSMk",
  authDomain: "eccormercets.firebaseapp.com",
  projectId: "eccormercets",
  storageBucket: "eccormercets.appspot.com",
  messagingSenderId: "272136377005",
  appId: "1:272136377005:web:a8d0261f90a3641ffaac24",
  measurementId: "G-DEV7SM3CMJ",
  databaseURL: "https://eccormercets-default-rtdb.firebaseio.com",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const database = getDatabase(firebaseApp);
