"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function CreateMissionPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  // 地図上の位置を選択した後の処理
  const handleSelectLocation = () => {
    router.push("/mission/create/select-boundary")
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

      {/* 検索バー */}
      <div className="p-4 bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="場所を探す"
            className="pl-10 pr-4 py-2 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 地図表示エリア */}
      <div className="flex-1 relative">
        <Image
          src="/placeholder.svg?height=600&width=390&text=地図"
          alt="地図"
          width={390}
          height={600}
          className="w-full h-full object-cover"
        />

        {/* 中央のマーカー */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 rounded-full border-4 border-teal-500 flex items-center justify-center bg-white">
            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
          </div>
        </div>

        {/* 選択エリアのハイライト */}
        <div className="absolute top-1/3 left-1/4 right-1/4 bottom-1/3 bg-teal-400/20 rounded-lg border-2 border-teal-400/40"></div>
      </div>

      {/* 下部ボタン */}
      <div className="p-4 border-t bg-white">
        <Button onClick={handleSelectLocation} className="w-full">
          ここにする
        </Button>
      </div>
    </div>
  )
}
