import Image from "next/image";
import injection from "../../../public/icons/injection.svg";
import processes from "../../data/donationProcess";

const DonationProcess = () => {
  return (
    <div className="relative mt-10">
      <div className="w-2/3 h-2/3 rounded-full bg-primary blur-3xl opacity-10 dark:opacity-15 absolute bottom-2 -left-1/2 -z-10"></div>

      <div className="w-full flex flex-col items-center">
        <h1 className="text-center text-primary">The Donation Process</h1>
        <p className="w-2/3 text-center">
          Understand the step-by-step process of blood donation and learn what
          to expect before, during, and after your donation. The blood donation
          process is a well-organized and safe procedure.
        </p>
      </div>

      <div className="mt-5">
        <div className="flex gap-1 items-center text-primary">
          <Image src={injection} alt="Injection icon" />
          <h3>Blood Donation Procedure</h3>
        </div>
      </div>

      <div>
        {processes.map((process, index) => (
          <div
            key={index}
            className="flex justify-between items-start gap-12 my-16 relative"
          >
            {index !== 4 && (
              <div className="h-full w-[2px] bg-red-200 dark:bg-primary rounded-full absolute right-1/2 top-12"></div>
            )}
            {index % 2 === 0 ? (
              <>
                <div className="w-1/2 flex justify-end">
                  <Image
                    src={process.image}
                    alt="image"
                    width={250}
                    height={250}
                  />
                </div>
                <Image
                  src={process.icon}
                  alt={`${process.title} icon`}
                  width={40}
                  height={40}
                />
                <div className="w-1/2 flex justify-start">
                  <div className="w-2/3">
                    <h3 className="text-primary">{process.title}</h3>
                    <p>{process.desc}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-1/2 flex justify-end text-right">
                  <div className="w-2/3">
                    <h3 className="text-primary">{process.title}</h3>
                    <p>{process.desc}</p>
                  </div>
                </div>
                <Image
                  src={process.icon}
                  alt={`${process.title} icon`}
                  width={40}
                  height={40}
                />
                <div className="w-1/2 flex justify-start">
                  <Image
                    src={process.image}
                    alt="image"
                    width={250}
                    height={250}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationProcess;
