// components/ClientContentWrapper.tsx
"use client";

import React, { useContext } from "react";
import clsx from "clsx";
import { SidebarContext } from "@/app/SidebarProvider";

export default function ClientContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCollapsed } = useContext(SidebarContext);

  return (
    <div
      className={clsx(
        "min-h-screen transition-all duration-200 ease-out",
        // keep these exact literal classes so Tailwind JIT picks them up
        isCollapsed ? "lg:pl-[72px]" : "lg:pl-[224px]"
      )}
    >
      {children}
    </div>
  );
}
