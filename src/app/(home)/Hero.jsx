import Image from "next/image";
import bdMap from "../../../public/bdMap.svg";

const Hero = () => {
  return (
    <div className="h-[calc(100vh-60px)] flex justify-center items-center relative">
      <div className="w-full h-full rounded-full bg-primary blur-3xl opacity-10 absolute"></div>
      <Image src={bdMap} alt="Map Image" className="h-full w-1/3" />
      <div className="bg-light w-[25%] py-4  rounded-xl shadow-3xl border absolute top-[15%] left-[5%]">
        <p className="text-center text-xl text-primary">
          তুচ্ছ নয় রক্তদান, <br />
          বাঁচাতে পারে একটি প্রাণ
        </p>
      </div>
      <div className="bg-light w-[25%] py-4  rounded-xl shadow-3xl border absolute top-[15%] right-[5%]">
        <p className="text-center text-xl text-primary">
          যদি হই রক্তদাতা, <br />
          জয় করবো মানবতা
        </p>
      </div>
      <div className="bg-light w-[25%] py-4  rounded-xl shadow-3xl border absolute top-[45%] right-[0%]">
        <p className="text-center text-xl text-primary">
          যদি হই রক্তদাতা, <br />
          জয় করবো মানবতা
        </p>
      </div>
      <div className="bg-light w-[25%] py-4  rounded-xl shadow-3xl border absolute top-[45%] left-[0%]">
        <p className="text-center text-xl text-primary">
          যদি হই রক্তদাতা, <br />
          জয় করবো মানবতা
        </p>
      </div>
      <div className="bg-light w-[25%] py-4  rounded-xl shadow-3xl border absolute bottom-[15%] left-[5%]">
        <p className="text-center text-xl text-primary">
          তুচ্ছ নয় রক্তদান, <br />
          বাঁচাতে পারে একটি প্রাণ
        </p>
      </div>
      <div className="bg-light w-[25%] py-4  rounded-xl shadow-3xl border absolute bottom-[15%] right-[5%]">
        <p className="text-center text-xl text-primary">
          যদি হই রক্তদাতা, <br />
          জয় করবো মানবতা
        </p>
      </div>
    </div>
  );
};

export default Hero;
