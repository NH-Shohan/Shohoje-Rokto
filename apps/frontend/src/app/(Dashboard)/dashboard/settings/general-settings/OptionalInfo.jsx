"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import Image from "next/image";
import { toast } from "sonner";
import flag from "../../../../../../public/icons/flag.svg";

const OptionalInfo = ({ donorData, handleValueChange }) => {
  return (
    <div className="space-y-2 text-foreground">
      <div className="flex gap-2">
        <Select
          defaultValue={donorData.maritalStatus}
          onValueChange={(value) => handleValueChange("maritalStatus", value)}
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
          <div className="flex border px-3 gap-1 rounded-tl-md rounded-bl-md items-center bg-white dark:bg-neutral-900">
            <Image src={flag} alt="flag bd icon" width={22} height={22} />
            <p className="mr-4 text-sm">+880</p>
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
        onChange={(e) => handleValueChange("socialMediaLink", e.target.value)}
      />

      <Textarea
        placeholder="Type Your Bio Here"
        defaultValue={donorData.bio}
        onChange={(e) => handleValueChange("bio", e.target.value)}
      />

      <div>
        <p className="text-foreground mb-1">Prefered Contact Information</p>
        <RadioGroup
          defaultValue={donorData.contectMethod}
          onValueChange={(value) => handleValueChange("contectMethod", value)}
          className="flex gap-3"
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
    </div>
  );
};

export default OptionalInfo;
