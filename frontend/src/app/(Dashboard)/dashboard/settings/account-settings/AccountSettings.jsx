"use client";

import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { UserAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useState } from "react";
import DeletingAccount from "./DeletingAccount";
import PrivacySettings from "./PrivacySettings";

const AccountSettings = () => {
  const { currentUser } = UserAuth();
  const [checked, setChecked] = useState(true);

  const formContents = [
    {
      title: "Privacy Settings",
      subTitle: "Update your private informations",
      Component: <PrivacySettings />,
    },
    {
      title: "Be a Donor",
      subTitle: "Want to donate blood and save lifes?",
      Component: (
        <Link
          href={"/be-donor"}
          className="text-foreground hover:text-primary transition hover:underline"
        >
          Click to be a Donor
        </Link>
      ),
    },
    {
      title: "Available to Donate",
      subTitle: "Are you available for donation?",
      Component: (
        <Switch onChange={() => setChecked(!checked)} defaultChecked />
      ),
    },
    {
      title: "Request Deleting Account",
      subTitle: "Send a request to delete your account",
      Component: <DeletingAccount />,
    },
  ];

  const isDisplay =
    currentUser?.role === "donor"
      ? currentUser?.role === "guest"
        ? formContents.map((_, index) => index)
        : [0, 2, 3]
      : [0, 1, 3];

  return (
    <>
      {isDisplay.map((index) => (
        <div key={index}>
          <div className="grid grid-cols-3">
            <div className="w-80 grid-cols-auto">
              <h4 className="text-foreground">{formContents[index]?.title}</h4>
              <p className="text-sm">{formContents[index]?.subTitle}</p>
            </div>

            <div className="col-span-2">{formContents[index]?.Component}</div>
          </div>
          <Separator className="my-5 mb-8 w-full" />
        </div>
      ))}
    </>
  );
};

export default AccountSettings;
