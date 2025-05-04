"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignOutPage() {
  const router = useRouter()

  const handleSignOut = () => {
    // ここに実際のサインアウト処理を実装
    // 例: サーバーにリクエストを送信してセッションを終了するなど

    // サインアウト後はホームページにリダイレクト
    router.push("/")
  }

  return (
    <div className="flex items-center justify-center h-full p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">サインアウト</CardTitle>
          <CardDescription>アカウントからサインアウトしますか？</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <LogOut className="h-16 w-16 text-gray-400" />
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button onClick={handleSignOut} className="w-full">
            サインアウトする
          </Button>
          <Link href="/profile" className="w-full">
            <Button variant="outline" className="w-full">
              キャンセル
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
