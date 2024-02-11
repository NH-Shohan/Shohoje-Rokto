"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import donationType from "../../../public/assets/donationType.png";

export const ContainerScroll = () => {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.09, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 0.3], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, -1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[75rem] flex items-center justify-center relative -my-32 -z-50"
      ref={containerRef}
    >
      <div
        className="w-full relative"
        style={{
          perspective: "700px",
        }}
      >
        <Card rotate={rotate} translate={translate} scale={scale} />
      </div>
    </div>
  );
};

export const Card = ({ rotate, scale }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#363636] p-6 bg-[#363636] rounded-[30px] shadow-2xl dark:shadow-white"
    >
      <div className="bg-white dark:bg-black h-full w-full rounded-2xl overflow-hidden p-4">
        <Image src={donationType} alt="Donation" className="w-full h-full" />
      </div>
    </motion.div>
  );
};
