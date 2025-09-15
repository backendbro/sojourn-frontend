// components/navigation/sidebar.tsx
"use client";

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
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

type SidebarProps = {
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
};

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname() || "/";

  // portal mount state
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // keep selected in sync with route
  const [selected, setSelected] = useState<string>(pathname);
  useEffect(() => setSelected(pathname), [pathname]);

  // visibility rules (unchanged)
  const isLoggedIn = useSelector((state: RootState) => state.user?.loggedIn);
  const isOnUserAndLoggedin = isLoggedIn && !pathname.includes("hosts");
  const isOnCheckoutPage = isLoggedIn && pathname.includes("checkout");

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

  function isActive(link: string | undefined) {
    if (!link) return false;
    if (link === "/") return selected === "/" || pathname === "/";
    return (
      selected === link ||
      pathname === link ||
      pathname.startsWith(link + "/") ||
      pathname.startsWith(link)
    );
  }

  // Side bar markup (memoized so portal uses stable node)
  const sidebarNode = useMemo(
    () => (
      <div
        // top-level wrapper (this lives in body to avoid ancestor transforms)
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          zIndex: 9999,
        }}
      >
        <motion.aside
          initial={false}
          animate={{
            width: isCollapsed ? `${collapsedWidth}px` : `${expandedWidth}px`,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
            mass: 0.5,
          }}
          aria-label="Guest sidebar"
          // ensure no transform/style from app affects this element
          className={clsx(
            "hidden lg:flex overflow-hidden flex-col bg-gray-50 border-r border-gray-200 shadow-sm",
            "flex-shrink-0 transition-all ease-out"
          )}
          style={{
            height: "100vh",
            // prevent accidental transforms
            transform: "none",
            willChange: "auto",
          }}
        >
          {/* header */}
          <div
            className="h-4 flex items-center px-4 border-b border-gray-200"
            style={{ justifyContent: isCollapsed ? "center" : "flex-start" }}
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
          </div>

          {/* nav: internal scroll */}
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

          {/* toggle button sits on the divider */}
          <button
            onClick={() => setIsCollapsed((s) => !s)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="absolute -right-3 top-4 flex items-center justify-center rounded-full bg-white border border-gray-200 p-1 shadow-sm hover:bg-red-50 hover:text-red-600"
            style={{ zIndex: 10000 }}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-gray-600 hover:text-red-600" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-gray-600 hover:text-red-600" />
            )}
          </button>
        </motion.aside>

        {/* mobile bottom nav (still rendered in body to avoid layout issues) */}
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
                      active
                        ? "text-red-600"
                        : "text-gray-600 hover:text-red-600"
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
      </div>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isCollapsed, pathname, selected]
  );

  // mount into document.body so `position: fixed` is relative to viewport
  if (!mounted) return null;
  return createPortal(sidebarNode, document.body);
}
