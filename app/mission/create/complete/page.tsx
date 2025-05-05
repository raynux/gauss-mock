"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export default function MissionCompletePage() {
  const router = useRouter()

  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-teal-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">ミッション作成完了</h1>
        <p className="text-gray-600 mb-8">
          ミッションが正常に作成されました。
          <br />
          清掃活動の支援にご協力いただきありがとうございます。
        </p>

        <Card className="mb-8">
          <CardContent className="p-4">
            <h2 className="font-medium mb-2">東京都世田谷区北沢</h2>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">支援ポイント:</span>
              <span className="font-medium">300 pt</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">週間上限:</span>
              <span className="font-medium">200 pt</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">1人あたり上限:</span>
              <span className="font-medium">50 pt</span>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Link href="/boundary/boundary-new">
            <Button className="w-full">ミッションを確認する</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              ホームに戻る
            </Button>
          </Link>
          <Link href="/mission/create">
            <Button variant="ghost" className="w-full">
              別のミッションを作成
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
