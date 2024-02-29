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
import { useFilter } from "@/context/FilterContext";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronDownIcon, ResetIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import * as React from "react";
import { PiSealCheckDuotone } from "react-icons/pi";
import age from "../../../public/icons/age.svg";
import bloodDrop from "../../../public/icons/bloodDrop.svg";
import check from "../../../public/icons/check.svg";
import gender from "../../../public/icons/gender.svg";
import location from "../../../public/icons/location.svg";
import areas from "../../data/places.json";

const Search = () => {
  const [open, setOpen] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);
  const { filterValues, setFilterValues } = useFilter();

  const handleValueChange = (name, value) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  React.useEffect(() => {
    setIsClient(true);
    const storedData = localStorage.getItem("filterValues");
    if (storedData) {
      setFilterValues(JSON.parse(storedData));
    }
  }, [setFilterValues]);

  React.useEffect(() => {
    if (isClient) {
      localStorage.setItem("filterValues", JSON.stringify(filterValues));
    }
  }, [filterValues, isClient]);

  const resetLocalStorage = () => {
    localStorage.removeItem("filterValues");
    setFilterValues({
      bloodGroup: "",
      area: "",
      gender: "",
      age: "",
      availability: "",
    });
  };

  return (
    <>
      {isClient ? (
        <>
          <div className="bg-white dark:bg-secondary mt-5 p-4 rounded-2xl border flex justify-between gap-4 mx-20">
            <Select
              value={filterValues.bloodGroup}
              onValueChange={(value) => handleValueChange("bloodGroup", value)}
            >
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
                    priority
                  />
                  <div className="flex justify-between items-center w-full font-normal">
                    {filterValues.area
                      ? areas.find(
                          (framework) => framework.value === filterValues.area
                        )?.label
                      : "Select Area"}
                    <ChevronDownIcon className="ml-2 h-5 w-5 shrink-0 opacity-50" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <ScrollArea className="h-96 rounded-md border">
                  <Command>
                    <CommandInput placeholder="Search Areas" className="h-9" />
                    <CommandEmpty>No area found.</CommandEmpty>
                    <CommandGroup>
                      {areas.map((area, index) => (
                        <React.Fragment key={index}>
                          <div key={index} label={area.division} />
                          {area.upazilas.map((upazila, upazilaIndex) => (
                            <CommandItem
                              key={upazilaIndex}
                              value={upazila}
                              onSelect={(currentValue) => {
                                setFilterValues((prevValues) => ({
                                  ...prevValues,
                                  area:
                                    currentValue === filterValues.area
                                      ? ""
                                      : currentValue,
                                }));
                                setOpen(false);
                              }}
                            >
                              {upazila}
                              {", "}
                              {area.district}
                              {", "}
                              {area.division}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-5 w-5",
                                  filterValues === area.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </React.Fragment>
                      ))}
                    </CommandGroup>
                  </Command>
                </ScrollArea>
              </PopoverContent>
            </Popover>

            <Select
              value={filterValues.gender}
              onValueChange={(value) => handleValueChange("gender", value)}
            >
              <SelectTrigger className="justify-start" icon={gender}>
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

            <Select
              value={filterValues.age}
              onValueChange={(value) => handleValueChange("age", value)}
            >
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

            <Select
              value={filterValues.availability}
              onValueChange={(value) =>
                handleValueChange("availability", value)
              }
            >
              <SelectTrigger className="justify-start" icon={check}>
                <SelectValue placeholder="Availability" />
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

            <Button
              variant="outline"
              className="flex items-center gap-2 font-light"
              onClick={resetLocalStorage}
            >
              <ResetIcon className="text-2xl" /> Reset
            </Button>
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
                Donated more than 3 times{" "}
                <sub className="text-xs">(Certified)</sub>
              </p>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Search;
