"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    setTimeout(() => {
      router.back();
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid items-center justify-center h-[calc(100vh-60px)]">
      <Image
        src={"/assets/404.svg"}
        alt="404 image"
        width={0}
        height={0}
        style={{ width: "80vh", height: "auto" }}
        priority
      />
      <div className="-mt-60">
        <p className="text-xl text-center text-foreground">Going Back In</p>
        <p className="text-center text-9xl text-primary font-bold">
          {countdown}
        </p>
      </div>
    </div>
  );
}
