// app/SidebarProvider.tsx
"use client";

import React, { createContext, useState } from "react";
import useQueryString from "@/hooks/useQueryString";

export type SidebarContextShape = {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SidebarContext = createContext<SidebarContextShape>({
  isCollapsed: false,
  // default no-op; real setter provided by provider
  setIsCollapsed: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>,
});

export default function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pathname } = useQueryString();

  // keep collapse state (accepts functional updater so `setIsCollapsed(s => !s)` works)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // children expected: <Sidebar /> , ...page content
  const childArray = React.Children.toArray(children);
  const sidebarChild = childArray[0] ?? null;
  const contentChildren = childArray.slice(1);

  // center content except on homepage (same logic you used before)
  const contentCenterCss =
    pathname.slice(0) === "/" ? "" : "max-w-[1400px] mx-auto w-full";

  // Hide the sidebar entirely on the homepage
  const shouldShowSidebar = pathname.slice(0) !== "/";

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      <div className="flex w-full min-h-screen">
        {/* Sidebar part (keeps left edge flush) */}
        {shouldShowSidebar && sidebarChild}

        {/* Page content area — will be pushed/pulled as sidebar width changes */}
        <div
          className={`flex-1 transition-all duration-200 ${contentCenterCss}`}
        >
          {contentChildren}
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
