"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileImage, ArrowLeft } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function AreaReportPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 投稿完了時の処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 送信処理をシミュレート
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/post/area-report/thank-you")
    }, 1500)
  }

  return (
    <div className="w-full max-w-md p-4">
      <div className="flex items-center mb-4">
        <Link href="/post" className="mr-2">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">投稿</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>エリアレポート</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">写真アップロード（最大4枚）</label>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-100 rounded-md flex items-center justify-center border border-dashed border-gray-300"
                  >
                    <FileImage className="h-8 w-8 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">汚染レベル: 3</label>
              <Slider defaultValue={[3]} max={4} step={1} className="my-4" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>軽度</span>
                <span>重度</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">コメント</label>
              <Textarea placeholder="状況の詳細を入力してください" className="resize-none" rows={4} />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "送信中..." : "送信する"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
