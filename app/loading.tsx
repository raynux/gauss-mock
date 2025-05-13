"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      // 読み込みが完了したらプログレスを100%にする
      setProgress(100)
    }, 1500)

    // プログレスバーのアニメーション
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 10
        const newProgress = Math.min(prev + increment, 99)
        return newProgress
      })
    }, 200)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <div className="w-40 h-40 mb-8 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full rounded-full border-4 border-t-transparent border-green-500 animate-spin"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center p-2">
          <Image
            src="/mego-logo.webp"
            alt="MeGo Logo"
            width={160}
            height={160}
            className="w-full h-full object-contain"
            priority
          />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-2">MeGo</h1>
      <p className="text-gray-600 mb-6">地域の清掃活動を支援するアプリ</p>

      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-gray-500">読み込み中...</p>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="flex space-x-1">
          <span
            className="block w-3 h-3 bg-green-200 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></span>
          <span
            className="block w-3 h-3 bg-green-300 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></span>
          <span
            className="block w-3 h-3 bg-green-400 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></span>
          <span
            className="block w-3 h-3 bg-green-500 rounded-full animate-bounce"
            style={{ animationDelay: "450ms" }}
          ></span>
        </div>
      </div>
    </div>
  )
}
