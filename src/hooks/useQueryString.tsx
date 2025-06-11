"use client";

import { useCallback } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const useQueryString = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const searchParams = new URLSearchParams(params.toString());
      searchParams.set(name, value);

      return searchParams.toString();
    },
    [params]
  );

  const removeQueryString = useCallback(
    (name: string, value: string) => {
      const searchParams = new URLSearchParams(params.toString());

      searchParams.delete(name, value);

      return searchParams.toString();
    },
    [params]
  );

  return { createQueryString, pathname, router, params, removeQueryString };
};

export default useQueryString;
