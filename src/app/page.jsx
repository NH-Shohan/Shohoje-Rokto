"use client";
import { useEffect } from "react";
import Criteria from "./(home)/Criteria";
import Hero from "./(home)/Hero";

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
    </main>
  );
}
