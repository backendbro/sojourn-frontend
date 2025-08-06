"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const Wallet = dynamic(() => import("@/components/pages/bwallet"));

export default () => {
  return (
    <div className="w-full flex-col pt-[10px] pb-[50px] px-8">
      <Suspense fallback={<></>}>
        <Wallet />
      </Suspense>
    </div>
  );
};
