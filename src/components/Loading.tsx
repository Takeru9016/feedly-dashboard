import { Skeleton } from "./ui/skeleton";

const SkeletonItem = () => (
  <div className="flex flex-col space-y-3">
    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
);

export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 md:mt-6">
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </div>
  );
}
