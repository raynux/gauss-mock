import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import BottomNavigation from "@/components/bottom-navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MeGo - ゴミ拾い支援アプリ",
  description: "地域の清掃活動を支援するアプリ",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-50`}>
        <div className="mx-auto max-w-md h-[844px] overflow-hidden relative bg-white">
          <main className="pb-16 h-full overflow-auto">{children}</main>
          <BottomNavigation />
        </div>
      </body>
    </html>
  )
}
