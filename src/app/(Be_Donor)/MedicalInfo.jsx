import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const MedicalInfo = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <p className="text-primary font-medium">
          Please fill up the form carefully for being a donor.
        </p>
        <Link
          href="/request-blood"
          className="text-green-600 hover:text-green-700 hover:underline flex gap-1 items-center"
        >
          Request blood
          <ArrowRightIcon className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default MedicalInfo;
