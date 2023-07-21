import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9F1ecShcLfpo4nxNkAmH8ELFh8EpFWE8",
  authDomain: "chat-app-e44ca.firebaseapp.com",
  projectId: "chat-app-e44ca",
  storageBucket: "chat-app-e44ca.appspot.com",
  messagingSenderId: "787634904209",
  appId: "1:787634904209:web:712eb89c5f15f996ff3330",
  measurementId: "G-X1MXB41Z42",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
