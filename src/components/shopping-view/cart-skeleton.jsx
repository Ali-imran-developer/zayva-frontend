function SkeletonLoader({ className }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-md ${className}`} />
  );
}

function UserCartItemSkeleton() {
  return (
    <div className="flex flex-col justify-between gap-1">
      <div className="flex items-center gap-2">
        <SkeletonLoader className="w-32 h-32 lg:w-24 lg:h-24" />

        <div className="flex flex-col gap-2 flex-1">
          <SkeletonLoader className="h-4 w-2/3" />
          <SkeletonLoader className="h-4 w-1/2" />

          <div className="flex items-center justify-between mx-4">
            <div className="flex items-center gap-4">
              <SkeletonLoader className="h-6 w-6" />
              <SkeletonLoader className="h-4 w-8" />
              <SkeletonLoader className="h-6 w-6" />
            </div>
            <SkeletonLoader className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCartItemSkeleton;