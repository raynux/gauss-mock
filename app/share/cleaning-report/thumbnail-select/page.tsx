"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"

export default function CleaningReportThumbnailSelectPage() {
  const router = useRouter()
  const [selectedImages, setSelectedImages] = useState<number[]>([1])

  // 画像選択の切り替え
  const toggleImageSelection = (imageId: number) => {
    if (selectedImages.includes(imageId)) {
      // すでに選択されている場合は削除
      setSelectedImages(selectedImages.filter((id) => id !== imageId))
    } else {
      // 選択されていない場合は追加（最大4枚まで）
      if (selectedImages.length < 4) {
        setSelectedImages([...selectedImages, imageId])
      }
    }
  }

  // 次へボタンのクリック処理
  const handleNext = () => {
    if (selectedImages.length > 0) {
      router.push(`/share/cleaning-report?images=${selectedImages.join(",")}`)
    }
  }

  // 画像データ
  const images = [
    { id: 1, label: "清掃前", time: "17:08", src: "/placeholder.svg?height=300&width=200&text=清掃前" },
    { id: 2, label: "清掃後", time: "17:08", src: "/placeholder.svg?height=300&width=200&text=清掃後" },
    { id: 3, label: "ゴミ袋1中身", time: "17:08", src: "/placeholder.svg?height=300&width=200&text=ゴミ袋1中身" },
    { id: 4, label: "ゴミ袋1外観", time: "17:08", src: "/placeholder.svg?height=300&width=200&text=ゴミ袋1外観" },
  ]

  return (
    <div className="container max-w-md mx-auto px-4 py-6 h-full flex flex-col">
      <div className="flex items-center mb-6">
        <Link href="/post/clean-report/thank-you" className="mr-3">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">サムネイルの作成</h1>
      </div>

      <Card className="mb-6 border-none shadow-sm">
        <CardContent className="p-4">
          <p className="text-sm text-gray-600">使用する画像を選択してください（最大4枚）</p>
          <div className="mt-2 text-xs text-gray-500">選択中: {selectedImages.length}枚</div>
        </CardContent>
      </Card>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-2 gap-3">
          {images.map((image) => (
            <Card
              key={image.id}
              className={`overflow-hidden transition-all ${
                selectedImages.includes(image.id) ? "border-2 border-teal-500 shadow-md" : "border border-gray-200"
              }`}
              onClick={() => toggleImageSelection(image.id)}
            >
              <CardContent className="p-0 relative">
                <div className="absolute top-1 left-1 z-10 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded-md">
                  {image.label}
                </div>

                <div className="absolute top-1 right-1 z-10 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded-md">
                  {image.time}
                </div>

                {selectedImages.includes(image.id) && (
                  <div className="absolute bottom-1 right-1 z-10 bg-teal-500 rounded-full p-1 shadow">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}

                <Image
                  src={image.src || "/placeholder.svg"}
                  width={150}
                  height={200}
                  alt={image.label}
                  className="w-full aspect-[3/4] object-cover"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-6 sticky bottom-4">
        <Button
          onClick={handleNext}
          disabled={selectedImages.length === 0}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white"
        >
          次へ ({selectedImages.length}/4)
        </Button>
      </div>
    </div>
  )
}
