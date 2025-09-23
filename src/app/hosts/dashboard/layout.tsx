"use client";

import { useState } from "react";
import Sidebar from "@/components/navigation/hosts/sidebar";
import { Menu } from "lucide-react";
import clsx from "clsx";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="w-full h-full flex 2xl:max-w-[1400px] 2xl:mx-auto">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar wrapper: adjusted to match guest pattern and avoid header overlap.
          `top-[80px]` and `h-[calc(100vh-80px)]` plus overflow-visible ensure the toggle
          won't be clipped by header or other elements. */}
      <div
        className="fixed left-0 top-[80px] h-[calc(100vh-80px)] z-40"
        style={{ overflow: "visible" }}
      >
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Content area with dynamic padding */}
      <div
        className={clsx(
          "w-full min-h-screen transition-all duration-300",
          isCollapsed ? "lg:pl-20" : "lg:pl-56"
        )}
      >
        <div className="2xl:max-w-[1400px] 2xl:mx-auto w-full p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
