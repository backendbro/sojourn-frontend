"use client"; // Error boundaries must be Client Components

import Image from "next/image";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-screen space-y-5 flex flex-col items-center justify-center">
      <h2 className="text-3xl">Something went wrong!</h2>
      <Image
        priority
        src="/assets/icons/500.svg"
        alt="Error Icon"
        width={300}
        height={300}
      />
      <button
        className="px-10 py-3 rounded-full bg-primary text-white font-semibold ease duration-300 hover:bg-red-900"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
