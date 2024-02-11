"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-2/3">
        <Image
          src={"/assets/404.svg"}
          alt="404 image"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <Button onClick={() => router.back()}>Go Back</Button>
    </div>
  );
}
