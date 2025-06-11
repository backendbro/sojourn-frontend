"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const MessagesTable = dynamic(
  () => import("@/components/pages/hosts/messages/messages-table"),
  { ssr: false }
);

export default () => {
  return (
    <div className="px-8 md:pl-8 md:pr-0">
      <Suspense fallback={<></>}>
        <MessagesTable />
      </Suspense>
    </div>
  );
};
