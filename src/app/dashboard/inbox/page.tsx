// "use client";

// import dynamic from "next/dynamic";
// import { Suspense } from "react";

// const Inbox = dynamic(() => import("@/components/pages/inbox"), { ssr: false });

// export default () => {
//   return (
//     <Suspense fallback={<></>}>
//       <Inbox />
//     </Suspense>
//   );
// };


"use client";

import dynamic from "next/dynamic";

const Inbox = dynamic(() => import("@/components/pages/inbox"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[60vh]">
      <span className="text-sm text-gray-500">Loading inbox...</span>
    </div>
  ),
});

export default function InboxPage() {
  return <Inbox />;
}