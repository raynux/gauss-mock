import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BadgeCheck, CreditCard, Edit, LogOut, Plus, Users, Calendar, Award } from "lucide-react"
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
        <Link href="/profile/edit" className="ml-auto">
          <Button variant="ghost" size="icon">
            <Edit className="h-5 w-5" />
          </Button>
        </Link>
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
              <Link href="/profile/points/exchange">
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
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-teal-100 rounded-full p-2 mr-3 flex items-center justify-center w-10 h-10">
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
                  className="text-teal-600"
                >
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">報酬分配</h3>
                <p className="text-sm text-gray-600">2件の新しい分配案があります</p>
              </div>
            </div>
            <Link href="/profile/my-missions/rewards">
              <Button variant="outline" size="sm" className="border-teal-200 hover:border-teal-300 hover:bg-teal-50">
                確認する
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 予約済みミッションへの導線を追加 */}
      <Card className="mb-6 bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-teal-100 rounded-full p-2 mr-3 flex items-center justify-center w-10 h-10">
                <Calendar className="h-6 w-6 text-teal-600" />
              </div>
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
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 1, name: "清掃マスター", earned: true },
              { id: 2, name: "エリアレポーター", earned: true },
              { id: 3, name: "チームプレイヤー", earned: true },
              { id: 4, name: "初心者", earned: true },
              { id: 5, name: "継続者", earned: true },
              { id: 6, name: "地域貢献者", earned: false },
              { id: 7, name: "環境守護者", earned: false },
              { id: 8, name: "コミュニティリーダー", earned: false },
              { id: 9, name: "写真家", earned: false },
              { id: 10, name: "早起き清掃員", earned: false },
              { id: 11, name: "夜間パトロール", earned: false },
              { id: 12, name: "季節の清掃員", earned: false },
              { id: 13, name: "ベテラン", earned: false },
              { id: 14, name: "プラチナ会員", earned: false },
              { id: 15, name: "レジェンド", earned: false },
            ]
              .filter((badge) => badge.earned)
              .slice(0, 8)
              .map((badge) => (
                <Link href={`/profile/badges/${badge.id}`} key={badge.id} className="block">
                  <div className="flex flex-col items-center p-2 rounded-md hover:bg-gray-50 transition-colors">
                    <div
                      className={`w-16 h-16 rounded-md flex items-center justify-center ${
                        badge.earned ? "bg-gray-200" : "bg-gray-100 border border-dashed border-gray-300"
                      }`}
                    >
                      {badge.earned ? (
                        <BadgeCheck
                          className={`h-8 w-8 ${
                            badge.id === 1
                              ? "text-green-500"
                              : badge.id === 2
                                ? "text-teal-500"
                                : badge.id === 3
                                  ? "text-orange-500"
                                  : badge.id === 4
                                    ? "text-blue-500"
                                    : "text-purple-500"
                          }`}
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">未獲得</span>
                      )}
                    </div>
                    <span className="text-xs text-center font-medium line-clamp-2 mt-1">{badge.name}</span>
                  </div>
                </Link>
              ))}
          </div>
          <div className="mt-3 text-center">
            <Link href="/profile/badges" className="text-sm text-blue-600 hover:text-blue-800">
              すべて見る
            </Link>
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
            投稿実績
          </Button>
        </Link>
        <Link href="/profile/my-missions">
          <Button variant="outline" className="w-full justify-start py-6">
            <Award className="mr-2 h-5 w-5" />
            自分のミッション
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
