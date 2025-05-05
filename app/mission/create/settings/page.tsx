"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, X, Camera, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function MissionSettingsPage() {
  const router = useRouter()
  const [budget, setBudget] = useState("")
  const [weeklyLimit, setWeeklyLimit] = useState("")
  const [perPersonLimit, setPerPersonLimit] = useState("")
  const [message, setMessage] = useState("")
  const [photos, setPhotos] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [privateMessage, setPrivateMessage] = useState("")

  // 写真を追加
  const addPhoto = () => {
    if (photos.length < 1) {
      const newPhoto = `/placeholder.svg?height=100&width=100&text=写真1`
      setPhotos([...photos, newPhoto])
    }
  }

  // 次のステップに進む
  const handleContinue = () => {
    // 入力チェック
    if (!budget || Number.parseInt(budget) < 200) {
      setError("総予算は 200pt 以上に設定してください")
      return
    }

    if (!weeklyLimit) {
      setError("週間ポイント上限を設定してください")
      return
    }

    if (!perPersonLimit) {
      setError("1人あたりの上限ポイントを設定してください")
      return
    }

    // 確認画面へ
    router.push("/mission/create/confirm")
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
            <h1 className="text-xl font-bold">ミッション設定</h1>
            <p className="text-sm text-gray-500">詳細を入力します</p>
          </div>
        </div>
        <button onClick={() => router.push("/")}>
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* 使用可能ポイント表示 */}
      <div className="p-4 flex justify-between items-center border-b bg-white">
        <div className="flex items-center">
          <span className="text-gray-600 mr-2">使用可能ポイント</span>
          <span className="text-2xl font-bold">204,184</span>
          <span className="text-gray-600 ml-1">P</span>
        </div>
        <Button variant="outline" className="flex items-center">
          <ShoppingCart className="w-4 h-4 mr-1" />
          ポイント購入
        </Button>
      </div>

      {/* フォーム */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-2">東京都世田谷区北沢</h2>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">支援するポイント</label>
            <Input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="0"
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">1週間に使うポイントの上限</label>
            <Input
              type="number"
              value={weeklyLimit}
              onChange={(e) => setWeeklyLimit(e.target.value)}
              placeholder="200"
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">1人あたりの上限ポイント</label>
            <Input
              type="number"
              value={perPersonLimit}
              onChange={(e) => setPerPersonLimit(e.target.value)}
              placeholder="50"
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">参考写真（1枚まで）</label>
            <div className="grid grid-cols-1 gap-2">
              {photos.map((photo, index) => (
                <div key={index} className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                  <Image
                    src={photo || "/placeholder.svg"}
                    alt={`参考写真`}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {photos.length < 1 && (
                <button
                  onClick={addPhoto}
                  className="aspect-video bg-gray-100 rounded-md flex flex-col items-center justify-center border border-dashed border-gray-300"
                >
                  <Camera className="h-6 w-6 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">追加</span>
                </button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">コメント</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="例：ゴミが多く見られるエリアです。特にタバコの吸い殻が多いので注意してください。"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">清掃した人へのメッセージ（非公開）</label>
            <div className="text-xs text-gray-500 mb-2">
              このメッセージは清掃を行った人だけに表示され、他のユーザーには見えません。
            </div>
            <Textarea
              value={privateMessage}
              onChange={(e) => setPrivateMessage(e.target.value)}
              placeholder="例：ありがとうございます！特に気になる場所があれば教えてください。"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* エラーメッセージ */}
      {error && <div className="p-3 bg-red-100 text-red-700 text-center text-sm">{error}</div>}

      {/* 下部ボタン */}
      <div className="p-4 border-t bg-white">
        <Button onClick={handleContinue} className="w-full">
          確認画面へ
        </Button>
      </div>
    </div>
  )
}
