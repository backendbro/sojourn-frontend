"use client";

import { ReactNode } from "react";
import { useNotification } from "./notification-provider";

export default ({ message }: { message: ReactNode }) => {
  const { type } = useNotification();

  const bg =
    type === "message"
      ? "bg-green-700 text-white"
      : "bg-amber-300 text-amber-700";

  return (
    <div
      className={`w-full text-center min-h-[50px]  px-2 py-3 ${bg} font-semibold`}
    >
      {message}
    </div>
  );
};
