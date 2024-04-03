"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ActiveLink = ({ href, children }) => {
  let path = usePathname();
  const isActive = path === href;

  return (
    <div className={`inline relative`}>
      <Link
        href={href}
        className={`py-2 px-4 rounded-md hover:text-primary dark:hover:text-foreground group ${
          isActive &&
          "bg-light text-primary dark:text-foreground dark:bg-zinc-800"
        }`}
      >
        {children}
        {isActive ? (
          <div className="w-full h-[34.5px] absolute left-0 -top-[8px] rounded-md bg-light/100 dark:group-hover:bg-zinc-800/100 scale-100 transition-all -z-10" />
        ) : (
          <div className="w-full h-[34.5px] absolute left-0 -top-[8px] rounded-md bg-red-100/60 dark:group-hover:bg-zinc-800/60 scale-0 group-hover:scale-100 transition-all -z-10" />
        )}
      </Link>
    </div>
  );
};

const SettingsNavbar = () => {
  return (
    <div className="space-x-1">
      <ActiveLink href={"/dashboard/settings/general-settings"}>
        General Settings
      </ActiveLink>
      <ActiveLink href={"/dashboard/settings/security-settings"}>
        Security Settings
      </ActiveLink>
      <ActiveLink href={"/dashboard/settings/appearance"}>
        Appearance
      </ActiveLink>
    </div>
  );
};

export default SettingsNavbar;
