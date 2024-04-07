"use client";

import { Separator } from "@/components/ui/separator";
import { UserAuth } from "@/context/AuthContext";

const DashBoardContainer = () => {
  const { currentUser } = UserAuth();

  return (
    <div>
      <h3 className="text-foreground">
        Hello,{" "}
        <span className="text-primary">
          {currentUser?.displayName.includes("(")
            ? currentUser?.displayName.split("(")[0]
            : currentUser?.displayName.trim().split(" ").pop()}
        </span>
      </h3>
      <p>Your overall informations</p>

      <Separator className="my-5" />
    </div>
  );
};

export default DashBoardContainer;
