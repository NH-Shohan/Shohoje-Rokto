"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useState } from "react";
import DashboardNavbar from "../DashboardNavbar";

const DashboardLayout = ({ children }) => {
  const [isCollapsible, setIsCollapsible] = useState(false);

  return (
    <div className="h-[calc(100vh-60px)] container mx-auto">
      <ResizablePanelGroup direction="horizontal" className="grid grid-cols-2">
        <ResizablePanel
          onCollapse={() => {
            setIsCollapsible(true);
          }}
          onExpand={() => {
            setIsCollapsible(false);
          }}
          collapsible={true}
          collapsedSize={6}
          minSize={22}
          maxSize={30}
          defaultSize={26}
          className="relative"
        >
          <DashboardNavbar isCollapsible={isCollapsible} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="p-10">{children}</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default DashboardLayout;
