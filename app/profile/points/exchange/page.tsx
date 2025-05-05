"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"

export default function PointExchangePage() {
  const [availablePoints, setAvailablePoints] = useState(1250)
  const [selectedPoints, setSelectedPoints] = useState<string>("")
  const [exchangeOptions, setExchangeOptions] = useState<number[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 交換可能なポイントオプションを計算（500ポイント単位）
  useEffect(() => {
    const options: number[] = []
    for (let i = 500; i <= availablePoints; i += 500) {
      options.push(i)
    }
    setExchangeOptions(options)
  }, [availablePoints])

  const handleExchange = async () => {
    if (!selectedPoints) return

    setIsSubmitting(true)

    // 実際の実装ではここでAPIリクエストを行う
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // 成功時の処理
    alert(
      `${selectedPoints}ポイントの交換リクエストを受け付けました。運営側での確認後、公式LINEアカウントからギフトコードをお送りします。`,
    )
    setSelectedPoints("")
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 bg-white border-b p-4 flex items-center">
        <Link href="/profile" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">ポイント交換</h1>
      </header>

      <div className="p-4 space-y-6">
        {/* 説明文 */}
        <div className="text-gray-700">
          <p className="mb-4">
            現在お持ちのポイントをAmazonギフト券に交換いたします。交換は500ポイント単位で行います。
            運営側での確認後、公式LINEアカウントからギフトコードをお送りします。
          </p>
        </div>

        {/* 交換可能ポイント */}
        <div>
          <h2 className="text-lg font-bold mb-2">交換可能ポイント</h2>
          <Card className="p-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white">
            <p className="text-3xl font-bold">{availablePoints} pt</p>
          </Card>
        </div>

        {/* 交換ポイント選択 */}
        <div>
          <h2 className="text-lg font-bold mb-2">交換するポイント</h2>
          <Select value={selectedPoints} onValueChange={setSelectedPoints}>
            <SelectTrigger className="w-full h-14 bg-gray-50 border-gray-200">
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent>
              {exchangeOptions.map((points) => (
                <SelectItem key={points} value={points.toString()}>
                  {points} pt
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedPoints && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">交換ポイント</span>
                <span className="font-medium">{selectedPoints} pt</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amazonギフト券</span>
                <span className="font-medium">¥{Number.parseInt(selectedPoints)}</span>
              </div>
            </div>
          )}
        </div>

        {/* 交換ボタン */}
        <Button
          className="w-full h-14 mt-8 bg-gray-800 hover:bg-gray-700 text-white"
          disabled={!selectedPoints || isSubmitting}
          onClick={handleExchange}
        >
          {isSubmitting ? "処理中..." : "Amazonギフト券に交換する"}
        </Button>

        {/* 注意事項 */}
        <div className="mt-6 text-sm text-gray-500">
          <h3 className="font-medium mb-2">注意事項</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>交換申請後のキャンセルはできません</li>
            <li>ギフトコードの発行には1〜3営業日かかる場合があります</li>
            <li>交換履歴はプロフィールページから確認できます</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
