"use client";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Celebrate from "../../../public/assets/celebrate.gif";
import noData from "../../../public/assets/noData.svg";
import requestedPost from "../../data/requestedPost.json";
import FilterButton from "./FilterButton";
import PostAlert from "./PostAlert";
import RequestCard from "./RequestCard";
import RequestPagination from "./RequestPagination";

const RequestedContainer = () => {
  const [openFirstAlert, setOpenFirstAlert] = useState(false);
  const [openSecondAlert, setOpenSecondAlert] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSubdistrict, setSelectedSubdistrict] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState();
  const [iframeSrc, setIframeSrc] = useState("");

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  const handleDonateClick = () => {
    setOpenFirstAlert(false);
    setOpenSecondAlert(true);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isConfirmed) {
      const timer = setTimeout(() => {
        setOpenSecondAlert(false);
        setIsConfirmed(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isConfirmed]);

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
                <Label htmlFor="newPost" className="font-medium">
                  All New Post
                </Label>
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
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>

          {/* Confirmation Alert */}
          <AlertDialog open={openSecondAlert} onOpenChange={setOpenSecondAlert}>
            <AlertDialogContent>
              {!isConfirmed ? (
                <>
                  <div className="text-green-600 text-2xl mx-auto">
                    <div>Confirmation</div>
                  </div>

                  <p className="text-center mx-[5%]">
                    Your information will be sent to{" "}
                    <span className="text-primary">
                      {selectedPost?.requesterName}
                    </span>{" "}
                    and he will be able to contact you through you phone number.
                  </p>

                  <p className="text-primary text-center py-3 text-lg">
                    Are you sure you want to donate?
                  </p>
                </>
              ) : (
                <>
                  <div className="mx-auto">
                    <Image src={Celebrate} alt="Thank you image" width={170} />
                    <div className="text-center text-3xl py-4 text-primary">
                      Thank You!
                    </div>
                  </div>
                </>
              )}

              {!isConfirmed && (
                <div className="flex gap-2 justify-center w-full">
                  <Button
                    variant="outline"
                    className="w-1/3"
                    onClick={() => setOpenSecondAlert(!open)}
                  >
                    Cancel
                  </Button>
                  <Button className="w-1/3" onClick={handleConfirm}>
                    Confirm
                  </Button>
                </div>
              )}
            </AlertDialogContent>
          </AlertDialog>

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
              <AlertDialog
                open={openFirstAlert}
                onOpenChange={setOpenFirstAlert}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mb-5">
                  {currentItems.map((post, index) => (
                    <RequestCard
                      key={index}
                      index={index}
                      post={post}
                      setSelectedPost={setSelectedPost}
                      isNewPost={isNewPost}
                    />
                  ))}
                </div>
                <PostAlert
                  selectedPost={selectedPost}
                  iframeSrc={iframeSrc}
                  setOpenFirstAlert={setOpenFirstAlert}
                  handleDonateClick={handleDonateClick}
                />
              </AlertDialog>

              {filteredPosts.length > 9 && (
                <RequestPagination
                  currentPage={currentPage}
                  filteredPosts={filteredPosts}
                  postsPerPage={postsPerPage}
                  paginate={paginate}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </>
          )}
        </div>
      ) : null}
    </>
  );
};

export default RequestedContainer;
