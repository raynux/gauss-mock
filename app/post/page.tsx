"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Trash2, Calendar, BadgeCheck, Loader2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function PostPage() {
  const router = useRouter()
  const [loadingButton, setLoadingButton] = useState<string | null>(null)

  const handleButtonClick = (path: string, buttonId: string) => {
    setLoadingButton(buttonId)

    // 1秒後に遷移
    setTimeout(() => {
      router.push(path)
    }, 1000)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center pb-16 overflow-hidden">
      <div className="w-full max-w-md px-4">
        <header className="mb-6 text-center">
          <h1 className="text-xl font-bold">アクション</h1>
          <p className="text-sm text-gray-500 mt-1">どのような活動をしますか？</p>
        </header>

        <div className="grid grid-cols-2 gap-4">
          <div className="transition-transform duration-200 hover:scale-105">
            <Button
              variant="outline"
              className="w-full h-auto py-6 flex flex-col border-2 hover:border-blue-400 hover:bg-blue-50 transition-all shadow-sm"
              onClick={() => handleButtonClick("/post/area-report", "area-report")}
              disabled={loadingButton !== null}
            >
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                {loadingButton === "area-report" ? (
                  <Loader2 className="h-7 w-7 text-blue-600 animate-spin" />
                ) : (
                  <MapPin className="h-7 w-7 text-blue-600" />
                )}
              </div>
              <span className="font-medium text-base">
                {loadingButton === "area-report" ? "読み込み中..." : "エリアレポート"}
              </span>
              <span className="text-xs text-gray-500 mt-1">付近の汚れ具合を報告</span>
            </Button>
          </div>

          <div className="transition-transform duration-200 hover:scale-105">
            <Button
              variant="outline"
              className="w-full h-auto py-6 flex flex-col border-2 hover:border-green-400 hover:bg-green-50 transition-all shadow-sm"
              onClick={() => handleButtonClick("/post/clean-report", "clean-report")}
              disabled={loadingButton !== null}
            >
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-3">
                {loadingButton === "clean-report" ? (
                  <Loader2 className="h-7 w-7 text-green-600 animate-spin" />
                ) : (
                  <Trash2 className="h-7 w-7 text-green-600" />
                )}
              </div>
              <span className="font-medium text-base">
                {loadingButton === "clean-report" ? "読み込み中..." : "清掃レポート"}
              </span>
              <span className="text-xs text-gray-500 mt-1">清掃活動・ミッションを開始</span>
            </Button>
          </div>

          <div className="transition-transform duration-200 hover:scale-105">
            <Button
              variant="outline"
              className="w-full h-auto py-6 flex flex-col border-2 hover:border-amber-400 hover:bg-amber-50 transition-all shadow-sm"
              onClick={() => handleButtonClick("/dedicated-mission/my-reservations", "dedicated-mission")}
              disabled={loadingButton !== null}
            >
              <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                {loadingButton === "dedicated-mission" ? (
                  <Loader2 className="h-7 w-7 text-amber-600 animate-spin" />
                ) : (
                  <Calendar className="h-7 w-7 text-amber-600" />
                )}
              </div>
              <span className="font-medium text-base">
                {loadingButton === "dedicated-mission" ? "読み込み中..." : "専用ミッション"}
              </span>
              <span className="text-xs text-gray-500 mt-1">予約の確認・開始</span>
            </Button>
          </div>

          <div className="transition-transform duration-200 hover:scale-105">
            <Button
              variant="outline"
              className="w-full h-auto py-6 flex flex-col border-2 hover:border-purple-400 hover:bg-purple-50 transition-all shadow-sm"
              onClick={() => handleButtonClick("/mission/create", "mission-create")}
              disabled={loadingButton !== null}
            >
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                {loadingButton === "mission-create" ? (
                  <Loader2 className="h-7 w-7 text-purple-600 animate-spin" />
                ) : (
                  <BadgeCheck className="h-7 w-7 text-purple-600" />
                )}
              </div>
              <span className="font-medium text-base">
                {loadingButton === "mission-create" ? "読み込み中..." : "ミッション作成"}
              </span>
              <span className="text-xs text-gray-500 mt-1">新しいミッションを作成</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
