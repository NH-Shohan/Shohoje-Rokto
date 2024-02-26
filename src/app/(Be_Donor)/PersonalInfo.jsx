import { Input } from "@/components/ui/input";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const PersonalInfo = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <p>Please fill up the form carefully for being a donor.</p>
        <Link
          href="/request-blood"
          className="text-green-600 hover:text-green-700 hover:underline flex gap-1 items-center"
        >
          Request blood
          <ArrowRightIcon className="w-5 h-5" />
        </Link>
      </div>

      <Input type="text" placeholder="Full Name" id={"name"} name="name" />
    </div>
  );
};

export default PersonalInfo;
