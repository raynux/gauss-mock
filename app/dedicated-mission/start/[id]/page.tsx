"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Camera, Clock, MapPin, ExternalLink, Info, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export default function StartDedicatedMissionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [photos, setPhotos] = useState<{ before: string[]; after: string[]; keybox: string[]; trash: string[] }>({
    before: [],
    after: [],
    keybox: [],
    trash: [],
  })
  const [isInRange, setIsInRange] = useState(true)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [showCompletionDialog, setShowCompletionDialog] = useState(false)
  const [trashAmount, setTrashAmount] = useState("3")
  const [missingItems, setMissingItems] = useState<string[]>([])
  const [comment, setComment] = useState("")
  const startTimeRef = useRef(Date.now())
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // 経過時間の計算
  useEffect(() => {
    startTimeRef.current = Date.now()
    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
      setElapsedTime(elapsed)
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  // 写真を追加
  const addPhoto = (type: "before" | "after" | "keybox" | "trash") => {
    const newPhoto = `/placeholder.svg?height=200&width=200&text=写真${photos[type]?.length + 1 || 1}`
    setPhotos((prev) => ({
      ...prev,
      [type]: [...(prev[type] || []), newPhoto],
    }))
  }

  // ミッション完了
  const completeMission = () => {
    router.push("/dedicated-mission/my-reservations")
  }

  // ミッション中断
  const abortMission = () => {
    router.push("/dedicated-mission/my-reservations")
  }

  // 経過時間のフォーマット
  const formatElapsedTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // チェックボックスの状態を更新
  const toggleMissingItem = (value: string) => {
    setMissingItems((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  return (
    <div className="dedicated-mission-start pb-6">
      <div className="relative h-48 bg-gray-200">
        <Image
          src="/placeholder.svg?height=192&width=390&text=地図"
          width={390}
          height={192}
          alt="ミッション位置"
          className="w-full h-full object-cover"
        />

        {/* 有効範囲の円 */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] rounded-full border-2 border-green-500 bg-green-500/20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <MapPin className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <Link
          href="/dedicated-mission/my-reservations"
          className="absolute top-4 left-4 bg-black/30 rounded-full p-2 z-10"
        >
          <ArrowLeft className="h-6 w-6 text-white" />
        </Link>

        {/* 経過時間 */}
        <div className="absolute top-4 right-4 bg-black/30 rounded-full px-3 py-1 flex items-center z-10">
          <Clock className="h-4 w-4 text-white mr-1" />
          <span className="text-white text-xs font-mono">{formatElapsedTime(elapsedTime)}</span>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-192px)]">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-2">下北沢商店街喫煙所</h1>

          {/* ガイド情報 */}
          <Card className="mb-4 bg-gray-50 p-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <ExternalLink className="h-5 w-5 text-gray-600 mr-2" />
                <a href="#" className="text-blue-600 underline">
                  清掃ガイドはこちら
                </a>
              </div>
              <div className="flex items-center">
                <Info className="h-5 w-5 text-gray-600 mr-2" />
                <p className="text-gray-800">
                  キーボックスの暗証番号は <span className="font-bold">3535</span> です
                </p>
              </div>
            </div>
          </Card>

          {/* 写真撮影セクション */}
          <div className="space-y-6 mb-6">
            <div>
              <h2 className="text-lg font-medium mb-2 flex items-center">
                <Camera className="h-5 w-5 mr-2" />
                清掃前の写真
                <span className="text-xs text-gray-500 ml-2">（1枚以上）</span>
              </h2>
              <p className="text-sm text-gray-600 mb-3">喫煙所内と外側（裏側通路含む）の様子を撮影してください</p>

              <div className="grid grid-cols-3 gap-2 mb-2">
                {photos.before.map((photo, index) => (
                  <div key={`before-${index}`} className="aspect-square bg-gray-100 rounded overflow-hidden relative">
                    <img
                      src={photo || "/placeholder.svg"}
                      alt={`清掃前写真 ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute top-1 right-1 bg-black/50 rounded-full p-1"
                      onClick={() =>
                        setPhotos((prev) => ({
                          ...prev,
                          before: prev.before.filter((_, i) => i !== index),
                        }))
                      }
                    >
                      <X className="h-3 w-3 text-white" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addPhoto("before")}
                  className="aspect-square bg-gray-100 rounded-md flex flex-col items-center justify-center border border-dashed border-gray-300"
                >
                  <Camera className="h-8 w-8 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">追加</span>
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-2 flex items-center">
                <Camera className="h-5 w-5 mr-2" />
                清掃後の写真
                <span className="text-xs text-gray-500 ml-2">（1枚以上）</span>
              </h2>
              <p className="text-sm text-gray-600 mb-3">清掃完了後の様子を撮影してください</p>

              <div className="grid grid-cols-3 gap-2 mb-2">
                {photos.after &&
                  photos.after.map((photo, index) => (
                    <div key={`after-${index}`} className="aspect-square bg-gray-100 rounded overflow-hidden relative">
                      <img
                        src={photo || "/placeholder.svg"}
                        alt={`清掃後写真 ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        className="absolute top-1 right-1 bg-black/50 rounded-full p-1"
                        onClick={() =>
                          setPhotos((prev) => ({
                            ...prev,
                            after: prev.after.filter((_, i) => i !== index),
                          }))
                        }
                      >
                        <X className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  ))}
                <button
                  onClick={() => addPhoto("after")}
                  className="aspect-square bg-gray-100 rounded-md flex flex-col items-center justify-center border border-dashed border-gray-300"
                >
                  <Camera className="h-8 w-8 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">追加</span>
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-2 flex items-center">
                <Camera className="h-5 w-5 mr-2" />
                回収したゴミの写真
                <span className="text-xs text-gray-500 ml-2">（1枚以上）</span>
              </h2>

              <div className="grid grid-cols-3 gap-2 mb-2">
                {photos.trash.map((photo, index) => (
                  <div key={`trash-${index}`} className="aspect-square bg-gray-100 rounded overflow-hidden relative">
                    <img
                      src={photo || "/placeholder.svg"}
                      alt={`ゴミ写真 ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute top-1 right-1 bg-black/50 rounded-full p-1"
                      onClick={() =>
                        setPhotos((prev) => ({
                          ...prev,
                          trash: prev.trash.filter((_, i) => i !== index),
                        }))
                      }
                    >
                      <X className="h-3 w-3 text-white" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addPhoto("trash")}
                  className="aspect-square bg-gray-100 rounded-md flex flex-col items-center justify-center border border-dashed border-gray-300"
                >
                  <Camera className="h-8 w-8 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">追加</span>
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-2 flex items-center">
                <Camera className="h-5 w-5 mr-2" />
                キーボックスの写真
                <span className="text-xs text-gray-500 ml-2">（1枚以上）</span>
              </h2>
              <p className="text-sm text-gray-600 mb-3">キーボックスの状態を撮影してください</p>

              <div className="grid grid-cols-3 gap-2 mb-2">
                {photos.keybox &&
                  photos.keybox.map((photo, index) => (
                    <div key={`keybox-${index}`} className="aspect-square bg-gray-100 rounded overflow-hidden relative">
                      <img
                        src={photo || "/placeholder.svg"}
                        alt={`キーボックス写真 ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        className="absolute top-1 right-1 bg-black/50 rounded-full p-1"
                        onClick={() =>
                          setPhotos((prev) => ({
                            ...prev,
                            keybox: prev.keybox.filter((_, i) => i !== index),
                          }))
                        }
                      >
                        <X className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  ))}
                <button
                  onClick={() => addPhoto("keybox")}
                  className="aspect-square bg-gray-100 rounded-md flex flex-col items-center justify-center border border-dashed border-gray-300"
                >
                  <Camera className="h-8 w-8 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">追加</span>
                </button>
              </div>
            </div>
          </div>

          {/* アンケートフォーム */}
          <Card className="mb-6 p-4">
            <h2 className="text-lg font-medium mb-4">アンケート</h2>

            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">ゴミの量はどうでしたか？</h3>
                <RadioGroup defaultValue={trashAmount} onValueChange={setTrashAmount}>
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="trash-1" />
                      <Label htmlFor="trash-1">少ない</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="trash-2" />
                      <Label htmlFor="trash-2">やや少ない</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="trash-3" />
                      <Label htmlFor="trash-3">普通</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4" id="trash-4" />
                      <Label htmlFor="trash-4">やや多い</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5" id="trash-5" />
                      <Label htmlFor="trash-5">多い</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium">不足や破損している備品はありますか？</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "water", label: "水" },
                    { id: "mask", label: "マスク" },
                    { id: "apron", label: "エプロン" },
                    { id: "gloves", label: "手袋" },
                    { id: "wipes", label: "ウェットティッシュ" },
                    { id: "bags", label: "ゴミ袋" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={item.id}
                        checked={missingItems.includes(item.id)}
                        onCheckedChange={() => toggleMissingItem(item.id)}
                      />
                      <Label htmlFor={item.id}>{item.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium">その他コメント（任意）</h3>
                <Textarea
                  placeholder="気になったことや改善点などがあればご記入ください"
                  className="resize-none"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>
          </Card>

          <Button
            className={cn(
              "w-full py-6 text-lg",
              (!photos.before.length || !photos.after.length || !photos.keybox.length || !photos.trash.length) &&
                "opacity-70",
            )}
            disabled={!photos.before.length || !photos.after.length || !photos.keybox.length || !photos.trash.length}
            onClick={completeMission}
          >
            ミッション完了
          </Button>

          <button className="w-full text-center mt-2 text-sm text-red-500/80 hover:text-red-600" onClick={abortMission}>
            ミッションを中断する
          </button>
        </div>
      </ScrollArea>
    </div>
  )
}
