"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { toast } from "sonner";
import OptionalInfo from "./OptionalInfo";
import RequiredInfo from "./RequiredInfo";

const GeneralSettings = () => {
  const [donorData, setDonorData] = useState({
    name: "",
    email: "",
    bloodGroup: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    optionalPhoneNumber: "",
    division: "",
    district: "",
    subdistrict: "",
    donatedBefore: "",
    lastDonationDate: "",
    maritalStatus: "",
    socialMediaLink: "",
    bio: "",
    contectMethod: "",
  });

  if (donorData.phoneNumber === "" && donorData.optionalPhoneNumber === "") {
  } else if (donorData.phoneNumber === donorData.optionalPhoneNumber) {
    toast.info("Same phone number", {
      description:
        "Phone number and optional phone number cannot be same! Please provide another phone number.",
      duration: 7500,
    });
  }

  const handleValueChange = (key, value) => {
    if (key === "division") {
      setDonorData((prevData) => ({
        ...prevData,
        [key]: value,
        district: "",
        subdistrict: "",
      }));
    } else if (key === "donatedBefore") {
      setDonorData((prevData) => ({
        ...prevData,
        [key]: value,
        lastDonationDate: "",
      }));
    } else {
      setDonorData((prevData) => ({ ...prevData, [key]: value }));
    }
  };

  const formContents = [
    {
      title: "Personal Information",
      subTitle: "Update your personal informations",
      Component: (
        <RequiredInfo
          donorData={donorData}
          handleValueChange={handleValueChange}
        />
      ),
    },
    {
      title: "Optional Informations",
      subTitle: "Update optional but important informations",
      Component: (
        <OptionalInfo
          donorData={donorData}
          handleValueChange={handleValueChange}
        />
      ),
    },
  ];

  const handleClickSave = () => {
    toast.success("Updated Successfully");
  };

  return (
    <div className="overflow-y-auto h-[calc(100vh-200px)] scrollbar-thin">
      {formContents.map((formContent, index) => (
        <div key={index} className="my-1">
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

      <div className="grid grid-cols-3">
        <div className="w-80 grid-cols-auto" />
        <div className="col-span-2">
          <Button
            variant="outline"
            onClick={handleClickSave}
            className="w-1/5 my-7"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
