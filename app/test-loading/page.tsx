"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import LoadingScreen from "../loading"
import Link from "next/link"

export default function TestLoadingPage() {
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    // 5秒後にローディング画面を非表示にする
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center">
      {showLoading && <LoadingScreen />}

      <h1 className="text-2xl font-bold mb-6">ローディング画面テスト</h1>
      <p className="mb-8 text-gray-600 text-center max-w-md">
        このページではMeGoアプリのローディング画面をテストできます。
        「ローディング画面を再表示」ボタンをクリックすると、ローディング画面が表示されます。
      </p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button onClick={() => setShowLoading(true)} className="w-full">
          ローディング画面を再表示
        </Button>

        <Link href="/" className="w-full">
          <Button variant="outline" className="w-full">
            ホームに戻る
          </Button>
        </Link>
      </div>
    </div>
  )
}
