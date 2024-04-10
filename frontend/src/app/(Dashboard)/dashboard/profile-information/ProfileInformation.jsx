"use client";

import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import Dropzone from "@/components/ui/drop-zone";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { UserAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";

const ProfileInformation = () => {
  const { currentUser } = UserAuth();
  const [open, setOpen] = useState(false);

  const P = ({ children }) => {
    return <p className="text-foreground -mt-1 capitalize">{children}</p>;
  };

  return (
    <>
      <div>
        <h3 className="text-foreground">My Profile</h3>
        <p>Make your profile more connected with other</p>

        <Separator className="my-5" />

        <div className="overflow-auto h-[calc(100vh-220px)] scrollbar-thin">
          {/* Profile */}
          <div className="flex items-center justify-between border p-5 rounded-lg relative">
            <div className="flex items-center gap-5">
              <Image
                src={
                  currentUser?.photoURL
                    ? currentUser?.photoURL
                    : "/assets/defaultUser.svg"
                }
                alt="Profile Photo"
                width={100}
                height={100}
                className="border border-primary rounded-full"
              />
              <div>
                <div className="flex gap-2 items-center">
                  <h4>{currentUser?.displayName}</h4>
                  <p className="bg-light dark:bg-muted text-primary dark:text-foreground w-fit h-fit px-2 rounded-md capitalize text-sm">
                    {currentUser?.role}
                  </p>
                </div>
                <p>{currentUser?.email}</p>
              </div>
            </div>

            <p className="text-8xl font-bold text-stroke text-background lg:mr-20">
              {currentUser?.bloodGroup}
            </p>

            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <div className="text-neutral-400 dark:text-neutral-600 absolute top-5 right-5">
                  <FiEdit className="size-5 cursor-pointer" />
                </div>
              </AlertDialogTrigger>
              <Dropzone setOpen={setOpen} />
            </AlertDialog>
          </div>

          {/* Personal */}
          <div className="flex flex-col items-start gap-2 border p-5 rounded-lg mt-5 relative">
            <h4 className="text-primary">Personal Information</h4>

            <div className="grid grid-cols-2 w-full">
              <div>
                <Label className="text-xs">Email</Label>
                <p className="text-foreground -mt-1 lowercase">
                  {currentUser?.email}
                </p>
              </div>
              <div>
                <Label className="text-xs">
                  Phone Number
                  {currentUser?.optionalPhoneNumber ? "s" : ""}
                </Label>
                <div className="flex gap-2">
                  <P>
                    0{currentUser?.phoneNumber}
                    {currentUser?.optionalPhoneNumber ? "," : ""}
                  </P>
                  {currentUser?.optionalPhoneNumber && (
                    <P>0{currentUser?.optionalPhoneNumber}</P>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 w-full">
              <div>
                <Label className="text-xs">Gender</Label>
                <P>{currentUser?.gender}</P>
              </div>
              <div>
                <Label className="text-xs">Marital Status</Label>
                <P>{currentUser?.maritalStatus}</P>
              </div>
            </div>

            <div className="grid grid-cols-2 w-full">
              <div>
                <Label className="text-xs">Date of Birth</Label>
                <P>
                  {currentUser?.dateOfBirth &&
                    format(currentUser?.dateOfBirth, "PPP")}
                </P>
              </div>
              {currentUser?.donatedBefore.toLowerCase() === "yes" ? (
                <div>
                  <Label className="text-xs">Last Donated On</Label>
                  <P>
                    {currentUser?.lastDonationDate &&
                      format(currentUser?.lastDonationDate, "PPP")}
                  </P>
                </div>
              ) : (
                <div>
                  <Label className="text-xs">Donated Before?</Label>
                  <P>{currentUser?.donatedBefore}</P>
                </div>
              )}
            </div>

            <div>
              <Label className="text-xs">Bio</Label>
              <P>{currentUser?.bio}</P>
            </div>

            <Link href={"/dashboard/settings/general-settings"}>
              <FiEdit className="text-neutral-400 dark:text-neutral-600 absolute top-5 right-5 size-5 cursor-pointer" />
            </Link>
          </div>

          {/* Address */}
          <div className="flex flex-col items-start gap-2 border p-5 rounded-lg mt-5 relative">
            <h4 className="text-primary">Address</h4>

            <div className="grid grid-cols-2 w-full">
              <div>
                <Label className="text-xs">Area</Label>
                <P>
                  {currentUser?.subdistrict}, {currentUser?.district}
                </P>
              </div>
              <div>
                <Label className="text-xs">City / State</Label>
                <P>{currentUser?.division}</P>
              </div>
            </div>

            <div className="grid grid-cols-2 w-full">
              <div>
                <Label className="text-xs">Country</Label>
                <P>Bangladesh</P>
              </div>
              <div>
                <Label className="text-xs">Social Media Link</Label>
                <p className="text-foreground -mt-1 lowercase">
                  {currentUser?.socialMediaLink}
                </p>
              </div>
            </div>

            <div>
              <Label className="text-xs">Prefered Contact Method</Label>
              <p className="text-foreground -mt-1 capitalize">
                {currentUser?.contectMethod}
              </p>
            </div>

            <Link href={"/dashboard/settings/general-settings"}>
              <FiEdit className="text-neutral-400 dark:text-neutral-600 absolute top-5 right-5 size-5 cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInformation;
