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

  // For development -> Will be removed later
  const [donorData, setDonorData] = useState(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("donorData");
      return storedData
        ? JSON.parse(storedData)
        : {
            name: "",
            email: "",
            bloodGroup: "",
            dateOfBirth: "",
            gender: "",
            phoneNumber: "",
            optionalPhoneNumber: "",
            division: "",
            district: "",
            subdistrict: "",
            donatedBefore: "",
            lastDonationDate: "",
            maritalStatus: "",
            socialMediaLink: "",
            bio: "",
            contectMethod: "",
          };
    }
    return {
      name: "",
      email: "",
      bloodGroup: "",
      dateOfBirth: "",
      gender: "",
      phoneNumber: "",
      optionalPhoneNumber: "",
      division: "",
      district: "",
      subdistrict: "",
      donatedBefore: "",
      lastDonationDate: "",
      maritalStatus: "",
      socialMediaLink: "",
      bio: "",
      contectMethod: "",
    };
  });
  // ----------------------------------------

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

  const getUserRole = (user) => {
    return "donor";
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const role = getUserRole(user);
        user.role = role;

        if (role === "donor") {
          setCurrentUser({ ...user, ...donorData });
        } else {
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [donorData]);

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
