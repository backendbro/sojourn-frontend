"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const AccountInformation = dynamic(
  () => import("@/components/pages/hosts/payment-info/account-information")
);

export default () => {
  return (
    <Suspense fallback={<></>}>
      <AccountInformation />
    </Suspense>
  );
};
