"use client"

import { Home, Search, PlusSquare, Trophy, User, Calendar, MapPin, Trash2, BadgeCheck } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function BottomNavigation() {
  const pathname = usePathname()
  const [showMenu, setShowMenu] = useState(false)

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex items-center justify-around max-w-md mx-auto">
        <Link href="/" className="flex flex-col items-center w-1/5">
          <Home className={`h-6 w-6 ${isActive("/") ? "text-black" : "text-gray-400"}`} />
          <span className={`text-xs mt-1 ${isActive("/") ? "text-black" : "text-gray-400"}`}>ホーム</span>
        </Link>
        <Link href="/explore" className="flex flex-col items-center w-1/5">
          <Search className={`h-6 w-6 ${isActive("/explore") ? "text-black" : "text-gray-400"}`} />
          <span className={`text-xs mt-1 ${isActive("/explore") ? "text-black" : "text-gray-400"}`}>探索</span>
        </Link>
        <button onClick={() => setShowMenu(true)} className="flex flex-col items-center w-1/5">
          <PlusSquare className={`h-6 w-6 ${isActive("/post") ? "text-black" : "text-gray-400"}`} />
          <span className={`text-xs mt-1 ${isActive("/post") ? "text-black" : "text-gray-400"}`}>投稿</span>
        </button>
        <Link href="/ranking" className="flex flex-col items-center w-1/5">
          <Trophy className={`h-6 w-6 ${isActive("/ranking") ? "text-black" : "text-gray-400"}`} />
          <span className={`text-xs mt-1 ${isActive("/ranking") ? "text-black" : "text-gray-400"}`}>ランキング</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center w-1/5">
          <User className={`h-6 w-6 ${isActive("/profile") ? "text-black" : "text-gray-400"}`} />
          <span className={`text-xs mt-1 ${isActive("/profile") ? "text-black" : "text-gray-400"}`}>マイページ</span>
        </Link>
      </div>

      <Dialog open={showMenu} onOpenChange={setShowMenu}>
        <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle className="text-xl font-bold">アクション</DialogTitle>
            <p className="text-sm text-gray-500 mt-1">どのような活動をしますか？</p>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 p-6">
            <Link href="/post/area-report" onClick={() => setShowMenu(false)}>
              <Button
                variant="outline"
                className="w-full h-auto py-5 flex flex-col border-2 hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <span className="font-medium">エリアレポート</span>
                <span className="text-xs text-gray-500 mt-1">付近の汚れ具合を報告</span>
              </Button>
            </Link>
            <Link href="/post/cleaning-report" onClick={() => setShowMenu(false)}>
              <Button
                variant="outline"
                className="w-full h-auto py-5 flex flex-col border-2 hover:border-green-400 hover:bg-green-50 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                  <Trash2 className="h-6 w-6 text-green-600" />
                </div>
                <span className="font-medium">清掃レポート</span>
                <span className="text-xs text-gray-500 mt-1">清掃活動を開始</span>
              </Button>
            </Link>
            <Link href="/dedicated-mission/my-reservations" prefetch={false} onClick={() => setShowMenu(false)}>
              <Button
                variant="outline"
                className="w-full h-auto py-5 flex flex-col border-2 hover:border-amber-400 hover:bg-amber-50 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                  <Calendar className="h-6 w-6 text-amber-600" />
                </div>
                <span className="font-medium">専用ミッション</span>
                <span className="text-xs text-gray-500 mt-1">予約の確認・開始</span>
              </Button>
            </Link>
            <Link href="/mission/create" prefetch={false} onClick={() => setShowMenu(false)}>
              <Button
                variant="outline"
                className="w-full h-auto py-5 flex flex-col border-2 hover:border-purple-400 hover:bg-purple-50 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                  <BadgeCheck className="h-6 w-6 text-purple-600" />
                </div>
                <span className="font-medium">ミッション作成</span>
                <span className="text-xs text-gray-500 mt-1">新しいミッションを作成</span>
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
