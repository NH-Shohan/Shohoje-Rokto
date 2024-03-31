"use client";

import { AlertDialog } from "@/components/ui/alert-dialog";
import { useDonorSearch } from "@/context/DonorSearchContext";
import { useFilter } from "@/context/FilterContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import noData from "../../../public/assets/noData.svg";
import DonorAlert from "./DonorAlert";
import DonorCard from "./DonorCard";
import DonorPagination from "./DonorPagination";

const DonorContainer = ({ donors }) => {
  const { filterValues } = useFilter();
  const { searchQuery } = useDonorSearch();

  const {
    bloodGroup,
    division,
    district,
    subDistrict,
    gender,
    age,
    availability,
  } = filterValues;

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(16);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);

  const updatePostsPerPage = () => {
    const windowWidth = window.innerWidth;

    const breakpoints = [
      { width: 640, postsPerPage: 8 },
      { width: 768, postsPerPage: 12 },
      { width: 1535, postsPerPage: 15 },
    ];

    const matchingBreakpoint = breakpoints.find(
      (breakpoint) => windowWidth <= breakpoint.width
    );

    setPostsPerPage(matchingBreakpoint ? matchingBreakpoint.postsPerPage : 16);
  };

  useEffect(() => {
    updatePostsPerPage();
    window.addEventListener("resize", updatePostsPerPage);

    return () => {
      window.removeEventListener("resize", updatePostsPerPage);
    };
  }, []);

  useEffect(() => {
    setIsClient(true);
    const storedData = localStorage.getItem("filterValues");
    if (storedData) {
      const filters = JSON.parse(storedData);
      const filteredData = donors.filter((donor) => {
        const bloodGroupMatch =
          filters.bloodGroup.toLowerCase() === "" ||
          donor.bloodGroup.toLowerCase() === filters.bloodGroup.toLowerCase();
        const divisionMatch =
          !filters.division ||
          filters.division.toLowerCase() === "" ||
          donor.division.toLowerCase() === filters.division.toLowerCase();
        const districtMatch =
          !filters.district ||
          filters.district.toLowerCase() === "" ||
          donor.district.toLowerCase() === filters.district.toLowerCase();
        const subDistrictMatch =
          !filters.subDistrict ||
          filters.subDistrict.toLowerCase() === "" ||
          donor.subDistrict.toLowerCase() === filters.subDistrict.toLowerCase();
        const genderMatch =
          filters.gender.toLowerCase() === "" ||
          donor.gender.toLowerCase() === filters.gender.toLowerCase();
        const ageMatch = isAgeInRange(filters.age, donor.age);
        const availabilityMatch =
          filters.availability.toLowerCase() === "" ||
          donor.availability.toLowerCase() ===
            filters.availability.toLowerCase();

        return (
          bloodGroupMatch &&
          divisionMatch &&
          districtMatch &&
          subDistrictMatch &&
          genderMatch &&
          ageMatch &&
          availabilityMatch
        );
      });
      setFilteredDonors(filteredData);
      setCurrentPage(1);
    } else {
      setFilteredDonors(donors);
    }

    const timeoutId = setTimeout(() => {
      localStorage.removeItem("filterValues");
    }, 30 * 60 * 1000);

    return () => clearTimeout(timeoutId);
  }, [
    donors,
    bloodGroup,
    division,
    district,
    subDistrict,
    gender,
    age,
    availability,
  ]);

  const isAgeInRange = (filterAge, donorAge) => {
    switch (filterAge) {
      case "range1":
        return donorAge >= 17 && donorAge <= 25;
      case "range2":
        return donorAge >= 26 && donorAge <= 35;
      case "range3":
        return donorAge >= 36 && donorAge <= 50;
      case "range4":
        return donorAge >= 51 && donorAge <= 60;
      case "range5":
        return donorAge >= 61 && donorAge <= 70;
      default:
        return true;
    }
  };

  useEffect(() => {
    const filteredDonorsByName = donors.filter((donor) =>
      donor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDonors(filteredDonorsByName);
  }, [searchQuery, donors]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentItems = filteredDonors.slice(firstPostIndex, lastPostIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {filteredDonors.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[calc(100vh-174px)] w-full relative">
          <h1 className="font-light text-primary absolute top-[10%]">
            No Donors Found 😔
          </h1>
          <div className="relative w-[100%] h-[80%]">
            <Image src={noData} alt="No data Found Image" fill />
          </div>
        </div>
      ) : (
        <>
          <AlertDialog open={open} onOpenChange={setOpen}>
            {isClient ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 my-10">
                {currentItems.map((donor, index) => (
                  <DonorCard
                    key={index}
                    donor={donor}
                    index={index}
                    setSelectedDonor={setSelectedDonor}
                    setOpen={setOpen}
                  />
                ))}
              </div>
            ) : null}
            <DonorAlert selectedDonor={selectedDonor} setOpen={setOpen} />
          </AlertDialog>

          {filteredDonors.length > 16 && (
            <DonorPagination
              currentPage={currentPage}
              filteredDonors={filteredDonors}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              paginate={paginate}
            />
          )}
        </>
      )}
    </>
  );
};

export default DonorContainer;
