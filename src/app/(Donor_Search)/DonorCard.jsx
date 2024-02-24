"use client";
import { Button } from "@/components/ui/button";
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

const DonorCard = ({ donors }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="grid grid-cols-4 mt-10">
      {donors.map(
        (
          { image, name, bloodGroup, availability, city, gender, age, type },
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
                height={0}
                className="mx-auto capitalize"
              />
              <p className="w-full flex gap-2 justify-center items-center">
                {name}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <PiSealCheckDuotone
                        className={
                          type === ("Certified" || "certified")
                            ? "text-green-600"
                            : type === ("Verified" || "verified")
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
                <p className="bg-light rounded-xl flex justify-center items-center w-1/2 text-[48px] text-primary dark:text-white uppercase">
                  {bloodGroup}
                </p>
                <div className="capitalize">
                  <li
                    className={
                      availability === ("available" || "Available")
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
  );
};

export default DonorCard;
