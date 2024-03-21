"use client";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import noData from "../../../public/assets/noData.svg";
import requestedPost from "../../data/requestedPost.json";
import FilterButton from "./FilterButton";
import PostAlert from "./PostAlert";
import RequestCard from "./RequestCard";
import RequestPagination from "./RequestPagination";

const RequestedContainer = () => {
  const [open, setOpen] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSubdistrict, setSelectedSubdistrict] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState();
  const [iframeSrc, setIframeSrc] = useState("");

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
                setCurrentPage={setCurrentPage}
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
                  setOpen={setOpen}
                  iframeSrc={iframeSrc}
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
