"use client"

import { useState, useEffect } from "react"
import Loading from "@/app/loading"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TestLoadingPage() {
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen">
      {showLoading ? (
        <Loading />
      ) : (
        <div className="p-8 flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold mb-6">ローディング画面テスト</h1>
          <p className="mb-8 text-center">
            ローディング画面の表示が完了しました。
            <br />
            下のボタンを使って再度ローディング画面を確認できます。
          </p>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <Button onClick={() => setShowLoading(true)}>ローディング画面を再表示</Button>
            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full">
                ホームに戻る
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
