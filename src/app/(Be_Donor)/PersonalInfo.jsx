import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
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
import { ArrowRightIcon, CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";

const PersonalInfo = () => {
  const [date, setDate] = useState();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <p>Please fill up the form carefully for being a donor.</p>
        <Link
          href="/request-blood"
          className="text-green-600 hover:text-green-700 hover:underline flex gap-1 items-center"
        >
          Request blood
          <ArrowRightIcon className="w-5 h-5" />
        </Link>
      </div>

      <Input type="text" placeholder="Full Name" id={"name"} name="name" />

      <div className="flex gap-2">
        <Select
        // value={filterValues.bloodGroup}
        // onValueChange={(value) => handleValueChange("bloodGroup", value)}
        >
          <SelectTrigger className="justify-start text-muted-foreground">
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
                "justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
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
    </div>
  );
};

export default PersonalInfo;
