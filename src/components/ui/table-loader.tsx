import { Skeleton } from "@/components/ui/skeleton";

export default () => {
  return (
    <div className="w-full flex flex-col items-center mt-2">
      <Skeleton className="h-8 w-full bg-gray-200 mt-2" />
      <Skeleton className="h-8 w-full bg-gray-200 mt-2" />
    </div>
  );
};
