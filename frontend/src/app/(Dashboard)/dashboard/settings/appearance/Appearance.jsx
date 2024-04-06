"use client";

import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";

const Appearance = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <h4 className="text-foreground">Appearance</h4>
      <p className="text-sm">
        Customize the appearance of the app. Automatically switch between day
        and night themes.
      </p>

      <Separator className="my-5" />

      <p className="text-foreground font-medium text-lg">Theme</p>
      <p className="text-sm mb-3">Select the theme for the website.</p>

      <div className="flex gap-3 text-center">
        <div>
          <div
            onClick={() => setTheme("light")}
            className={`cursor-pointer border rounded-lg h-40 w-60 p-4 hover:outline outline-2 hover:outline-primary bg-white text-black transition-all
            ${theme === "light" && "border-2 border-primary"}`}
          >
            <div className="bg-neutral-200 w-full h-1/2 p-2 flex flex-col justify-center gap-3 rounded-md">
              <p className="bg-neutral-300 h-3 w-2/3 rounded-full" />
              <p className="bg-neutral-300 h-3 w-full rounded-full" />
            </div>
            <p className="mt-5 text-black text-lg">Light</p>
          </div>
        </div>
        <div>
          <div
            onClick={() => setTheme("dark")}
            className={`cursor-pointer border rounded-lg h-40 w-60 p-4 hover:outline outline-2 hover:outline-primary bg-[#0d0d0d] text-white transition-all ${
              theme === "dark" && "border-2 border-primary"
            }`}
          >
            <div className="bg-neutral-800 w-full h-1/2 p-2 flex flex-col justify-center gap-3 rounded-md">
              <p className="bg-neutral-700 h-3 w-2/3 rounded-full" />
              <p className="bg-neutral-700 h-3 w-full rounded-full" />
            </div>
            <p className="mt-5 text-white text-lg">Dark</p>
          </div>
        </div>
        <div>
          <div
            onClick={() => setTheme("system")}
            className={`cursor-pointer border rounded-lg h-40 w-60 p-4 hover:outline outline-2 hover:outline-primary bg-[#0d0d0d] text-white transition-all ${
              theme === "system" && "border-2 border-primary"
            }`}
          >
            <div className="bg-neutral-800 w-full h-1/2 p-2 flex flex-col justify-center gap-3 rounded-md">
              <p className="bg-neutral-700 h-3 w-2/3 rounded-full" />
              <p className="bg-neutral-700 h-3 w-full rounded-full" />
            </div>
            <p className="mt-5 text-white text-lg">System</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
