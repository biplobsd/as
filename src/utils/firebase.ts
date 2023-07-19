// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZhAYmcgU1jJd9kAVtKvxdObToRlIRpTM",
  authDomain: "addition-and-subscription.firebaseapp.com",
  projectId: "addition-and-subscription",
  storageBucket: "addition-and-subscription.appspot.com",
  messagingSenderId: "898396714353",
  appId: "1:898396714353:web:d9514e662de6fcdd84f2d0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export async function signInWithCredentialAccessToken(accessToken: string) {
  const credential = GoogleAuthProvider.credential(null, accessToken);

  return await signInWithCredential(auth, credential);
}
