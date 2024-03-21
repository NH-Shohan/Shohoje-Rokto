"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Switch } from "@/components/ui/switch";
import { Cross2Icon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import noData from "../../../public/assets/noData.svg";
import requestedPost from "../../data/requestedPost.json";
import FilterButton from "./FilterButton";

const RequestedCard = () => {
  const [open, setOpen] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSubdistrict, setSelectedSubdistrict] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isNewPost = (postedDate) => {
    const dateDifference = Date.now() - new Date(postedDate).getTime();
    const daysDifference = dateDifference / (1000 * 60 * 60 * 24);
    return daysDifference <= 3;
  };

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
      (!selectedSubdistrict || post.subdistrict === selectedSubdistrict) &&
      (!isChecked || isNewPost(post.postedDate))
    );
  });

  const resetFilteredPosts = () => {
    setSelectedBloodGroup("");
    setSelectedDivision("");
    setSelectedDistrict("");
    setSelectedSubdistrict("");
    setCurrentPage(1);
    setChecked(false);
  };

  const postsPerPage = 9;
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentItems = filteredPosts.slice(firstPostIndex, lastPostIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSelectPost = (post) => {
    setSelectedPost(post);
  };

  const [iframeSrc, setIframeSrc] = useState("");

  useEffect(() => {
    if (selectedPost) {
      const regex = /@(-?\d+\.\d+),(-?\d+\.\d+),/;
      const match = selectedPost.mapLink.match(regex);
      if (match) {
        const latitude = match[1];
        const longitude = match[2];
        const zoom = "17";

        setIframeSrc(
          `https://maps.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`
        );
      } else {
        toast.info("Showing you the possible hospital location.", {
          duration: 6000,
        });
      }
    }
  }, [selectedPost]);

  return (
    <>
      {isClient ? (
        <div className="container scroll-smooth">
          <div className="my-5 mx-2 flex justify-between items-center">
            <h3 className="text-primary">Requested Blood Posts</h3>
            <div className="flex gap-3">
              <Link href="/request-blood">
                <Button>Request for blood</Button>
              </Link>
              <div className="flex items-center space-x-2 border border-primary rounded-md px-2 py-1.5">
                <Label htmlFor="newPost">All New Post</Label>
                <Switch
                  id="newPost"
                  checked={isChecked}
                  onCheckedChange={setChecked}
                />
              </div>
              <FilterButton
                onBloodGroupChange={(value) => setSelectedBloodGroup(value)}
                onDivisionChange={(value) => setSelectedDivision(value)}
                onDistrictChange={(value) => setSelectedDistrict(value)}
                onSubdistrictChange={(value) => setSelectedSubdistrict(value)}
                resetFilteredPosts={resetFilteredPosts}
              />
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-[calc(100vh-174px)] w-full relative">
              <h1 className="font-normal text-primary absolute top-[10%]">
                Ops! No post for donation 😔
              </h1>
              <div className="relative w-[100%] h-[80%]">
                <Image src={noData} alt="No data Found Image" fill />
              </div>
            </div>
          ) : (
            <>
              <AlertDialog open={open} onOpenChange={setOpen}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mb-5">
                  {currentItems.map((post, index) => (
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
                          <p className="border bg-transparent rounded-xl flex justify-center items-center w-2/5 text-[48px] text-primary dark:text-white uppercase font-medium">
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

                          <AlertDialogTrigger>
                            <p
                              onClick={() => handleSelectPost(post)}
                              className="p-0 m-0 text-primary hover:underline"
                            >
                              More Details
                            </p>
                          </AlertDialogTrigger>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <AlertDialogContent>
                  <div className="space-y-3 text-sm">
                    <div className="space-y-1">
                      <div className="text-primary text-2xl font-medium">
                        {selectedPost?.condition}
                      </div>
                      <div className="flex gap-2 text-muted-foreground">
                        <p>Posted on {selectedPost?.postedDate}</p>
                        <p
                          className={`${
                            selectedPost?.status.toLowerCase() === "needed"
                              ? "bg-green-600/20 text-green-700"
                              : "bg-red-600/20 text-primary"
                          } capitalize px-2 h-fit rounded text-sm`}
                        >
                          {selectedPost?.status}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-end">
                      <p className="font-medium text-foreground">Information</p>
                      <Button variant="outline">Want to Donate</Button>
                    </div>

                    <table className="table-auto w-full text-left border text-zinc-500">
                      <tbody>
                        <tr className="border-y">
                          <td>{"Requester's Name"}</td>
                          <td className="text-foreground border-l pl-3">
                            {selectedPost?.requesterName}
                          </td>
                        </tr>
                        <tr className="border-y">
                          <td>{"Patient's Name"}</td>
                          <td className="text-foreground border-l pl-3">
                            {selectedPost?.patientName}
                          </td>
                        </tr>
                        <tr className="border-y">
                          <td>{"Patient's Age"}</td>
                          <td className="text-foreground border-l pl-3">
                            {selectedPost?.patientAge}
                          </td>
                        </tr>
                        <tr className="border-y">
                          <td>{"Patient's Gender"}</td>
                          <td className="text-foreground border-l pl-3">
                            {selectedPost?.gender}
                          </td>
                        </tr>
                        <tr className="border-y">
                          <td>{"Phone Number"}</td>
                          <td className="text-foreground border-l pl-3">
                            +880{selectedPost?.phoneNumber}
                          </td>
                        </tr>
                        <tr className="border-y">
                          <td>{"Donation Date"}</td>
                          <td className="text-foreground border-l pl-3">
                            {selectedPost?.donationDate}
                          </td>
                        </tr>
                        <tr className="border-y">
                          <td>{"Location"}</td>
                          <td className="text-foreground border-l pl-3">
                            {selectedPost?.subdistrict},{" "}
                            {selectedPost?.district}, {selectedPost?.division}
                          </td>
                        </tr>
                        <tr className="border-y">
                          <td>{"Hospital Name"}</td>
                          <td className="text-foreground border-l pl-3">
                            {selectedPost?.hospitalName}
                          </td>
                        </tr>
                        <tr className="border-y">
                          <td>{"Blood Group"}</td>
                          <td className="text-foreground border-l pl-3">
                            {selectedPost?.bloodGroup}
                          </td>
                        </tr>
                        <tr className="border-y">
                          <td>{"Reason for blood"}</td>
                          <td className="border-l pl-3 text-primary">
                            {selectedPost?.condition}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="mb-5">
                      <p className="text-foreground">
                        <span className="font-medium">Note:</span>{" "}
                        {selectedPost?.extraInfo}
                      </p>
                    </div>

                    <div className="w-full rounded overflow-hidden">
                      {selectedPost?.mapLink && iframeSrc ? (
                        <iframe
                          width="100%"
                          height="270"
                          src={iframeSrc}
                        ></iframe>
                      ) : (
                        <iframe
                          width="100%"
                          height="270"
                          src={`https://maps.google.com/maps?q=${selectedPost?.hospitalName}, ${selectedPost?.subdistrict}, ${selectedPost?.district}, ${selectedPost?.division}&z=14&output=embed`}
                        ></iframe>
                      )}
                    </div>
                  </div>

                  <Cross2Icon
                    onClick={() => setOpen(!open)}
                    className="h-5 w-5 top-4 right-4 absolute cursor-pointer text-zinc-500 hover:text-foreground"
                  />
                </AlertDialogContent>
              </AlertDialog>

              {filteredPosts.length > 9 && (
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
                          pageNumber ===
                            Math.ceil(filteredPosts.length / postsPerPage)
                        ) {
                          return (
                            <PaginationItem
                              key={index}
                              className="cursor-pointer"
                            >
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
              )}
            </>
          )}
        </div>
      ) : null}
    </>
  );
};

export default RequestedCard;
