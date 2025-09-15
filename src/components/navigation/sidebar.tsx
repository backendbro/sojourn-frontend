// components/navigation/sidebar.tsx
"use client";

import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import BookingIcon from "@/components/svgs/BookingIcon";
import PropertiesIcon from "@/components/svgs/PropertiesIcon";
import { GUEST_SIDEBAR_MENU } from "@/constants";
import {
  Mail,
  Wallet,
  Home,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { SidebarContext } from "@/app/SidebarProvider";

export default function Sidebar() {
  const pathname = usePathname() || "/";
  const { isCollapsed, setIsCollapsed } = useContext(SidebarContext);

  const [selected, setSelected] = useState<string>(pathname);
  useEffect(() => {
    setSelected(pathname);
  }, [pathname]);

  const isLoggedIn = useSelector((state: RootState) => state.user?.loggedIn);
  const isOnUserAndLoggedin = isLoggedIn && !pathname.includes("hosts");
  const isOnCheckoutPage = isLoggedIn && pathname.includes("checkout");
  const openSidebar = !pathname.includes("inbox");

  if (!isOnUserAndLoggedin) return null;
  if (isOnCheckoutPage) return null;

  function pickIcon(text: string, active: boolean) {
    const IconColor = active ? "#DE5353" : "#677073";
    if (text.toLowerCase().includes("bookings"))
      return <BookingIcon color={IconColor} size={18} />;
    if (text.toLowerCase().includes("wallet"))
      return (<Wallet color={IconColor} size={18} />) as any;
    if (text.toLowerCase().includes("inbox"))
      return (<Mail color={IconColor} size={18} />) as any;
    if (text.toLowerCase().includes("wishlist"))
      return (<Heart color={IconColor} size={18} />) as any;
    return <Home color={IconColor} size={18} />;
  }

  const collapsedWidth = 72;
  const expandedWidth = 224;

  // update a CSS var so the rest of the page can react to the sidebar width
  useEffect(() => {
    const w = isCollapsed ? `${collapsedWidth}px` : `${expandedWidth}px`;
    // set CSS variable on :root (documentElement) so global CSS can use it
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty("--sidebar-width", w);
    }
  }, [isCollapsed]);

  function isActive(link: string | undefined) {
    if (!link) return false;
    if (link === "/") {
      return selected === "/" || pathname === "/";
    }
    return (
      selected === link ||
      pathname === link ||
      pathname.startsWith(link + "/") ||
      pathname.startsWith(link)
    );
  }

  return (
    <>
      {/* Desktop sidebar — now fixed so it stays put during scroll */}
      <div className="hidden lg:block">
        <motion.aside
          initial={false}
          animate={{ width: isCollapsed ? collapsedWidth : expandedWidth }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
            mass: 0.5,
          }}
          className={clsx(
            // fixed positioning so sidebar doesn't move with scroll
            "fixed left-0 top-0 h-screen flex-shrink-0 bg-gray-50 border-r border-gray-200 shadow-sm z-40",
            "flex flex-col transition-all ease-out overflow-hidden"
          )}
          aria-label="Guest sidebar"
          style={{ overflow: "hidden" }}
        >
          {/* HEADER */}
          <motion.div
            className="h-4 flex items-center px-4 border-b border-gray-200"
            animate={{ justifyContent: isCollapsed ? "center" : "flex-start" }}
          >
            <div
              className={clsx(
                "flex items-center gap-3 w-full",
                isCollapsed ? "justify-center" : "justify-start"
              )}
            >
              {!isCollapsed && (
                <span className="font-semibold text-lg text-gray-800"> </span>
              )}
            </div>
          </motion.div>

          {/* Nav — internal scroll so sidebar never causes whole-page overflow */}
          <nav
            className="flex-1 px-2 pt-2 pb-4 overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 80px)" }}
          >
            <ul
              className={clsx(
                "flex flex-col gap-1",
                isCollapsed ? "items-center" : "items-stretch"
              )}
            >
              {GUEST_SIDEBAR_MENU.map(({ text, link }, idx: number) => {
                const active = isActive(link);
                return (
                  <li key={idx} className="w-full">
                    <Link
                      href={link}
                      onClick={() => setSelected(link)}
                      className={clsx(
                        "group flex items-center gap-3 w-full rounded-lg transition-all duration-150 ease-out",
                        isCollapsed ? "justify-center px-3 py-3" : "px-6 py-3",
                        active
                          ? "bg-red-50 text-red-600 shadow-sm ring-1 ring-red-100"
                          : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                      )}
                      title={isCollapsed ? text : undefined}
                    >
                      <span className="shrink-0 flex items-center justify-center group-hover:text-red-600">
                        {pickIcon(text, active)}
                      </span>

                      {/* labels */}
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -6 }}
                          transition={{ duration: 0.14 }}
                          className={clsx(
                            "truncate text-sm tracking-wide font-medium",
                            active
                              ? "text-red-600"
                              : "text-gray-700 group-hover:text-red-600"
                          )}
                        >
                          {text}
                        </motion.span>
                      )}

                      {!isCollapsed && text.toLowerCase() === "my plan" && (
                        <span className="ml-auto inline-flex items-center justify-center px-2 py-0.5 text-[11px] font-semibold rounded-full bg-red-600 text-white shadow-sm">
                          Pro
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Toggle button: placed inside the aside so it stays positioned correctly */}
          <motion.button
            onClick={() => setIsCollapsed((s) => !s)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="absolute -right-3 top-4 flex items-center justify-center rounded-full bg-white border border-gray-200 p-1 shadow-sm hover:bg-red-50 hover:text-red-600 z-50"
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.05 }}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-gray-600 hover:text-red-600" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-gray-600 hover:text-red-600" />
            )}
          </motion.button>
        </motion.aside>
      </div>

      {/* Mobile bottom nav — unchanged */}
      <div className="w-full fixed bottom-0 z-[9999] h-[70px] flex items-center bg-white border-t border-gray-300 lg:hidden">
        <ul className="w-full grid grid-cols-5">
          {GUEST_SIDEBAR_MENU.map(({ text, link }, idx) => {
            const active = pathname.slice(0) === link;
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
                    "p-3 rounded-md flex flex-col items-center transition-colors",
                    active ? "text-red-600" : "text-gray-600 hover:text-red-600"
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
