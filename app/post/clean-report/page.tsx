"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, ArrowLeft, Info, Plus, Camera, Clock, Ruler, MapPin, X, Navigation } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { Stepper, Step } from "@/components/stepper"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function CleanReportPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(0)
  const [startPhoto, setStartPhoto] = useState<string | null>(null)
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
  const [selfiePhoto, setSelfiePhoto] = useState<string | null>(null)
  const [cleaningTime, setCleaningTime] = useState("00:00:00")
  const [distance, setDistance] = useState("0m")
  const [comment, setComment] = useState("")
  const [showLocationDrawer, setShowLocationDrawer] = useState(false)

  // スタート地点の写真を追加
  const addStartPhoto = () => {
    const newPhoto = `/placeholder.svg?height=200&width=200&text=スタート地点`
    setStartPhoto(newPhoto)
  }

  // 清掃中の写真を追加
  const addCleaningPhoto = () => {
    const newPhoto = `/placeholder.svg?height=200&width=200&text=清掃写真${cleaningPhotos.length + 1}`
    setCleaningPhotos([...cleaningPhotos, newPhoto])
  }

  // 自撮り写真を追加
  const addSelfiePhoto = () => {
    const newPhoto = `/placeholder.svg?height=200&width=200&text=自撮り`
    setSelfiePhoto(newPhoto)
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
        return "清掃を始める場所の写真を撮影します"
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
    if (step === 0) {
      return !!startPhoto
    } else if (step === 2) {
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
        <div className="ml-auto flex items-center">
          <div className="flex items-center text-xs text-gray-400 mr-3">
            <Clock className="h-3 w-3 mr-1" />
            <span className="font-mono mr-2">{cleaningTime}</span>
            <Ruler className="h-3 w-3 mr-1" />
            <span>{distance}</span>
          </div>
          <button
            type="button"
            onClick={() => setShowLocationDrawer(true)}
            className="flex items-center px-2 py-1 bg-gray-100 border border-gray-200 rounded-md hover:bg-gray-200"
            aria-label="位置情報を表示"
          >
            <MapPin className="h-4 w-4 mr-1 text-blue-600" />
            <span className="text-xs">地図で確認</span>
          </button>
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
                <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                  {startPhoto ? (
                    <img
                      src={startPhoto || "/placeholder.svg"}
                      alt="スタート地点"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={addStartPhoto}
                      className="w-full h-full flex flex-col items-center justify-center border border-dashed border-gray-300"
                    >
                      <Camera className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">スタート地点の写真を撮影</span>
                    </button>
                  )}
                </div>
                <Button onClick={() => setStep(1)} disabled={!canProceedToNextStep()} className="w-full">
                  清掃活動開始
                </Button>
                {!canProceedToNextStep() && <p className="text-xs text-amber-600">※スタート地点の写真が必要です</p>}
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
                <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                  {selfiePhoto ? (
                    <img src={selfiePhoto || "/placeholder.svg"} alt="自撮り" className="w-full h-full object-cover" />
                  ) : (
                    <button
                      type="button"
                      onClick={addSelfiePhoto}
                      className="w-full h-full flex flex-col items-center justify-center border border-dashed border-gray-300"
                    >
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">自撮り（必須）</span>
                    </button>
                  )}
                </div>
                <Textarea
                  placeholder="コメントを入力（任意）"
                  className="resize-none"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    console.log("送信ボタンがクリックされました")
                    if (selfiePhoto) {
                      console.log("thank you ページに遷移します")
                      window.location.href = "/post/clean-report/thank-you"
                    } else {
                      toast({
                        title: "エラー",
                        description: "自撮り写真は必須です",
                        variant: "destructive",
                      })
                    }
                  }}
                  disabled={!selfiePhoto}
                  className="w-full"
                >
                  レポートを送信
                </Button>
                {!selfiePhoto && <p className="text-xs text-amber-600">※自撮り写真は必須です</p>}
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* 位置情報ドロワー */}
      {showLocationDrawer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col justify-end">
          <div className="bg-white rounded-t-xl p-4 max-h-[80vh] overflow-y-auto w-full max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">位置情報</h3>
              <button
                type="button"
                onClick={() => setShowLocationDrawer(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4">
              <div className="relative h-64 bg-gray-100 rounded-md overflow-hidden mb-2">
                <img
                  src="/placeholder.svg?height=400&width=600&text=Map"
                  alt="地図"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="h-4 w-4 bg-red-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
                  <Navigation className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <p className="text-sm text-gray-500 text-center">東京都渋谷区 付近</p>
            </div>

            <h4 className="text-sm font-medium mb-2">撮影場所</h4>
            <ul className="space-y-3">
              {startPhoto && (
                <li className="flex items-center p-3 bg-gray-50 rounded-md">
                  <div className="h-12 w-12 bg-gray-200 rounded-md overflow-hidden mr-3">
                    <img
                      src={startPhoto || "/placeholder.svg"}
                      alt="スタート地点"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">スタート地点</p>
                    <p className="text-xs text-gray-500">渋谷区宮益坂 / 10:30</p>
                  </div>
                </li>
              )}

              {cleaningPhotos.length > 0 && (
                <li className="flex items-center p-3 bg-gray-50 rounded-md">
                  <div className="h-12 w-12 bg-gray-200 rounded-md overflow-hidden mr-3">
                    <img
                      src={cleaningPhotos[0] || "/placeholder.svg"}
                      alt="清掃写真"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">清掃活動</p>
                    <p className="text-xs text-gray-500">渋谷区道玄坂 / 10:45</p>
                  </div>
                </li>
              )}

              {trashPhotos.bag1Inside && (
                <li className="flex items-center p-3 bg-gray-50 rounded-md">
                  <div className="h-12 w-12 bg-gray-200 rounded-md overflow-hidden mr-3">
                    <img
                      src={trashPhotos.bag1Inside || "/placeholder.svg"}
                      alt="ゴミ袋"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">ゴミ回収</p>
                    <p className="text-xs text-gray-500">渋谷区神南 / 11:15</p>
                  </div>
                </li>
              )}
            </ul>

            <Button variant="outline" className="w-full mt-4" onClick={() => setShowLocationDrawer(false)}>
              閉じる
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
