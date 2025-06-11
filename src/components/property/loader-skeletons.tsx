import { FC } from "react";
import { Skeleton } from "../ui/skeleton";

export const PropertySkeleton: FC<{ length?: number }> = ({ length = 8 }) => {
  return Array.from({ length }).map((_, idx: number) => {
    return (
      <div key={idx} className="w-full flex flex-col space-y-3">
        <Skeleton className="w-full h-[200px] rounded-xl bg-gray-200" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-gray-200" />
          <Skeleton className="h-4 w-[200px] bg-gray-200" />
        </div>
      </div>
    );
  });
};
