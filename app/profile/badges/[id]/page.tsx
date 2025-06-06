"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Award, Target, Users } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

export default function BadgeDetailPage({ params }: { params: { id: string } }) {
  const badgeId = Number.parseInt(params.id)

  // バッジデータ（実際のアプリではAPIから取得）
  const badges = {
    1: {
      id: 1,
      name: "清掃マスター",
      icon: "🏆",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      description: "50回以上の清掃活動に参加した証",
      requirement: "清掃レポートを50回投稿する",
      progress: 32,
      maxProgress: 50,
      earnedDate: null,
      category: "清掃活動",
      rarity: "レア",
      benefits: ["特別なプロフィールバッジ表示", "清掃活動での報酬10%アップ", "限定ミッションへの参加権"],
    },
    2: {
      id: 2,
      name: "エリアレポーター",
      icon: "📍",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      description: "100件以上のエリアレポートを投稿した証",
      requirement: "エリアレポートを100回投稿する",
      progress: 67,
      maxProgress: 100,
      earnedDate: null,
      category: "レポート活動",
      rarity: "エピック",
      benefits: ["エリアレポート投稿時のポイント2倍", "優先的な問題解決対応", "地域改善提案権"],
    },
    3: {
      id: 3,
      name: "チームプレイヤー",
      icon: "👥",
      color: "text-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      description: "5つ以上のグループ活動に参加した証",
      requirement: "グループ活動に5回参加する",
      progress: 2,
      maxProgress: 5,
      earnedDate: null,
      category: "コミュニティ",
      rarity: "コモン",
      benefits: ["グループ活動での追加ポイント", "チームリーダー推薦権", "グループ限定イベント参加権"],
    },
  }

  const badge = badges[badgeId as keyof typeof badges]

  if (!badge) {
    return (
      <div className="p-4 pt-8">
        <div className="flex items-center mb-4">
          <Link href="/profile" className="mr-2">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-bold">バッジが見つかりません</h1>
        </div>
      </div>
    )
  }

  const progressPercentage = (badge.progress / badge.maxProgress) * 100
  const isEarned = badge.earnedDate !== null

  return (
    <div className="badge-detail p-4 pt-8 pb-20">
      <header className="flex items-center mb-6">
        <Link href="/profile" className="mr-2">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold">バッジ詳細</h1>
      </header>

      {/* バッジ情報カード */}
      <Card className={`mb-6 ${badge.bgColor} ${badge.borderColor} border-2`}>
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <div
              className={`w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg ${isEarned ? "" : "grayscale opacity-50"}`}
            >
              <span className={`text-5xl ${badge.color}`}>{badge.icon}</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-2">{badge.name}</h2>
          <p className="text-gray-600 mb-4">{badge.description}</p>

          <div className="flex justify-center space-x-4 text-sm">
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-1 text-gray-500" />
              <span>{badge.rarity}</span>
            </div>
            <div className="flex items-center">
              <Target className="w-4 h-4 mr-1 text-gray-500" />
              <span>{badge.category}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 進捗状況 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Target className="w-5 h-5 mr-2" />
            進捗状況
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEarned ? (
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="w-4 h-4 mr-2 text-green-600" />
                <span className="text-green-600 font-medium">獲得済み</span>
              </div>
              <p className="text-sm text-gray-500">獲得日: {badge.earnedDate}</p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">達成条件</span>
                <span className="text-sm text-gray-500">
                  {badge.progress} / {badge.maxProgress}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3 mb-2" />
              <p className="text-sm text-gray-600">{badge.requirement}</p>
              <p className="text-xs text-gray-500 mt-2">あと{badge.maxProgress - badge.progress}回で獲得できます！</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 特典 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Award className="w-5 h-5 mr-2" />
            バッジ特典
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {badge.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* 関連バッジ */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Users className="w-5 h-5 mr-2" />
            関連バッジ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {Object.values(badges)
              .filter((b) => b.id !== badgeId && b.category === badge.category)
              .map((relatedBadge) => (
                <Link href={`/profile/badges/${relatedBadge.id}`} key={relatedBadge.id}>
                  <div className="flex flex-col items-center p-2 rounded-md hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                      <span className={`text-2xl ${relatedBadge.color}`}>{relatedBadge.icon}</span>
                    </div>
                    <span className="text-xs text-center font-medium line-clamp-2">{relatedBadge.name}</span>
                  </div>
                </Link>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
