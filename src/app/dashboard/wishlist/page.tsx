"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const WishlistTable = dynamic(() => import("@/components/pages/wishlist"), {
  ssr: false,
});

export default () => {
  return (
    <div className="w-full flex-col py-[50px] px-8">
      <h3 className="text-[2rem] sm:text-[2.5rem] text-black">Wishlist</h3>
      <Suspense fallback={<></>}>
        <WishlistTable />
      </Suspense>
    </div>
  );
};
