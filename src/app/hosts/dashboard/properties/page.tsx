"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Dashboard = dynamic(
  () => import("@/components/pages/hosts/properties/dashboard")
);

export default () => {
  return (
    <Suspense fallback={<></>}>
      <Dashboard />
    </Suspense>
  );
};
