"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock, Ruler, Calendar, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function CleaningReportSocialSharePage() {
  const searchParams = useSearchParams()
  const imageIds = searchParams.get("images")?.split(",") || ["1"]
  const [isClient, setIsClient] = useState(false)

  // クライアントサイドでのみ実行されるようにする
  useEffect(() => {
    setIsClient(true)
  }, [])

  // ユーザーデータ（実際のアプリではAPIから取得）
  const userData = {
    name: "Kanta",
    avatar: "/placeholder.svg?height=80&width=80&text=Kanta",
    areaReports: 314,
    cleaningReports: 9,
    date: "2025/04/16",
    time: "35分",
    distance: "655m",
    location: "東京都世田谷区北沢2丁目 周辺",
    comment: "ナイトパトロール完了！ヴィレバン前のゴミやばい",
  }

  // 清掃レポートの写真データ（実際のアプリではAPIから取得）
  const reportPhotos = {
    startPoint: {
      title: "スタート地点",
      image: "/placeholder.svg?height=400&width=300&text=スタート地点",
    },
    cleaningPhotos: [
      {
        title: "清掃中 1",
        image: "/placeholder.svg?height=400&width=300&text=清掃中1",
      },
      {
        title: "清掃中 2",
        image: "/placeholder.svg?height=400&width=300&text=清掃中2",
      },
    ],
    trashBags: [
      {
        title: "ゴミ袋1 中身",
        image: "/placeholder.svg?height=400&width=300&text=ゴミ袋1中身",
      },
      {
        title: "ゴミ袋1 外観",
        image: "/placeholder.svg?height=400&width=300&text=ゴミ袋1外観",
      },
      {
        title: "ゴミ袋2 中身",
        image: "/placeholder.svg?height=400&width=300&text=ゴミ袋2中身",
      },
      {
        title: "ゴミ袋2 外観",
        image: "/placeholder.svg?height=400&width=300&text=ゴミ袋2外観",
      },
    ],
    mapImage: "/placeholder.svg?height=400&width=600&text=清掃経路マップ",
  }

  if (!isClient) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* ヘッダー（背景のみ） */}
      <header className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 opacity-70">
          <Image
            src="/abstract-cleaning-pattern.png"
            alt="ヘッダー背景"
            fill
            className="object-cover mix-blend-overlay"
            priority
          />
        </div>
        {/* テキストを半透明の背景付きで表示 */}
        <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-center">
          <div className="bg-black bg-opacity-50 px-6 py-3 rounded-lg">
            <h1 className="text-3xl font-bold mb-2 text-white">清掃活動レポート</h1>
            <p className="text-lg text-white">MeGoで街をキレイに</p>
          </div>
        </div>
      </header>

      {/* プロフィールカード */}
      <div className="relative px-4 -mt-16 max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden text-gray-800">
          <div className="p-6">
            {/* ユーザー情報 */}
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
                <Image
                  src={userData.avatar || "/placeholder.svg"}
                  alt={userData.name}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold">{userData.name}</h2>
              </div>
            </div>

            {/* 活動統計 */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center text-gray-700 mb-1">
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="text-sm font-medium">エリアレポート</span>
                </div>
                <p className="text-lg font-bold">
                  {userData.areaReports}
                  <span className="text-sm ml-1">件</span>
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center text-gray-700 mb-1">
                  <Trash2 className="w-4 h-4 mr-2 text-green-600" />
                  <span className="text-sm font-medium">清掃レポート</span>
                </div>
                <p className="text-lg font-bold">
                  {userData.cleaningReports}
                  <span className="text-sm ml-1">件</span>
                </p>
              </div>
            </div>

            {/* 活動情報 */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-gray-700 mb-1">
                  <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="text-sm font-medium">清掃日</span>
                </div>
                <p className="text-lg font-bold">{userData.date}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-gray-700 mb-1">
                  <Clock className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="text-sm font-medium">清掃時間</span>
                </div>
                <p className="text-lg font-bold">
                  {userData.time.replace("分", "")}
                  <span className="text-sm ml-1">分</span>
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-gray-700 mb-1">
                  <Ruler className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="text-sm font-medium">直線距離</span>
                </div>
                <p className="text-lg font-bold">
                  {userData.distance.replace("m", "")}
                  <span className="text-sm ml-1">m</span>
                </p>
              </div>
              {/* 場所の表示方法を変更 - 複数行表示に */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-gray-700 mb-1">
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="text-sm font-medium">場所</span>
                </div>
                <p className="text-sm font-medium break-words">{userData.location}</p>
              </div>
            </div>

            {/* コメント */}
            {userData.comment && (
              <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-gray-700">{userData.comment}</p>
              </div>
            )}

            {/* 写真セクション - すべて同じグリッドレイアウトに統一 */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <span className="w-2 h-6 bg-blue-600 rounded-full mr-2"></span>
                写真
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {/* スタート地点の写真 */}
                <div className="relative rounded-lg overflow-hidden">
                  <div className="aspect-[3/4]">
                    <Image
                      src={reportPhotos.startPoint.image || "/placeholder.svg"}
                      alt={reportPhotos.startPoint.title}
                      width={300}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {reportPhotos.startPoint.title}
                  </div>
                </div>

                {/* 清掃中の写真 */}
                {reportPhotos.cleaningPhotos.map((photo, index) => (
                  <div key={`cleaning-${index}`} className="relative rounded-lg overflow-hidden">
                    <div className="aspect-[3/4]">
                      <Image
                        src={photo.image || "/placeholder.svg"}
                        alt={photo.title}
                        width={300}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {photo.title}
                    </div>
                  </div>
                ))}

                {/* ゴミ袋の写真 */}
                {reportPhotos.trashBags.map((photo, index) => (
                  <div key={`trash-${index}`} className="relative rounded-lg overflow-hidden">
                    <div className="aspect-[3/4]">
                      <Image
                        src={photo.image || "/placeholder.svg"}
                        alt={photo.title}
                        width={300}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {photo.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 地図 */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <span className="w-2 h-6 bg-blue-600 rounded-full mr-2"></span>
                清掃経路
              </h3>
              <div className="relative rounded-lg overflow-hidden">
                <div className="aspect-[16/9]">
                  <Image
                    src={reportPhotos.mapImage || "/placeholder.svg"}
                    alt="清掃経路"
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute bottom-2 right-2 bg-white text-xs px-2 py-1 rounded shadow text-gray-600">
                  © Mapbox
                </div>
              </div>
            </div>
          </div>

          {/* フッター */}
          <div className="bg-gray-50 p-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <Image src="/eco-friendly-logo.png" alt="MeGo" width={40} height={40} className="object-cover" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">MeGo</p>
                  <p className="text-xs text-gray-500">街をキレイにするアプリ</p>
                </div>
              </div>
              <Link href="https://mego.work/download" target="_blank">
                <Button
                  className={cn(
                    "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600",
                    "text-white text-sm px-4 py-2 rounded-full",
                  )}
                >
                  LINE で一秒登録
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 参加促進セクション */}
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">あなたも街をキレイにしませんか？</h2>
        <p className="text-gray-300 mb-6">
          MeGoは無料で参加できる清掃活動支援アプリです。
          <br />
          あなたの小さな一歩が、大きな変化を生み出します。
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="https://mego.work/download" target="_blank">
            <Button
              className={cn(
                "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600",
                "text-white px-6 py-3 rounded-full",
              )}
            >
              LINE で一秒登録
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
