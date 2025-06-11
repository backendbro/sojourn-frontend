"use client";

import dynamic from "next/dynamic";

const MyPlan = dynamic(() => import("@/components/pages/hosts/my-plan"), {
  ssr: false,
});

export default () => {
  return (
    <div className="w-full py-5 md:py-[50px] px-8">
      <MyPlan />
    </div>
  );
};
