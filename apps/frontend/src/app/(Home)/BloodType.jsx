import bloodTypes from "@/data/bloodType.json";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { PiDropDuotone } from "react-icons/pi";

const BloodType = () => {
  const groupSystem = bloodTypes.slice(0, 4);
  const rhSystem = bloodTypes.slice(4, 6);

  return (
    <div className="relative">
      <div className="w-2/3 h-2/3 rounded-full bg-primary blur-3xl opacity-10 dark:opacity-15 absolute bottom-5 left-0 -z-10"></div>

      <div className="w-full flex flex-col items-center">
        <h1 className="text-center text-primary">Understanding Blood Types</h1>
        <p className="w-2/3 text-center">
          Understanding blood types is crucial for safe and effective blood
          transfusions. Blood is categorized into different types based on the
          presence or absence of specific antigens and antibodies on the surface
          of red blood cells.
        </p>
      </div>

      <div className="mt-5">
        <div className="flex gap-1 items-center text-primary">
          <PiDropDuotone className="text-primary w-8 h-8" />
          <h3>Blood Types Explained</h3>
        </div>

        <div className="flex justify-between items-end">
          <h3 className="mt-3 text-foreground">ABO Blood Group System</h3>
          <Link
            href="/be-donor"
            className="text-green-600 hover:text-green-700 hover:underline flex gap-1 items-center text-lg"
          >
            Be Donor
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-5">
          {groupSystem.map((bloodType, index) => (
            <div
              key={index}
              className="border border-red-300 dark:border-red-800 rounded-xl flex items-start p-5 gap-3 hover:bg-light hover:shadow-3xl transition-all group bg-background"
            >
              <Image
                src={bloodType.icon}
                alt={`${bloodType.title} icon`}
                className="w-8 h-8 text-primary"
                width={10}
                height={10}
                priority
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground">
                  {bloodType.title.split(" ")[0]}{" "}
                  <span className="text-primary">
                    {bloodType.title.split(" ")[1]}
                  </span>
                </h3>
                <p className="leading-5 dark:text-gray-400">{bloodType.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="mt-8 text-foreground">Rh Blood Group System</h3>
        <p className="-mt-1">
          {
            "A person's Rh status is denoted by a plus (+) or minus (-) sign, suchas A+ or O-"
          }
        </p>

        <div className="mt-5 grid grid-cols-2 gap-5">
          {rhSystem.map((bloodType, index) => (
            <div
              key={index}
              className="border border-red-300 dark:border-red-800 rounded-xl flex items-start p-5 gap-3 hover:bg-light hover:shadow-3xl transition-all group bg-background"
            >
              <Image
                src={bloodType.icon}
                alt={`${bloodType.title} icon`}
                className="w-8 h-8 text-primary"
                width={10}
                height={10}
                priority
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground">
                  {bloodType.title.split("-")[0]}
                  {"-"}
                  <span className="text-primary">
                    {bloodType.title.split("-")[1]}
                  </span>
                </h3>
                <p className="leading-5 dark:text-gray-400">{bloodType.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BloodType;
