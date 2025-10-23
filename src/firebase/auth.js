import { auth } from "./config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// --- REGISTER USER ---
export const registerUser = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// --- LOGIN USER ---
export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// --- LOGOUT USER ---
export const logoutUser = async () => {
  return await signOut(auth);
};
