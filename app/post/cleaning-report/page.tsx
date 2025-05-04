"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Upload, ArrowLeft, Info, Plus, Camera, Clock, Ruler } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { Stepper, Step } from "@/components/stepper"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function CleaningReportPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(0)
  const [cleaningPhotos, setCleaningPhotos] = useState<string[]>([])
  const [trashPhotos, setTrashPhotos] = useState<{
    bag1Inside: string | null
    bag1Outside: string | null
    bag2Inside: string | null
    bag2Outside: string | null
  }>({
    bag1Inside: null,
    bag1Outside: null,
    bag2Inside: null,
    bag2Outside: null,
  })
  const [cleaningTime, setCleaningTime] = useState("00:00:00")
  const [distance, setDistance] = useState("0m")

  // 投稿完了時の処理
  const handleSubmit = () => {
    // 実際のアプリでは、ここでデータを送信する処理を実装
    router.push("/post/cleaning-report/thank-you")
  }

  // 清掃中の写真を追加
  const addCleaningPhoto = () => {
    const newPhoto = `/placeholder.svg?height=200&width=200&text=清掃写真${cleaningPhotos.length + 1}`
    setCleaningPhotos([...cleaningPhotos, newPhoto])
  }

  // ゴミ写真を追加
  const addTrashPhoto = (type: keyof typeof trashPhotos) => {
    const label =
      type === "bag1Inside"
        ? "ゴミ袋1中身"
        : type === "bag1Outside"
          ? "ゴミ袋1外観"
          : type === "bag2Inside"
            ? "ゴミ袋2中身"
            : "ゴミ袋2外観"

    const newPhoto = `/placeholder.svg?height=200&width=200&text=${label}`
    setTrashPhotos({ ...trashPhotos, [type]: newPhoto })
  }

  // ステップの説明文を取得
  const getStepDescription = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return "清掃を始める場所を記録します"
      case 1:
        return "清掃活動中の写真を撮影します"
      case 2:
        return "集めたゴミの写真を撮影します"
      case 3:
        return "自撮りと活動のコメントを記録します"
      default:
        return ""
    }
  }

  // 次のステップに進めるかチェック
  const canProceedToNextStep = () => {
    if (step === 2) {
      // ゴミ袋1の中身と外観が両方あるかチェック
      return trashPhotos.bag1Inside && trashPhotos.bag1Outside
    }
    return true
  }

  // 袋2が表示されるかチェック
  const shouldShowBag2 = () => {
    return trashPhotos.bag1Inside && trashPhotos.bag1Outside
  }

  return (
    <div className="w-full max-w-md p-4">
      <div className="flex items-center mb-4">
        <Link href="/post" className="mr-2">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">投稿</h1>

        {/* 清掃時間と直線距離を右上に配置 */}
        <div className="ml-auto flex items-center text-xs text-gray-400">
          <Clock className="h-3 w-3 mr-1" />
          <span className="font-mono mr-2">{cleaningTime}</span>
          <Ruler className="h-3 w-3 mr-1" />
          <span>{distance}</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>清掃レポート</CardTitle>
        </CardHeader>
        <CardContent>
          <Stepper activeStep={step} className="mb-6">
            <Step title="スタート地点" />
            <Step title="清掃中" />
            <Step title="ゴミ写真" />
            <Step title="自撮り" />
          </Stepper>

          <p className="text-sm text-gray-600 mb-4">{getStepDescription(step)}</p>

          <form className="space-y-6">
            {step === 0 && (
              <div className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-md flex flex-col items-center justify-center border border-dashed border-gray-300">
                  <MapPin className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">スタート地点を記録</span>
                </div>
                <Button onClick={() => setStep(1)} className="w-full">
                  清掃活動開始
                </Button>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {cleaningPhotos.map((photo, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded overflow-hidden">
                      <img
                        src={photo || "/placeholder.svg"}
                        alt={`清掃写真 ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addCleaningPhoto}
                    className="aspect-square bg-gray-100 rounded-md flex flex-col items-center justify-center border border-dashed border-gray-300"
                  >
                    <Plus className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">写真を追加</span>
                  </button>
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="text-xs w-full mt-2">
                      <Info className="h-3 w-3 mr-1" />
                      写真の撮り方ガイド
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">写真の撮り方のコツ</h4>
                      <p className="text-sm text-gray-600">
                        • 清掃活動の様子がわかるように撮影してください
                        <br />• 明るい場所で撮影すると良い写真になります
                        <br />• 個人が特定できる場合は許可を得てから撮影してください
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button onClick={() => setStep(2)} className="w-full">
                  次へ
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="aspect-square bg-gray-100 rounded overflow-hidden">
                    {trashPhotos.bag1Inside ? (
                      <img
                        src={trashPhotos.bag1Inside || "/placeholder.svg"}
                        alt="ゴミ袋1中身"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => addTrashPhoto("bag1Inside")}
                        className="w-full h-full flex flex-col items-center justify-center border border-dashed border-gray-300"
                      >
                        <Camera className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">ゴミ袋1中身</span>
                      </button>
                    )}
                  </div>
                  <div className="aspect-square bg-gray-100 rounded overflow-hidden">
                    {trashPhotos.bag1Outside ? (
                      <img
                        src={trashPhotos.bag1Outside || "/placeholder.svg"}
                        alt="ゴミ袋1外観"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => addTrashPhoto("bag1Outside")}
                        className="w-full h-full flex flex-col items-center justify-center border border-dashed border-gray-300"
                      >
                        <Camera className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">ゴミ袋1外観</span>
                      </button>
                    )}
                  </div>

                  {shouldShowBag2() && (
                    <>
                      <div className="aspect-square bg-gray-100 rounded overflow-hidden">
                        {trashPhotos.bag2Inside ? (
                          <img
                            src={trashPhotos.bag2Inside || "/placeholder.svg"}
                            alt="ゴミ袋2中身"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <button
                            type="button"
                            onClick={() => addTrashPhoto("bag2Inside")}
                            className="w-full h-full flex flex-col items-center justify-center border border-dashed border-gray-300"
                          >
                            <Camera className="h-8 w-8 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500">ゴミ袋2中身</span>
                          </button>
                        )}
                      </div>
                      <div className="aspect-square bg-gray-100 rounded overflow-hidden">
                        {trashPhotos.bag2Outside ? (
                          <img
                            src={trashPhotos.bag2Outside || "/placeholder.svg"}
                            alt="ゴミ袋2外観"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <button
                            type="button"
                            onClick={() => addTrashPhoto("bag2Outside")}
                            className="w-full h-full flex flex-col items-center justify-center border border-dashed border-gray-300"
                          >
                            <Camera className="h-8 w-8 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500">ゴミ袋2外観</span>
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="text-xs w-full mt-2">
                      <Info className="h-3 w-3 mr-1" />
                      写真の撮り方ガイド
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">ゴミ写真の撮り方</h4>
                      <p className="text-sm text-gray-600">
                        • 各ゴミ袋につき「中身」と「外観」の2枚の写真が必要です
                        <br />• 中身：ゴミ袋の中身が見えるように上から撮影
                        <br />• 外観：ゴミ袋全体が写るように撮影
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button onClick={() => setStep(3)} disabled={!canProceedToNextStep()} className="w-full">
                  次へ
                </Button>

                {!canProceedToNextStep() && (
                  <p className="text-xs text-amber-600">※ゴミ袋1の中身と外観の写真が必要です</p>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-md flex flex-col items-center justify-center border border-dashed border-gray-300">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">自撮り（任意）</span>
                </div>
                <Textarea placeholder="コメントを入力（任意）" className="resize-none" rows={3} />
                <Button onClick={handleSubmit} className="w-full">
                  レポートを送信
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
