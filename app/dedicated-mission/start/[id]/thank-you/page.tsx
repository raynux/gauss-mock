"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar } from "lucide-react"
import Link from "next/link"

export default function DedicatedMissionThankYouPage() {
  return (
    <div className="flex items-center justify-center h-full p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">専用ミッション完了</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600">
            専用ミッションが完了しました。
            <br />
            素晴らしい活動をありがとうございます！
          </p>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex justify-center mb-2">
              <Calendar className="h-6 w-6 text-blue-500" />
            </div>
            <p className="text-sm text-blue-700">ポイントは通常、一週間以内に付与されます</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link href="/" className="w-full">
            <Button variant="default" className="w-full bg-gray-800 hover:bg-gray-700 text-white">
              ホームに戻る
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
