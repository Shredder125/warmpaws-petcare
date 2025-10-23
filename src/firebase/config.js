import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXbFn6C0yO5iOs-PlMDsvKS86mnRvSIww",
  authDomain: "warmpaws-6e6f6.firebaseapp.com",
  projectId: "warmpaws-6e6f6",
  storageBucket: "warmpaws-6e6f6.appspot.com",
  messagingSenderId: "926354478355",
  appId: "1:926354478355:web:8e155e8a17a5f5378376e6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
