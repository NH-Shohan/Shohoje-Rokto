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
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const auth = getAuth(app);
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      getUserProfile()
        .then((data) => {
          setCurrentUser(data?.data);
          try {
            setCurrentUser(data?.data);
          } catch (error) {
            toast.error(error);
          }
        })
        .catch((error) => {
          toast.error("Your session has expired, login again!");
          router.push("/");
        });
    }
  }, [currentUser]);

  const numberSignIn = (phoneNumber, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:3333/api/auth/login", {
          phoneNumber,
          password,
        })
        .then((response) => {
          console.log(response.data);
          const { data } = response;
          if (data) {
            localStorage.setItem("accessToken", data.access_token);
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

  const getUserProfile = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return Promise.reject("Access token not found.");
    }

    if (accessToken) {
      return axios.get("http://localhost:3333/api/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  };

  const googleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider);
  };

  const facebookSignIn = () => {
    const facebookProvider = new FacebookAuthProvider();
    signInWithPopup(auth, facebookProvider);
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("accessToken");
      setCurrentUser(null);
      router.push("/");
    } catch (error) {
      toast.error("An error occurred while logging out. Please try again.");
    }
  };

  const getUserRole = (user) => {
    return "donor";
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const role = getUserRole(user);
        user.role = role;
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        currentUser,
        setCurrentUser,
        numberSignIn,
        getUserProfile,
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
