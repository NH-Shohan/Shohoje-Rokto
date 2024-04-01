"use client";

import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { PiSealCheckDuotone } from "react-icons/pi";

const DonorCard = ({ donor, setSelectedDonor, setOpen, index }) => {
  const [hoveredIndex, setHoveredIndex] = useState();

  const handleSeeDetails = () => {
    setSelectedDonor(donor);
    setOpen(true);
  };

  return (
    <div
      className="relative block p-2 h-full w-full"
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

      <div className="border bg-white rounded-2xl p-6 space-y-3 transition-all dark:bg-secondary relative group">
        <Image
          src={
            donor.image
              ? donor.image
              : donor.gender === "male"
              ? "/assets/avatarMan.svg"
              : "/assets/avatarWoman.svg"
          }
          alt="user image"
          width={120}
          height={120}
          className="mx-auto rounded-full border"
          priority
        />
        <p className="w-full flex gap-2 justify-center items-center text-foreground text-lg">
          <p className="group-hover:text-primary dark:group-hover:text-foreground">
            {donor.name}
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <PiSealCheckDuotone
                  className={
                    donor.type === "Certified" || donor.type === "certified"
                      ? "text-green-600"
                      : donor.type === "Verified" || donor.type === "verified"
                      ? "text-blue-500"
                      : "text-primary"
                  }
                />
              </TooltipTrigger>
              <TooltipContent className="flex flex-col gap-1">
                <div className="flex items-center gap-1 text-green-600">
                  <PiSealCheckDuotone />
                  Certified
                </div>
                <div className="flex items-center gap-1 text-blue-500">
                  <PiSealCheckDuotone />
                  Verified
                </div>
                <div className="flex items-center gap-1 text-primary">
                  <PiSealCheckDuotone />
                  Normal
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </p>

        <div className="flex gap-5">
          <p className="bg-light dark:bg-transparent dark:border rounded-xl flex justify-center items-center w-1/2 text-[48px] text-primary dark:text-white uppercase font-medium">
            {donor.bloodGroup}
          </p>
          <div className="capitalize">
            <li
              className={
                donor.availability.toLowerCase() === "available"
                  ? "text-green-600"
                  : "text-primary"
              }
            >
              {donor.availability}
            </li>
            <li>{donor.division}</li>
            <li>{donor.gender}</li>
            <li>Age {donor.age}</li>
          </div>
        </div>

        <AlertDialogTrigger className="w-full">
          <p
            className="border border-primary bg-white dark:bg-secondary hover:bg-primary dark:hover:bg-primary hover:text-primary-foreground transition-all h-9 px-4 rounded-lg flex items-center justify-center text-sm"
            onClick={() => handleSeeDetails(donor)}
          >
            See Details
          </p>
        </AlertDialogTrigger>
      </div>
    </div>
  );
};

export default DonorCard;
