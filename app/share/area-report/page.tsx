"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ImageIcon, LinkIcon, AlertTriangle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

export default function AreaReportSharePage() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  // URLをコピーする関数
  const copyUrl = () => {
    navigator.clipboard.writeText("https://app.mego.work/share/area-report/12345")
    setCopied(true)
    toast({
      title: "URLをコピーしました",
      duration: 2000,
    })
    setTimeout(() => setCopied(false), 2000)
  }

  // 画像を保存する関数
  const saveImage = () => {
    toast({
      title: "画像を保存しました",
      duration: 2000,
    })
  }

  return (
    <div className="p-4 pt-8 h-full flex flex-col">
      <div className="flex items-center mb-6">
        <Link href="/post/area-report/thank-you" className="mr-2">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">SNSでシェア</h1>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden mb-4">
          <Image
            src="/placeholder.svg?key=k6kih&height=300&width=400&text=エリア写真"
            width={400}
            height={300}
            alt="エリアレポート写真"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
                <Image
                  src="/placeholder.svg?height=40&width=40&text=MeGo"
                  width={40}
                  height={40}
                  alt="MeGo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">MeGo</span>
                  <span className="text-xs">2025.05.04</span>
                </div>
                <div className="text-xs mt-0.5">東京都世田谷区北沢2丁目</div>
                <div className="text-xs mt-0.5 flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1 text-amber-400" />
                  <span>汚染レベル: 1, 概ねきれい</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 mt-2">
          <Button
            variant="outline"
            className="w-full justify-between py-6"
            onClick={() => (window.location.href = "/share/area-report/social-share")}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </div>
              <span>で活動内容をシェアする</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-between py-6"
            onClick={() => (window.location.href = "/share/area-report/social-share")}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </div>
              <span>で活動内容をシェアする</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>

          <Button variant="outline" className="w-full justify-between py-6" onClick={copyUrl}>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <LinkIcon className="h-4 w-4 text-gray-700" />
              </div>
              <span>URLをコピー</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>

          <Button variant="outline" className="w-full justify-between py-6" onClick={saveImage}>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <ImageIcon className="h-4 w-4 text-gray-700" />
              </div>
              <span>サムネイル画像を保存</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>
        </div>

        <div className="mt-auto pt-4">
          <Link href="/">
            <Button variant="default" className="w-full">
              トップにもどる
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
