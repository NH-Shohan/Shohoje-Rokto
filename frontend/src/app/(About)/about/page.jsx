"use client";
import MovingCards from "@/app/(Home)/MovingCards";
import ContainerScroll from "@/components/ui/ContainerScroll";
import Footer from "@/components/ui/footer";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import FAQ from "../FAQ";
import WhyDetails from "../WhyDetails";

const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.04, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.03, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.02, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.01, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <>
      <div
        className="h-[200vh] w-full rounded-md relative pt-40 overflow-clip"
        ref={ref}
      >
        <GoogleGeminiEffect
          pathLengths={[
            pathLengthFirst,
            pathLengthSecond,
            pathLengthThird,
            pathLengthFourth,
            pathLengthFifth,
          ]}
        />
      </div>
      <ContainerScroll />
      <WhyDetails />
      <FAQ />
      <MovingCards direction={"right"} />
      <MovingCards direction={"left"} />
      <Footer />
    </>
  );
};

export default About;
