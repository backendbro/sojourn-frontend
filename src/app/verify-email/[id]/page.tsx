"use client";

import Spinner from "@/components/svgs/Spinner";
import useQueryString from "@/hooks/useQueryString";
import { verifyEmail } from "@/http/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export default ({ params }: { params: { id: string } }) => {
  const { params: queryParams, router } = useQueryString();

  const client = useQueryClient();

  const code = queryParams.get("code") as string;

  const { isLoading, isError, isSuccess } = useQuery({
    queryKey: ["verify-email"],
    queryFn: () => verifyEmail(params.id, code),
  });

  if (isLoading) {
    return (
      <div className="w-full min-h-[200px] flex items-center justify-center">
        <Spinner color="red" size={20} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full min-h-[200px] flex flex-col items-center justify-center">
        <p>Email Verification failed </p>
        <button
          className="p-2 rounded-xl border-0 outline-none bg-primary text-white font-[700]"
          onClick={async () => {
            await client.invalidateQueries({ queryKey: ["verify-email"] });
          }}
        >
          Click to retry
        </button>
      </div>
    );
  } else if (isSuccess) {
    return (
      <div className="w-full min-h-[200px] flex flex-col items-center justify-center">
        <p>Email Verification Complete!</p>
        <button
          className="p-2 rounded-xl border-0 outline-none bg-primary text-white font-[700]"
          onClick={() => {
            router.push("/");
          }}
        >
          Go Home
        </button>
      </div>
    );
  }
  return (
    <div className="w-full min-h-[200px] flex items-center justify-center">
      <Link href="/">Go back to Home Page</Link>
    </div>
  );
};
