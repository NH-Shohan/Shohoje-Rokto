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
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { useBeDonor } from "@/context/BeDonorContext";
import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  CalendarIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import flag from "../../../public/icons/flag.svg";
import areas from "../../data/bdLocation.json";

const PersonalInfo = ({ isComplete, currentStep, handleNext, stepsConfig }) => {
  const [openDivision, setOpenDivision] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openSubdistrict, setOpenSubdistrict] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { donorData: initialDonorData, setDonorData: setInitialDonorData } =
    useBeDonor();
  const [donorData, setDonorData] = useState(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("donorData");
      return storedData ? JSON.parse(storedData) : initialDonorData;
    }
    return initialDonorData;
  });

  useEffect(() => {
    if (donorData.phoneNumber === "" && donorData.optionalPhoneNumber === "") {
    } else if (donorData.phoneNumber === donorData.optionalPhoneNumber) {
      toast("Same phone number", {
        description:
          "Phone number and optional phone number cannot be same! Please provide another phone number.",
        duration: 7500,
      });
    }

    setIsClient(true);
    localStorage.setItem("donorData", JSON.stringify(donorData));

    const timeoutId = setTimeout(() => {
      localStorage.removeItem("donorData");
    }, 15 * 60 * 1000);

    return () => clearTimeout(timeoutId);
  }, [donorData]);

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

  const isAllFieldsFilled = () => {
    return (
      donorData.name &&
      donorData.email &&
      donorData.bloodGroup &&
      donorData.dateOfBirth &&
      donorData.gender &&
      donorData.phoneNumber &&
      donorData.division &&
      donorData.district &&
      donorData.subdistrict &&
      donorData.donatedBefore &&
      (donorData.donatedBefore === "no" || donorData.lastDonationDate)
    );
  };

  const handleClickNext = () => {
    if (isAllFieldsFilled()) {
      handleNext();
    } else {
      const requiredFields = [
        "name",
        "email",
        "bloodGroup",
        "dateOfBirth",
        "gender",
        "phoneNumber",
        "division",
        "district",
        "subdistrict",
        "donatedBefore",
      ];

      const allFieldsEmpty = requiredFields.every((field) => !donorData[field]);

      if (allFieldsEmpty) {
        toast.warning("Please fill up the required data to proceed.");
      } else {
        requiredFields.forEach((field) => {
          if (!donorData[field]) {
            const fieldType = ["name", "email", "phoneNumber"].includes(field)
              ? "provide"
              : "select";
            toast.warning(
              `Please ${fieldType} your ${field
                .replace(/([A-Z])/g, " $1")
                .toLowerCase()}.`
            );
          }
        });

        if (!donorData.donatedBefore) {
          toast.warning("Please specify if you have donated before.");
        } else if (
          donorData.donatedBefore === "yes" &&
          !donorData.lastDonationDate
        ) {
          toast.warning("Please select your last donation date.");
        }
      }
    }
  };

  return (
    <>
      {isClient ? (
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-primary">
              Please fill up the form carefully for being a donor.
            </p>
            <Link
              href="/request-blood"
              className="text-green-600 hover:text-green-700 hover:underline flex gap-1 items-center"
            >
              Request blood
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
          <Input
            type="text"
            placeholder="Full Name"
            id={"name"}
            name="name"
            defaultValue={donorData.name}
            onChange={(e) => handleValueChange("name", e.target.value)}
            required
          />

          <Input
            type="email"
            placeholder="Email"
            id={"email"}
            name="email"
            defaultValue={donorData.email}
            onChange={(e) => handleValueChange("email", e.target.value)}
            required
          />

          <div className="flex gap-2">
            <Select
              value={donorData.bloodGroup}
              onValueChange={(value) => handleValueChange("bloodGroup", value)}
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

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"dropdown"}
                  className={cn(
                    "flex justify-start text-left font-normal pl-2 gap-3 bg-white dark:bg-background",
                    !donorData.dateOfBirth && "text-foreground"
                  )}
                >
                  <CalendarIcon className="h-5 w-auto pl-1" />
                  {donorData.dateOfBirth ? (
                    format(donorData.dateOfBirth, "PPP")
                  ) : (
                    <span>Date Of Birth</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="center">
                <Calendar
                  mode="single"
                  onSelect={(date) =>
                    setDonorData((prevData) => ({
                      ...prevData,
                      dateOfBirth: date,
                    }))
                  }
                  selected={donorData.dateOfBirth}
                  captionLayout="dropdown"
                  fromYear={1900}
                  toYear={new Date().getFullYear() - 16}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex gap-2">
            <Select
              value={donorData.gender}
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
                <Image src={flag} alt="flag bd icon" width={22} height={22} />
                <p className="mr-3 text-sm">+880</p>
              </div>
              <Input
                className="rounded-tl-none rounded-bl-none border-l-0"
                type="text"
                placeholder="Phone Number"
                id="phoneNumber"
                name="phoneNumber"
                defaultValue={donorData.phoneNumber}
                onChange={(e) => {
                  let phoneNumber = e.target.value.trim();

                  if (phoneNumber.startsWith("0")) {
                    phoneNumber = phoneNumber.substring(1);
                  }

                  if (!/^\d*$/.test(phoneNumber)) {
                    e.target.value = "";
                    toast.warning("Only numbers are allowed.");
                    return;
                  }

                  if (
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
                    {donorData.division
                      ? donorData.division
                      : "Select Division"}
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
                          setDonorData((prevData) => ({
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
                    {donorData.district
                      ? donorData.district
                      : "Select District"}
                    <ChevronDownIcon className="-mr-1 h-5 w-5 shrink-0 opacity-50" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  {donorData.division && (
                    <CommandInput placeholder="Search Areas" className="h-9" />
                  )}
                  <CommandGroup>
                    <ScrollArea
                      className={`${
                        donorData.division ? "h-[240px]" : "h-full"
                      }`}
                    >
                      {donorData.division ? (
                        areas.divisions
                          .find(
                            (division) =>
                              division.name.toLocaleLowerCase() ===
                              donorData.division.toLocaleLowerCase()
                          )
                          ?.districts.map((district, index) => (
                            <CommandItem
                              key={index}
                              value={district.name}
                              onSelect={(currentValue) => {
                                setDonorData((prevData) => ({
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
                    {donorData.subdistrict
                      ? donorData.subdistrict
                      : "Select Sub District"}
                    <ChevronDownIcon className="-mr-1 h-5 w-5 shrink-0 opacity-50" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  {donorData.district && (
                    <CommandInput placeholder="Search Areas" className="h-9" />
                  )}
                  <CommandGroup>
                    <ScrollArea
                      className={`${
                        donorData.district ? "h-[240px]" : "h-full"
                      }`}
                    >
                      {donorData.district ? (
                        areas.divisions
                          .find(
                            (division) =>
                              division.name.toLocaleLowerCase() ===
                              donorData.division.toLocaleLowerCase()
                          )
                          ?.districts.find(
                            (district) =>
                              district.name.toLocaleLowerCase() ===
                              donorData.district.toLocaleLowerCase()
                          )
                          ?.subdistricts.map((subdistrict, index) => (
                            <CommandItem
                              key={index}
                              value={subdistrict}
                              onSelect={(currentValue) => {
                                setDonorData((prevData) => ({
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

          <div className="flex gap-2">
            <Select
              defaultValue={donorData.donatedBefore}
              onValueChange={(value) =>
                handleValueChange("donatedBefore", value)
              }
            >
              <SelectTrigger className="justify-start">
                <SelectValue placeholder="Did You Donated Before?" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {donorData.donatedBefore === "yes" && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"dropdown"}
                    className={cn(
                      "flex justify-start text-left font-normal pl-2 gap-3 bg-white dark:bg-background",
                      !donorData.lastDonationDate && "text-foreground"
                    )}
                  >
                    <CalendarIcon className="h-5 w-auto pl-1" />
                    {donorData.lastDonationDate ? (
                      format(donorData.lastDonationDate, "PPP")
                    ) : (
                      <span>Last Donation Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="center">
                  <Calendar
                    mode="single"
                    onSelect={(date) =>
                      setDonorData((prevData) => ({
                        ...prevData,
                        lastDonationDate: date,
                      }))
                    }
                    selected={donorData.lastDonationDate}
                    captionLayout="dropdown"
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>

          <p className="text-sm mt-3 text-primary">(Optional Information)</p>

          <div className="flex gap-2">
            <Select
              defaultValue={donorData.maritalStatus}
              onValueChange={(value) =>
                handleValueChange("maritalStatus", value)
              }
            >
              <SelectTrigger className="justify-start w-1/2">
                <SelectValue placeholder="Marital Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Marital Status</SelectLabel>
                  <SelectSeparator />
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="unmarried">Unmarried</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="flex w-1/2">
              <div className="flex border px-3 gap-2 rounded-tl-md rounded-bl-md items-center bg-white dark:bg-background">
                <Image src={flag} alt="flag bd icon" width={22} height={22} />
                <p className="mr-3 text-sm">+880</p>
              </div>
              <Input
                className="rounded-tl-none rounded-bl-none border-l-0"
                type="text"
                placeholder="Optional Phone Number"
                id={"optionalPhoneNumber"}
                name="optionalPhoneNumber"
                defaultValue={donorData.optionalPhoneNumber}
                onChange={(e) => {
                  let phoneNumber = e.target.value.trim();

                  if (phoneNumber.startsWith("0")) {
                    phoneNumber = phoneNumber.substring(1);
                  }

                  if (!/^\d*$/.test(phoneNumber)) {
                    e.target.value = "";
                    toast.warning("Only numbers are allowed.");
                    return;
                  }

                  if (
                    phoneNumber.length === 0 ||
                    (phoneNumber.startsWith("1") && phoneNumber.length <= 10)
                  ) {
                    handleValueChange("optionalPhoneNumber", phoneNumber);
                  }
                }}
              />
            </div>
          </div>

          <Input
            type="url"
            placeholder="Social Media Link"
            id={"socialMediaLink"}
            name="socialMediaLink"
            defaultValue={donorData.socialMediaLink}
            onChange={(e) =>
              handleValueChange("socialMediaLink", e.target.value)
            }
          />

          <Textarea
            placeholder="Type Your Bio Here"
            className="bg-white dark:bg-background"
            defaultValue={donorData.bio}
            onChange={(e) => handleValueChange("bio", e.target.value)}
          />

          <div>
            <p className="text-sm text-primary mb-1 dark:text-foreground">
              Preferred Contact Method
            </p>
            <RadioGroup
              defaultValue={donorData.contectMethod}
              onValueChange={(value) =>
                handleValueChange("contectMethod", value)
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="r1" />
                <Label htmlFor="r1">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phone" id="r2" />
                <Label htmlFor="r2">Phone</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sms" id="r3" />
                <Label htmlFor="r3">SMS</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex gap-4 mt-5">
            {!isComplete && (
              <>
                {currentStep !== stepsConfig.length && (
                  <Button
                    variant="outline"
                    onClick={handleClickNext}
                    className="w-1/5"
                  >
                    Next
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PersonalInfo;
