"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Clock, MapPin, Timer, Ruler } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

export default function RewardDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const rewardId = Number.parseInt(params.id)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showPhotoGallery, setShowPhotoGallery] = useState(false)
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [galleryTitle, setGalleryTitle] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  // サンプルデータ
  const rewardDetail = {
    id: rewardId,
    location: "沖縄県那覇市",
    period: "1月20日 - 1月26日",
    budget: 4550,
    totalAmount: 200,
    status: rewardId === 1 || rewardId === 2 ? "pending" : "confirmed",
    participants: [
      {
        id: 1,
        name: "比嘉 健貴",
        nickname: "たちゃこ",
        avatar: "/placeholder.svg?height=40&width=40&text=比嘉",
        amount: 200,
        cleaningReports: 2,
        activityTime: 25,
        distance: 920,
        activities: [
          {
            date: "2025/01/20",
            time: "10分",
            distance: "427m",
            images: [
              "/placeholder.svg?height=80&width=80&text=写真1",
              "/placeholder.svg?height=80&width=80&text=写真2",
              "/placeholder.svg?height=80&width=80&text=写真3",
              "/placeholder.svg?height=80&width=80&text=写真4",
            ],
            moreImages: 11,
          },
          {
            date: "2025/01/23",
            time: "16分",
            distance: "493m",
            images: [
              "/placeholder.svg?height=80&width=80&text=写真5",
              "/placeholder.svg?height=80&width=80&text=写真6",
              "/placeholder.svg?height=80&width=80&text=写真7",
            ],
            moreImages: 10,
          },
        ],
      },
    ],
  }

  const [participantRewards, setParticipantRewards] = useState(
    rewardDetail.participants.map((p) => ({ id: p.id, amount: p.amount })),
  )

  const handleRewardChange = async (participantId: number, newValue: number[]) => {
    if (isUpdating) return

    setIsUpdating(true)

    // 報酬額を更新
    setParticipantRewards(participantRewards.map((p) => (p.id === participantId ? { ...p, amount: newValue[0] } : p)))

    try {
      // 実際のAPIリクエストをシミュレート
      await new Promise((resolve) => setTimeout(resolve, 500))

      // 成功通知
      toast({
        title: "報酬分配を更新しました",
        description: `${rewardDetail.participants.find((p) => p.id === participantId)?.name}さんの報酬を${newValue[0]}ptに設定しました`,
        duration: 3000,
      })
    } catch (error) {
      console.error("報酬更新エラー:", error)
      toast({
        title: "エラーが発生しました",
        description: "報酬分配の更新に失敗しました。もう一度お試しください。",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const openPhotoGallery = (images: string[], moreImages: number, date: string) => {
    // 表示されている画像に加えて、追加の画像を生成
    const allImages = [...images]

    // moreImages が存在する場合、追加の画像を生成
    if (moreImages > 0) {
      for (let i = 0; i < moreImages; i++) {
        const index = images.length + i
        allImages.push(`/placeholder.svg?height=80&width=80&text=写真${index + 1}`)
      }
    }

    setGalleryImages(allImages)
    setGalleryTitle(`${date}の活動写真`)
    setShowPhotoGallery(true)
  }

  const isPending = rewardDetail.status === "pending"

  return (
    <div className="reward-detail-page p-4 pt-8 pb-20">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link href="/profile/my-missions/rewards" className="mr-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">ミッション報酬</h1>
        </div>
      </header>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">{rewardDetail.location}</h2>

        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">予算設定</p>
                <p className="text-lg font-semibold">{rewardDetail.budget.toLocaleString()} pt</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">支払額合計</p>
                <p className="text-lg font-semibold">{rewardDetail.totalAmount.toLocaleString()} pt</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">評価期間</p>
                <p className="text-lg font-semibold">{rewardDetail.period}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {rewardDetail.participants.map((participant) => (
          <Card key={participant.id} className="mb-6 overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                      <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {participant.name} ({participant.nickname})
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm mr-2">分配額</p>
                    <p className="text-xl font-bold">
                      {participantRewards.find((p) => p.id === participant.id)?.amount || 0} pt
                    </p>
                  </div>
                </div>

                {isPending && (
                  <div className="mt-4">
                    <Slider
                      value={[participantRewards.find((p) => p.id === participant.id)?.amount || 0]}
                      max={500}
                      step={10}
                      onValueChange={(value) => handleRewardChange(participant.id, value)}
                      className="mt-2"
                      disabled={isUpdating}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0 pt</span>
                      <span>500 pt</span>
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-1">
                      スライダーを動かすと自動的に報酬が確定されます
                    </p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-gray-50">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center text-gray-600 mb-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <p className="text-xs">清掃レポート数</p>
                    </div>
                    <p className="font-semibold">{participant.cleaningReports} 件</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Timer className="w-4 h-4 mr-1" />
                      <p className="text-xs">活動時間</p>
                    </div>
                    <p className="font-semibold">{participant.activityTime} 分</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Ruler className="w-4 h-4 mr-1" />
                      <p className="text-xs">移動距離</p>
                    </div>
                    <p className="font-semibold">{participant.distance} m</p>
                  </div>
                </div>

                {participant.activities.map((activity, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      {activity.images.slice(0, 4).map((img, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="relative aspect-square rounded-md overflow-hidden bg-gray-200 cursor-pointer"
                          onClick={() => openPhotoGallery(activity.images, activity.moreImages, activity.date)}
                        >
                          <Image
                            src={img || "/placeholder.svg"}
                            alt={`活動写真 ${imgIndex + 1}`}
                            width={80}
                            height={80}
                            className="object-cover w-full h-full"
                          />
                          {imgIndex === 3 && activity.moreImages > 0 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium">
                              +{activity.moreImages}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {activity.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {activity.time}
                      </div>
                      <div className="flex items-center">
                        <Ruler className="w-4 h-4 mr-1" />
                        {activity.distance}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 写真ギャラリーダイアログ */}
      <Dialog open={showPhotoGallery} onOpenChange={setShowPhotoGallery}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>{galleryTitle}</DialogTitle>
          </DialogHeader>
          <div className="p-4 overflow-auto max-h-[70vh]">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {galleryImages.map((img, index) => (
                <div key={index} className="aspect-square rounded-md overflow-hidden bg-gray-200">
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`活動写真 ${index + 1}`}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
          <DialogFooter className="p-4 border-t">
            <Button onClick={() => setShowPhotoGallery(false)}>閉じる</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
