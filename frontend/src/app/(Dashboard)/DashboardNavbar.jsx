import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GoBell,
  GoChecklist,
  GoGear,
  GoGlobe,
  GoHeart,
  GoHistory,
  GoInbox,
  GoPerson,
  GoVersions,
} from "react-icons/go";

const P = ({ children }) => (
  <div className="flex items-center gap-2 hover:text-primary dark:hover:text-foreground h-11 px-4 hover:bg-red-100/60 dark:hover:bg-zinc-800/60 bg-transparent cursor-pointer rounded-md transition-all text-sm">
    {children}
  </div>
);

const ActiveLink = ({ href, children }) => {
  const path = usePathname();
  const isActive =
    path === href || (path.startsWith(href) && href !== "/dashboard");

  return (
    <Link
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

const DashboardNavbar = ({ className, isCollapsible }) => {
  const { currentUser } = UserAuth();

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
      href: "/dashboard/requests-notifications",
      label: "Requests Notifications",
      icon: GoBell,
    },
    {
      href: "/dashboard/donation-events",
      label: "Blood Donation Events",
      icon: GoVersions,
    },
    {
      href: "/dashboard/settings",
      label: "Settings and Preferences",
      icon: GoGear,
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
    <div className={cn("container px-2 scrollbar", className)}>
      <div
        className={`flex items-center mt-10 ${
          isCollapsible ? "justify-center" : "gap-2"
        }`}
      >
        <Image
          className={`${
            currentUser?.photoURL ? "border border-primary" : ""
          } rounded-full`}
          src={
            currentUser?.photoURL
              ? currentUser?.photoURL
              : "/assets/defaultUser.svg"
          }
          alt="Profile Image"
          width={!isCollapsible ? 60 : 50}
          height={50}
          priority
        />
        {!isCollapsible && (
          <div>
            <p className="text-foreground font-medium text-xl">
              {currentUser?.displayName?.includes("(")
                ? currentUser?.displayName
                    ?.split("(")[0]
                    .split(" ")
                    .reverse()[1]
                : currentUser?.displayName?.trim().split(" ").pop()}
            </p>
            <p className="text-sm capitalize text-primary">
              {currentUser?.role}
            </p>
          </div>
        )}
      </div>

      <Separator className="my-5" />

      <div className="overflow-y-auto h-[calc(100vh-200px)] scrollbar-thin">
        <TooltipProvider>
          {navItems.map(({ href, label, icon: Icon }, index) => (
            <Tooltip key={index} id={`tooltip-${index}`}>
              <TooltipTrigger className="w-full">
                <div
                  className={`flex flex-col mb-1 justify-center ${
                    isCollapsible && "items-center"
                  }`}
                >
                  <ActiveLink href={href}>
                    <P>
                      {isCollapsible ? (
                        <>
                          <Icon className="text-xl" />
                          <TooltipContent
                            side="right"
                            id={`tooltip-content-${index}`}
                          >
                            <p className="text-xs">{label}</p>
                          </TooltipContent>
                        </>
                      ) : (
                        <Icon className="text-xl" />
                      )}
                      {!isCollapsible && label}
                    </P>
                  </ActiveLink>
                  {(index === 3 || index === 6) && (
                    <Separator className="my-5" />
                  )}
                </div>
              </TooltipTrigger>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default DashboardNavbar;
