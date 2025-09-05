"use client";

import BookingIcon from "@/components/svgs/BookingIcon";
import PropertiesIcon from "@/components/svgs/PropertiesIcon";
import { GUEST_SIDEBAR_MENU } from "@/constants";
import { RootState } from "@/store";
import { Heart, Home, Mail, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default () => {
  const pathname = usePathname();

  const isLoggedIn = useSelector((state: RootState) => state.user?.loggedIn);

  const isOnUserAndLoggedin = isLoggedIn && !pathname.includes("hosts");

  const isOnCheckoutPage = isLoggedIn && pathname.includes("checkout");

  const isPropertiesOrHomeOrBecomeAHost =
    pathname.includes("/properties") ||
    pathname.slice(0) === "/" ||
    pathname.includes("/become-a-host");

  const openSidebar = !pathname.includes("inbox");

  const Links = GUEST_SIDEBAR_MENU.map(({ text, link }, idx: number) => {
    const activeTabCss =
      pathname.slice(0) === link ? "text-primary font-bold" : "";

    const IconColor = pathname.slice(0) === link ? "#DE5353" : "#677073";

    const HomeLinkCss = text.toLowerCase() === "home" ? "flex lg:hidden" : "";

    let Icon = <PropertiesIcon color={IconColor} size={18} />;
    if (text.includes("bookings")) {
      Icon = <BookingIcon color={IconColor} size={18} />;
    } else if (text.includes("wallet")) {
      Icon = (<Wallet color={IconColor} size={18} />) as any;
    } else if (text.includes("inbox")) {
      Icon = (<Mail color={IconColor} size={18} />) as any;
    } else if (text.includes("wishlist")) {
      Icon = (<Heart color={IconColor} size={18} />) as any;
    } else {
      Icon = <Home color={IconColor} size={18} />;
    }

    return (
      <li
        key={idx}
        className={`w-full flex flex-col list-none lg:flex-row lg:border-b lg:border-b-gray-300 ${HomeLinkCss}`}
      >
        <Link
          className={`w-full flex flex-col py-4  capitalize font-semibold text-[#677073] flex items-center justify-center space-y-2 space-x-0 hover:bg-red-50 lg:flex-row lg:px-3 lg:space-x-4 lg:space-y-0`}
          href={link}
        >
          {Icon}
          {openSidebar ? (
            <span
              className={`${activeTabCss} hidden lg:block truncate font-bold lg:font-[500] text-black text-center text-xs lg:text-sm w-4/5 lg:w-full lg:text-left `}
            >
              {text}
            </span>
          ) : null}
          <span
            className={`${activeTabCss}block lg:hidden  truncate font-bold lg:font-[500] text-black text-center text-xs lg:text-sm w-4/5 lg:w-full lg:text-left `}
          >
            {text}
          </span>
        </Link>
      </li>
    );
  });

  const hostSidebarWidth = openSidebar
    ? "lg:w-1/6 lg:h-[210px]"
    : "lg:w-[55px] lg:h-[200px]";

  return (
    <div
      className={`w-full ${
        isOnUserAndLoggedin
          ? isPropertiesOrHomeOrBecomeAHost
            ? "flex md:hidden"
            : isOnCheckoutPage
            ? "hidden"
            : "flex"
          : "hidden"
      } fixed bottom-0 z-[9999] h-[70px] items-center sj-shadow bg-white border border-gray-300 lg:sticky lg:top-[120px] lg:flex-col ${hostSidebarWidth} lg:items-start`}
    >
      <ul className="w-full grid grid-cols-5 lg:grid-cols-1 lg:overflow-hidden">
        {Links}
      </ul>
    </div>
  );
};
