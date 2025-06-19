import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, push, onValue };