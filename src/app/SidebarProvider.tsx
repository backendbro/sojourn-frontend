// app/SidebarProvider.tsx
"use client";

import React, { createContext, useState } from "react";
import useQueryString from "@/hooks/useQueryString";

export type SidebarContextShape = {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SidebarContext = createContext<SidebarContextShape>({
  isCollapsed: true,
  // default no-op; real setter provided by provider
  setIsCollapsed: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>,
});

export default function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pathname } = useQueryString();

  // default collapsed (true) to avoid mobile overlay showing on initial load
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  // children expected: <Sidebar /> , ...page content
  const childArray = React.Children.toArray(children);
  const sidebarChild = childArray[0] ?? null;
  const contentChildren = childArray.slice(1);

  // center content except on homepage
  const contentCenterCss =
    pathname.slice(0) === "/" ? "" : "max-w-[1400px] mx-auto w-full";

  // Hide the sidebar entirely on the homepage
  const shouldShowSidebar = pathname.slice(0) !== "/";

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {/* Flex parent needs min-h-0 / min-w-0 so children with internal scroll behave correctly */}
      <div className="flex w-full min-h-screen min-w-0">
        {/* Sidebar part (keeps left edge flush) */}
        {shouldShowSidebar && sidebarChild}

        {/* Page content area — will be pushed/pulled as sidebar width changes */}
        <div
          className={`flex-1 transition-all duration-200 min-h-0 ${contentCenterCss}`}
        >
          {contentChildren}
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
