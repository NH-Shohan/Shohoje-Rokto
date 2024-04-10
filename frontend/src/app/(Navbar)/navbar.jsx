"use client";

import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAuth } from "@/context/AuthContext";
import { Cross2Icon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { GoBell } from "react-icons/go";
import logo from "../../../public/assets/logo.png";
import { Button } from "../../components/ui/button";
import NavLink from "../../components/ui/navLink";
import ProfileSlider from "./ProfileSlider";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const path = usePathname();
  const router = useRouter();
  const { currentUser, logOut } = UserAuth();
  const [open, setOpen] = useState(false);
  const [openPrifileDrawer, setOpenPrifileDrawer] = useState(false);

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
              {currentUser ? (
                <NavLink href="/dashboard">Dashboard</NavLink>
              ) : null}
              <NavLink href="/about">About</NavLink>
            </div>

            <div className="flex items-center gap-3">
              {currentUser && (
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="group">
                      <GoBell className="w-[1.2rem] h-[1.2rem] group-hover:text-white dark:text-white" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="shadow border rounded-lg bg-white dark:bg-black w-80 z-[1001]"
                  >
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="space-y-1">
                      <div className="hover:bg-muted border rounded-md px-3 py-2 space-y-1 overflow-hidden relative transition-all">
                        <p className="flex items-center gap-1 text-xs text-secondary-foreground">
                          <GoBell className="size-3" />{" "}
                          <span className="mb-0.5">now</span>
                        </p>
                        <p className="text-foreground text-base">
                          Here is the notification title
                        </p>
                        <p className="text-xs overflow-hidden truncate-2-lines text-secondary-foreground">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Qui maiores dignissimos officiis beatae,
                          perspiciatis ad nam? Iusto consectetur excepturi non!
                        </p>
                        <Cross2Icon
                          onClick={() => setOpen(!open)}
                          className="h-4 w-4 top-2 right-2 absolute cursor-pointer text-secondary-foreground hover:text-foreground"
                        />
                      </div>
                      <div className="hover:bg-muted border rounded-md px-3 py-2 space-y-1 overflow-hidden relative transition-all">
                        <p className="flex items-center gap-1 text-xs text-secondary-foreground">
                          <GoBell className="size-3" />{" "}
                          <span className="mb-0.5">now</span>
                        </p>
                        <p className="text-foreground text-base">
                          Here is the notification title
                        </p>
                        <p className="text-xs overflow-hidden truncate-2-lines text-secondary-foreground">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Qui maiores dignissimos officiis beatae,
                          perspiciatis ad nam? Iusto consectetur excepturi non!
                        </p>
                        <Cross2Icon
                          onClick={() => setOpen(!open)}
                          className="h-4 w-4 top-2 right-2 absolute cursor-pointer text-secondary-foreground hover:text-foreground"
                        />
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="group">
                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 dark:-rotate-90 dark:scale-0 group-hover:text-white" />
                    <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="shadow border rounded-lg p-1 bg-white dark:bg-black z-[1001] space-y-1"
                >
                  <DropdownMenuItem
                    onClick={() => setTheme("light")}
                    className={`cursor-pointer px-4 focus:bg-light dark:hover:bg-zinc-800 rounded-sm outline-none py-1.5 ${
                      theme === "light" && "bg-light dark:bg-zinc-800"
                    }`}
                  >
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setTheme("dark")}
                    className={`cursor-pointer px-4 focus:bg-light dark:hover:bg-zinc-800 rounded-sm outline-none py-1.5 ${
                      theme === "dark" && "bg-light dark:bg-zinc-800"
                    }`}
                  >
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setTheme("system")}
                    className={`cursor-pointer px-4 focus:bg-light dark:hover:bg-zinc-800 rounded-sm outline-none py-1.5 ${
                      theme === "system" && "bg-light dark:bg-zinc-800"
                    }`}
                  >
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {currentUser ? (
                <div>
                  <Drawer
                    direction="right"
                    open={openPrifileDrawer}
                    onOpenChange={setOpenPrifileDrawer}
                  >
                    <DrawerTrigger>
                      <Image
                        className={`${
                          currentUser?.photoURL ? "border border-primary" : ""
                        } rounded-full mt-1.5`}
                        src={currentUser?.photoURL || "/assets/defaultUser.svg"}
                        alt="Profile Image"
                        width={38}
                        height={38}
                        priority
                      />
                    </DrawerTrigger>
                    <ProfileSlider
                      currentUser={currentUser}
                      handleSignOut={handleSignOut}
                      setOpenPrifileDrawer={setOpenPrifileDrawer}
                    />
                  </Drawer>
                </div>
              ) : (
                <Link href={"/sign-in"}>
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
