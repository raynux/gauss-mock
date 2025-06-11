"use client"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Sparkles, MapPinned, ClipboardCheck, PiggyBank, HandHeart } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BadgesPage() {
  // バッジデータ（実際のアプリではAPIから取得）
  const badges = [
    {
      id: 1,
      name: "清掃マスター",
      icon: Sparkles,
      description: "50回以上の清掃活動に参加した証",
      progress: 32,
      maxProgress: 50,
      earnedDate: null,
      category: "清掃活動",
      rarity: "レア",
      chipColor: "rgb(130,184,255)",
      iconColor: "rgb(130,184,255)",
      iconBgColor: "rgba(130,184,255,0.1)",
    },
    {
      id: 2,
      name: "エリアレポーター",
      icon: MapPinned,
      description: "100件以上のエリアレポートを投稿した証",
      progress: 67,
      maxProgress: 100,
      earnedDate: null,
      category: "レポート活動",
      rarity: "エピック",
      chipColor: "rgb(102,205,10)",
      iconColor: "rgb(102,205,10)",
      iconBgColor: "rgba(102,205,10,0.1)",
    },
    {
      id: 3,
      name: "チームプレイヤー",
      icon: ClipboardCheck,
      description: "5つ以上のグループ活動に参加した証",
      progress: 2,
      maxProgress: 5,
      earnedDate: null,
      category: "コミュニティ",
      rarity: "コモン",
      chipColor: "rgb(192,192,192)",
      iconColor: "rgb(192,192,192)",
      iconBgColor: "rgba(192,192,192,0.1)",
    },
    {
      id: 4,
      name: "初心者",
      icon: PiggyBank,
      description: "初回の清掃活動に参加した証",
      progress: 1,
      maxProgress: 1,
      earnedDate: "2025年4月15日",
      category: "清掃活動",
      rarity: "コモン",
      chipColor: "rgb(192,192,192)",
      iconColor: "rgb(192,192,192)",
      iconBgColor: "rgba(192,192,192,0.1)",
    },
    {
      id: 5,
      name: "継続者",
      icon: HandHeart,
      description: "7日連続で活動に参加した証",
      progress: 7,
      maxProgress: 7,
      earnedDate: "2025年4月22日",
      category: "継続活動",
      rarity: "アンコモン",
      chipColor: "rgb(205,127,50)",
      iconColor: "rgb(205,127,50)",
      iconBgColor: "rgba(205,127,50,0.1)",
    },
    {
      id: 6,
      name: "地域貢献者",
      icon: Sparkles,
      description: "地域の環境改善に大きく貢献した証",
      progress: 15,
      maxProgress: 20,
      earnedDate: null,
      category: "コミュニティ",
      rarity: "レア",
      chipColor: "rgb(130,184,255)",
      iconColor: "rgb(130,184,255)",
      iconBgColor: "rgba(130,184,255,0.1)",
    },
  ]

  const earnedBadges = badges.filter((badge) => badge.earnedDate !== null)
  const inProgressBadges = badges.filter((badge) => badge.earnedDate === null)

  return (
    <div className="badges-page p-4 pt-8 pb-20">
      <header className="flex items-center mb-6">
        <Link href="/profile" className="mr-2">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold">バッジコレクション</h1>
      </header>

      {/* 統計情報 */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-blue-400">{earnedBadges.length}</div>
            <div className="text-xs text-gray-500">獲得済み</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-purple-400">{inProgressBadges.length}</div>
            <div className="text-xs text-gray-500">進行中</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-gray-600">{badges.length}</div>
            <div className="text-xs text-gray-500">すべて</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="progress" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="progress">進行中</TabsTrigger>
          <TabsTrigger value="earned">獲得済み</TabsTrigger>
          <TabsTrigger value="all">すべて</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {badges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </TabsContent>

        <TabsContent value="earned" className="space-y-4">
          {earnedBadges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          {inProgressBadges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function BadgeCard({ badge }: { badge: any }) {
  const isEarned = badge.earnedDate !== null
  const progressPercentage = (badge.progress / badge.maxProgress) * 100
  const IconComponent = badge.icon

  return (
    <Link href={`/profile/badges/${badge.id}`}>
      <Card className={`hover:shadow-md transition-shadow mb-4`}>
        <CardContent className="p-4">
          <div className="flex items-center">
            <div
              className={`w-16 h-16 rounded-full border-2 flex items-center justify-center mr-4 ${isEarned ? "" : "grayscale opacity-50"}`}
              style={{
                backgroundColor: isEarned ? badge.iconBgColor : "rgba(229, 231, 235, 0.1)",
                borderColor: isEarned ? badge.iconColor : "rgb(229, 231, 235)",
              }}
            >
              <IconComponent className="w-8 h-8" style={{ color: isEarned ? badge.iconColor : "rgb(156, 163, 175)" }} />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-lg">{badge.name}</h3>
                <span
                  className="text-xs px-2 py-1 rounded-full text-white"
                  style={{ backgroundColor: badge.chipColor }}
                >
                  {badge.rarity}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-2">{badge.description}</p>

              {isEarned ? (
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>獲得日: {badge.earnedDate}</span>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span></span>
                    <span>
                      {badge.progress} / {badge.maxProgress}
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
