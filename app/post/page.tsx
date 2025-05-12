"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Trash2, Calendar, BadgeCheck } from "lucide-react"
import Link from "next/link"

export default function PostPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pb-16 overflow-hidden">
      <div className="w-full max-w-md px-4">
        <header className="mb-6 text-center">
          <h1 className="text-xl font-bold">アクション</h1>
          <p className="text-sm text-gray-500 mt-1">どのような活動をしますか？</p>
        </header>

        <div className="grid grid-cols-2 gap-4">
          <Link href="/post/area-report" className="transition-transform duration-200 hover:scale-105">
            <Button
              variant="outline"
              className="w-full h-auto py-6 flex flex-col border-2 hover:border-blue-400 hover:bg-blue-50 transition-all shadow-sm"
            >
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <MapPin className="h-7 w-7 text-blue-600" />
              </div>
              <span className="font-medium text-base">エリアレポート</span>
              <span className="text-xs text-gray-500 mt-1">付近の汚れ具合を報告</span>
            </Button>
          </Link>
          <Link href="/post/clean-report" className="transition-transform duration-200 hover:scale-105">
            <Button
              variant="outline"
              className="w-full h-auto py-6 flex flex-col border-2 hover:border-green-400 hover:bg-green-50 transition-all shadow-sm"
            >
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-3">
                <Trash2 className="h-7 w-7 text-green-600" />
              </div>
              <span className="font-medium text-base">清掃レポート</span>
              <span className="text-xs text-gray-500 mt-1">清掃活動・ミッションを開始</span>
            </Button>
          </Link>
          <Link
            href="/dedicated-mission/my-reservations"
            prefetch={false}
            className="transition-transform duration-200 hover:scale-105"
          >
            <Button
              variant="outline"
              className="w-full h-auto py-6 flex flex-col border-2 hover:border-amber-400 hover:bg-amber-50 transition-all shadow-sm"
            >
              <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                <Calendar className="h-7 w-7 text-amber-600" />
              </div>
              <span className="font-medium text-base">専用ミッション</span>
              <span className="text-xs text-gray-500 mt-1">予約の確認・開始</span>
            </Button>
          </Link>
          <Link href="/mission/create" prefetch={false} className="transition-transform duration-200 hover:scale-105">
            <Button
              variant="outline"
              className="w-full h-auto py-6 flex flex-col border-2 hover:border-purple-400 hover:bg-purple-50 transition-all shadow-sm"
            >
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                <BadgeCheck className="h-7 w-7 text-purple-600" />
              </div>
              <span className="font-medium text-base">ミッション作成</span>
              <span className="text-xs text-gray-500 mt-1">新しいミッションを作成</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
