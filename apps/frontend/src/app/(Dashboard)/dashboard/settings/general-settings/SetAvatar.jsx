import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Dropzone from "@/components/ui/drop-zone";
import { UserAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useEffect, useState } from "react";

const SetAvatar = () => {
  const { currentUser } = UserAuth();

  const [open, setOpen] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    currentUser?.photoURL || "/assets/defaultUser.svg"
  );

  useEffect(() => {
    if (currentUser) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  const handleRemovePhoto = () => {
    setPhotoURL("/assets/defaultUser.svg");
  };

  return (
    <div className="flex gap-5">
      <Image
        src={photoURL}
        alt="Profile Photo"
        width={90}
        height={90}
        priority
        className="border border-primary rounded-full"
      />

      <div className="flex flex-col justify-center">
        <div className="space-x-2">
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button>Upload Photo</Button>
            </AlertDialogTrigger>
            <Dropzone setOpen={setOpen} />
          </AlertDialog>
          <Button variant="outline" onClick={handleRemovePhoto}>
            Remove Photo
          </Button>
        </div>
        <p className="text-xs ml-1 mt-1 font-light">
          At least 1024 x 1024 PNG, JPEG or JPG file
        </p>
      </div>
    </div>
  );
};

export default SetAvatar;
