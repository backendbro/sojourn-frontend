// app/hosts/dashboard/layout.tsx
"use client";

import React, { useContext } from "react";
import Sidebar from "@/components/navigation/hosts/sidebar";
import { Menu } from "lucide-react";
import clsx from "clsx";
import { SidebarContext } from "@/app/SidebarProvider";

/**
 * Host dashboard layout:
 *
 * - Uses global SidebarContext (so host and guest patterns don't fight each other)
 * - Mobile sidebar uses transform-based slide (translateX) for smooth animation
 * - Content receives responsive left padding on lg breakpoint to match sidebar widths
 */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isCollapsed, setIsCollapsed } = useContext(SidebarContext);

  // widths used in sidebars
  const collapsedWidth = 72; // px
  const expandedWidth = 224; // px

  return (
    <div className="w-full h-full flex 2xl:max-w-[1400px] 2xl:mx-auto relative">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsCollapsed((s) => !s)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
        aria-label="Toggle sidebar"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar wrapper:
          - On mobile: fixed + translateX for smooth animation
          - On lg+: static positioning (part of normal layout from SidebarProvider)
      */}
      <div
        className={clsx(
          "fixed left-0 top-[80px] h-[calc(100vh-80px)] z-40 lg:static lg:h-auto",
          // mobile slide-in/out via transform
          isCollapsed ? "-translate-x-full" : "translate-x-0",
          "transform transition-transform duration-300 ease-in-out",
          // ensure it appears above content on mobile when open
          !isCollapsed ? "z-40" : "z-30"
        )}
        style={{ overflow: "visible" }}
      >
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsCollapsed(true)}
          aria-hidden
        />
      )}

      {/* Content area with dynamic padding for lg screens */}
      <div
        className={clsx(
          "w-full min-h-screen transition-all duration-300",
          // Note: keep these values in sync with the actual sidebar widths
          isCollapsed ? "lg:pl-20" : "lg:pl-56"
        )}
      >
        <div className="2xl:max-w-[1400px] 2xl:mx-auto w-full p-6 min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
}
