import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { UserAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const DeletingAccount = () => {
  const { currentUser } = UserAuth();
  const [isConfirm, setIsConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSad, setIsSad] = useState(false);
  const [value, setValue] = useState("");

  const handleValueChange = (event) => {
    const value = event.target.value;
    setValue(value);
  };

  useEffect(() => {
    if (isConfirm) {
      const timer = setTimeout(() => {
        setOpen(false);
        setIsSad(false);
        setIsConfirm(false);
        toast.info("Account will be deleted within 3 working days!");
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [isConfirm]);

  const handleDelete = () => {
    if (value === "CONFIRM") {
      setIsSad(true);
      setIsConfirm(true);
    } else {
      toast.error("Please type 'CONFIRM' in the input box!");
    }
  };

  const handleCancel = () => {
    setTimeout(() => {
      setIsConfirm(false);
    }, 1000);
  };

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Proceed to delete your account</Button>
        </AlertDialogTrigger>
        {!isConfirm ? (
          <AlertDialogContent>
            <AlertDialogHeader className={"space-y-5"}>
              <AlertDialogTitle>
                Delete {currentUser?.displayName}'s Account
              </AlertDialogTitle>

              <div className="flex flex-col items-center justify-center text-center">
                <Image
                  src={currentUser?.photoURL || "/assets/defaultUser.svg"}
                  alt="Profile Image"
                  width={70}
                  height={70}
                  priority
                />
                <h3 className="text-foreground">{currentUser?.displayName}</h3>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter className={"flex justify-between w-full"}>
              <AlertDialogCancel className="w-full">
                Please don't delete account
              </AlertDialogCancel>
              <Button onClick={() => setIsConfirm(true)} className="w-full">
                I want to delete this account
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        ) : !isSad ? (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-foreground">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers within 3 working
                days.
              </AlertDialogDescription>

              <div>
                <Separator className="my-3" />
                <p className="text-sm mb-1">
                  To confirm, Please type "
                  <span className="text-foreground font-medium">CONFIRM</span>"
                  in the box below
                </p>
                <Input
                  type="text"
                  className="text-foreground font-medium border-neutral-600"
                  onChange={handleValueChange}
                />
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancel}>
                Cancel
              </AlertDialogCancel>
              <Button onClick={handleDelete}>Continue</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        ) : (
          <AlertDialogContent className="flex flex-col items-center">
            <h3 className="text-primary text-center">We will miss you!</h3>
            <picture>
              <source
                srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f979/512.webp"
                type="image/webp"
              />
              <img
                src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f979/512.gif"
                alt="🥹"
                width="200"
                height="200"
              />
            </picture>
          </AlertDialogContent>
        )}
      </AlertDialog>
    </div>
  );
};

export default DeletingAccount;
