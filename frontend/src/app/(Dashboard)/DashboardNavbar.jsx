import { cn } from "@/lib/utils";
import {
  GoBell,
  GoChecklist,
  GoFileDirectory,
  GoGear,
  GoGlobe,
  GoHeart,
  GoHistory,
  GoPerson,
  GoVersions,
} from "react-icons/go";

const P = ({ children }) => {
  return (
    <p className="flex items-center gap-2 hover:text-foreground py-2 px-3 hover:bg-secondary dark:hover:bg-zinc-800 bg-transparent cursor-pointer rounded-md transition-all">
      {children}
    </p>
  );
};

const DashboardNavbar = ({ className }) => {
  return (
    <div className={cn("container", className)}>
      <P>
        <GoPerson className="text-xl" />
        Profile Information
      </P>
      <P>
        <GoHistory className="text-xl" />
        Blood Donation History
      </P>
      <P>
        <GoChecklist className="text-xl" />
        Blood Post Management
      </P>
      <P>
        <GoFileDirectory className="text-xl" />
        Request Blood Management
      </P>
      <P>
        <GoBell className="text-xl" />
        Notifications for Requests
      </P>
      <P>
        <GoGlobe className="text-xl" />
        Community Engagement
      </P>
      <P>
        <GoVersions className="text-xl" />
        Blood Donation Events
      </P>
      <P>
        <GoGear className="text-xl" />
        Settings and Preferences
      </P>
      <P>
        <GoHeart className="text-xl" />
        Feedback and Support
      </P>
    </div>
  );
};

export default DashboardNavbar;
