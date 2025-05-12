import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "投稿 - MeGo",
  description: "MeGoアプリで新しい活動を投稿",
}

export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
