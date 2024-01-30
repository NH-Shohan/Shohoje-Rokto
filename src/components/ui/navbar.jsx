"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../../public/logo.png";
import NavLink from "./navLink";

const Navbar = () => {
  const [activeNavLink, setActiveNavLink] = useState(null);

  const handleNavLinkClick = (href) => {
    setActiveNavLink(href);
  };

  return (
    <nav>
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
          <NavLink
            href="/blood-bank"
            onClick={() => handleNavLinkClick("/blood-bank")}
          >
            Blood Bank
          </NavLink>
          <NavLink href="/about" onClick={() => handleNavLinkClick("/about")}>
            About
          </NavLink>
        </div>
        <div>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
