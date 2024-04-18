"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import GeneralSettingsPage from "./general-settings/page";

const SettingsPage = () => {
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (path === "/dashboard/settings") {
      router.replace("/dashboard/settings/general-settings");
    }
  }, []);

  return <GeneralSettingsPage />;
};

export default SettingsPage;
