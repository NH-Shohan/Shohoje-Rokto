import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { PiSealCheckDuotone } from "react-icons/pi";

const DonorCard = ({
  image,
  name,
  bloodGroup,
  availability,
  city,
  gender,
  age,
}) => {
  return (
    <div className="border bg-white rounded-2xl p-6 flex flex-col gap-3 hover:border-primary transition dark:bg-secondary">
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
              <PiSealCheckDuotone />
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
  );
};

export default DonorCard;
