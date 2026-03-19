import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKAYuL8w_niyZf1txJCFIxA7UE7KT7-AE",
  authDomain: "job-portal-34bb6.firebaseapp.com",
  projectId: "job-portal-34bb6",
  storageBucket: "job-portal-34bb6.firebasestorage.app",
  messagingSenderId: "908879887351",
  appId: "1:908879887351:web:3b6070a2bd2ee6b9c48cf2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);