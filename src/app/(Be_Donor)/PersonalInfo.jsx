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
import { useState } from "react";
import flag from "../../../public/icons/flag.svg";
import areas from "../../data/places.json";

const PersonalInfo = () => {
  const [date, setDate] = useState();
  const [openDivision, setOpenDivision] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openSubdistrict, setOpenSubdistrict] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSubdistrict, setSelectedSubdistrict] = useState("");
  const [selectedDonation, setSelectedDonation] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <p className="text-primary font-medium">
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
        required
      />

      <Input type="email" placeholder="Email" id={"email"} name="email" />

      <div className="flex gap-2">
        <Select
        // value={filterValues.bloodGroup}
        // onValueChange={(value) => handleValueChange("bloodGroup", value)}
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
                !date && "text-foreground"
              )}
            >
              <CalendarIcon className="h-5 w-auto pl-1" />
              {date ? format(date, "PPP") : <span>Date Of Birth</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="center">
            <Calendar
              mode="single"
              onSelect={setDate}
              selected={date}
              captionLayout="dropdown"
              fromYear={1900}
              toYear={new Date().getFullYear()}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex gap-2">
        <Select
        // value={filterValues.gender}
        // onValueChange={(value) => handleValueChange("gender", value)}
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
          <div className="flex border px-3 gap-1 rounded-tl-md rounded-bl-md items-center bg-white dark:bg-background">
            <Image src={flag} alt="flag bd icon" width={22} height={22} />
            <p className="mr-3 text-sm">+88</p>
          </div>
          <Input
            className="rounded-tl-none rounded-bl-none border-l-0"
            type="text"
            placeholder="Phone Number"
            id={"name"}
            name="name"
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
                {selectedDivision ? selectedDivision : "Select Division"}
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
                      setSelectedDivision(
                        currentValue === selectedDivision ? "" : currentValue
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
      </div>

      <div className="flex gap-2">
        <Select
          value={selectedDonation}
          onValueChange={(value) => setSelectedDonation(value)}
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

        {selectedDonation === "yes" && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"dropdown"}
                className={cn(
                  "flex justify-start text-left font-normal pl-2 gap-3 bg-white dark:bg-background",
                  !date && "text-foreground"
                )}
              >
                <CalendarIcon className="h-5 w-auto pl-1" />
                {date ? format(date, "PPP") : <span>Last Donation Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="center">
              <Calendar
                mode="single"
                onSelect={setDate}
                selected={date}
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
        // value={filterValues.gender}
        // onValueChange={(value) => handleValueChange("gender", value)}
        >
          <SelectTrigger className="justify-start">
            <SelectValue placeholder="Marital Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Marital Status</SelectLabel>
              <SelectSeparator />
              <SelectItem value="male">Married</SelectItem>
              <SelectItem value="female">Unmarried</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          type="url"
          placeholder="Social Media Link"
          id={"link"}
          name="link"
        />
      </div>

      <Textarea
        placeholder="Type Your Bio Here"
        className="bg-white dark:bg-background"
      />

      <div>
        <p className="text-sm text-primary mb-1 dark:text-foreground">
          Preferred Contact Method
        </p>
        <RadioGroup defaultValue="phone" className="">
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
    </div>
  );
};

export default PersonalInfo;
