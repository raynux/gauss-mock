"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function Loading() {
  const [progress, setProgress] = useState(0)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100)
    }, 2000)

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return prevProgress + 5
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border-4 border-green-500 border-t-transparent animate-spin"></div>
        </div>

        {imageError ? (
          <div className="w-28 h-28 rounded-full bg-blue-900 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">MeGo</span>
          </div>
        ) : (
          <Image
            src="/placeholder.svg?height=112&width=112&text=MeGo"
            width={112}
            height={112}
            alt="MeGo Logo"
            className="w-28 h-28 rounded-full filter brightness-90 opacity-85"
            onError={() => setImageError(true)}
            priority
          />
        )}
      </div>

      <h1 className="text-2xl font-bold text-blue-900 mb-2">MeGo</h1>
      <p className="text-blue-700 mb-8">環境保護活動をもっと身近に</p>

      <div className="w-64 h-2 bg-blue-100 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-blue-600 mb-8">読み込み中...</p>

      <div className="flex space-x-2">
        <div className="w-2 h-2 rounded-full bg-blue-200 animate-bounce" style={{ animationDelay: "0ms" }}></div>
        <div className="w-2 h-2 rounded-full bg-blue-300 animate-bounce" style={{ animationDelay: "150ms" }}></div>
        <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
        <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: "450ms" }}></div>
      </div>
    </div>
  )
}
