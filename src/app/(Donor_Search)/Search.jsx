"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
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
import { useFilter } from "@/context/FilterContext";
import { ChevronDownIcon, ResetIcon } from "@radix-ui/react-icons";
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
  const { filterValues, setFilterValues } = useFilter();

  const [isClient, setIsClient] = React.useState(false);
  const [openDivision, setOpenDivision] = React.useState(false);
  const [openDistrict, setOpenDistrict] = React.useState(false);
  const [openSubdistrict, setOpenSubdistrict] = React.useState(false);
  const [selectedDivision, setSelectedDivision] = React.useState("");
  const [selectedDistrict, setSelectedDistrict] = React.useState("");
  const [selectedSubdistrict, setSelectedSubdistrict] = React.useState("");

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
      setSelectedDivision(JSON.parse(storedData).division);
    }
  }, [setFilterValues]);

  React.useEffect(() => {
    if (isClient) {
      localStorage.setItem("filterValues", JSON.stringify(filterValues));
    }
  }, [filterValues, isClient]);

  const resetLocalStorage = () => {
    localStorage.removeItem("filterValues");
    setSelectedDivision("");
    setSelectedDistrict("");
    setSelectedSubdistrict("");
    setFilterValues({
      bloodGroup: "",
      division: "",
      district: "",
      subdistrict: "",
      gender: "",
      age: "",
      availability: "",
    });
  };

  return (
    <>
      {isClient ? (
        <>
          <div className="bg-white dark:bg-secondary mt-5 p-4 rounded-2xl border grid grid-cols-5 gap-2 mx-20">
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
                  <SelectItem value="range4">51 - 60</SelectItem>
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

            {/* Division */}
            <Popover open={openDivision} onOpenChange={setOpenDivision}>
              <PopoverTrigger asChild>
                <Button
                  variant="dropdown"
                  role="combobox"
                  aria-expanded={openDivision}
                  className="pl-2.5 bg-white dark:bg-background"
                >
                  <Image
                    src={location}
                    alt="location icon"
                    width={20}
                    height={20}
                  />
                  <div className="flex justify-between items-center w-full font-normal capitalize">
                    {selectedDivision ? selectedDivision : "Select Division"}
                    <ChevronDownIcon className="-mr-1 h-5 w-5 shrink-0 opacity-50" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search Division" className="h-9" />
                  <CommandGroup>
                    {areas.divisions.map((division, index) => (
                      <CommandItem
                        key={index}
                        value={division.name}
                        onSelect={(currentValue) => {
                          setSelectedDivision(
                            currentValue === selectedDivision
                              ? ""
                              : currentValue
                          );
                          handleValueChange(
                            "division",
                            currentValue === selectedDivision
                              ? ""
                              : currentValue
                          );
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
                  <Image
                    src={location}
                    alt="location icon"
                    width={20}
                    height={20}
                  />
                  <div className="flex justify-between items-center w-full font-normal capitalize">
                    {selectedDistrict ? selectedDistrict : "Select District"}
                    <ChevronDownIcon className="-mr-1 h-5 w-5 shrink-0 opacity-50" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  {selectedDivision && (
                    <CommandInput placeholder="Search Areas" className="h-9" />
                  )}
                  <CommandGroup>
                    {selectedDivision ? (
                      areas.divisions
                        .find(
                          (division) =>
                            division.name.toLocaleLowerCase() ===
                            selectedDivision.toLocaleLowerCase()
                        )
                        ?.districts.map((district, index) => (
                          <CommandItem
                            key={index}
                            value={district.name}
                            onSelect={(currentValue) => {
                              setSelectedDistrict(
                                currentValue === selectedDistrict
                                  ? ""
                                  : currentValue
                              );
                              handleValueChange(
                                "district",
                                currentValue === selectedDistrict
                                  ? ""
                                  : currentValue
                              );
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
                  <Image
                    src={location}
                    alt="location icon"
                    width={20}
                    height={20}
                  />
                  <div className="flex justify-between items-center w-full font-normal capitalize">
                    {selectedSubdistrict
                      ? selectedSubdistrict
                      : "Select Sub District"}
                    <ChevronDownIcon className="-mr-1 h-5 w-5 shrink-0 opacity-50" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  {selectedDistrict && (
                    <CommandInput placeholder="Search Areas" className="h-9" />
                  )}
                  <CommandGroup>
                    {selectedDistrict ? (
                      areas.divisions
                        .find(
                          (division) =>
                            division.name.toLocaleLowerCase() ===
                            selectedDivision.toLocaleLowerCase()
                        )
                        ?.districts.find(
                          (district) =>
                            district.name.toLocaleLowerCase() ===
                            selectedDistrict.toLocaleLowerCase()
                        )
                        ?.subdistricts.map((subdistrict, index) => (
                          <CommandItem
                            key={index}
                            value={subdistrict}
                            onSelect={(currentValue) => {
                              setSelectedSubdistrict(
                                currentValue === selectedSubdistrict
                                  ? ""
                                  : currentValue
                              );
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
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            <Command className="border col-span-2 bg-white dark:bg-background">
              <CommandInput
                placeholder="Search Donor Name"
                className="h-9 bg-white dark:bg-background"
              />
            </Command>
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
