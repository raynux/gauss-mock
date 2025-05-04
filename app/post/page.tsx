"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MapPin, Trash2 } from "lucide-react"
import Link from "next/link"

export default function PostPage() {
  const router = useRouter()

  return (
    <div className="post-page h-full flex items-center justify-center">
      <Dialog open={true} onOpenChange={() => router.push("/")}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">投稿タイプを選択</DialogTitle>
            <p className="text-sm text-gray-500 mt-1">どのような投稿をしますか？</p>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Link href="/post/area-report">
              <Button variant="outline" className="w-full h-auto py-6 flex flex-col">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                  <MapPin className="h-5 w-5 text-gray-700" />
                </div>
                <span>エリアレポート</span>
                <span className="text-xs text-gray-500 mt-1">汚れている場所を報告</span>
              </Button>
            </Link>
            <Link href="/post/cleaning-report">
              <Button variant="outline" className="w-full h-auto py-6 flex flex-col">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                  <Trash2 className="h-5 w-5 text-gray-700" />
                </div>
                <span>清掃レポート</span>
                <span className="text-xs text-gray-500 mt-1">清掃活動を開始</span>
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
