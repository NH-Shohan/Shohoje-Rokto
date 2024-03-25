import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import Image from "next/image";
import Link from "next/link";
import bdMap from "../../../public/assets/bdMap.svg";

const messages = [
  { message: "তুচ্ছ নয় রক্তদান, বাঁচাতে পারে একটি প্রাণ" },
  { message: "যদি হই রক্তদাতা, জয় করবো মানবতা" },
  { message: "প্রয়োজনে রক্তদিলে, মানসিক তৃপ্তি মিলে" },
  { message: "মানবতার টানে, ভয় নেই রক্তদানে" },
  { message: "জাতি ধর্ম নির্বিশেষে, রক্ত দিবো হেসে হেসে" },
  { message: "ভয় করলেই ভয়, সুই ফুটানো ব্যথার নয়" },
];

const Hero = () => {
  return (
    <div className="h-[calc(100vh-60px)] flex justify-center items-center flex-col relative">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-10 hidden dark:block"
        fill="white"
      />
      <div className="w-full h-full rounded-full bg-primary blur-3xl opacity-10 absolute -z-10"></div>
      <Image src={bdMap} alt="Map Image" className="h-full w-1/3" priority />

      {messages.map((message, index) => (
        <div
          key={index}
          className={`bg-light w-[25%] py-4  rounded-xl shadow-3xl border border-red-300 dark:border-red-800 absolute 
          ${index === 0 && "top-[15%] left-[5%]"} 
          ${index === 1 && "top-[15%] right-[5%]"}
          ${index === 2 && "top-[45%] left-[0%]"}
          ${index === 3 && "top-[45%] right-[0%]"}
          ${index === 4 && "bottom-[15%] left-[5%]"}
          ${index === 5 && "bottom-[15%] right-[5%]"}
          `}
        >
          {message.message.split(",").map((part, i) => (
            <p
              key={i}
              className="text-center text-xl text-primary dark:text-white"
            >
              {part.trim()}
            </p>
          ))}
        </div>
      ))}

      <Link href={"/donor-search"} className="z-50 absolute bottom-10">
        <Button variant="outline" size="lg">
          Search Donor
        </Button>
      </Link>
    </div>
  );
};

export default Hero;
