"use client"

import { Home, Search, PlusSquare, Trophy, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function BottomNavigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex items-center justify-around max-w-md mx-auto">
      <Link href="/" className="flex flex-col items-center w-1/5">
        <Home className={`h-6 w-6 ${isActive("/") ? "text-black" : "text-gray-400"}`} />
        <span className={`text-xs mt-1 ${isActive("/") ? "text-black" : "text-gray-400"}`}>ホーム</span>
      </Link>
      <Link href="/explore" className="flex flex-col items-center w-1/5">
        <Search className={`h-6 w-6 ${isActive("/explore") ? "text-black" : "text-gray-400"}`} />
        <span className={`text-xs mt-1 ${isActive("/explore") ? "text-black" : "text-gray-400"}`}>探索</span>
      </Link>
      <Link href="/post" className="flex flex-col items-center w-1/5">
        <PlusSquare className={`h-6 w-6 ${isActive("/post") ? "text-black" : "text-gray-400"}`} />
        <span className={`text-xs mt-1 ${isActive("/post") ? "text-black" : "text-gray-400"}`}>行動</span>
      </Link>
      <Link href="/ranking" className="flex flex-col items-center w-1/5">
        <Trophy className={`h-6 w-6 ${isActive("/ranking") ? "text-black" : "text-gray-400"}`} />
        <span className={`text-xs mt-1 ${isActive("/ranking") ? "text-black" : "text-gray-400"}`}>ランキング</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center w-1/5">
        <User className={`h-6 w-6 ${isActive("/profile") ? "text-black" : "text-gray-400"}`} />
        <span className={`text-xs mt-1 ${isActive("/profile") ? "text-black" : "text-gray-400"}`}>マイページ</span>
      </Link>
    </div>
  )
}
