"use client";

import React from "react";
import { motion } from "framer-motion";
import AccountingIcon from "@/components/svgs/AccountingIcon";
import BookingIcon from "@/components/svgs/BookingIcon";
import PropertiesIcon from "@/components/svgs/PropertiesIcon";
import { HOST_PROPERTIES_MENU } from "@/constants";
import { Mail, Wallet, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type Props = {
  isCollapsed: boolean;
  setIsCollapsed: (s: boolean) => void;
};

export default function Sidebar({ isCollapsed, setIsCollapsed }: Props) {
  const pathname = usePathname() || "/";
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
            isCollapsed ? "justify-center px-3 py-3" : "px-6 py-3",
            active
              ? "bg-red-50 text-primary shadow-sm ring-1 ring-red-100"
              : "text-gray-700 hover:bg-red-50 hover:text-primary"
          )}
          title={isCollapsed ? text : undefined}
        >
          <span className="shrink-0 flex items-center justify-center group-hover:text-primary">
            {pickIcon(text, active)}
          </span>

          {/* label animated for smoothness */}
          {!isCollapsed && openSidebar && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.18 }}
              className={clsx(
                "truncate text-sm tracking-wide font-medium group-hover:text-primary",
                active ? "text-primary" : "text-gray-700"
              )}
            >
              {text}
            </motion.span>
          )}

          {/* Pro badge */}
          {!isCollapsed && text.toLowerCase() === "my plan" && (
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
      {/* Desktop sidebar — fixed so it touches the viewport left edge */}
      <div className="hidden lg:block">
        <motion.aside
          initial={false}
          animate={{ width: isCollapsed ? 72 : 224 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
            mass: 0.5,
          }}
          className={clsx(
            "fixed left-0 top-0 h-screen flex flex-col bg-gray-50 flex-shrink-0 border-r border-gray-200 transition-all ease-out shadow-sm z-40"
          )}
          aria-label="Host sidebar"
          style={{ left: 0 }}
        >
          {/* Collapse toggle - positioned to align with content header */}
          <motion.button
            onClick={() => setIsCollapsed((s) => !s)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="absolute -right-3 top-24 flex items-center justify-center rounded-full bg-white border border-gray-200 p-1 shadow-sm hover:bg-red-50 hover:text-primary z-50"
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.05 }}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-gray-600 hover:text-primary" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-gray-600 hover:text-primary" />
            )}
          </motion.button>

          {/* Adjusted top spacer to align with content header */}
          <motion.div
            className="h-20 flex items-center justify-center px-3 border-b border-gray-200"
            animate={{ justifyContent: isCollapsed ? "center" : "flex-start" }}
          >
            {!isCollapsed ? (
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-semibold text-lg text-gray-800 pl-3"
              >
                Dashboard
              </motion.h2>
            ) : (
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
            )}
          </motion.div>

          {/* Navigation with adjusted padding to align with content */}
          <nav className="flex-1 px-2 pt-2 pb-4 overflow-y-auto">
            <ul
              className={clsx(
                "flex flex-col gap-1",
                isCollapsed ? "items-center" : "items-stretch"
              )}
            >
              {Links}
            </ul>
          </nav>

          {/* Bottom collapse control removed as requested */}
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
                    "p-3 rounded-md flex flex-col items-center hover:text-primary",
                    active ? "text-primary" : "text-gray-600"
                  )}
                >
                  {Icon}
                  <span className="text-xs mt-1">{text.split(" ")[0]}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
