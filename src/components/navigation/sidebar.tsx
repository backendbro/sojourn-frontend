// "use client";

// import BookingIcon from "@/components/svgs/BookingIcon";
// import PropertiesIcon from "@/components/svgs/PropertiesIcon";
// import { GUEST_SIDEBAR_MENU } from "@/constants";
// import { RootState } from "@/store";
// import { Heart, Home, Mail, Wallet } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useSelector } from "react-redux";

// export default () => {
//   const pathname = usePathname();

//   const isLoggedIn = useSelector((state: RootState) => state.user?.loggedIn);

//   const isOnUserAndLoggedin = isLoggedIn && !pathname.includes("hosts");

//   const isOnCheckoutPage = isLoggedIn && pathname.includes("checkout");

//   const isPropertiesOrHomeOrBecomeAHost =
//     pathname.includes("/properties") ||
//     pathname.slice(0) === "/" ||
//     pathname.includes("/become-a-host");

//   const openSidebar = !pathname.includes("inbox");

//   const Links = GUEST_SIDEBAR_MENU.map(({ text, link }, idx: number) => {
//     const activeTabCss =
//       pathname.slice(0) === link ? "text-primary font-bold" : "";

//     const IconColor = pathname.slice(0) === link ? "#DE5353" : "#677073";

//     const HomeLinkCss = text.toLowerCase() === "home" ? "flex lg:hidden" : "";

//     let Icon = <PropertiesIcon color={IconColor} size={18} />;
//     if (text.includes("bookings")) {
//       Icon = <BookingIcon color={IconColor} size={18} />;
//     } else if (text.includes("wallet")) {
//       Icon = (<Wallet color={IconColor} size={18} />) as any;
//     } else if (text.includes("inbox")) {
//       Icon = (<Mail color={IconColor} size={18} />) as any;
//     } else if (text.includes("wishlist")) {
//       Icon = (<Heart color={IconColor} size={18} />) as any;
//     } else {
//       Icon = <Home color={IconColor} size={18} />;
//     }

//     return (
//       <li
//         key={idx}
//         className={`w-full flex flex-col list-none lg:flex-row lg:border-b lg:border-b-gray-300 ${HomeLinkCss}`}
//       >
//         <Link
//           className={`w-full flex flex-col py-4  capitalize font-semibold text-[#677073] flex items-center justify-center space-y-2 space-x-0 hover:bg-red-50 lg:flex-row lg:px-3 lg:space-x-4 lg:space-y-0`}
//           href={link}
//         >
//           {Icon}
//           {openSidebar ? (
//             <span
//               className={`${activeTabCss} hidden lg:block truncate font-bold lg:font-[500] text-black text-center text-xs lg:text-sm w-4/5 lg:w-full lg:text-left `}
//             >
//               {text}
//             </span>
//           ) : null}
//           <span
//             className={`${activeTabCss}block lg:hidden  truncate font-bold lg:font-[500] text-black text-center text-xs lg:text-sm w-4/5 lg:w-full lg:text-left `}
//           >
//             {text}
//           </span>
//         </Link>
//       </li>
//     );
//   });

//   const hostSidebarWidth = openSidebar
//     ? "lg:w-1/6 lg:h-[210px]"
//     : "lg:w-[55px] lg:h-[200px]";

//   return (
//     <div
//       className={`w-full ${
//         isOnUserAndLoggedin
//           ? isPropertiesOrHomeOrBecomeAHost
//             ? "flex md:hidden"
//             : isOnCheckoutPage
//             ? "hidden"
//             : "flex"
//           : "hidden"
//       } fixed bottom-0 z-[9999] h-[70px] items-center sj-shadow bg-white border border-gray-300 lg:sticky lg:top-[120px] lg:flex-col ${hostSidebarWidth} lg:items-start`}
//     >
//       <ul className="w-full grid grid-cols-5 lg:grid-cols-1 lg:overflow-hidden">
//         {Links}
//       </ul>
//     </div>
//   );
// };

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { GUEST_SIDEBAR_MENU } from "@/constants";
import clsx from "clsx";

// heroicons (visuals from the new design)
import {
  BuildingOfficeIcon,
  CalendarIcon,
  WalletIcon,
  EnvelopeIcon,
  UserPlusIcon,
  HomeIcon as HeroHomeIcon,
  HeartIcon as HeroHeartIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

/**
 * Sidebar component
 * - Visuals inspired by the "new design" you provided
 * - Keeps original functionality & visibility logic from your "old design"
 */
export default function Sidebar() {
  const pathname = usePathname();

  const isLoggedIn = useSelector((state: RootState) => state.user?.loggedIn);

  const isOnUserAndLoggedin = isLoggedIn && !pathname.includes("hosts");

  const isOnCheckoutPage = isLoggedIn && pathname.includes("checkout");

  const isPropertiesOrHomeOrBecomeAHost =
    pathname.includes("/properties") ||
    pathname.slice(0) === "/" ||
    pathname.includes("/become-a-host");

  // This mirrors your original "openSidebar" boolean (used to decide label visibility)
  const openSidebar = !pathname.includes("inbox");

  // collapsed state for desktop (visual toggle). We sync it to openSidebar on pathname changes
  const [collapsed, setCollapsed] = useState<boolean>(!openSidebar);

  useEffect(() => {
    // Keep sidebar collapsed state in sync with original openSidebar rule
    setCollapsed(!openSidebar);
  }, [openSidebar, pathname]);

  // Build navigation data from GUEST_SIDEBAR_MENU (keeps original links/text)
  const navigation = GUEST_SIDEBAR_MENU.map(({ text, link }) => {
    const normalized = text.toLowerCase();
    // determine "current" using the exact same test as original code
    const current = pathname.slice(0) === link;

    // map to heroicons based on label
    let Icon: React.ComponentType<any> = HeroHomeIcon;
    if (normalized.includes("properties") || normalized.includes("property")) {
      Icon = BuildingOfficeIcon;
    } else if (
      normalized.includes("bookings") ||
      normalized.includes("booking")
    ) {
      Icon = CalendarIcon;
    } else if (normalized.includes("wallet")) {
      Icon = WalletIcon;
    } else if (normalized.includes("inbox")) {
      Icon = EnvelopeIcon;
    } else if (normalized.includes("wishlist") || normalized.includes("wish")) {
      Icon = HeroHeartIcon;
    } else if (normalized.includes("home")) {
      Icon = HeroHomeIcon;
    }

    // optional badge (keeps support if new design badges are desired)
    const badge = normalized.includes("plan") ? "Pro" : undefined;

    return {
      name: text,
      href: link,
      icon: Icon,
      current,
      badge,
    };
  });

  // hostSidebarWidth logic kept consistent with old layout to avoid functional changes
  const hostSidebarWidth = openSidebar
    ? "lg:w-72 lg:h-[210px]"
    : "lg:w-16 lg:h-[200px]";

  // wrapper visibility kept identical to original component
  const wrapperVisibilityClass = isOnUserAndLoggedin
    ? isPropertiesOrHomeOrBecomeAHost
      ? "flex md:hidden"
      : isOnCheckoutPage
      ? "hidden"
      : "flex"
    : "hidden";

  return (
    <>
      {/* Mobile / small screens: bottom bar (keeps original mobile behavior but with new visual) */}
      <div
        className={clsx(
          "w-full",
          wrapperVisibilityClass,
          "fixed bottom-0 z-[9999] h-[70px] items-center sj-shadow bg-white border border-gray-300 lg:hidden"
        )}
        aria-hidden={false}
      >
        <ul className="w-full grid grid-cols-5">
          {navigation.map((item, idx) => {
            const Icon = item.icon;
            const active = item.current;
            const iconColorClass = active
              ? "text-primary-600"
              : "text-gray-500";
            // show text according to original openSidebar logic; original had some differences per breakpoint
            return (
              <li key={idx} className="w-full flex flex-col list-none">
                <Link
                  href={item.href}
                  className={clsx(
                    "w-full flex flex-col py-2 capitalize font-semibold text-[#677073] items-center justify-center space-y-1 hover:bg-gray-50 transition-colors",
                    active ? "bg-primary-50" : ""
                  )}
                >
                  <Icon
                    className={clsx("h-5 w-5", iconColorClass)}
                    aria-hidden="true"
                  />
                  {/* original showed small text on mobile; mimic that */}
                  <span className={clsx("text-xs truncate mt-0")}>
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Desktop / large screens: new vertical sidebar appearance */}
      <div
        className={clsx(
          wrapperVisibilityClass,
          "hidden lg:sticky lg:top-[120px] lg:flex lg:flex-col z-[9999] transition-all duration-300 ease-in-out",
          hostSidebarWidth,
          collapsed ? "lg:w-16" : "lg:w-72"
        )}
        style={{ top: 120 }}
      >
        <div
          className={clsx(
            "flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-4 pb-4 relative",
            "h-full"
          )}
        >
          {/* Toggle (keeps new design affordance but does not break original behavior) */}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1.5 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            type="button"
          >
            {collapsed ? (
              <ChevronRightIcon className="h-4 w-4 text-gray-600" />
            ) : (
              <ChevronLeftIcon className="h-4 w-4 text-gray-600" />
            )}
          </button>

          {/* Logo / top */}
          <div className="flex h-16 shrink-0 items-center px-1">
            {/* keep your brand logo path from the new design */}
            <img
              src="/sojourn-logo.svg"
              alt="Sojourn"
              className={clsx(
                "shrink-0 transition-all duration-300",
                collapsed ? "h-8 w-8" : "h-8 w-auto"
              )}
            />
          </div>

          {/* nav */}
          <nav className="flex flex-1 flex-col px-1">
            <ul role="list" className="flex flex-1 flex-col gap-y-3">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const active = item.current;

                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={clsx(
                            active
                              ? "bg-primary-50 text-primary-600 border-r-2 border-primary-600"
                              : "text-gray-700 hover:text-primary-600 hover:bg-gray-50",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium transition-colors duration-200",
                            collapsed && "justify-center"
                          )}
                          title={collapsed ? item.name : undefined}
                        >
                          <Icon
                            className={clsx(
                              active
                                ? "text-primary-600"
                                : "text-gray-400 group-hover:text-primary-600",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {!collapsed && (
                            <span className="flex items-center gap-2">
                              {item.name}
                              {item.badge && (
                                <span className="inline-flex items-center rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-700">
                                  {item.badge}
                                </span>
                              )}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
