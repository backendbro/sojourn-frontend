"use client";

import dynamic from "next/dynamic";

const Checkout = dynamic(() => import("@/components/pages/checkout"), {
  ssr: false,
});

export default ({ params: { id } }: { params: { id: string } }) => {
  return <Checkout id={id} />;
};
