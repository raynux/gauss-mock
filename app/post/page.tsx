"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MapPin, Trash2 } from "lucide-react"

export default function PostPage() {
  const router = useRouter()

  return (
    <div className="post-page h-full flex items-center justify-center">
      <Dialog open={true} onOpenChange={() => router.push("/")}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>投稿タイプを選択</DialogTitle>
            <DialogDescription>どのような投稿をしますか？</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col"
              onClick={() => router.push("/post/area-report")}
            >
              <MapPin className="h-8 w-8 mb-2" />
              <span>エリアレポート</span>
              <span className="text-xs text-gray-500 mt-1">汚れている場所を報告</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col"
              onClick={() => router.push("/post/cleaning-report")}
            >
              <Trash2 className="h-8 w-8 mb-2" />
              <span>清掃レポート</span>
              <span className="text-xs text-gray-500 mt-1">清掃活動を開始</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
