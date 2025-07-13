"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Award, Target, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

type RankingType = "cleaning-count" | "cleaning-area-single" | "cleaning-area-period" | "mission-points"
type Period = "all-time" | string // YYYY-MM format or "all-time"

interface RankingUser {
  id: string
  name: string
  avatar: string
  score: number
  rank: number
  isCurrentUser?: boolean
}

const mockRankingData: Record<RankingType, RankingUser[]> = {
  "cleaning-count": [
    { id: "1", name: "田中太郎", avatar: "/placeholder.svg?height=40&width=40", score: 156, rank: 1 },
    { id: "2", name: "佐藤花子", avatar: "/placeholder.svg?height=40&width=40", score: 142, rank: 2 },
    { id: "3", name: "鈴木一郎", avatar: "/placeholder.svg?height=40&width=40", score: 128, rank: 3 },
    { id: "4", name: "高橋美咲", avatar: "/placeholder.svg?height=40&width=40", score: 115, rank: 4 },
    {
      id: "5",
      name: "山田健太",
      avatar: "/placeholder.svg?height=40&width=40",
      score: 98,
      rank: 5,
      isCurrentUser: true,
    },
    { id: "6", name: "中村由美", avatar: "/placeholder.svg?height=40&width=40", score: 87, rank: 6 },
    { id: "7", name: "小林大輔", avatar: "/placeholder.svg?height=40&width=40", score: 76, rank: 7 },
    { id: "8", name: "加藤麻衣", avatar: "/placeholder.svg?height=40&width=40", score: 65, rank: 8 },
  ],
  "cleaning-area-single": [
    { id: "1", name: "田中太郎", avatar: "/placeholder.svg?height=40&width=40", score: 89, rank: 1 },
    { id: "2", name: "佐藤花子", avatar: "/placeholder.svg?height=40&width=40", score: 76, rank: 2 },
    { id: "3", name: "鈴木一郎", avatar: "/placeholder.svg?height=40&width=40", score: 68, rank: 3 },
    { id: "4", name: "高橋美咲", avatar: "/placeholder.svg?height=40&width=40", score: 54, rank: 4 },
    {
      id: "5",
      name: "山田健太",
      avatar: "/placeholder.svg?height=40&width=40",
      score: 42,
      rank: 5,
      isCurrentUser: true,
    },
  ],
  "cleaning-area-period": [
    { id: "1", name: "佐藤花子", avatar: "/placeholder.svg?height=40&width=40", score: 234, rank: 1 },
    { id: "2", name: "田中太郎", avatar: "/placeholder.svg?height=40&width=40", score: 198, rank: 2 },
    { id: "3", name: "鈴木一郎", avatar: "/placeholder.svg?height=40&width=40", score: 176, rank: 3 },
    {
      id: "4",
      name: "山田健太",
      avatar: "/placeholder.svg?height=40&width=40",
      score: 145,
      rank: 4,
      isCurrentUser: true,
    },
  ],
  "mission-points": [
    { id: "1", name: "高橋美咲", avatar: "/placeholder.svg?height=40&width=40", score: 15600, rank: 1 },
    { id: "2", name: "田中太郎", avatar: "/placeholder.svg?height=40&width=40", score: 12800, rank: 2 },
    { id: "3", name: "佐藤花子", avatar: "/placeholder.svg?height=40&width=40", score: 9400, rank: 3 },
    {
      id: "4",
      name: "山田健太",
      avatar: "/placeholder.svg?height=40&width=40",
      score: 7200,
      rank: 4,
      isCurrentUser: true,
    },
  ],
}

const rankingTypes = [
  {
    id: "cleaning-count" as RankingType,
    name: "清掃回数",
    description: "清掃レポートの投稿回数",
    icon: Trophy,
    unit: "回",
  },
  {
    id: "cleaning-area-single" as RankingType,
    name: "清掃面積",
    description: "写真を撮った延べエリア数",
    icon: Medal,
    unit: "エリア",
  },
  {
    id: "cleaning-area-period" as RankingType,
    name: "清掃範囲",
    description: "写真を撮ったエリア数",
    icon: Award,
    unit: "エリア",
  },
  {
    id: "mission-points" as RankingType,
    name: "ミッション",
    description: "ミッション作成予算",
    icon: Target,
    unit: "pt",
  },
]

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Trophy className="w-5 h-5 text-yellow-500" />
    case 2:
      return <Medal className="w-5 h-5 text-gray-400" />
    case 3:
      return <Award className="w-5 h-5 text-amber-600" />
    default:
      return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-500">{rank}</span>
  }
}

function formatScore(score: number, unit: string) {
  if (unit === "pt") {
    return score.toLocaleString()
  }
  return score.toString()
}

function generateMonthOptions() {
  const options = []
  const currentDate = new Date()

  // 過去24ヶ月分の選択肢を生成
  for (let i = 0; i < 24; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const value = `${year}-${month.toString().padStart(2, "0")}`
    const label = `${year}年${month}月`
    options.push({ value, label })
  }

  return options
}

export default function RankingPage() {
  const [activeType, setActiveType] = useState<RankingType>("cleaning-count")
  const [period, setPeriod] = useState<Period>(() => {
    const now = new Date()
    return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}`
  })

  const currentRanking = mockRankingData[activeType]
  const currentUser = currentRanking.find((user) => user.isCurrentUser)
  const activeTypeInfo = rankingTypes.find((type) => type.id === activeType)!

  const formatPeriodDisplay = (period: Period) => {
    if (period === "all-time") {
      return "全期間"
    }
    const [year, month] = period.split("-")
    return `${year}年${Number.parseInt(month, 10)}月`
  }

  return (
    <div className="ranking-page p-4 pt-8 pb-20">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">ランキング</h1>
      </header>

      {/* 期間フィルター */}
      <div className="flex justify-center mb-6">
        <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
          {period === "all-time" ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const now = new Date()
                  setPeriod(`${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}`)
                }}
                className="flex items-center gap-1 text-gray-600"
              >
                月別表示
              </Button>
              <Button variant="default" size="sm" className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                全期間
              </Button>
            </>
          ) : (
            <>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="bg-white border border-gray-200 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {generateMonthOptions().map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPeriod("all-time")}
                className="flex items-center gap-1"
              >
                <Users className="w-4 h-4" />
                全期間
              </Button>
            </>
          )}
        </div>
      </div>

      {/* ランキング種類タブ */}
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-center text-lg flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            ランキング種類を選択
          </CardTitle>
          <p className="text-center text-sm text-gray-600">競い合いたいカテゴリーを選んでください</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {rankingTypes.map((type) => {
              const Icon = type.icon
              const isActive = activeType === type.id
              return (
                <Button
                  key={type.id}
                  variant="ghost"
                  className={`h-auto p-4 flex flex-col items-center gap-2 rounded-lg border-2 transition-colors ${
                    isActive
                      ? "bg-white text-blue-600 border-blue-300 shadow-md"
                      : "bg-white text-gray-700 border-gray-200"
                  }`}
                  onClick={() => setActiveType(type.id)}
                >
                  <Icon className={`w-6 h-6 ${isActive ? "text-blue-600" : "text-blue-600"}`} />
                  <div className="text-center">
                    <div className={`text-xs font-semibold ${isActive ? "text-blue-600" : "text-gray-800"}`}>
                      {type.name}
                    </div>
                    <div className={`text-xs mt-0.5 ${isActive ? "text-blue-400" : "text-gray-500"}`}>
                      {type.description}
                    </div>
                  </div>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* 現在のランキング情報 */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <activeTypeInfo.icon className="w-5 h-5" />
            {activeTypeInfo.name}
            <Badge variant="secondary" className="ml-auto">
              {formatPeriodDisplay(period)}
            </Badge>
          </CardTitle>
          <p className="text-sm text-gray-600">{activeTypeInfo.description}</p>
        </CardHeader>
      </Card>

      {/* 自分の順位 */}
      {currentUser && (
        <Card className="mb-4 border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {getRankIcon(currentUser.rank)}
                <span className="font-bold text-lg">{currentUser.rank}位</span>
              </div>
              <Avatar className="w-10 h-10">
                <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{currentUser.name}</p>
                <p className="text-sm text-gray-600">あなたの順位</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{formatScore(currentUser.score, activeTypeInfo.unit)}</p>
                <p className="text-xs text-gray-500">{activeTypeInfo.unit}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ランキングリスト */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">ランキング</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {currentRanking.map((user) => (
              <Link key={user.id} href={`/user/${user.id}`} className="block p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 w-12">{getRankIcon(user.rank)}</div>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{user.name}</p>
                    {user.isCurrentUser && (
                      <Badge variant="secondary" className="text-xs">
                        あなた
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{formatScore(user.score, activeTypeInfo.unit)}</p>
                    <p className="text-xs text-gray-500">{activeTypeInfo.unit}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 参加促進メッセージ */}
      <Card className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardContent className="p-4 text-center">
          <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <h3 className="font-bold mb-1">ランキング上位を目指そう！</h3>
          <p className="text-sm text-gray-600 mb-3">
            清掃活動やミッション作成でポイントを獲得して、ランキング上位を目指しましょう。
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
