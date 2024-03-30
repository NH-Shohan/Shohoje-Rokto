"use client";

import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { UserAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "../../../public/assets/logo.png";
import { Button } from "../../components/ui/button";
import NavLink from "../../components/ui/navLink";
import ProfileDrawer from "./profileDrawer";

const Navbar = () => {
  const { setTheme } = useTheme();
  const path = usePathname();
  const router = useRouter();
  const { currentUser, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (error) {
      toast.error("Error: Could not sign out!");
    }
  };

  return (
    <>
      {path !== "/sign-in" && path !== "/sign-up" && (
        <nav className="sticky top-0 z-[1000] bg-[#ffffff80] dark:bg-[#00000080] backdrop-blur-md">
          <div className="container flex justify-between items-center h-[60px]">
            <div>
              <Link href="/">
                <Image
                  src={logo}
                  alt="Logo Image"
                  width={120}
                  height={"auto"}
                  priority
                />
              </Link>
            </div>
            <div className="flex gap-7">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/donor-search">Donor Search</NavLink>
              <NavLink href="/be-donor">Be Donor</NavLink>
              <NavLink href="/requested-post">Requested Post</NavLink>
              <NavLink href="/request-blood">Request Blood</NavLink>
              {/* <NavLink href="/blood-bank">Blood Bank</NavLink> */}
              <NavLink href="/about">About</NavLink>
            </div>

            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="group">
                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 dark:-rotate-90 dark:scale-0 group-hover:text-white" />
                    <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="shadow border rounded-lg p-1 bg-white dark:bg-black"
                >
                  <DropdownMenuItem
                    onClick={() => setTheme("light")}
                    className="cursor-pointer px-4 hover:bg-light dark:hover:bg-secondary rounded-sm outline-none py-1"
                  >
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setTheme("dark")}
                    className="cursor-pointer px-4 hover:bg-light dark:hover:bg-secondary rounded-sm outline-none py-1"
                  >
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setTheme("system")}
                    className="cursor-pointer px-4 hover:bg-light dark:hover:bg-secondary rounded-sm outline-none py-1"
                  >
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {currentUser ? (
                <div>
                  <Drawer direction="right">
                    <DrawerTrigger>
                      <Image
                        className="border border-primary rounded-full mt-1.5"
                        src={currentUser?.photoURL}
                        alt="Profile Image"
                        width={38}
                        height={38}
                        priority
                      />
                    </DrawerTrigger>
                    <ProfileDrawer
                      currentUser={currentUser}
                      handleSignOut={handleSignOut}
                    />
                  </Drawer>
                </div>
              ) : (
                <Link href={"sign-in"}>
                  <Button variant="outline">Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;