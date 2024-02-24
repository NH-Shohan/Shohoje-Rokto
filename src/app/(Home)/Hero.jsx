import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import Image from "next/image";
import bdMap from "../../../public/assets/bdMap.svg";

const Hero = () => {
  return (
    <div className="h-[calc(100vh-60px)] flex justify-center items-center flex-col relative">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-10 hidden dark:block"
        fill="white"
      />
      <div className="w-full h-full rounded-full bg-primary blur-3xl opacity-10 absolute -z-10"></div>
      <Image src={bdMap} alt="Map Image" className="h-full w-1/3" />
      <div className="bg-light w-[25%] py-4  rounded-xl shadow-3xl border border-red-300 dark:border-red-800 absolute top-[15%] left-[5%]">
        <p className="text-center text-xl text-primary dark:text-white">
          তুচ্ছ নয় রক্তদান, <br />
          বাঁচাতে পারে একটি প্রাণ
        </p>
      </div>
      <div className="bg-light w-[25%] py-4  rounded-xl shadow-3xl border border-red-300 dark:border-red-800 absolute top-[15%] right-[5%]">
        <p className="text-center text-xl text-primary dark:text-white">
          যদি হই রক্তদাতা, <br />
          জয় করবো মানবতা
        </p>
      </div>
      <div className="bg-light w-[25%] py-4  rounded-xl shadow-3xl border border-red-300 dark:border-red-800 absolute top-[45%] right-[0%]">
        <p className="text-center text-xl text-primary dark:text-white">
          মানবতার টানে, <br />
          ভয় নেই রক্তদানে
        </p>
      </div>
      <div className="bg-light w-[25%] py-4  rounded-xl shadow-3xl border border-red-300 dark:border-red-800 absolute top-[45%] left-[0%]">
        <p className="text-center text-xl text-primary dark:text-white">
          প্রয়োজনে রক্তদিলে, <br />
          মানসিক তৃপ্তি মিলে
        </p>
      </div>
      <div className="bg-light w-[25%] py-4  rounded-xl shadow-3xl border border-red-300 dark:border-red-800 absolute bottom-[15%] left-[5%]">
        <p className="text-center text-xl text-primary dark:text-white">
          জাতি ধর্ম নির্বিশেষে, <br />
          রক্ত দিবো হেসে হেসে
        </p>
      </div>
      <div className="bg-light w-[25%] py-4  rounded-xl shadow-3xl border border-red-300 dark:border-red-800 absolute bottom-[15%] right-[5%]">
        <p className="text-center text-xl text-primary dark:text-white">
          ভয় করলেই ভয়, <br />
          সুই ফুটানো ব্যথার নয়
        </p>
      </div>

      <div className="z-50 absolute bottom-10">
        <Button variant="outline" size="lg">
          Search Donor
        </Button>
      </div>
    </div>
  );
};

export default Hero;
