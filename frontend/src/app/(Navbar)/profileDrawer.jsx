import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";

const ProfileDrawer = ({ currentUser, handleSignOut }) => {
  return (
    <>
      {currentUser && (
        <DrawerContent
          className={
            "inset-y-0 inset-x-auto top-0 right-0 z-[1000] w-[390px] m-0 h-screen rounded-l-2xl rounded-tr-none border-l-2 bg-background"
          }
        >
          <DrawerHeader>
            <div className="flex items-center gap-3 mt-5">
              <Image
                className="border-2 border-primary rounded-full"
                src={currentUser?.photoURL}
                alt="Profile Image"
                width={50}
                height={50}
                priority
              />
              <div>
                <DrawerTitle className="text-foreground">
                  {currentUser.displayName}
                </DrawerTitle>
                <DrawerDescription>{currentUser.email || ""}</DrawerDescription>
              </div>
            </div>

            <Separator className="my-4" />

            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </DrawerHeader>

          <DrawerClose>
            <Cross2Icon className="h-5 w-5 top-4 right-4 absolute cursor-pointer hover:text-foreground" />
          </DrawerClose>
        </DrawerContent>
      )}
    </>
  );
};

export default ProfileDrawer;
