// "use client";

// import dynamic from "next/dynamic";
// import { Suspense } from "react";

// const BookingsTable = dynamic(
//   () => import("@/components/pages/bookings/bookings-table"),
//   { ssr: false }
// );

// export default () => {
//   return (
//     <div className="w-full py-[50px] px-8 ">
//       <div className="w-full flex items-center justify-center">
//         <div className="w-full relative rounded-md">
//           <h3 className="text-[2rem] sm:text-[2.5rem] text-black">Bookings</h3>
//         </div>
//       </div>
//       <Suspense fallback={<></>}>
//         <BookingsTable />
//       </Suspense> 
//     </div>
//   );
// };


"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const BookingsTable = dynamic(
  () => import("@/components/pages/bookings/bookings-table"),
  { ssr: false }
);

export default () => {
  return (
    <div className="w-full py-6 sm:py-[50px] px-3 sm:px-6 md:px-8">
      <div className="w-full flex items-center justify-center">
        <div className="w-full relative rounded-md">
          <h3 className="text-xl sm:text-[2rem] md:text-[2.5rem] text-black">Bookings</h3>
        </div>
      </div>
      <Suspense fallback={<></>}>
        <BookingsTable />
      </Suspense>
    </div>
  );
};
