"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { useDonorSearch } from "@/context/DonorSearchContext";
import { useFilter } from "@/context/FilterContext";
import { Cross2Icon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineHome } from "react-icons/hi2";
import { IoMailOpenOutline } from "react-icons/io5";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { PiSealCheckDuotone } from "react-icons/pi";
import { TfiLink } from "react-icons/tfi";
import noData from "../../../public/assets/noData.svg";

const DonorCard = ({ donors }) => {
  const postsPerPage = 16;
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
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);

  const handleSeeDetails = (donor) => {
    setSelectedDonor(donor);
  };

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 mt-10">
                {currentItems.map(
                  (
                    {
                      image,
                      name,
                      age,
                      email,
                      bloodGroup,
                      dateOfBirth,
                      gender,
                      phoneNumber,
                      optionalPhoneNumber,
                      division,
                      district,
                      subdistrict,
                      donatedBefore,
                      lastDonationDate,
                      maritalStatus,
                      socialMediaLink,
                      bio,
                      contectMethod,
                      availability,
                      type,
                      question1,
                      question2,
                      question3,
                      question4,
                      question5,
                      question6,
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
                                      : type === "Verified" ||
                                        type === "verified"
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
                            <li>{division}</li>
                            <li>{gender}</li>
                            <li>{age}</li>
                          </div>
                        </div>
                        <AlertDialogTrigger className="w-full">
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() =>
                              handleSeeDetails([
                                image,
                                name,
                                age,
                                email,
                                bloodGroup,
                                dateOfBirth,
                                gender,
                                phoneNumber,
                                optionalPhoneNumber,
                                division,
                                district,
                                subdistrict,
                                donatedBefore,
                                lastDonationDate,
                                maritalStatus,
                                socialMediaLink,
                                bio,
                                contectMethod,
                                availability,
                                type,
                                question1,
                                question2,
                                question3,
                                question4,
                                question5,
                                question6,
                              ])
                            }
                          >
                            See Details
                          </Button>
                        </AlertDialogTrigger>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="grid grid-cols-4 mt-10"></div>
            )}

            <AlertDialogContent>
              <AlertDialogDescription>
                {selectedDonor && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 relative">
                      <Image
                        src={selectedDonor[0]}
                        alt="Donor Image"
                        width={70}
                        height={70}
                      />
                      <div className="space-y-2">
                        <h3 className="text-foreground">{selectedDonor[1]}</h3>
                        <div className="flex gap-2">
                          <p
                            className={`${
                              selectedDonor[18].toLowerCase() === "available"
                                ? "bg-green-600/20 text-green-700"
                                : "bg-red-600/20 text-primary"
                            } px-2 rounded-sm w-fit capitalize text-xs`}
                          >
                            {selectedDonor[18]}
                          </p>
                          <p
                            className={`${
                              selectedDonor[19] === "Certified" ||
                              selectedDonor[19] === "certified"
                                ? "bg-green-600/20 text-green-700"
                                : selectedDonor[19] === "Verified" ||
                                  selectedDonor[19] === "verified"
                                ? "bg-blue-600/20 text-blue-600"
                                : "bg-red-600/20 text-primary"
                            } px-2 rounded-sm w-fit capitalize text-xs`}
                          >
                            {selectedDonor[19]}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 divide-x gap-x-2 text-center">
                      <p>
                        Blood Group
                        <span className="capitalize text-foreground block">
                          {selectedDonor[4]}
                        </span>
                      </p>
                      <p>
                        Division
                        <span className="capitalize text-foreground block">
                          {selectedDonor[9]}
                        </span>
                      </p>
                      <p>
                        Gender
                        <span className="capitalize text-foreground block">
                          {selectedDonor[6]}
                        </span>
                      </p>
                      <p>
                        Age
                        <span className="capitalize text-foreground block">
                          {selectedDonor[2]}
                        </span>
                      </p>
                    </div>

                    <div className="w-full border bg-border"></div>

                    <div>
                      <p className="text-foreground font-medium mb-1">Bio</p>
                      {selectedDonor[16] && <p>{selectedDonor[16]}</p>}
                    </div>

                    <div>
                      <p className="text-foreground font-medium mb-1">
                        Contact Details
                      </p>
                      <div className="flex gap-2 items-center">
                        <LiaPhoneVolumeSolid />
                        <Link target="_blank" href={`tel:${selectedDonor[7]}`}>
                          +880{selectedDonor[7]}
                        </Link>
                      </div>
                      <div className="flex gap-2 items-center">
                        <IoMailOpenOutline />
                        <Link
                          target="_blank"
                          href={`mailto:${selectedDonor[3]}`}
                        >
                          {selectedDonor[3]}
                        </Link>
                      </div>
                      <div className="flex gap-2 items-center">
                        <TfiLink />
                        <Link target="_blank" href={selectedDonor[15] || "#"}>
                          {selectedDonor[15]}
                        </Link>
                      </div>
                      <div className="flex gap-2 items-center">
                        <HiOutlineHome />
                        <p>
                          {selectedDonor[11]}, {selectedDonor[10]},{" "}
                          {selectedDonor[9]}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-foreground font-medium mb-1">
                        More Info
                      </p>

                      <table class="table-auto w-full text-left">
                        <tr className="border-y">
                          <td>Date Of Birth</td>
                          <td className="text-foreground">
                            {selectedDonor[5]}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td>Optional Phone Number</td>
                          <td className="text-foreground">
                            +880{selectedDonor[8]}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td>Donated Before</td>
                          <td className="text-foreground">
                            {selectedDonor[12]}
                          </td>
                        </tr>
                        {selectedDonor[12].toLowerCase() === "yes" && (
                          <tr className="border-b">
                            <td>Last Donation Date</td>
                            <td className="text-foreground">
                              {selectedDonor[13]}
                            </td>
                          </tr>
                        )}
                        {selectedDonor[14] && (
                          <tr className="border-b">
                            <td>Marital Status</td>
                            <td className="text-foreground">
                              {selectedDonor[14]}
                            </td>
                          </tr>
                        )}
                        {selectedDonor[17] && (
                          <tr className="border-b">
                            <td>Prefered Contect Method</td>
                            <td className="text-foreground">
                              {selectedDonor[17]}
                            </td>
                          </tr>
                        )}
                      </table>
                    </div>

                    <div>
                      <p className="text-foreground font-medium mb-1">
                        Medical Info
                      </p>

                      {selectedDonor[20] === "yes" && (
                        <li>
                          Has pre-existing medical conditions (e.g. Diabetes,
                          Thyroid, etc.)
                        </li>
                      )}
                      {selectedDonor[21] === "yes" && (
                        <li>Currently taking antibiotics</li>
                      )}
                      {selectedDonor[22] === "yes" && (
                        <li>Received vaccinations in the past four weeks?</li>
                      )}
                      {selectedDonor[23] === "yes" && (
                        <li>Has allergies to medicine or other substances</li>
                      )}
                      {selectedDonor[24] === "yes" && (
                        <li>Received COVID-19 vaccine</li>
                      )}
                      {selectedDonor[25] === "yes" && (
                        <li>
                          Got a tattoo or permanent makeup in the past six
                          months
                        </li>
                      )}
                    </div>
                  </div>
                )}
              </AlertDialogDescription>
              <Cross2Icon
                onClick={() => setOpen(!open)}
                className="h-5 w-5 top-4 right-4 absolute cursor-pointer"
              />
            </AlertDialogContent>
          </AlertDialog>

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
                    pageNumber ===
                      Math.ceil(filteredDonors.length / postsPerPage)
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
      )}
    </>
  );
};

export default DonorCard;
