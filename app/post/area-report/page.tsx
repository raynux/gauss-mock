"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileImage, ArrowLeft, MapPin } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Image from "next/image"

export default function AreaReportPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pollutionLevel, setPollutionLevel] = useState(3)

  // 固定の位置情報（東京駅付近）
  const location = { lat: 35.681236, lng: 139.767125 }

  // 汚染レベルに応じたテキストを取得
  const getPollutionLevelText = (level: number) => {
    switch (level) {
      case 1:
        return { text: "きれい", color: "text-green-600" }
      case 2:
        return { text: "概ねきれい", color: "text-blue-600" }
      case 3:
        return { text: "やや汚れている", color: "text-orange-600" }
      case 4:
        return { text: "汚れている", color: "text-red-600" }
      default:
        return { text: "やや汚れている", color: "text-orange-600" }
    }
  }

  const levelInfo = getPollutionLevelText(pollutionLevel)

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

  // 地図画像のURL（固定）
  const mapImageUrl = `/placeholder.svg?height=150&width=350&text=現在地:${location.lat.toFixed(6)},${location.lng.toFixed(6)}`

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
              <label className="block text-sm font-medium mb-2">現在位置</label>
              <div className="relative w-full h-32 bg-gray-100 rounded-md overflow-hidden">
                <Image src={mapImageUrl || "/placeholder.svg"} alt="現在位置" fill className="object-cover" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <MapPin className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </div>

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
              <label className="block text-sm font-medium mb-2">
                汚染レベル: <span className={levelInfo.color}>{levelInfo.text}</span>
              </label>
              <Slider
                value={[pollutionLevel]}
                onValueChange={(value) => setPollutionLevel(value[0])}
                max={4}
                min={1}
                step={1}
                className="my-4"
              />
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
