"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/navigation/hosts/sidebar";
import clsx from "clsx";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname() || "/";

  // Show sidebar for host dashboard pages EXCEPT the create flow
  const shouldShowSidebar =
    pathname.startsWith("/hosts/dashboard") &&
    !pathname.includes("/hosts/dashboard/properties/create");

  return (
    <div className="w-full h-full flex 2xl:max-w-[1400px] 2xl:mx-auto">
      {/* Sidebar wrapper — render ONLY when needed */}
      {shouldShowSidebar && (
        <div
          className="fixed left-0 top-[80px] h-[calc(100vh-80px)] z-40"
          style={{ overflow: "visible" }}
        >
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </div>
      )}

      {/* Content area — only pad-left when the sidebar is present */}
      <div
        className={clsx(
          "w-full min-h-screen transition-all duration-300",
          shouldShowSidebar
            ? isCollapsed
              ? "lg:pl-20"
              : "lg:pl-56"
            : "lg:pl-0"
        )}
      >
        <div className="2xl:max-w-[1400px] 2xl:mx-auto w-full p-2">
          {children}
        </div>
      </div>
    </div>
  );
}
