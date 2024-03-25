"use client";
import { createContext, useContext, useState } from "react";

const BeDonorContext = createContext();

export const BeDonorProvider = ({ children }) => {
  const [donorData, setDonorData] = useState({
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
  });

  return (
    <BeDonorContext.Provider value={{ donorData, setDonorData }}>
      {children}
    </BeDonorContext.Provider>
  );
};

export const useBeDonor = () => useContext(BeDonorContext);
