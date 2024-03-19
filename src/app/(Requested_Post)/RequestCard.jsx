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
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import requestedPost from "../../data/requestedPost.json";
import FilterButton from "./FilterButton";

const isNewPost = (postedDate) => {
  const dateDifference = Date.now() - new Date(postedDate).getTime();
  const daysDifference = dateDifference / (1000 * 60 * 60 * 24);
  return daysDifference <= 3;
};

const RequestedCard = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSubdistrict, setSelectedSubdistrict] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const sortedPosts = requestedPost.sort((a, b) => {
    if (
      a.status.toLowerCase() === "needed" &&
      b.status.toLowerCase() !== "needed"
    ) {
      return -1;
    } else if (
      a.status.toLowerCase() !== "needed" &&
      b.status.toLowerCase() === "needed"
    ) {
      return 1;
    } else {
      return isNewPost(b.postedDate) - isNewPost(a.postedDate);
    }
  });

  const filteredPosts = sortedPosts.filter((post) => {
    return (
      (!selectedBloodGroup || post.bloodGroup === selectedBloodGroup) &&
      (!selectedDivision || post.division === selectedDivision) &&
      (!selectedDistrict || post.district === selectedDistrict) &&
      (!selectedSubdistrict || post.subdistrict === selectedSubdistrict)
    );
  });

  const resetFilteredPosts = () => {
    setSelectedBloodGroup("");
    setSelectedDivision("");
    setSelectedDistrict("");
    setSelectedSubdistrict("");
    setCurrentPage(1);
  };

  const postsPerPage = 9;
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentItems = filteredPosts.slice(firstPostIndex, lastPostIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container scroll-smooth">
      <div className="my-5 flex justify-between items-center">
        <h3 className="text-primary">Requested Blood Posts</h3>
        <div className="flex gap-2">
          <Link href="/request-blood">
            <Button>Request for blood</Button>
          </Link>
          <FilterButton
            onBloodGroupChange={(value) => setSelectedBloodGroup(value)}
            onDivisionChange={(value) => setSelectedDivision(value)}
            onDistrictChange={(value) => setSelectedDistrict(value)}
            onSubdistrictChange={(value) => setSelectedSubdistrict(value)}
            resetFilteredPosts={resetFilteredPosts}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {currentItems.map((post, index) => (
          <>
            <div
              key={index}
              className="relative group block p-2 h-full w-full"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.span
                    className="absolute inset-0 h-full w-full bg-light dark:bg-muted block rounded-2xl -z-10"
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

              <div className="border rounded-xl p-5 bg-white dark:bg-secondary relative group transition-all h-full w-full">
                {isNewPost(post.postedDate) &&
                  post.status.toLowerCase() === "needed" && (
                    <p className="absolute -top-2 left-5 bg-blue-500/20 text-blue-500 backdrop-blur-md px-2 rounded text-sm">
                      New
                    </p>
                  )}
                <div className="flex justify-between">
                  <div>
                    <p className="text-xl group-hover:text-primary">
                      {post.condition}
                    </p>
                    <p className="text-sm text-zinc-500">
                      Posted on {post.postedDate}
                    </p>
                  </div>
                  <p
                    className={`${
                      post.status.toLowerCase() === "needed"
                        ? "bg-green-600/20 text-green-700"
                        : "bg-red-600/20 text-primary"
                    } capitalize px-2 h-fit rounded text-sm`}
                  >
                    {post.status}
                  </p>
                </div>

                <div className="bg-secondary dark:bg-border w-full h-[1px] my-4"></div>

                <div className="flex gap-5">
                  <p className="border bg-transparent rounded-xl flex justify-center items-center w-2/5 text-[48px] text-primary dark:text-white uppercase font-medium dark:border-none dark:bg-light">
                    {post.bloodGroup}
                  </p>
                  <div className="capitalize">
                    <li>{post.division}</li>
                    <li>
                      {post.bagsQuantity > 1
                        ? post.bagsQuantity + " Bags"
                        : post.bagsQuantity + " Bag"}
                    </li>
                    <li>{post.phoneNumber}</li>
                    <li>{post.donationDate}</li>
                  </div>
                </div>

                <div className="bg-secondary dark:bg-border w-full h-[1px] my-4"></div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-zinc-500">
                    Posted by:{" "}
                    <span className="text-primary dark:text-foreground">
                      {post.requesterName}
                    </span>
                  </p>
                  <button className="p-0 m-0 text-primary hover:underline">
                    Want to Donate
                  </button>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
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
              length: Math.ceil(filteredPosts.length / postsPerPage),
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
                pageNumber === Math.ceil(filteredPosts.length / postsPerPage)
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
                    Math.ceil(filteredPosts.length / postsPerPage)
                  }
                />
              </PaginationItem>
            }
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default RequestedCard;
