"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AccountingIcon from "@/components/svgs/AccountingIcon";
import BookingIcon from "@/components/svgs/BookingIcon";
import PropertiesIcon from "@/components/svgs/PropertiesIcon";
import { HOST_PROPERTIES_MENU } from "@/constants";
import { Mail, Wallet, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Sidebar() {
  const pathname = usePathname() || "/";
  const [collapsed, setCollapsed] = useState(false);

  const openSidebar = !pathname?.includes("inbox");
  const isOnCreateListing = pathname?.includes(
    "/hosts/dashboard/properties/create"
  );
  if (isOnCreateListing) return null;

  function pickIcon(text: string, active: boolean) {
    const IconColor = active ? "#DE5353" : "#6B7280";
    if (text.toLowerCase().includes("bookings"))
      return <BookingIcon color={IconColor} size={20} />;
    if (text.toLowerCase().includes("wallet"))
      return <Wallet color={IconColor} size={20} />;
    if (text.toLowerCase().includes("inbox"))
      return <Mail color={IconColor} size={20} />;
    return <AccountingIcon color={IconColor} size={20} />;
  }

  const Links = HOST_PROPERTIES_MENU.map(({ text, link }, idx: number) => {
    const active = pathname.startsWith(link);

    return (
      <li key={idx} className="w-full">
        <Link
          href={link}
          className={clsx(
            "group flex items-center gap-3 w-full rounded-lg transition-all duration-200 ease-out",
            collapsed ? "justify-center px-3 py-3" : "px-6 py-3",
            active
              ? "bg-red-50 text-primary shadow-sm ring-1 ring-red-100"
              : "text-gray-700 hover:bg-gray-50"
          )}
          title={collapsed ? text : undefined}
        >
          <span className="shrink-0 flex items-center justify-center">
            {pickIcon(text, active)}
          </span>

          {/* label animated for smoothness */}
          {!collapsed && openSidebar && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.18 }}
              className={clsx(
                "truncate text-sm tracking-wide font-medium",
                active ? "text-primary" : "text-gray-700"
              )}
            >
              {text}
            </motion.span>
          )}

          {/* Pro badge */}
          {!collapsed && text.toLowerCase() === "my plan" && (
            <span className="ml-auto inline-flex items-center justify-center px-2 py-0.5 text-[11px] font-semibold rounded-full bg-primary text-white shadow-sm">
              Pro
            </span>
          )}
        </Link>
      </li>
    );
  });

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:items-stretch lg:relative">
        <motion.aside
          initial={false}
          animate={{ width: collapsed ? 72 : 224 }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
          className={clsx(
            "flex flex-col bg-white h-screen flex-shrink-0 border-r border-gray-200 transition-all ease-out relative",
            "shadow-sm"
          )}
          aria-label="Host sidebar"
          style={{ left: 0 }} // Ensure it stays at the edge
        >
          {/* Collapse toggle */}
          <motion.button
            onClick={() => setCollapsed((s) => !s)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="absolute right-[-12px] top-6 hidden lg:flex items-center justify-center rounded-full bg-white border border-gray-200 p-1 shadow-sm hover:bg-gray-50 z-20"
            whileTap={{ scale: 0.96 }}
            animate={{ rotate: collapsed ? 0 : 0 }}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4 text-gray-600" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            )}
          </motion.button>

          {/* top spacer */}
          <div className="h-16 flex items-center justify-center px-3"></div>

          <nav className="flex-1 px-2 overflow-y-auto">
            <ul
              className={clsx(
                "flex flex-col gap-1",
                collapsed ? "items-center" : "items-stretch"
              )}
            >
              {Links}
            </ul>
          </nav>

          <div className="px-3 py-4 border-t border-gray-100">
            {/* Secondary collapse control */}
            <div className="hidden sm:block">
              <button
                onClick={() => setCollapsed((s) => !s)}
                aria-expanded={!collapsed}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                className="w-full inline-flex items-center justify-center gap-3 rounded-md bg-white border border-gray-200 px-3 py-2 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition"
              >
                {collapsed ? (
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                ) : (
                  <ChevronLeft className="h-4 w-4 text-gray-600" />
                )}
                <span className="hidden sm:inline text-sm font-medium">
                  {collapsed ? "" : "Collapse"}
                </span>
              </button>
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Mobile bottom nav */}
      <div className="w-full fixed bottom-0 z-[9999] h-[70px] flex items-center bg-white border-t border-gray-300 lg:hidden">
        <ul className="w-full grid grid-cols-5">
          {HOST_PROPERTIES_MENU.map(({ text, link }, idx) => {
            const active = pathname.startsWith(link);
            const IconColor = active ? "#DE5353" : "#6B7280";

            let Icon = <PropertiesIcon color={IconColor} size={20} />;
            if (text.toLowerCase().includes("bookings"))
              Icon = <BookingIcon color={IconColor} size={20} />;
            else if (text.toLowerCase().includes("wallet"))
              Icon = <Wallet color={IconColor} size={20} />;
            else if (text.toLowerCase().includes("inbox"))
              Icon = <Mail color={IconColor} size={20} />;

            return (
              <li key={idx} className="flex items-center justify-center">
                <Link
                  href={link}
                  className={clsx(
                    "p-3 rounded-md",
                    active ? "text-primary" : "text-gray-600"
                  )}
                >
                  {Icon}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
