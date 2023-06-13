import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJnMDw2cmsQRYiRgVJidX6Vi2-syoMdno",
  authDomain: "blog2-458a8.firebaseapp.com",
  projectId: "blog2-458a8",
  storageBucket: "blog2-458a8.appspot.com",
  messagingSenderId: "745368715579",
  appId: "1:745368715579:web:086e818aa212483674f71e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
