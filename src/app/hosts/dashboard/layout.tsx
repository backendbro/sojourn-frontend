"use client";

import { useState } from "react";
import Sidebar from "@/components/navigation/hosts/sidebar";
import clsx from "clsx";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="w-full h-full flex 2xl:max-w-[1400px] 2xl:mx-auto">
      {/* Sidebar wrapper */}
      <div
        className="fixed left-0 top-[80px] h-[calc(100vh-80px)] z-40"
        style={{ overflow: "visible" }}
      >
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Content area with dynamic padding */}
      <div
        className={clsx(
          "w-full min-h-screen transition-all duration-300",
          isCollapsed ? "lg:pl-20" : "lg:pl-56"
        )}
      >
        <div className="2xl:max-w-[1400px] 2xl:mx-auto w-full p-2">
          {children}
        </div>
      </div>
    </div>
  );
}
