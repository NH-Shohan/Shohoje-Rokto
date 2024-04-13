"use client";

import app from "@/app/firebaseConfig";
import axios from "axios";
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

  const numberSignIn = (phoneNumber, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:3333/api/auth/login", {
          phoneNumber,
          password,
        })
        .then((response) => {
          console.log(response);
          const { data } = response;
          if (data) {
            setCurrentUser(data);
            localStorage.setItem("isSignedIn", "true");
            resolve(data.message || "Login successful!");
          } else {
            reject(data.message || "Login failed, please try again!");
          }
        })
        .catch((error) => {
          reject("An error occurred while signing in.");
        });
    });
  };

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
    setCurrentUser(null);
    localStorage.setItem("isSignedIn", "false");
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
      value={{
        currentUser,
        loading,
        numberSignIn,
        googleSignIn,
        facebookSignIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider };
