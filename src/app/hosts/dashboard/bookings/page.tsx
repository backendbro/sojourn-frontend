"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
const BookingsTable = dynamic(
  () => import("@/components/pages/hosts/bookings/bookings-table"),
  { ssr: false }
);

export default () => {
  return (
    <div className="w-full py-5 md:py-[50px]  px-8">
      <div className="w-full flex items-center justify-center">
        <div className="w-full relative rounded-md">
          <h3 className="text-[2rem] sm:text-[2.5rem] text-black">Bookings</h3>
        </div>
      </div>
      <Suspense fallback={<></>}>
        <BookingsTable />
      </Suspense>
    </div>
  );
};
