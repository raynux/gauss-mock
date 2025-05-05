"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar } from "lucide-react"
import Link from "next/link"

export default function ThankYouPage() {
  // 次の水曜日を計算
  const getNextWednesday = () => {
    const now = new Date()
    const dayOfWeek = now.getDay() // 0 (日曜) から 6 (土曜)
    const daysUntilWednesday = (3 - dayOfWeek + 7) % 7 || 7 // 水曜日は3
    const nextWednesday = new Date(now)
    nextWednesday.setDate(now.getDate() + daysUntilWednesday)

    // 日本語の月日フォーマット
    const month = nextWednesday.getMonth() + 1 // 月は0から始まるので+1
    const date = nextWednesday.getDate()
    return `${month}月${date}日`
  }

  return (
    <div className="flex items-center justify-center h-full p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">清掃完了</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600">
            清掃レポートが正常に送信されました。
            <br />
            素晴らしい活動をありがとうございます！
          </p>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex justify-center mb-2">
              <Calendar className="h-6 w-6 text-blue-500" />
            </div>
            <p className="text-sm text-blue-700">
              報酬が発生した場合は
              <br />
              <span className="font-medium">{getNextWednesday()}以降</span>に付与されます
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link href="/share/cleaning-report/thumbnail-select" className="w-full">
            <Button className="w-full">活動を共有する</Button>
          </Link>
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full">
              ホームに戻る
            </Button>
          </Link>
          <Link href="/profile/achievements?tab=cleaning-reports" className="w-full">
            <Button variant="outline" className="w-full">
              清掃履歴を確認する
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
