"use client";

import dynamic from "next/dynamic";

const Checkout = dynamic(
  () => import("@/components/pages/hosts/my-plan/checkout"),
  { ssr: false }
);

export default ({ params: { id } }: { params: { id: string } }) => {
  return (
    <div className="w-full h-screen p-2 flex justify-center items-center">
      <Checkout id={id} isSubscription={true} />
    </div>
  );
};
