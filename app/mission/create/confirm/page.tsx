"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, X } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export default function MissionConfirmPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ミッション作成処理
  const handleCreateMission = () => {
    setIsSubmitting(true)

    // 実際のアプリではAPIリクエストを送信
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/mission/create/complete")
    }, 1500)
  }

  return (
    <div className="h-full flex flex-col">
      {/* ヘッダー */}
      <div className="p-4 flex items-center justify-between border-b bg-white">
        <div className="flex items-center">
          <button onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-xl font-bold">内容確認</h1>
            <p className="text-sm text-gray-500">以下の内容でミッションを作成します</p>
          </div>
        </div>
        <button onClick={() => router.push("/")}>
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* 確認内容 */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-6">
          <h2 className="text-xl font-medium">東京都世田谷区北沢</h2>

          {/* 地図表示 */}
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=200&width=390&text=地図"
              alt="選択エリアの地図"
              width={390}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 設定内容 */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-500">支援するポイント</h3>
              <p className="text-2xl font-bold">
                300 <span className="text-base font-normal">pt</span>
              </p>
            </div>

            <div>
              <h3 className="text-sm text-gray-500">1週間に使うポイントの上限</h3>
              <p className="text-2xl font-bold">
                200 <span className="text-base font-normal">pt</span>
              </p>
            </div>

            <div>
              <h3 className="text-sm text-gray-500">1人あたりの最大報酬</h3>
              <p className="text-2xl font-bold">
                50 <span className="text-base font-normal">pt</span>
              </p>
            </div>

            {/* 参考写真 */}
            <div>
              <h3 className="text-sm text-gray-500 mb-2">参考写真</h3>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=150&width=300&text=参考写真"
                  alt="参考写真"
                  width={300}
                  height={150}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* 非公開メッセージ */}
            <div>
              <h3 className="text-sm text-gray-500 mb-2">清掃した人へのメッセージ（非公開）</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <div className="flex items-start">
                  <div className="bg-gray-200 p-1 rounded-full mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-500"
                    >
                      <path d="M18 8a6 6 0 0 0-6-6 6 6 0 0 0-6 6v12l6-3 6 3V8z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      ありがとうございます！特に気になる場所があれば教えてください。
                    </p>
                    <p className="text-xs text-gray-500 mt-1">※このメッセージは清掃を行った人だけに表示されます</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 利用規約 */}
          <div className="text-xs text-gray-500 mt-4">
            <p>
              このサイトはreCAPTCHAによって保護されており、Googleの
              <Link href="#" className="text-blue-500">
                プライバシーポリシー
              </Link>
              と
              <Link href="#" className="text-blue-500">
                利用規約
              </Link>
              が適用されます。
            </p>
          </div>
        </div>
      </div>

      {/* 下部ボタン */}
      <div className="p-4 border-t bg-white">
        <Button onClick={handleCreateMission} disabled={isSubmitting} className="w-full">
          {isSubmitting ? "作成中..." : "ミッションを作成"}
        </Button>
      </div>
    </div>
  )
}
