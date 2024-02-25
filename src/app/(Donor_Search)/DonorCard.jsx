"use client";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFilter } from "@/context/FilterContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PiSealCheckDuotone } from "react-icons/pi";

const DonorCard = ({ donors }) => {
  const postsPerPage = 16;
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const { filterValues } = useFilter();
  const { bloodGroup, area, gender, age, availability } = filterValues;

  useEffect(() => {
    setIsClient(true);
    const storedPage = localStorage.getItem("currentPage");
    if (storedPage) {
      setCurrentPage(parseInt(storedPage));
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
    const storedData = localStorage.getItem("filterValues");
    if (storedData) {
      const filters = JSON.parse(storedData);
      const filteredData = donors.filter((donor) => {
        return (
          (filters.bloodGroup.toLowerCase() === "" ||
            donor.bloodGroup.toLowerCase() ===
              filters.bloodGroup.toLowerCase()) &&
          (filters.area.toLowerCase() === "" ||
            donor.city.toLowerCase() === filters.area.toLowerCase()) &&
          (filters.gender.toLowerCase() === "" ||
            donor.gender.toLowerCase() === filters.gender.toLowerCase()) &&
          isAgeInRange(filters.age, donor.age) &&
          (filters.availability.toLowerCase() === "" ||
            donor.availability.toLowerCase() ===
              filters.availability.toLowerCase())
        );
      });
      setFilteredDonors(filteredData);
    } else {
      setFilteredDonors(donors);
    }
  }, [donors, bloodGroup, area, gender, age, availability]);

  const isAgeInRange = (filterAge, donorAge) => {
    switch (filterAge) {
      case "range1":
        return donorAge >= 17 && donorAge <= 25;
      case "range2":
        return donorAge >= 26 && donorAge <= 35;
      case "range3":
        return donorAge >= 36 && donorAge <= 50;
      case "range4":
        return donorAge >= 52 && donorAge <= 60;
      case "range5":
        return donorAge >= 61 && donorAge <= 70;
      default:
        return true;
    }
  };

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("currentPage", currentPage);
    }
  }, [currentPage, isClient]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentItems = filteredDonors.slice(firstPostIndex, lastPostIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {isClient ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
          {currentItems.map(
            (
              {
                image,
                name,
                bloodGroup,
                availability,
                city,
                gender,
                age,
                type,
              },
              index
            ) => (
              <div
                key={index}
                className="relative group block p-2 h-full w-full"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.span
                      className="absolute inset-0 h-full w-full bg-light dark:bg-muted block rounded-3xl -z-10"
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.15 },
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.15, delay: 0.2 },
                      }}
                    />
                  )}
                </AnimatePresence>
                <div className="border bg-white rounded-2xl p-6 flex flex-col gap-3 transition dark:bg-secondary relative group">
                  <Image
                    src={image}
                    alt="user image"
                    width={120}
                    height={120}
                    className="mx-auto capitalize"
                    priority
                  />
                  <p className="w-full flex gap-2 justify-center items-center">
                    {name}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <PiSealCheckDuotone
                            className={
                              type === "Certified" || type === "certified"
                                ? "text-green-600"
                                : type === "Verified" || type === "verified"
                                ? "text-blue-500"
                                : "text-primary"
                            }
                          />
                        </TooltipTrigger>
                        <TooltipContent className="flex flex-col gap-1">
                          <p className="flex items-center gap-1 text-green-600">
                            <PiSealCheckDuotone />
                            Certified
                          </p>
                          <p className="flex items-center gap-1 text-blue-500">
                            <PiSealCheckDuotone />
                            Verified
                          </p>
                          <p className="flex items-center gap-1 text-primary">
                            <PiSealCheckDuotone />
                            Normal
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </p>
                  <div className="flex gap-5">
                    <p className="bg-light rounded-xl flex justify-center items-center w-1/2 text-[48px] text-primary dark:text-white uppercase font-medium">
                      {bloodGroup}
                    </p>
                    <div className="capitalize">
                      <li
                        className={
                          availability.toLowerCase() === "available"
                            ? "text-green-600"
                            : "text-primary"
                        }
                      >
                        {availability}
                      </li>
                      <li>{city}</li>
                      <li>{gender}</li>
                      <li>{age}</li>
                    </div>
                  </div>
                  <Button variant="outline">See Details</Button>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="grid grid-cols-4 mt-10"></div>
      )}

      <div className="my-10 w-full">
        <Pagination>
          <PaginationContent>
            {
              <PaginationItem className="cursor-pointer">
                <PaginationPrevious
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
            }

            {Array.from({
              length: Math.ceil(filteredDonors.length / postsPerPage),
            }).map((_, index) => {
              const pageNumber = index + 1;
              const isActive = pageNumber === currentPage;
              if (
                pageNumber === 1 ||
                pageNumber === currentPage - 2 ||
                pageNumber === currentPage - 1 ||
                pageNumber === currentPage ||
                pageNumber === currentPage + 1 ||
                pageNumber === currentPage + 2 ||
                pageNumber === Math.ceil(filteredDonors.length / postsPerPage)
              ) {
                return (
                  <PaginationItem key={index} className="cursor-pointer">
                    <PaginationLink
                      onClick={() => paginate(pageNumber)}
                      isActive={isActive}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (
                pageNumber === currentPage - 3 ||
                pageNumber === currentPage + 3
              ) {
                return (
                  <PaginationItem key={index}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}

            {
              <PaginationItem className="cursor-pointer">
                <PaginationNext
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredDonors.length / postsPerPage)
                  }
                />
              </PaginationItem>
            }
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default DonorCard;
