"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const Address = dynamic(
  () => import("@/components/pages/hosts/address-details/address")
);

export default () => {
  return (
    <Suspense fallback={<></>}>
      <Address />
    </Suspense>
  );
};
