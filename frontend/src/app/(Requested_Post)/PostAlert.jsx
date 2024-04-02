"use client";

import { AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

const PostAlert = ({
  selectedPost,
  setOpenFirstAlert,
  iframeSrc,
  handleDonateClick,
}) => {
  return (
    <AlertDialogContent>
      <div className="space-y-3 text-sm">
        <div className="space-y-1">
          <div className="text-primary text-2xl font-medium">
            {selectedPost?.condition}
          </div>
          <div className="flex gap-2 text-muted-foreground items-center">
            <p>Posted on {selectedPost?.postedDate}</p>
            <p
              className={`${
                selectedPost?.status.toLowerCase() === "needed"
                  ? "bg-green-600/20 text-green-700"
                  : "bg-red-600/20 text-primary"
              } capitalize px-2 h-fit rounded text-sm`}
            >
              {selectedPost?.status}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <p className="font-medium text-foreground">Information</p>
          <Button variant="outline" onClick={handleDonateClick}>
            Want to Donate
          </Button>
        </div>

        <table className="table-auto w-full text-left border text-zinc-500">
          <tbody>
            <tr className="border-y">
              <td>{"Requester's Name"}</td>
              <td className="text-foreground border-l pl-3">
                {selectedPost?.requesterName}
              </td>
            </tr>
            <tr className="border-y">
              <td>{"Patient's Name"}</td>
              <td className="text-foreground border-l pl-3">
                {selectedPost?.patientName}
              </td>
            </tr>
            <tr className="border-y">
              <td>{"Patient's Age"}</td>
              <td className="text-foreground border-l pl-3">
                {selectedPost?.patientAge}
              </td>
            </tr>
            <tr className="border-y">
              <td>{"Patient's Gender"}</td>
              <td className="text-foreground border-l pl-3">
                {selectedPost?.gender}
              </td>
            </tr>
            <tr className="border-y">
              <td>{"Phone Number"}</td>
              <td className="text-foreground border-l pl-3">
                <Link target="_blank" href={`tel:${selectedPost?.phoneNumber}`}>
                  +880{selectedPost?.phoneNumber}
                </Link>
              </td>
            </tr>
            <tr className="border-y">
              <td>{"Donation Date"}</td>
              <td className="text-foreground border-l pl-3">
                {selectedPost?.donationDate}
              </td>
            </tr>
            <tr className="border-y">
              <td>{"Location"}</td>
              <td className="text-foreground border-l pl-3">
                {selectedPost?.subdistrict}, {selectedPost?.district},{" "}
                {selectedPost?.division}
              </td>
            </tr>
            <tr className="border-y">
              <td>{"Hospital Name"}</td>
              <td className="text-foreground border-l pl-3">
                {selectedPost?.hospitalName}
              </td>
            </tr>
            <tr className="border-y">
              <td>{"Blood Group"}</td>
              <td className="text-foreground border-l pl-3">
                {selectedPost?.bloodGroup}
              </td>
            </tr>
            <tr className="border-y">
              <td>{"Reason for blood"}</td>
              <td className="border-l pl-3 text-primary">
                {selectedPost?.condition}
              </td>
            </tr>
          </tbody>
        </table>

        <div>
          <p className="text-foreground">
            <span className="font-medium">Note:</span> {selectedPost?.extraInfo}
          </p>
        </div>

        <div className="w-full rounded overflow-hidden">
          <p className="text-xs text-primary mb-1">
            *Map results may be delayed based on your internet connection.
          </p>
          {selectedPost?.mapLink && iframeSrc ? (
            <iframe width="100%" height="270" src={iframeSrc}></iframe>
          ) : (
            <iframe
              width="100%"
              height="270"
              src={`https://maps.google.com/maps?q=${selectedPost?.hospitalName}, ${selectedPost?.subdistrict}, ${selectedPost?.district}, ${selectedPost?.division}&z=14&output=embed`}
            ></iframe>
          )}
        </div>
      </div>

      <Cross2Icon
        onClick={() => setOpenFirstAlert(!open)}
        className="h-5 w-5 top-4 right-4 absolute cursor-pointer text-zinc-500 hover:text-foreground"
      />
    </AlertDialogContent>
  );
};

export default PostAlert;
