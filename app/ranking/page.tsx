import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"
import Image from "next/image"

export default function RankingPage() {
  return (
    <div className="ranking-page p-4 pt-8">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-1">ランキング</h1>
        <p className="text-gray-500 text-sm">Coming Soon</p>
      </header>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
            個人ランキング
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-40 bg-gray-100 rounded-md">
            <p className="text-gray-500">近日公開予定</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-blue-500" />
            グループランキング
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-40 bg-gray-100 rounded-md">
            <p className="text-gray-500">近日公開予定</p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="font-medium mb-2">ランキング機能について</h2>
        <p className="text-sm text-gray-600 mb-4">
          個人やグループの清掃活動の成果を競い合えるランキング機能を開発中です。
          ポイントやバッジ獲得数に基づいたランキングで、モチベーション向上につながります。
        </p>
        <div className="aspect-video bg-white rounded-md flex items-center justify-center">
          <Image
            src="/placeholder.svg?height=180&width=320"
            width={320}
            height={180}
            alt="ランキングイメージ"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}
