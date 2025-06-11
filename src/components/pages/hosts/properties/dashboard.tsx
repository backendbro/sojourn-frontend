"use client";

import useQueryString from "@/hooks/useQueryString";
import { RootState } from "@/store";
import { openForm } from "@/store/features/inspection-request-slice";
import { Plus } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, MouseEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const Inspections = dynamic(() => import("./inspection-table"), { ssr: false });
const Properties = dynamic(() => import("./properties-table"), { ssr: false });

type TabState = "inspections" | "properties";

export default () => {
  const isHostProfileComplete = useSelector(
    (state: RootState) => state.user.me.hostProfileComplete
  );

  const { router, pathname, createQueryString, params } = useQueryString();

  const isInspectionFormOpen = useSelector(
    (state: RootState) => state.inspection.formOpen
  );

  const dispatch = useDispatch();

  const [tabState, setTabState] = useState<TabState>(() => {
    return (params.get("tabState") as TabState) ?? "properties";
  });

  const isCurrentProperties = tabState === "properties";

  const isCurrentInspections = tabState === "inspections";

  const onTabChange = useCallback(
    (currentTab: TabState) => (e: MouseEvent<HTMLButtonElement>) => {
      setTabState(currentTab);
    },
    []
  );

  return (
    <div className="w-full py-[50px] px-8">
      <div className="w-full flex flex-col space-y-7 justify-between md:flex-row md:items-center md:space-y-0">
        <div className="w-full min-h-[40px] flex items-center md:w-2/5">
          <button
            onClick={onTabChange("inspections")}
            className={`w-1/2 border-b-2 border-b-red-200 pb-4 ${
              isCurrentInspections && "border-b-red-600 text-primary font-bold"
            }`}
          >
            Inspections
          </button>
          <button
            onClick={onTabChange("properties")}
            className={`w-1/2 border-b-2 border-b-red-200 pb-4 ${
              isCurrentProperties && "border-b-red-600 text-primary font-bold"
            }`}
          >
            Properties
          </button>
        </div>
        <Link
          href="/hosts/dashboard/properties/create"
          className="flex items-center justify-center space-x-1 bg-primary text-white rounded-full px-5 py-3 ease duration-300 hover:bg-red-700"
        >
          <span>Create a Listing</span>
          <Plus color="white" size={18} />
        </Link>
      </div>
      {!isInspectionFormOpen &&
        (tabState === "inspections" ? <Inspections /> : <Properties />)}
    </div>
  );
};
