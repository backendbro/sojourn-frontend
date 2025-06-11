import { Skeleton } from "../ui/skeleton";

export default () => {
  return (
    <div className="hidden md:flex items-center space-x-2 mx-2">
      <Skeleton className="w-[100px] py-4 px-4 rounded-xl bg-red-100" />
      <Skeleton className="w-[100px] py-4 px-4 rounded-xl bg-red-100" />
    </div>
  );
};
