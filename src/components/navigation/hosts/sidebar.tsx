"use client";

import AccountingIcon from "@/components/svgs/AccountingIcon";
import BookingIcon from "@/components/svgs/BookingIcon";
import PropertiesIcon from "@/components/svgs/PropertiesIcon";
import { HOST_PROPERTIES_MENU } from "@/constants";
import { Mail, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default () => {
  const pathname = usePathname();

  const openSidebar = !pathname.includes("inbox");

  const isOnCreateListing = pathname.includes(
    "/hosts/dashboard/properties/create"
  );

  const Links = HOST_PROPERTIES_MENU.map(({ text, link }, idx: number) => {
    const activeTabCss = pathname.startsWith(link)
      ? "text-primary font-bold"
      : "";

    const IconColor = pathname.startsWith(link) ? "#DE5353" : "#677073";

    let Icon = <PropertiesIcon color={IconColor} size={18} />;
    if (text.includes("properties")) {
      Icon = <PropertiesIcon color={IconColor} size={18} />;
    } else if (text.includes("bookings")) {
      Icon = <BookingIcon color={IconColor} size={18} />;
    } else if (text.includes("wallet")) {
      Icon = (<Wallet color={IconColor} size={18} />) as any;
    } else if (text.includes("inbox")) {
      Icon = (<Mail color={IconColor} size={18} />) as any;
    } else {
      if (text === "my plan") {
        Icon = (
          <div className="relative">
            <span className="absolute -top-[15px] -right-[17px] w-[24px] h-[24px] bg-primary rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md font-inter ">
              Pro
            </span>
            <AccountingIcon color={IconColor} size={18} />
          </div>
        );
      } else {
        Icon = <AccountingIcon color={IconColor} size={18} />;
      }
    }

    return (
      <li
        key={idx}
        className="w-full flex flex-col list-none lg:flex-row lg:border-b lg:border-b-gray-300"
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
          ) : (
            ""
          )}
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
    ? isOnCreateListing
      ? "hidden"
      : "lg:w-1/6 lg:h-[264px]"
    : "lg:w-[55px] lg:h-[256px]";

  return (
    <div
      className={`w-full fixed bottom-0 z-[9999] h-[70px] flex items-center sj-shadow bg-white border border-gray-300 lg:sticky lg:top-[120px] lg:flex-col ${hostSidebarWidth} lg:items-start`}
    >
      <ul className="w-full grid grid-cols-5 lg:grid-cols-1 lg:overflow-hidden">
        {Links}
      </ul>
    </div>
  );
};
