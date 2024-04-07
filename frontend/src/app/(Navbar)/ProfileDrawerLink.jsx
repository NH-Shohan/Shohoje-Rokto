import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GoChecklist,
  GoGlobe,
  GoHeart,
  GoHistory,
  GoInbox,
  GoLock,
  GoMoon,
  GoPeople,
  GoPerson,
} from "react-icons/go";

const P = ({ children }) => (
  <div className="flex items-center gap-2 hover:text-primary dark:hover:text-foreground h-11 px-4 hover:bg-red-100/60 dark:hover:bg-zinc-800/60 bg-transparent cursor-pointer rounded-md transition-all text-sm">
    {children}
  </div>
);

const ActiveLink = ({ href, setOpenPrifileDrawer, children }) => {
  const path = usePathname();
  const isActive =
    path === href || (path.startsWith(href) && href !== "/dashboard");

  return (
    <Link
      onClick={() => setOpenPrifileDrawer(false)}
      href={href}
      className={
        isActive
          ? "text-primary dark:text-foreground bg-light dark:bg-zinc-800 cursor-pointer rounded-md"
          : ""
      }
    >
      {children}
    </Link>
  );
};

const ProfileDrawerLink = ({ className, setOpenPrifileDrawer }) => {
  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: GoInbox },
    {
      href: "/dashboard/profile-information",
      label: "Profile Information",
      icon: GoPerson,
    },
    {
      href: "/dashboard/donation-history",
      label: "Blood Donation History",
      icon: GoHistory,
    },
    {
      href: "/dashboard/blood-posts",
      label: "My Blood Posts",
      icon: GoChecklist,
    },
    {
      href: "/dashboard/settings/general-settings",
      label: "General Settings",
      icon: GoPeople,
    },
    {
      href: "/dashboard/settings/security-settings",
      label: "Security Settings",
      icon: GoLock,
    },
    {
      href: "/dashboard/settings/appearance",
      label: "Appearance",
      icon: GoMoon,
    },
    {
      href: "/dashboard/community",
      label: "Community Engagement",
      icon: GoGlobe,
    },
    {
      href: "/dashboard/feedback",
      label: "Feedback and Support",
      icon: GoHeart,
    },
  ];

  return (
    <div className="scrollbar">
      <div
        className={cn(
          "container px-2 overflow-y-auto h-[calc(100vh-230px)] scrollbar-thin",
          className
        )}
      >
        {navItems.map(({ href, label, icon: Icon }, index) => (
          <div key={index} className={`flex flex-col mb-1 justify-center`}>
            <ActiveLink href={href} setOpenPrifileDrawer={setOpenPrifileDrawer}>
              <P>
                <Icon className="text-xl" />
                {label}
              </P>
            </ActiveLink>
            {(index === 3 || index === 6) && <Separator className="my-5" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileDrawerLink;
