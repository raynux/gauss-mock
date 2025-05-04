import { Skeleton } from "@/components/ui/skeleton"

export default function UserProfileLoading() {
  return (
    <div className="user-profile-loading pb-20">
      {/* ヘッダー部分のスケルトン */}
      <div className="relative">
        <Skeleton className="h-40 w-full" />
        <div className="px-4 pb-4 relative">
          <div className="absolute -top-12 left-4 border-4 border-white rounded-full bg-white">
            <Skeleton className="h-24 w-24 rounded-full" />
          </div>

          <div className="pt-14">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>

      {/* タブナビゲーションのスケルトン */}
      <div className="border-b">
        <div className="flex px-4 py-2 space-x-4">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-12" />
        </div>
      </div>

      {/* コンテンツのスケルトン */}
      <div className="p-4 space-y-6">
        <div>
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="space-y-3">
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        </div>

        <div>
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="space-y-3">
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
