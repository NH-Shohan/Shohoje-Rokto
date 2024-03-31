"use client";

import app from "@/app/firebaseConfig";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const auth = getAuth(app);

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider);
  };

  const facebookSignIn = () => {
    const facebookProvider = new FacebookAuthProvider();
    signInWithPopup(auth, facebookProvider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, loading, googleSignIn, facebookSignIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider };
