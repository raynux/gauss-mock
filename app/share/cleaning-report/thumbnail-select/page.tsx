"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

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
      router.push(`/share/clean-report?images=${selectedImages.join(",")}`)
    }
  }

  // 画像データ
  const images = [
    { id: 1, label: "清掃前", time: "17:08", src: "/placeholder.svg?height=200&width=300&text=清掃前" },
    { id: 2, label: "清掃後", time: "17:08", src: "/placeholder.svg?height=200&width=300&text=清掃後" },
    { id: 3, label: "ゴミ袋1中身", time: "17:08", src: "/placeholder.svg?height=200&width=300&text=ゴミ袋1中身" },
    { id: 4, label: "ゴミ袋1外観", time: "17:08", src: "/placeholder.svg?height=200&width=300&text=ゴミ袋1外観" },
  ]

  return (
    <div className="p-4 pt-8 h-full flex flex-col">
      <div className="flex items-center mb-4">
        <Link href="/post/clean-report/thank-you" className="mr-2">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">サムネイルの作成</h1>
      </div>

      <p className="text-sm text-gray-600 mb-4">使用する画像を選択してください(最大4枚)</p>

      <div className="flex-1 overflow-auto">
        <div className="relative">
          {/* タイムライン */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-teal-200"></div>

          {/* 画像リスト */}
          <div className="space-y-6 pl-12">
            {images.map((image) => (
              <div key={image.id} className="relative">
                {/* タイムライン上の時間表示 */}
                <div className="absolute left-[-48px] top-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      selectedImages.includes(image.id) ? "bg-teal-400" : "bg-gray-200"
                    }`}
                  ></div>
                  <span className="text-xs text-gray-500 mt-1">{image.time}</span>
                </div>

                {/* 画像カード */}
                <div
                  className={`relative rounded-lg overflow-hidden border-2 ${
                    selectedImages.includes(image.id) ? "border-teal-400" : "border-transparent"
                  }`}
                  onClick={() => toggleImageSelection(image.id)}
                >
                  <div className="absolute top-2 left-2 z-10 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {image.label}
                  </div>

                  {selectedImages.includes(image.id) && (
                    <div className="absolute bottom-2 right-2 z-10 bg-teal-400 rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}

                  <Image
                    src={image.src || "/placeholder.svg"}
                    width={300}
                    height={200}
                    alt={image.label}
                    className="w-full aspect-video object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Button onClick={handleNext} disabled={selectedImages.length === 0} className="w-full">
          次へ
        </Button>
      </div>
    </div>
  )
}
