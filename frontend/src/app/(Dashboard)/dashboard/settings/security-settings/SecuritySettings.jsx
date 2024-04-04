"use client";

import { Separator } from "@/components/ui/separator";
import DeletingAccount from "./DeletingAccount";
import PrivacySettings from "./PrivacySettings";

const SecuritySettings = () => {
  const formContents = [
    {
      title: "Privacy Settings",
      subTitle: "Update your private informations",
      Component: <PrivacySettings />,
    },
    {
      title: "Request Deleting Account",
      subTitle: "Send a request to delete your account",
      Component: <DeletingAccount />,
    },
  ];

  return (
    <>
      {formContents.map((formContent, index) => (
        <div key={index}>
          <div className="grid grid-cols-3">
            <div className="w-80 grid-cols-auto">
              <h4 className="text-foreground">{formContent.title}</h4>
              <p className="text-sm">{formContent.subTitle}</p>
            </div>

            <div className="col-span-2">{formContent.Component}</div>
          </div>
          {index === 0 && <Separator className="my-5 mb-8 w-full" />}
        </div>
      ))}
    </>
  );
};

export default SecuritySettings;
