"use client";
import { ContainerScroll } from "@/components/ui/ContainerScroll";
import { useEffect } from "react";
import BloodType from "./(home)/BloodType";
import Criteria from "./(home)/Criteria";
import DonationProcess from "./(home)/DonationProcess";
import Hero from "./(home)/Hero";
import MovingCards from "./(home)/MovingCards";

export default function Home() {
  useEffect(() => {
    const handleContextmenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextmenu);
    return function cleanup() {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);
  return (
    <main className="container">
      <Hero />

      <div className="my-10"></div>

      <Criteria />
      <ContainerScroll />
      <BloodType />

      <div className="my-10"></div>

      <DonationProcess />
      <MovingCards />
    </main>
  );
}
