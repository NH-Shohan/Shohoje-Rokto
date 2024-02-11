import criterias from "@/data/criterias.json";
import Image from "next/image";
import { PiSealCheckDuotone } from "react-icons/pi";

const Criteria = () => {
  return (
    <div className="relative h-[80vh]">
      <div className="w-2/3 h-2/3 rounded-full bg-primary blur-3xl opacity-10 dark:opacity-15 absolute bottom-2 -left-1/2 -z-50"></div>

      <div className="w-full flex flex-col items-center">
        <h1 className="text-center text-primary">Donor Eligibility Criteria</h1>
        <p className="w-2/3 text-center">
          Discover if you meet the criteria for blood donation and learn how to
          ensure a safe and successful donation. The following factors are
          commonly considered in eligibility criteria
        </p>
      </div>

      <div className="mt-5 z-50">
        <div className="flex gap-1 items-center text-primary">
          <PiSealCheckDuotone className="text-primary w-8 h-8" />
          <h3>Who Can Donate?</h3>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-5">
          {criterias.map((criteria, index) => (
            <div
              key={index}
              className="border border-red-400 dark:border-red-800 rounded-xl flex items-start p-5 gap-3 hover:bg-light hover:shadow-3xl transition-all group"
            >
              <Image
                src={criteria.icon}
                alt={`${criteria.title} icon`}
                className="w-8 h-8 text-primary"
                width={10}
                height={10}
              />
              <div className="flex flex-col gap-2">
                <h3 className="uppercase group-hover:text-primary">
                  {criteria.title}
                </h3>
                <p className="leading-5 dark:text-gray-400">{criteria.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Criteria;
