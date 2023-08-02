//TODO: Fix error : navigator is not defined
"use client";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-violet-600"></div>
    </div>
  );
}
