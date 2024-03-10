"use client";

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
import { useState } from "react";
import logo from "../../../public/assets/logo.png";
import { Button } from "./button";
import NavLink from "./navLink";

const Navbar = () => {
  const [activeNavLink, setActiveNavLink] = useState(null);
  const { setTheme } = useTheme();

  const handleNavLinkClick = (href) => {
    setActiveNavLink(href);
  };

  return (
    <nav className="sticky top-0 z-[1000] bg-[rgb(255,255,255,50%)] dark:bg-[rgb(0,0,0,50%)] backdrop-blur-md">
      <div className="container flex justify-between items-center h-[60px]">
        <div>
          <Link href="/">
            <Image src={logo} alt="Logo Image" width={120} />
          </Link>
        </div>
        <div className="flex gap-7">
          <NavLink href="/" onClick={() => handleNavLinkClick("/")}>
            Home
          </NavLink>
          <NavLink
            href="/donor-search"
            onClick={() => handleNavLinkClick("/donor-search")}
          >
            Donor Search
          </NavLink>
          <NavLink
            href="/be-donor"
            onClick={() => handleNavLinkClick("/be-donor")}
          >
            Be Donor
          </NavLink>
          <NavLink
            href="/request-blood"
            onClick={() => handleNavLinkClick("/request-blood")}
          >
            Request Blood
          </NavLink>
          {/* <NavLink
            href="/blood-bank"
            onClick={() => handleNavLinkClick("/blood-bank")}
          >
            Blood Bank
          </NavLink> */}
          <NavLink href="/about" onClick={() => handleNavLinkClick("/about")}>
            About
          </NavLink>
        </div>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
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
          <Button variant="outline">Login</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
