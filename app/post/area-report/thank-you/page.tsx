"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Award, Share2 } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

export default function ThankYouPage() {
  // 実際のアプリでは、サーバーから取得するデータ
  const reportCount = 7 // 例：7回目の投稿
  const remainingToBonus = 10 - (reportCount % 10)
  const progressValue = ((10 - remainingToBonus) / 10) * 100
  const bonusCount = Math.floor(reportCount / 10)
  const earnedBonusThisTime = reportCount % 10 === 0

  return (
    <div className="flex items-center justify-center h-full p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">投稿完了</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600">
            エリアレポートが正常に送信されました。
            <br />
            ご協力ありがとうございます！
          </p>

          {earnedBonusThisTime ? (
            <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex justify-center mb-2">
                <Award className="h-10 w-10 text-yellow-500" />
              </div>
              <p className="font-medium text-yellow-700">おめでとうございます！</p>
              <p className="text-sm text-yellow-600 mb-2">10回目のエリアレポート投稿達成！</p>
              <p className="text-lg font-bold text-green-600">+20pt ボーナス獲得！</p>
            </div>
          ) : (
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-1">
                <span>次のボーナスまで</span>
                <span>{remainingToBonus}回</span>
              </div>
              <Progress value={progressValue} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">
                10回投稿ごとに<span className="text-green-600 font-medium">+20pt</span>のボーナス！
              </p>
            </div>
          )}

          <div className="mt-4 flex items-center justify-center">
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              <span className="text-gray-500">投稿回数: </span>
              <span className="font-medium">{reportCount}回</span>
              {bonusCount > 0 && <span className="ml-1 text-xs text-green-600">(ボーナス{bonusCount}回獲得済み)</span>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link href="/share/area-report" className="w-full">
            <Button className="w-full flex items-center justify-center">
              <Share2 className="mr-2 h-4 w-4" />
              活動を共有する
            </Button>
          </Link>
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full">
              ホームに戻る
            </Button>
          </Link>
          <Link href="/explore?tab=area-report" className="w-full">
            <Button variant="outline" className="w-full">
              汚れ状況を確認する
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
