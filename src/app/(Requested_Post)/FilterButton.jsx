"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { MixerVerticalIcon, ResetIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import bloodDrop from "../../../public/icons/bloodDrop.svg";
import location from "../../../public/icons/location.svg";
import areas from "../../data/bdLocation.json";

const FilterButton = ({
  onBloodGroupChange,
  onDivisionChange,
  onDistrictChange,
  onSubdistrictChange,
  resetFilteredPosts,
}) => {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSubdistrict, setSelectedSubdistrict] = useState("");

  const handleValueChange = (type, value) => {
    switch (type) {
      case "bloodGroup":
        setSelectedBloodGroup(value);
        onBloodGroupChange(value);
        break;
      case "division":
        setSelectedDivision(value);
        setSelectedDistrict("");
        setSelectedSubdistrict("");
        onDivisionChange(value);
        break;
      case "district":
        setSelectedDistrict(value);
        setSelectedSubdistrict("");
        onDistrictChange(value);
        break;
      case "subDistrict":
        setSelectedSubdistrict(value);
        onSubdistrictChange(value);
        break;
      default:
        break;
    }
  };

  const handleReset = () => {
    setSelectedBloodGroup("");
    setSelectedDivision("");
    setSelectedDistrict("");
    setSelectedSubdistrict("");
    if (resetFilteredPosts) {
      resetFilteredPosts();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="px-3 flex items-center gap-1">
          <MixerVerticalIcon className="w-4 h-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="shadow border rounded-lg space-y-1 w-56"
      >
        <DropdownMenuItem className="cursor-pointer bg-transparent p-0 rounded-sm outline-none">
          <Select
            value={selectedBloodGroup}
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
        </DropdownMenuItem>

        <Select
          value={selectedDivision}
          onValueChange={(value) => handleValueChange("division", value)}
        >
          <SelectTrigger className="justify-start" icon={location}>
            <SelectValue placeholder="Select Division" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Divisions</SelectLabel>
              <SelectSeparator />
              {areas.divisions.map((division, index) => (
                <SelectItem key={index} value={division.name}>
                  {division.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {selectedDivision && (
          <Select
            value={selectedDistrict}
            onValueChange={(value) => handleValueChange("district", value)}
          >
            <SelectTrigger className="justify-start" icon={location}>
              <SelectValue placeholder="Select District" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Districts</SelectLabel>
                <SelectSeparator />
                {areas.divisions
                  .find((division) => division.name === selectedDivision)
                  ?.districts.map((district, index) => (
                    <SelectItem key={index} value={district.name}>
                      {district.name}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        {selectedDistrict && (
          <Select
            value={selectedSubdistrict}
            onValueChange={(value) => handleValueChange("subDistrict", value)}
          >
            <SelectTrigger className="justify-start" icon={location}>
              <SelectValue placeholder="Select Sub District" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sub Districts</SelectLabel>
                <SelectSeparator />
                {areas.divisions
                  .find((division) => division.name === selectedDivision)
                  ?.districts.find(
                    (district) => district.name === selectedDistrict
                  )
                  ?.subdistricts.map((subDistrict, index) => (
                    <SelectItem key={index} value={subDistrict}>
                      {subDistrict}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        <Button
          variant="outline"
          className="flex items-center gap-2 font-light w-full"
          onClick={handleReset}
        >
          <ResetIcon className="text-2xl" /> Reset
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterButton;
