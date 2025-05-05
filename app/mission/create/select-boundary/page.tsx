"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, X, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"

interface BoundaryOption {
  id: number
  name: string
  missionCount: number
  totalBudget: number | null
  averageReward: number | null
}

export default function SelectBoundaryPage() {
  const router = useRouter()
  const [selectedBoundary, setSelectedBoundary] = useState<number | null>(null)

  // 行政区域のサンプルデータ
  const boundaries: BoundaryOption[] = [
    {
      id: 1,
      name: "東京都世田谷区",
      missionCount: 1,
      totalBudget: 1000,
      averageReward: 1000,
    },
    {
      id: 2,
      name: "東京都世田谷区北沢",
      missionCount: 1,
      totalBudget: 1000,
      averageReward: 1000,
    },
    {
      id: 3,
      name: "東京都世田谷区北沢2丁目",
      missionCount: 0,
      totalBudget: null,
      averageReward: null,
    },
  ]

  // 次のステップに進む
  const handleContinue = () => {
    if (selectedBoundary !== null) {
      router.push("/mission/create/settings")
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* ヘッダー */}
      <div className="p-4 flex items-center justify-between border-b bg-white">
        <div className="flex items-center">
          <button onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-xl font-bold">エリアの選択</h1>
            <p className="text-sm text-gray-500">ミッションを作成する場所を選択</p>
          </div>
        </div>
        <button onClick={() => router.push("/")}>
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* モーダルコンテンツ */}
      <div className="flex-1 p-4 bg-gray-50">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-center">ミッション作成</h2>
          <p className="text-center mb-6">設定する範囲を選択してください</p>

          <div className="space-y-4">
            {boundaries.map((boundary) => (
              <Card
                key={boundary.id}
                className={`cursor-pointer transition-colors ${
                  selectedBoundary === boundary.id ? "border-teal-500 bg-teal-50" : ""
                }`}
                onClick={() => setSelectedBoundary(boundary.id)}
              >
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium mb-2">{boundary.name}</h3>
                  <div className="space-y-1">
                    <div className="bg-gray-100 px-3 py-1 rounded-full inline-block text-sm">
                      ミッション数: {boundary.missionCount}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        総予算: {boundary.totalBudget ? `${boundary.totalBudget}pt` : "-"}
                      </div>
                      <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        平均報酬額: {boundary.averageReward ? `${boundary.averageReward}pt` : "-"}
                      </div>
                    </div>
                  </div>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* 下部ボタン */}
      <div className="p-4 border-t bg-white">
        <Button onClick={handleContinue} disabled={selectedBoundary === null} className="w-full">
          続ける
        </Button>
      </div>
    </div>
  )
}
