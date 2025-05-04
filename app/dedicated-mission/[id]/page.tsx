"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Clock, Info } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function DedicatedMissionDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="dedicated-mission-detail pb-6">
      <div className="relative h-64 bg-gray-200">
        <Image
          src="/placeholder.svg?height=256&width=390&text=専用ミッション"
          width={390}
          height={256}
          alt="専用ミッション画像"
          className="w-full h-full object-cover"
        />
        <Link href="/explore" className="absolute top-4 left-4 bg-black/30 rounded-full p-2 z-10">
          <ArrowLeft className="h-6 w-6 text-white" />
        </Link>

        {/* タイトルと報酬を画像にオーバーラップ */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
          <h1 className="text-2xl font-bold mb-1">下北沢商店街喫煙所</h1>
          <div className="flex items-center">
            <span className="font-medium">固定報酬</span>
            <span className="text-xl font-bold ml-2">1,000 pt</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
          <h2 className="text-gray-700 font-medium text-sm mb-1">専用ミッション</h2>
          <p className="text-sm text-gray-600">
            予約制の特別なミッションです。指定された時間に活動を行い、固定報酬を獲得できます。
          </p>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock className="w-4 h-4 mr-1" />
          <span>15分程度</span>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">コンセプト</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              下北沢ではタバコのポイ捨てによる街の景観破壊が深刻になっています。
            </p>
            <p className="text-sm text-gray-600 mb-4">
              そこで「しもきた商店街振興組合」主導のもと、みんなで維持する公共の喫煙所ができました。
            </p>
            <p className="text-sm text-gray-600 mb-4">
              下北沢を愛する人、ポイ捨てが許せない人、もしくは単に謝礼目当てでもOK！
            </p>
            <p className="text-sm text-gray-600">無理なく気軽に下北沢に貢献しませんか？</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">活動内容</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
              <li>灰皿の交換・拭き取り</li>
              <li>放置ゴミの片付け</li>
              <li>作業時間は通常 30〜60分程度</li>
            </ul>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-amber-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-amber-700 mb-1">注意事項</h3>
                  <ul className="text-xs text-amber-700 space-y-1 list-disc pl-4">
                    <li>清掃道具は備え付けのものを使用してください</li>
                    <li>作業前後の写真撮影が必須です</li>
                    <li>灰皿の中身は指定の場所に捨ててください</li>
                    <li>周辺の歩道も含めて清掃をお願いします</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 予約ボタンを目立たせる */}
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-transparent z-10 max-w-md mx-auto">
          <Button
            className="w-[90%] mx-auto bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-medium py-4 rounded-lg shadow-md flex items-center justify-center text-base"
            onClick={() => (window.location.href = "/dedicated-mission/reserve/mission-1")}
          >
            予約する
          </Button>
        </div>
      </div>
    </div>
  )
}
