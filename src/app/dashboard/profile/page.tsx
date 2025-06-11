"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const ManageProfile = dynamic(() => import("@/components/pages/profile"));

export default () => {
  return (
    <Suspense fallback={<></>}>
      <ManageProfile />
    </Suspense>
  );
};
