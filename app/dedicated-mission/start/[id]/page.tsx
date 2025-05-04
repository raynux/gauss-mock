"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Camera, CheckCircle, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Stepper, Step } from "@/components/stepper"

export default function StartDedicatedMissionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [photos, setPhotos] = useState<string[]>([])
  const [isCompleted, setIsCompleted] = useState(false)

  // 写真を追加
  const addPhoto = () => {
    const newPhoto = `/placeholder.svg?height=200&width=200&text=写真${photos.length + 1}`
    setPhotos([...photos, newPhoto])
  }

  // 次のステップに進む
  const nextStep = () => {
    if (step < 2) {
      setStep(step + 1)
    } else {
      setIsCompleted(true)
    }
  }

  // ミッション完了
  const completeMission = () => {
    router.push("/dedicated-mission/my-reservations")
  }

  return (
    <div className="start-dedicated-mission pb-6">
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
        <Link href="/dedicated-mission/my-reservations" className="absolute top-4 left-4 bg-black/30 rounded-full p-2">
          <ArrowLeft className="h-6 w-6 text-white" />
        </Link>
      </div>

      <div className="p-4">
        {!isCompleted ? (
          <>
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">ミッション進行状況</CardTitle>
              </CardHeader>
              <CardContent>
                <Stepper activeStep={step} className="mb-6">
                  <Step title="開始前" />
                  <Step title="清掃中" />
                  <Step title="完了" />
                </Stepper>

                <div className="space-y-4">
                  {step === 0 && (
                    <div>
                      <h3 className="font-medium mb-2">作業を開始する前に</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        清掃を始める前に、現在の状態を写真に撮ってください。これは作業前後の比較のために重要です。
                      </p>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {photos.map((photo, index) => (
                          <div key={index} className="aspect-square bg-gray-100 rounded overflow-hidden">
                            <img
                              src={photo || "/placeholder.svg"}
                              alt={`写真 ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        {photos.length < 2 && (
                          <button
                            onClick={addPhoto}
                            className="aspect-square bg-gray-100 rounded-md flex flex-col items-center justify-center border border-dashed border-gray-300"
                          >
                            <Camera className="h-8 w-8 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500">写真を追加</span>
                          </button>
                        )}
                      </div>
                      <Button className="w-full" disabled={photos.length === 0} onClick={nextStep}>
                        清掃を開始する
                      </Button>
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <h3 className="font-medium mb-2">清掃手順</h3>
                      <ol className="list-decimal pl-5 text-sm text-gray-600 space-y-2 mb-4">
                        <li>灰皿内のタバコの吸い殻を専用のゴミ箱に捨ててください</li>
                        <li>灰皿を水で洗い、乾いた布で拭いてください</li>
                        <li>喫煙所周辺のゴミを拾い、ゴミ箱に捨ててください</li>
                        <li>床面を掃き掃除してください</li>
                      </ol>
                      <div className="flex justify-center mb-4">
                        <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span className="text-sm">残り時間: 10:23</span>
                        </div>
                      </div>
                      <Button className="w-full" onClick={nextStep}>
                        清掃完了
                      </Button>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h3 className="font-medium mb-2">清掃後の写真</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        清掃後の状態を写真に撮ってください。清掃前と同じアングルで撮影すると比較しやすくなります。
                      </p>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {photos.length > 2
                          ? photos.slice(2).map((photo, index) => (
                              <div key={index} className="aspect-square bg-gray-100 rounded overflow-hidden">
                                <img
                                  src={photo || "/placeholder.svg"}
                                  alt={`写真 ${index + 3}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))
                          : null}
                        {photos.length < 4 && (
                          <button
                            onClick={addPhoto}
                            className="aspect-square bg-gray-100 rounded-md flex flex-col items-center justify-center border border-dashed border-gray-300"
                          >
                            <Camera className="h-8 w-8 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500">写真を追加</span>
                          </button>
                        )}
                      </div>
                      <Button className="w-full" disabled={photos.length < 3} onClick={nextStep}>
                        ミッション完了
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">ミッション詳細</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>東京都世田谷区北沢2丁目</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="mr-2 text-gray-500">予約時間: 2025-05-04 20:15</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">ミッション完了</h2>
              <p className="text-gray-600 mb-6">
                お疲れ様でした！清掃活動が完了しました。
                <br />
                報酬は審査後、約1週間以内に付与されます。
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-500">固定報酬</p>
                <p className="text-2xl font-bold text-green-600">1,000 pt</p>
              </div>
              <Button className="w-full" onClick={completeMission}>
                マイページに戻る
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
