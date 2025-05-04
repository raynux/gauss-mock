"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, X, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

export default function ReserveDedicatedMissionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  // 日付データ
  const dates = [
    { day: "日", date: "04", month: "5月" },
    { day: "月", date: "05", month: "5月" },
    { day: "火", date: "06", month: "5月" },
    { day: "水", date: "07", month: "5月" },
    { day: "木", date: "08", month: "5月" },
    { day: "金", date: "09", month: "5月" },
    { day: "土", date: "10", month: "5月" },
  ]

  // 時間データ
  const times = [
    "19:00",
    "19:15",
    "19:30",
    "19:45",
    "20:00",
    "20:15",
    "20:30",
    "20:45",
    "21:00",
    "21:15",
    "21:30",
    "21:45",
    "22:00",
    "22:15",
    "22:30",
    "22:45",
    "23:00",
    "23:15",
    "23:30",
    "23:45",
  ]

  // 予約確認ダイアログを表示
  const handleReserve = () => {
    if (selectedDate && selectedTime) {
      setShowConfirmation(true)
    }
  }

  // 予約を確定
  const confirmReservation = () => {
    if (termsAccepted) {
      router.push("/dedicated-mission/my-reservations")
    }
  }

  return (
    <div className="dedicated-mission-reserve pb-6">
      <div className="relative h-48 bg-gray-200">
        <Image
          src="/placeholder.svg?height=192&width=390&text=専用ミッション"
          width={390}
          height={192}
          alt="専用ミッション画像"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-2 text-shadow">下北沢商店街喫煙所</h1>
            <p className="text-lg font-medium text-shadow">固定報酬 1,000 pt</p>
          </div>
        </div>
        <Link href={`/dedicated-mission/${params.id}`} className="absolute top-4 left-4 bg-black/30 rounded-full p-2">
          <X className="h-6 w-6 text-white" />
        </Link>
      </div>

      <div className="p-4">
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              日付を選択
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {dates.map((date) => (
                <button
                  key={date.date}
                  className={`p-2 rounded-md text-center ${
                    selectedDate === date.date ? "bg-gray-800 text-white" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedDate(date.date)}
                >
                  <div className="text-xs">{date.day}</div>
                  <div className="text-lg font-bold">{date.date}</div>
                  <div className="text-xs">{date.month}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              時間を選択
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {times.map((time) => (
                <button
                  key={time}
                  className={`p-2 rounded-md text-center ${
                    selectedTime === time ? "bg-gray-800 text-white" : "border border-gray-200 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button className="w-full" disabled={!selectedDate || !selectedTime} onClick={handleReserve}>
          予約する
        </Button>
      </div>

      {/* 予約確認ダイアログ */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>予約確認</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="border-l-4 border-gray-500 pl-3 mb-4">
              <p className="font-medium">
                申込日時: 2025-05-{selectedDate} {selectedTime}
              </p>
            </div>

            <h3 className="font-medium mb-2">ご注意事項</h3>
            <ul className="space-y-3 text-sm text-gray-600 list-disc pl-5 mb-4">
              <li>清掃開始時間になりましたら、LINEメッセージから清掃を開始してください</li>
              <li>作業のガイドラインはLINEメッセージ内及び清掃開始後に表示されます</li>
              <li>参加できない場合は、速やかにLINEメッセージからキャンセルしてください</li>
              <li>作業内容や記録が十分でない場合、謝礼が減額される場合があります</li>
              <li>謝礼は概ね一週間以内に付与されます</li>
            </ul>

            <div className="flex items-center space-x-2 mb-4">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                内容を確認しました
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmation(false)} className="w-full sm:w-auto">
              キャンセル
            </Button>
            <Button onClick={confirmReservation} disabled={!termsAccepted} className="w-full sm:w-auto">
              申し込む
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
