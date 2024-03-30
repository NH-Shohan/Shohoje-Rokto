"use client";

import { createContext, useContext, useState } from "react";

const DonorSearchContext = createContext();

export const useDonorSearch = () => useContext(DonorSearchContext);

export const DonorSearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DonorSearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </DonorSearchContext.Provider>
  );
};
