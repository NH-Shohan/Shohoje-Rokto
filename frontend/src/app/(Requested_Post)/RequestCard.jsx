"use client";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const RequestCard = ({ index, post, setSelectedPost, isNewPost }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const handleSelectPost = (post) => {
    setSelectedPost(post);
  };

  return (
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
            <p className="text-xl group-hover:text-primary text-foreground">
              {post.condition}
            </p>
            <p className="text-sm">Posted on {post.postedDate}</p>
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
          <p className="text-sm">
            Posted by:{" "}
            <span className="text-primary dark:text-secondary-foreground">
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
  );
};

export default RequestCard;
