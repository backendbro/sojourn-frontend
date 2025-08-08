// "use client";

// import AccountingIcon from "@/components/svgs/AccountingIcon";
// import BookingIcon from "@/components/svgs/BookingIcon";
// import PropertiesIcon from "@/components/svgs/PropertiesIcon";
// import { HOST_PROPERTIES_MENU } from "@/constants";
// import { Mail, Wallet } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default () => {
//   const pathname = usePathname();

//   const openSidebar = !pathname.includes("inbox");

//   const isOnCreateListing = pathname.includes(
//     "/hosts/dashboard/properties/create"
//   );

//   const Links = HOST_PROPERTIES_MENU.map(({ text, link }, idx: number) => {
//     const activeTabCss = pathname.startsWith(link)
//       ? "text-primary font-bold"
//       : "";

//     const IconColor = pathname.startsWith(link) ? "#DE5353" : "#677073";

//     let Icon = <PropertiesIcon color={IconColor} size={18} />;
//     if (text.includes("properties")) {
//       Icon = <PropertiesIcon color={IconColor} size={18} />;
//     } else if (text.includes("bookings")) {
//       Icon = <BookingIcon color={IconColor} size={18} />;
//     } else if (text.includes("wallet")) {
//       Icon = (<Wallet color={IconColor} size={18} />) as any;
//     } else if (text.includes("inbox")) {
//       Icon = (<Mail color={IconColor} size={18} />) as any;
//     } else {
//       if (text === "my plan") {
//         Icon = (
//           <div className="relative">
//             <span className="absolute -top-[15px] -right-[17px] w-[24px] h-[24px] bg-primary rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md font-inter ">
//               Pro
//             </span>
//             <AccountingIcon color={IconColor} size={18} />
//           </div>
//         );
//       } else {
//         Icon = <AccountingIcon color={IconColor} size={18} />;
//       }
//     }

//     return (
//       <li
//         key={idx}
//         className="w-full flex flex-col list-none lg:flex-row lg:border-b lg:border-b-gray-300"
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
//           ) : (
//             ""
//           )}
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
//     ? isOnCreateListing
//       ? "hidden"
//       : "lg:w-1/6 lg:h-[264px]"
//     : "lg:w-[55px] lg:h-[256px]";

//   return (
//     <div
//       className={`w-full fixed bottom-0 z-[9999] h-[70px] flex items-center sj-shadow bg-white border border-gray-300 lg:sticky lg:top-[120px] lg:flex-col ${hostSidebarWidth} lg:items-start`}
//     >
//       <ul className="w-full grid grid-cols-5 lg:grid-cols-1 lg:overflow-hidden">
//         {Links}
//       </ul>
//     </div>
//   );
// };

"use client";

import React, { useEffect, useState } from "react";
import AccountingIcon from "@/components/svgs/AccountingIcon";
import BookingIcon from "@/components/svgs/BookingIcon";
import PropertiesIcon from "@/components/svgs/PropertiesIcon";
import { HOST_PROPERTIES_MENU } from "@/constants";
import { Mail, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HostSidebarInline() {
  const pathname = usePathname();

  // responsive detection for lg (matches your tailwind lg: "1025px")
  const [isLg, setIsLg] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1025px)");
    const handler = (e) => setIsLg(e.matches);
    setIsLg(mq.matches);
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, []);

  // hover state to simulate :hover backgrounds
  const [hoveredIndex, setHoveredIndex] = (useState < number) | (null > null);

  // keep same openSidebar logic
  const openSidebar = !pathname.includes("inbox");
  const isOnCreateListing = pathname.includes(
    "/hosts/dashboard/properties/create"
  );

  // theme values (from your tailwind.config)
  const colors = {
    primary: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
    },
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
  };

  // compute container style depending on openSidebar, isOnCreateListing and isLg
  // behavior mirrors original tailwind classes:
  // - mobile/compact: fixed bottom, height 70px, horizontal list of 5
  // - lg: sticky and vertical, widths differ if openSidebar or collapsed
  const containerStyle: React.CSSProperties = {
    width: "100%", // will be overridden for lg
    position: isLg ? "sticky" : "fixed",
    bottom: isLg ? undefined : 0,
    top: isLg ? 120 : undefined, // lg:top-[120px]
    zIndex: 9999,
    height: isLg
      ? openSidebar
        ? isOnCreateListing
          ? "0px"
          : "264px"
        : "256px"
      : "70px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffffff",
    border: `1px solid ${colors.gray[300]}`, // border-gray-300
    boxShadow: "0 6px 18px rgba(16,24,40,0.06)", // subtle
    overflow: "hidden",
    // set width for lg layout
    ...(isLg
      ? openSidebar
        ? isOnCreateListing
          ? { display: "none" } // hidden
          : { width: "16.66667%" } // lg:w-1/6
        : { width: "55px" } // lg:w-[55px]
      : {}),
    // flex direction for lg: column
    flexDirection: isLg ? "column" : "row",
    alignItems: isLg ? "flex-start" : "center",
  };

  // list/grid style
  const ulStyle: React.CSSProperties = {
    width: "100%",
    display: "grid",
    gridTemplateColumns: isLg ? "1fr" : "repeat(5, 1fr)",
    gap: 0,
    padding: 0,
    margin: 0,
    listStyle: "none",
    overflow: "hidden",
  };

  // list item wrapper (li)
  const liBaseStyle: React.CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: isLg ? "row" : "column",
    borderBottom: isLg ? `1px solid ${colors.gray[300]}` : "none",
    alignItems: "center",
  };

  // link base style
  const linkBaseStyle: React.CSSProperties = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    padding: isLg ? "0.75rem 0.75rem" : "0.75rem 0",
    gap: isLg ? "0.75rem" : 0,
    cursor: "pointer",
    transition: "background-color 0.15s ease, color 0.15s ease",
    flexDirection: isLg ? "row" : "column",
    textTransform: "capitalize",
  };

  // icon wrapper for the little icons in the mapping (icons provided by HOST_PROPERTIES_MENU)
  // but the code uses external icons. We keep them as is and color via props to the svg.
  // The original component used "#DE5353" for active icons and "#677073" for inactive; keep that.
  const inactiveTextColor = "#677073";
  const activeIconColor = "#DE5353";

  // label style (text)
  const labelBaseStyle: React.CSSProperties = {
    fontWeight: 600,
    fontSize: isLg ? "0.875rem" : "0.75rem",
    color: "#000000",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  // badge style
  const badgeStyle: React.CSSProperties = {
    position: "absolute",
    top: -15,
    right: -17,
    width: 24,
    height: 24,
    backgroundColor: colors.primary[500] || "#ef4444",
    borderRadius: "9999px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontWeight: 700,
    fontSize: "11px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
    fontFamily: "Inter, system-ui, sans-serif",
  };

  // per-item render
  const Links = HOST_PROPERTIES_MENU.map(({ text, link }, idx: number) => {
    const active = pathname.startsWith(link);
    const activeBg = colors.primary[50]; // bg-primary-50
    const activeTextColor = colors.primary[700]; // text-primary-700
    const hoverBg = colors.gray[50]; // hover:bg-gray-50

    // icon selection logic from your component2
    const IconColor = pathname.startsWith(link)
      ? activeIconColor
      : inactiveTextColor;
    let Icon: React.ReactNode = <PropertiesIcon color={IconColor} size={18} />;

    if (text.includes("properties")) {
      Icon = <PropertiesIcon color={IconColor} size={18} />;
    } else if (text.includes("bookings")) {
      Icon = <BookingIcon color={IconColor} size={18} />;
    } else if (text.includes("wallet")) {
      Icon = <Wallet color={IconColor} size={18} />;
    } else if (text.includes("inbox")) {
      Icon = <Mail color={IconColor} size={18} />;
    } else {
      if (text === "my plan") {
        Icon = (
          <div style={{ position: "relative", display: "inline-block" }}>
            <span style={badgeStyle}>Pro</span>
            <AccountingIcon color={IconColor} size={18} />
          </div>
        );
      } else {
        Icon = <AccountingIcon color={IconColor} size={18} />;
      }
    }

    // compute dynamic styles for this link
    const isHovered = hoveredIndex === idx;
    const linkStyle: React.CSSProperties = {
      ...linkBaseStyle,
      backgroundColor: active ? activeBg : isHovered ? hoverBg : "transparent",
      color: active ? activeTextColor : inactiveTextColor,
      borderRight:
        active && isLg ? `4px solid ${colors.primary[600]}` : undefined, // border-r-2 border-primary-600
      paddingLeft: isLg ? "0.75rem" : undefined,
      paddingRight: isLg ? "0.75rem" : undefined,
      justifyContent: openSidebar && isLg ? "flex-start" : "center",
      position: "relative",
    };

    const iconColorForSmall = active ? colors.primary[600] : colors.gray[400];

    return (
      <li key={idx} style={liBaseStyle}>
        <Link
          href={link}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={linkStyle}
        >
          {/* Icon */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* many of your icons accept color/size props; pass Icon as element already created above */}
            {Icon}
          </div>

          {/* Label: only show when sidebar open (desktop lg) */}
          {openSidebar && isLg ? (
            <span
              style={{
                ...labelBaseStyle,
                marginLeft: isLg ? 8 : 0,
                color: active ? activeTextColor : "#000",
                fontWeight: active ? 700 : 600,
                display: "block",
                width: "80%",
              }}
            >
              {text}
            </span>
          ) : (
            // small-screen label visible in collapsed mode (similar to original)
            <span
              style={{
                ...labelBaseStyle,
                display: isLg ? "none" : "block",
                color: active ? activeTextColor : "#000",
                fontWeight: active ? 700 : 600,
              }}
            >
              {text}
            </span>
          )}

          {/* Right arrow for active item (only original had it for active in component1) */}
          {active && isLg && (
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* small chevron; we don't import it here, original used ChevronRight with className */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                style={{ color: colors.primary[600] }}
              >
                <path
                  d="M9 18l6-6-6-6"
                  stroke={colors.primary[600]}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </Link>
      </li>
    );
  });

  return (
    <div style={containerStyle}>
      <ul style={ulStyle}>{Links}</ul>
    </div>
  );
}
