"use client";

import { AlertDialogContent } from "@/components/ui/alert-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi2";
import { IoMailOpenOutline } from "react-icons/io5";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { TfiLink } from "react-icons/tfi";

const DonorAlert = ({ selectedDonor, setOpen }) => {
  return (
    <AlertDialogContent>
      {selectedDonor && (
        <div className="space-y-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-4 relative">
            <Image
              src={
                selectedDonor.image
                  ? selectedDonor.image
                  : selectedDonor.gender === "male"
                  ? "/assets/avatarMan.svg"
                  : "/assets/avatarWoman.svg"
              }
              alt="Donor Image"
              className={`${
                selectedDonor.image
                  ? " border"
                  : "border border-primary bg-white"
              } rounded-full`}
              width={70}
              height={70}
            />
            <div className="space-y-2">
              <h3 className="text-foreground">{selectedDonor.name}</h3>
              <div className="flex gap-2">
                <p
                  className={`${
                    selectedDonor.availability.toLowerCase() === "available"
                      ? "bg-green-600/20 text-green-700"
                      : "bg-red-600/20 text-primary"
                  } px-2 rounded-sm w-fit capitalize text-xs`}
                >
                  {selectedDonor.availability}
                </p>
                <p
                  className={`${
                    selectedDonor.type === "Certified" ||
                    selectedDonor.type === "certified"
                      ? "bg-green-600/20 text-green-700"
                      : selectedDonor.type === "Verified" ||
                        selectedDonor.type === "verified"
                      ? "bg-blue-600/20 text-blue-600"
                      : "bg-red-600/20 text-primary"
                  } px-2 rounded-sm w-fit capitalize text-xs`}
                >
                  {selectedDonor.type}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 divide-x gap-x-2 text-center">
            <p>
              Blood Group
              <span className="capitalize text-foreground block">
                {selectedDonor.bloodGroup}
              </span>
            </p>
            <p>
              Division
              <span className="capitalize text-foreground block">
                {selectedDonor.division}
              </span>
            </p>
            <p>
              Gender
              <span className="capitalize text-foreground block">
                {selectedDonor.gender}
              </span>
            </p>
            <p>
              Age
              <span className="capitalize text-foreground block">
                {selectedDonor.age}
              </span>
            </p>
          </div>

          <div className="w-full border bg-border"></div>

          <div>
            <p className="text-foreground font-medium mb-1">Bio</p>
            {selectedDonor.bio && <p>{selectedDonor.bio}</p>}
          </div>

          <div>
            <p className="text-foreground font-medium mb-1">Contact Details</p>
            <div className="flex gap-2 items-center">
              <LiaPhoneVolumeSolid />
              <Link target="_blank" href={`tel:0${selectedDonor.phoneNumber}`}>
                +880{selectedDonor.phoneNumber}
              </Link>
            </div>
            <div className="flex gap-2 items-center">
              <IoMailOpenOutline />
              <Link target="_blank" href={`mailto:${selectedDonor.email}`}>
                {selectedDonor.email}
              </Link>
            </div>
            <div className="flex gap-2 items-center">
              <TfiLink />
              <Link target="_blank" href={selectedDonor.socialMediaLink || "#"}>
                {selectedDonor.socialMediaLink}
              </Link>
            </div>
            <div className="flex gap-2 items-center">
              <HiOutlineHome />
              <p>
                {selectedDonor.subdistrict}, {selectedDonor.district},{" "}
                {selectedDonor.division}
              </p>
            </div>
          </div>

          <div>
            <p className="text-foreground font-medium mb-1">More Info</p>

            <table className="table-auto w-full text-left">
              <tbody>
                <tr className="border-y">
                  <td>Date Of Birth</td>
                  <td className="text-foreground">
                    {selectedDonor.dateOfBirth}
                  </td>
                </tr>
                <tr className="border-b">
                  <td>Optional Phone Number</td>
                  <td className="text-foreground">
                    <Link
                      target="_blank"
                      href={`tel:0${selectedDonor.optionalPhoneNumber}`}
                    >
                      +880{selectedDonor.optionalPhoneNumber}
                    </Link>
                  </td>
                </tr>
                <tr className="border-b">
                  <td>Donated Before</td>
                  <td className="text-foreground">
                    {selectedDonor.donatedBefore}
                  </td>
                </tr>
                {selectedDonor.donatedBefore.toLowerCase() === "yes" && (
                  <tr className="border-b">
                    <td>Last Donation Date</td>
                    <td className="text-foreground">
                      {selectedDonor.lastDonationDate}
                    </td>
                  </tr>
                )}
                {selectedDonor.maritalStatus && (
                  <tr className="border-b">
                    <td>Marital Status</td>
                    <td className="text-foreground">
                      {selectedDonor.maritalStatus}
                    </td>
                  </tr>
                )}
                {selectedDonor.contactMethod && (
                  <tr className="border-b">
                    <td>Prefered Contect Method</td>
                    <td className="text-foreground">
                      {selectedDonor.contactMethod}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div>
            <p className="text-foreground font-medium mb-1">Medical Info</p>

            {selectedDonor.question1 === "yes" && (
              <li>
                Has pre-existing medical conditions (e.g. Diabetes, Thyroid,
                etc.)
              </li>
            )}
            {selectedDonor.question2 === "yes" && (
              <li>Currently taking antibiotics</li>
            )}
            {selectedDonor.question3 === "yes" && (
              <li>Received vaccinations in the past four weeks?</li>
            )}
            {selectedDonor.question4 === "yes" && (
              <li>Has allergies to medicine or other substances</li>
            )}
            {selectedDonor.question5 === "yes" && (
              <li>Received COVID-19 vaccine</li>
            )}
            {selectedDonor.question6 === "yes" && (
              <li>Got a tattoo or permanent makeup in the past six months</li>
            )}
          </div>
        </div>
      )}
      <Cross2Icon
        onClick={() => setOpen(!open)}
        className="h-5 w-5 top-4 right-4 absolute cursor-pointer text-zinc-500 hover:text-foreground"
      />
    </AlertDialogContent>
  );
};

export default DonorAlert;
