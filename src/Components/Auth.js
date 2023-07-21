import React from "react";
import { auth, provider } from "../firebaseConfig.js";
import { signInWithPopup } from "firebase/auth";
import "../Styles/Chat.css";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const Auth = (props) => {
  const { setIsAuth } = props;
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="auth">
      <h1 className="authHeader">Sign In with Google To Continue</h1>
      <button onClick={signInWithGoogle} className="loginBtn">
        Sign In with Google
      </button>
    </div>
  );
};
export default Auth;
