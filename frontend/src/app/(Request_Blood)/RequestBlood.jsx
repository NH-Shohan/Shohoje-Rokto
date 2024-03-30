"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  CalendarIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import flag from "../../../public/icons/flag.svg";
import areas from "../../data/bdLocation.json";

const RequestBlood = () => {
  const initialFormData = useMemo(
    () => ({
      requesterName: "",
      patientName: "",
      condition: "",
      bloodGroup: "",
      patientAge: "",
      gender: "",
      phoneNumber: "",
      division: "",
      district: "",
      subdistrict: "",
      hospitalName: "",
      mapLink: "",
      donationDate: null,
      bagsQuantity: "",
      extraInfo: "",
    }),
    []
  );

  const [openDivision, setOpenDivision] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openSubdistrict, setOpenSubdistrict] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("requestBlood");
      setFormData(storedData ? JSON.parse(storedData) : initialFormData);
    }
  }, [initialFormData]);

  useEffect(() => {
    setIsClient(true);

    if (isClient) {
      localStorage.setItem("requestBlood", JSON.stringify(formData));
    }

    const timeout = setTimeout(() => {
      localStorage.removeItem("requestBlood");
    }, 20 * 60 * 1000);

    return () => clearTimeout(timeout);
  }, [formData, isClient]);

  const handleValueChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const isAllFieldsFilled = () => {
    return (
      formData.requesterName &&
      formData.patientName &&
      formData.condition &&
      formData.bloodGroup &&
      formData.patientAge &&
      formData.gender &&
      formData.phoneNumber &&
      formData.division &&
      formData.district &&
      formData.subdistrict &&
      formData.hospitalName &&
      formData.donationDate &&
      formData.bagsQuantity
    );
  };

  const handleClickSubmit = () => {
    if (isAllFieldsFilled()) {
      toast.success("Form submitted successfully!");
    } else {
      const requiredFields = [
        "requesterName",
        "patientName",
        "condition",
        "bloodGroup",
        "patientAge",
        "gender",
        "phoneNumber",
        "division",
        "district",
        "subdistrict",
        "hospitalName",
        "donationDate",
        "bagsQuantity",
      ];

      requiredFields.forEach((field) => {
        if (!formData[field]) {
          const fieldType =
            [
              "requesterName",
              "patientName",
              "condition",
              "hospitalName",
            ].includes(field) || ["phoneNumber"].includes(field)
              ? "provide"
              : "select";
          toast.warning(
            `Please ${fieldType} ${field
              .replace(/([A-Z])/g, " $1")
              .toLowerCase()}.`
          );
        } else if (!formData[field]) {
          toast.warning("Please fill up all the fields.");
        }
      });
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return (
    <>
      {isClient ? (
        <div className="max-w-3xl mx-auto py-10 container text-foreground">
          <h3 className="mb-5 text-primary">Blood Request Form</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-primary">
                Please fill up the form carefully for requesting blood.
              </p>
              <Link
                href="/be-donor"
                className="text-green-600 hover:text-green-700 hover:underline flex gap-1 items-center"
              >
                Be Donor
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>

            <Input
              type="text"
              placeholder="Requester's Name"
              id="requesterName"
              name="requesterName"
              value={formData.requesterName}
              onChange={(e) =>
                handleValueChange("requesterName", e.target.value)
              }
              required
            />

            <Input
              type="text"
              placeholder="Patient's Name"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={(e) => handleValueChange("patientName", e.target.value)}
              required
            />

            <Input
              type="text"
              placeholder="Reason for Blood Request"
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={(e) => handleValueChange("condition", e.target.value)}
              required
            />

            <div className="flex gap-2">
              <Select
                value={formData.bloodGroup}
                onValueChange={(value) =>
                  handleValueChange("bloodGroup", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Blood Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Blood Groups</SelectLabel>
                    <SelectSeparator />
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Input
                type="text"
                placeholder="Patient's Age"
                id="patientAge"
                name="patientAge"
                value={formData.patientAge}
                onChange={(e) => {
                  let patientAge = e.target.value.trim();
                  if (patientAge >= 100) {
                    e.target.value = "";
                    toast.warning("Please provide valid age!");
                    return;
                  } else if (patientAge > 0) {
                    handleValueChange("patientAge", e.target.value);
                  }
                }}
                required
              />
            </div>

            <div className="flex gap-2">
              <Select
                value={formData.gender}
                onValueChange={(value) => handleValueChange("gender", value)}
              >
                <SelectTrigger className="justify-start w-1/2">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Gender</SelectLabel>
                    <SelectSeparator />
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <div className="flex w-1/2">
                <div className="flex border px-3 gap-2 rounded-tl-md rounded-bl-md items-center bg-white dark:bg-background">
                  <Image
                    src={flag}
                    alt="flag bd icon"
                    width={22}
                    height={22}
                    priority
                  />
                  <p className="mr-3 text-sm">+880</p>
                </div>
                <Input
                  className="rounded-tl-none rounded-bl-none border-l-0"
                  type="text"
                  placeholder="Phone Number"
                  id="phoneNumber"
                  name="phoneNumber"
                  defaultValue={formData.phoneNumber}
                  onChange={(e) => {
                    let phoneNumber = e.target.value.trim();

                    if (phoneNumber.startsWith("0")) {
                      phoneNumber = phoneNumber.substring(1);
                    } else if (!/^\d*$/.test(phoneNumber)) {
                      e.target.value = "";
                      toast.warning("Only numbers are allowed.");
                      return;
                    } else if (
                      phoneNumber.length === 0 ||
                      (phoneNumber.startsWith("1") && phoneNumber.length === 10)
                    ) {
                      handleValueChange("phoneNumber", phoneNumber);
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex gap-2">
              {/* Division */}
              <Popover open={openDivision} onOpenChange={setOpenDivision}>
                <PopoverTrigger asChild>
                  <Button
                    variant="dropdown"
                    role="combobox"
                    aria-expanded={openDivision}
                    className="pl-2.5 bg-white dark:bg-background"
                  >
                    <div className="flex justify-between items-center w-full font-normal capitalize">
                      {formData.division
                        ? formData.division
                        : "Donation Division"}
                      <ChevronDownIcon className="-mr-1 h-5 w-5 shrink-0 opacity-50" />
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search Areas" className="h-9" />
                    <CommandGroup>
                      {areas.divisions.map((division, index) => (
                        <CommandItem
                          key={index}
                          value={division.name}
                          onSelect={(currentValue) => {
                            handleValueChange("division", currentValue);
                            setFormData((prevData) => ({
                              ...prevData,
                              division: currentValue,
                            }));
                            setOpenDivision(false);
                          }}
                        >
                          {division.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* District */}
              <Popover open={openDistrict} onOpenChange={setOpenDistrict}>
                <PopoverTrigger asChild>
                  <Button
                    variant="dropdown"
                    role="combobox"
                    aria-expanded={openDistrict}
                    className="pl-2.5 bg-white dark:bg-background"
                  >
                    <div className="flex justify-between items-center w-full font-normal capitalize">
                      {formData.district
                        ? formData.district
                        : "Donation District"}
                      <ChevronDownIcon className="-mr-1 h-5 w-5 shrink-0 opacity-50" />
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    {formData.division && (
                      <CommandInput
                        placeholder="Search Areas"
                        className="h-9"
                      />
                    )}
                    <CommandGroup>
                      <ScrollArea
                        className={`${
                          formData.division ? "h-[240px]" : "h-full"
                        }`}
                      >
                        {formData.division ? (
                          areas.divisions
                            .find(
                              (division) =>
                                division.name.toLocaleLowerCase() ===
                                formData.division.toLocaleLowerCase()
                            )
                            ?.districts.map((district, index) => (
                              <CommandItem
                                key={index}
                                value={district.name}
                                onSelect={(currentValue) => {
                                  setFormData((prevData) => ({
                                    ...prevData,
                                    district: currentValue,
                                  }));
                                  setOpenDistrict(false);
                                }}
                              >
                                {district.name}
                              </CommandItem>
                            ))
                        ) : (
                          <div className="text-center text-primary text-sm py-3 px-6">
                            Select Your Division
                          </div>
                        )}
                      </ScrollArea>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* Sub District */}
              <Popover open={openSubdistrict} onOpenChange={setOpenSubdistrict}>
                <PopoverTrigger asChild>
                  <Button
                    variant="dropdown"
                    role="combobox"
                    aria-expanded={openSubdistrict}
                    className="pl-2.5 bg-white dark:bg-background"
                  >
                    <div className="flex justify-between items-center w-full font-normal capitalize">
                      {formData.subdistrict
                        ? formData.subdistrict
                        : "Donation Sub District"}
                      <ChevronDownIcon className="-mr-1 h-5 w-5 shrink-0 opacity-50" />
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    {formData.district && (
                      <CommandInput
                        placeholder="Search Areas"
                        className="h-9"
                      />
                    )}
                    <CommandGroup>
                      <ScrollArea
                        className={`${
                          formData.district ? "h-[240px]" : "h-full"
                        }`}
                      >
                        {formData.district ? (
                          areas.divisions
                            .find(
                              (division) =>
                                division.name.toLocaleLowerCase() ===
                                formData.division.toLocaleLowerCase()
                            )
                            ?.districts.find(
                              (district) =>
                                district.name.toLocaleLowerCase() ===
                                formData.district.toLocaleLowerCase()
                            )
                            ?.subdistricts.map((subdistrict, index) => (
                              <CommandItem
                                key={index}
                                value={subdistrict}
                                onSelect={(currentValue) => {
                                  setFormData((prevData) => ({
                                    ...prevData,
                                    subdistrict: currentValue,
                                  }));
                                  setOpenSubdistrict(false);
                                }}
                              >
                                {subdistrict}
                              </CommandItem>
                            ))
                        ) : (
                          <div className="text-center text-primary text-sm py-3 px-6">
                            Select Your District
                          </div>
                        )}
                      </ScrollArea>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <Input
              type="text"
              placeholder="Hospital or Medical Facility Name"
              id="hospitalName"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={(e) =>
                handleValueChange("hospitalName", e.target.value)
              }
              required
            />

            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"dropdown"}
                    className={cn(
                      "flex justify-start text-left font-normal pl-2 gap-2 bg-white dark:bg-background"
                    )}
                  >
                    <CalendarIcon className="h-5 w-auto pl-1" />
                    {formData.donationDate ? (
                      format(formData.donationDate, "PPP")
                    ) : (
                      <span>Donation Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="center">
                  <Calendar
                    mode="single"
                    onSelect={(date) => handleValueChange("donationDate", date)}
                    selected={formData.donationDate}
                    captionLayout="dropdown"
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                  />
                </PopoverContent>
              </Popover>

              <Input
                type="text"
                placeholder="Quantity of Blood Units (Bags)"
                id="bagsQuantity"
                name="bagsQuantity"
                defaultValue={formData.bagsQuantity}
                onChange={(e) => {
                  let bagsQuantity = e.target.value.trim();

                  if (!/^\d*$/.test(bagsQuantity)) {
                    e.target.value = "";
                    toast.warning("Only numbers are allowed.");
                    return;
                  } else if (bagsQuantity > 10) {
                    e.target.value = "";
                    toast.warning("Maximum 10 bags can be requested!");
                    return;
                  }

                  if (bagsQuantity.length > 0) {
                    handleValueChange("bagsQuantity", bagsQuantity);
                  }
                }}
                required
              />
            </div>

            <p className="text-sm text-primary">(Optional Information)</p>

            <Input
              type="url"
              placeholder="Hospital Google Map Link (Optional but helpful for donor)"
              id="mapLink"
              name="mapLink"
              value={formData.mapLink}
              onChange={(e) => handleValueChange("mapLink", e.target.value)}
            />

            <Textarea
              placeholder="Any Special Instructions or Additional Information"
              className="bg-white dark:bg-background"
              value={formData.extraInfo}
              onChange={(e) => handleValueChange("extraInfo", e.target.value)}
            />

            <div className="space-x-3 space-y-2">
              <Button variant="" className="w-1/4" onClick={handleClickSubmit}>
                Submit Request
              </Button>

              <Button variant="outline" className="w-1/4" onClick={resetForm}>
                Reset Form
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RequestBlood;
