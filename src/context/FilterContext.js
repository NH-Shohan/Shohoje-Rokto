"use client";
import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filterValues, setFilterValues] = useState({
    bloodGroup: "",
    division: "",
    district: "",
    subdistrict: "",
    gender: "",
    age: "",
    availability: "",
  });

  return (
    <FilterContext.Provider value={{ filterValues, setFilterValues }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
