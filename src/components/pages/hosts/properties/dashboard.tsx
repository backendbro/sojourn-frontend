// "use client";

// import useQueryString from "@/hooks/useQueryString";
// import { RootState } from "@/store";
// import { openForm } from "@/store/features/inspection-request-slice";
// import { Plus } from "lucide-react";
// import dynamic from "next/dynamic";
// import Link from "next/link";
// import { useState, MouseEvent, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import BookingMetrics from "./BookingMetrics";
// import PropertiesDashboard from "./PropertiesDashboard";
// import PropertyPreview from "./PropertyPreview";

// const Inspections = dynamic(() => import("./inspection-table"), { ssr: false });
// const Properties = dynamic(() => import("./properties-table"), { ssr: false });

// type TabState = "inspections" | "properties";

// export default () => {
//   const isHostProfileComplete = useSelector(
//     (state: RootState) => state.user.me.hostProfileComplete
//   );

//   const { router, pathname, createQueryString, params } = useQueryString();

//   const isInspectionFormOpen = useSelector(
//     (state: RootState) => state.inspection.formOpen
//   );

//   const dispatch = useDispatch();

//   const [tabState, setTabState] = useState<TabState>(() => {
//     return (params.get("tabState") as TabState) ?? "properties";
//   });

//   const isCurrentProperties = tabState === "properties";

//   const isCurrentInspections = tabState === "inspections";

//   const onTabChange = useCallback(
//     (currentTab: TabState) => (e: MouseEvent<HTMLButtonElement>) => {
//       setTabState(currentTab);
//     },
//     []
//   );

//   return (
//     <div>
//       <main className="py-8">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
//           <BookingMetrics />
//           <PropertiesDashboard />
//           <PropertyPreview />
//         </div>
//       </main>
//     </div>
//   );
// };


"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import BookingMetrics from "./BookingMetrics";
import RecentActivity from "./RecentActivity";

const PropertiesDashboard = dynamic(() => import("./PropertiesDashboard"), { ssr: false });

export default function Dashboard() {
  return (
    <main className="py-8 sm:py-8 pb-24 lg:pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <BookingMetrics />
        <Suspense fallback={null}>
          <PropertiesDashboard />
        </Suspense>
        <RecentActivity />
      </div>
    </main>
  );
}
