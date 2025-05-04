import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BadgeCheck, CreditCard, Edit, LogOut, Plus, Users, Calendar } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  return (
    <div className="profile-page p-4 pt-8 pb-16">
      <header className="flex items-center mb-6">
        <Avatar className="h-16 w-16 mr-4">
          <AvatarImage src="/placeholder.svg?height=64&width=64" alt="ユーザーアバター" />
          <AvatarFallback>ユ</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-xl font-bold">ユーザーさん</h1>
          <p className="text-gray-500 text-sm">東京都渋谷区</p>
        </div>
        <Button variant="ghost" size="icon" className="ml-auto">
          <Edit className="h-5 w-5" />
        </Button>
      </header>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            ウォレット
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-4 text-white">
            <div className="mb-4">
              <p className="text-sm opacity-80">現在の残高</p>
              <p className="text-3xl font-bold">1,250 pt</p>
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white/20 bg-white/10 hover:bg-white/20 hover:text-white flex items-center"
              >
                <Plus className="mr-1 h-4 w-4" />
                ポイント購入
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:from-teal-600 hover:to-emerald-600 flex items-center"
              >
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
                  className="mr-1 h-4 w-4"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                ポイント交換
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 予約済みミッションへの導線を追加 */}
      <Card className="mb-6 bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-teal-600 mr-3" />
              <div>
                <h3 className="font-medium">予約済みミッション</h3>
                <p className="text-sm text-gray-600">2件の予約があります</p>
              </div>
            </div>
            <Link href="/dedicated-mission/my-reservations" prefetch={false}>
              <Button variant="outline" size="sm" className="border-teal-200 hover:border-teal-300 hover:bg-teal-50">
                確認する
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <BadgeCheck className="w-5 h-5 mr-2" />
            バッジコレクション
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className={`aspect-square rounded-md flex items-center justify-center ${i <= 3 ? "bg-gray-200" : "bg-gray-100 border border-dashed border-gray-300"}`}
              >
                {i <= 3 ? (
                  <BadgeCheck
                    className={`h-8 w-8 ${i === 1 ? "text-green-500" : i === 2 ? "text-teal-500" : "text-orange-500"}`}
                  />
                ) : (
                  <span className="text-gray-400 text-xs">未獲得</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Link href="/profile/edit">
          <Button variant="outline" className="w-full justify-start py-6">
            <Edit className="mr-2 h-5 w-5" />
            プロフィール編集
          </Button>
        </Link>
        <Link href="/profile/groups">
          <Button variant="outline" className="w-full justify-start py-6">
            <Users className="mr-2 h-5 w-5" />
            グループ設定
          </Button>
        </Link>
        <Link href="/profile/achievements">
          <Button variant="outline" className="w-full justify-start py-6">
            <BadgeCheck className="mr-2 h-5 w-5" />
            実績
          </Button>
        </Link>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/auth/signout"
          className="text-gray-500 text-sm flex items-center justify-center hover:text-gray-700"
        >
          <LogOut className="h-4 w-4 mr-1" />
          サインアウト
        </Link>
      </div>
    </div>
  )
}
