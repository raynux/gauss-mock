"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, MapPin, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MyReservationsPage() {
  const router = useRouter()
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState<number | null>(null)

  // 予約キャンセルダイアログを表示
  const handleCancelReservation = (id: number) => {
    setSelectedReservation(id)
    setShowCancelDialog(true)
  }

  // 予約をキャンセル
  const confirmCancellation = () => {
    // 実際のアプリでは、ここでAPIリクエストを送信
    setShowCancelDialog(false)
    // 画面を更新
  }

  // 専用ミッションを開始
  const startMission = (id: number) => {
    router.push(`/dedicated-mission/start/${id}`)
  }

  // 現在時刻から15分以内かどうかをチェック（開始可能かどうか）
  const canStart = (time: string) => {
    // 実際のアプリでは、現在時刻と予約時刻を比較
    return true // デモ用に常にtrueを返す
  }

  return (
    <div className="my-reservations p-4 pt-8 pb-20">
      <header className="flex items-center mb-6">
        <Link href="/profile" className="mr-2">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold">予約済みミッション</h1>
      </header>

      <Tabs defaultValue="upcoming" className="w-full mb-6">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="upcoming">予定</TabsTrigger>
          <TabsTrigger value="past">履歴</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {[
            {
              id: 1,
              title: "下北沢商店街喫煙所",
              date: "2025-05-04",
              time: "20:15",
              reward: 1000,
              location: "東京都世田谷区北沢2丁目",
            },
            {
              id: 2,
              title: "渋谷駅前花壇",
              date: "2025-05-06",
              time: "19:00",
              reward: 1200,
              location: "東京都渋谷区道玄坂1丁目",
            },
          ].map((reservation) => (
            <Card key={reservation.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-lg">{reservation.title}</h3>
                  <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                    専用ミッション
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{reservation.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{reservation.time}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="line-clamp-2">{reservation.location}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-md mb-4 flex justify-between items-center">
                  <span className="text-sm font-medium">固定報酬</span>
                  <span className="font-bold text-lg">{reservation.reward} pt</span>
                </div>

                <div className="flex space-x-3">
                  {canStart(reservation.time) ? (
                    <Button
                      className="flex-1 bg-teal-600 hover:bg-teal-700"
                      onClick={() => startMission(reservation.id)}
                    >
                      開始する
                    </Button>
                  ) : (
                    <Button className="flex-1" disabled>
                      開始時間まで待機中
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="flex-none border-gray-300"
                    onClick={() => handleCancelReservation(reservation.id)}
                  >
                    キャンセル
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* 予約がない場合 */}
          {false && (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">予約済みのミッションはありません</p>
              <Link href="/explore">
                <Button variant="outline" className="bg-white">
                  ミッションを探す
                </Button>
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {[
            {
              id: 3,
              title: "下北沢商店街喫煙所",
              date: "2025-04-28",
              time: "19:30",
              reward: 1000,
              location: "東京都世田谷区北沢2丁目",
              status: "完了",
            },
            {
              id: 4,
              title: "渋谷駅前花壇",
              date: "2025-04-25",
              time: "20:00",
              reward: 1200,
              location: "東京都渋谷区道玄坂1丁目",
              status: "キャンセル",
            },
          ].map((reservation) => (
            <Card key={reservation.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-lg">{reservation.title}</h3>
                  <Badge
                    variant="outline"
                    className={
                      reservation.status === "完了"
                        ? "bg-green-50 text-green-600 border-green-200"
                        : "bg-gray-50 text-gray-600 border-gray-200"
                    }
                  >
                    {reservation.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{reservation.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{reservation.time}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="line-clamp-2">{reservation.location}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">固定報酬</span>
                    <span
                      className={
                        reservation.status === "完了" ? "font-bold text-lg text-green-600" : "text-gray-400 font-medium"
                      }
                    >
                      {reservation.reward} pt
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* キャンセル確認ダイアログ */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>予約をキャンセルしますか？</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-start mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-500 mr-2 flex-shrink-0" />
              <p className="text-sm text-gray-600">
                予約をキャンセルすると、この時間枠は他のユーザーが予約できるようになります。キャンセルは当日でも可能ですが、頻繁なキャンセルは今後の予約に影響する場合があります。
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)} className="w-full sm:w-auto">
              戻る
            </Button>
            <Button variant="destructive" onClick={confirmCancellation} className="w-full sm:w-auto">
              キャンセルする
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
