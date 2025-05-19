"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { MapPin, AlertTriangle, Calendar, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

export default function AreaReportSocialSharePage() {
  const searchParams = useSearchParams()
  const imageIds = searchParams.get("images")?.split(",") || ["1"]
  const [isClient, setIsClient] = useState(false)

  // クライアントサイドでのみ実行されるようにする
  useEffect(() => {
    setIsClient(true)
  }, [])

  const [selectedPhoto, setSelectedPhoto] = useState<{ title: string; image: string } | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const openPhotoDrawer = (photo: { title: string; image: string }) => {
    setSelectedPhoto(photo)
    setIsDrawerOpen(true)
  }

  // ユーザーデータ（実際のアプリではAPIから取得）
  const userData = {
    name: "Kanta",
    avatar: "/placeholder.svg?height=80&width=80&text=Kanta",
    areaReports: 314,
    cleaningReports: 9,
    date: "2025/05/04",
    location: "東京都世田谷区北沢2丁目",
    pollutionLevel: 3,
    pollutionText: "やや汚れている",
    comment: "タバコの吸い殻が多く、ゴミ箱の設置が必要かもしれません。特に駅前の植え込み周辺が気になります。",
  }

  // エリアレポートの写真データ（実際のアプリではAPIから取得）
  const reportPhotos = {
    mainPhoto: {
      title: "メイン写真",
      image: "/placeholder.svg?height=400&width=300&text=エリア写真1",
    },
    additionalPhotos: [
      {
        title: "写真 2",
        image: "/placeholder.svg?height=400&width=300&text=エリア写真2",
      },
      {
        title: "写真 3",
        image: "/placeholder.svg?height=400&width=300&text=エリア写真3",
      },
      {
        title: "写真 4",
        image: "/placeholder.svg?height=400&width=300&text=エリア写真4",
      },
    ],
    mapImage: "/placeholder.svg?height=400&width=600&text=エリア位置マップ",
  }

  // 汚染レベルに応じた色を取得
  const getPollutionLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return { bg: "bg-green-100", text: "text-green-700", border: "border-green-200" }
      case 2:
        return { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" }
      case 3:
        return { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200" }
      case 4:
        return { bg: "bg-red-100", text: "text-red-700", border: "border-red-200" }
      default:
        return { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200" }
    }
  }

  const levelColors = getPollutionLevelColor(userData.pollutionLevel)

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
            <h1 className="text-3xl font-bold mb-2 text-white">エリアレポート</h1>
            <p className="text-lg text-white">MeGoで街の状況を共有</p>
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
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center text-gray-700 mb-1">
                  <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="text-sm font-medium">レポート日</span>
                </div>
                <p className="text-lg font-bold">{userData.date}</p>
              </div>
            </div>

            {/* 汚染レベル */}
            <div className="mb-6">
              <div className={`p-4 rounded-lg ${levelColors.bg} ${levelColors.border} border`}>
                <div className="flex items-center mb-2">
                  <AlertTriangle className={`w-5 h-5 mr-2 ${levelColors.text}`} />
                  <h3 className={`font-bold ${levelColors.text}`}>汚染レベル: {userData.pollutionLevel}</h3>
                </div>
                <p className={`text-sm ${levelColors.text}`}>このエリアは「{userData.pollutionText}」状態です。</p>
              </div>
            </div>

            {/* 場所 */}
            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center text-gray-700 mb-2">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                <h3 className="font-bold">場所</h3>
              </div>
              <p className="text-gray-700 mb-4">{userData.location}</p>

              {/* 地図を場所セクションに統合 */}
              <div className="relative rounded-lg overflow-hidden">
                <div className="aspect-[16/9]">
                  <Image
                    src={reportPhotos.mapImage || "/placeholder.svg"}
                    alt="エリア位置"
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

            {/* コメント */}
            {userData.comment && (
              <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-start">
                  <Info className="w-5 h-5 mr-2 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">コメント</h3>
                    <p className="text-gray-700">{userData.comment}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 写真セクション */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <span className="w-2 h-6 bg-blue-600 rounded-full mr-2"></span>
                写真
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {/* メイン写真 */}
                <div
                  className="relative rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => openPhotoDrawer(reportPhotos.mainPhoto)}
                >
                  <div className="aspect-[3/4]">
                    <Image
                      src={reportPhotos.mainPhoto.image || "/placeholder.svg"}
                      alt={reportPhotos.mainPhoto.title}
                      width={300}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                {/* 追加写真 */}
                {reportPhotos.additionalPhotos.map((photo, index) => (
                  <div
                    key={`photo-${index}`}
                    className="relative rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => openPhotoDrawer(photo)}
                  >
                    <div className="aspect-[3/4]">
                      <Image
                        src={photo.image || "/placeholder.svg"}
                        alt={photo.title}
                        width={300}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                ))}
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
                    "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600",
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
        <h2 className="text-2xl font-bold mb-4">あなたも街の状況を共有しませんか？</h2>
        <p className="text-gray-300 mb-6">
          MeGoは無料で参加できる清掃活動支援アプリです。
          <br />
          エリアレポートで街の状況を共有し、みんなで環境改善に貢献しましょう。
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="https://mego.work/download" target="_blank">
            <Button
              className={cn(
                "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600",
                "text-white px-6 py-3 rounded-full",
              )}
            >
              LINE で一秒登録
            </Button>
          </Link>
        </div>
      </div>
      {/* 写真表示用ドロワー */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader className="border-b border-gray-200">
            <DrawerTitle>{selectedPhoto?.title || "写真"}</DrawerTitle>
            <DrawerDescription>タップして閉じる</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 flex items-center justify-center">
            {selectedPhoto && (
              <div className="relative max-w-full max-h-[70vh]">
                <Image
                  src={selectedPhoto.image || "/placeholder.svg"}
                  alt={selectedPhoto.title}
                  width={600}
                  height={800}
                  className="object-contain max-h-[70vh]"
                />
              </div>
            )}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                <X className="mr-2 h-4 w-4" />
                閉じる
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
