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
import { cn } from "@/lib/utils";
import { CalendarIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import flag from "../../../../../../public/icons/flag.svg";
import areas from "../../../../../data/bdLocation.json";

const RequiredInfo = ({ donorData, handleValueChange }) => {
  const [openDivision, setOpenDivision] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openSubdistrict, setOpenSubdistrict] = useState(false);

  return (
    <div className="space-y-2 text-foreground">
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
                "flex justify-start text-left font-normal pl-2 gap-3 bg-white dark:bg-neutral-900",
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
          <div className="flex border px-3 gap-1 rounded-tl-md rounded-bl-md items-center bg-white dark:bg-neutral-900">
            <Image src={flag} alt="flag bd icon" width={22} height={22} />
            <p className="mr-4 text-sm">+880</p>
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
              className="pl-2.5 bg-white dark:bg-neutral-900"
            >
              <div className="flex justify-between items-center w-full font-normal capitalize">
                {donorData.division ? donorData.division : "Select Division"}
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
              className="pl-2.5 bg-white dark:bg-neutral-900"
            >
              <div className="flex justify-between items-center w-full font-normal capitalize">
                {donorData.district ? donorData.district : "Select District"}
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
                  className={`${donorData.division ? "h-[240px]" : "h-full"}`}
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
              className="pl-2.5 bg-white dark:bg-neutral-900"
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
                  className={`${donorData.district ? "h-[240px]" : "h-full"}`}
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
          onValueChange={(value) => handleValueChange("donatedBefore", value)}
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
    </div>
  );
};

export default RequiredInfo;
