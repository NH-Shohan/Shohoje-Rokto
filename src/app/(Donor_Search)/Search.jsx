"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import * as React from "react";
import { PiSealCheckDuotone } from "react-icons/pi";
import age from "../../../public/icons/age.svg";
import bloodDrop from "../../../public/icons/bloodDrop.svg";
import check from "../../../public/icons/check.svg";
import gender from "../../../public/icons/gender.svg";
import location from "../../../public/icons/location.svg";

const areas = [
  {
    value: "dhaka",
    label: "Dhaka",
  },
  {
    value: "comilla",
    label: "Comilla",
  },
  {
    value: "barisal",
    label: "Barisal",
  },
  {
    value: "chittagong",
    label: "Chittagong",
  },
  {
    value: "khulna",
    label: "Khulna",
  },
  {
    value: "mymensingh",
    label: "Mymensingh",
  },
  {
    value: "rajshahi",
    label: "Rajshahi",
  },
  {
    value: "rangpur",
    label: "Rangpur",
  },
  {
    value: "sylhet",
    label: "Sylhet",
  },
];

const Search = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <>
      <div className="bg-white dark:bg-secondary mt-5 p-4 rounded-2xl border flex justify-between gap-4 mx-20">
        <Select>
          <SelectTrigger className="justify-start" icon={bloodDrop}>
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

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="dropdown"
              role="combobox"
              aria-expanded={open}
              className="pl-2.5"
            >
              <Image
                src={location}
                alt="blood drop icon"
                width={20}
                height={20}
              />
              <div className="flex justify-between items-center w-full font-normal">
                {value
                  ? areas.find((framework) => framework.value === value)?.label
                  : "Select Area"}
                <ChevronDownIcon className="ml-2 h-5 w-5 shrink-0 opacity-50" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Areas" className="h-9" />
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {areas.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {framework.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-5 w-5",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Select>
          <SelectTrigger className="justify-start" icon={gender}>
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Gender</SelectLabel>
              <SelectSeparator />
              <SelectItem value="A+">Male</SelectItem>
              <SelectItem value="A-">Female</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="justify-start" icon={age}>
            <SelectValue placeholder="Age" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Ages</SelectLabel>
              <SelectSeparator />
              <SelectItem value="range1">17 - 25</SelectItem>
              <SelectItem value="range2">26 - 35</SelectItem>
              <SelectItem value="range3">36 - 50</SelectItem>
              <SelectItem value="range4">52 - 60</SelectItem>
              <SelectItem
                value="range5"
                className="text-primary hover:text-primary focus:text-primary"
              >
                61 - 70
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="justify-start" icon={check}>
            <SelectValue placeholder="Available" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Availability</SelectLabel>
              <SelectSeparator />
              <SelectItem
                value="Available"
                className="text-green-600 hover:text-green-600 focus:text-green-600"
              >
                Available
              </SelectItem>
              <SelectItem
                value="Unavailable"
                className="text-primary hover:text-primary focus:text-primary"
              >
                Unavailable
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="mx-20 mt-1 flex gap-6 justify-center">
        <div className="flex items-center gap-1 text-primary text-sm">
          <PiSealCheckDuotone />
          <p>
            Did not donated yet <sub className="text-xs">(Normal)</sub>
          </p>
        </div>
        <div className="flex items-center gap-1 text-blue-500 text-sm">
          <PiSealCheckDuotone />
          <p>
            Donated 3 times <sub className="text-xs">(Verified)</sub>
          </p>
        </div>
        <div className="flex items-center gap-1 text-green-600 text-sm">
          <PiSealCheckDuotone />
          <p>
            Donated more than 3 times <sub className="text-xs">(Certified)</sub>
          </p>
        </div>
      </div>
    </>
  );
};

export default Search;
