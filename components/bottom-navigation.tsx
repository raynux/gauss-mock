"use client"

import { Home, Search, PlusSquare, Trophy, User, Calendar } from "lucide-react"
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>メニュー</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Link href="/post/area-report" onClick={() => setShowMenu(false)}>
              <Button variant="outline" className="w-full h-auto py-6 flex flex-col">
                <Search className="h-8 w-8 mb-2" />
                <span>エリアレポート</span>
                <span className="text-xs text-gray-500 mt-1">汚れている場所を報告</span>
              </Button>
            </Link>
            <Link href="/post/cleaning-report" onClick={() => setShowMenu(false)}>
              <Button variant="outline" className="w-full h-auto py-6 flex flex-col">
                <PlusSquare className="h-8 w-8 mb-2" />
                <span>清掃レポート</span>
                <span className="text-xs text-gray-500 mt-1">清掃活動を開始</span>
              </Button>
            </Link>
            <Link href="/dedicated-mission/my-reservations" prefetch={false} onClick={() => setShowMenu(false)}>
              <Button variant="outline" className="w-full h-auto py-6 flex flex-col">
                <Calendar className="h-8 w-8 mb-2" />
                <span>予約済みミッション</span>
                <span className="text-xs text-gray-500 mt-1">予約の確認・開始</span>
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
