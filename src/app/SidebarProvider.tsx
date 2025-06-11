"use client";

import useQueryString from "@/hooks/useQueryString";
import { ReactNode } from "react";

export default ({ children }: { children: ReactNode }) => {
  const { pathname } = useQueryString();
  const isOnHomePageCss =
    pathname.slice(0) === "/" ? "" : "max-w-[1400px] mx-auto";

  return <div className={`flex w-full ${isOnHomePageCss}`}>{children}</div>;
};
