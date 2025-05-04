"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Trash2,
  BadgeCheck,
  Users,
  Clock,
  DollarSign,
  AlertTriangle,
  ExternalLink,
  Twitter,
  Instagram,
  Facebook,
  Globe,
  Shield,
  Award,
  Star,
  Calendar,
  MapPinned,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// 汚染レベルを表示するバッジコンポーネント
function PollutionLevelBadge({ level }: { level: number }) {
  const getLevelInfo = (level: number) => {
    switch (level) {
      case 1:
        return { label: "きれい", color: "bg-green-100 text-green-700 border-green-200" }
      case 2:
        return { label: "概ねきれい", color: "bg-teal-100 text-teal-700 border-teal-200" }
      case 3:
        return { label: "やや汚れている", color: "bg-amber-100 text-amber-700 border-amber-200" }
      case 4:
        return { label: "汚れている", color: "bg-red-100 text-red-700 border-red-200" }
      default:
        return { label: "不明", color: "bg-gray-100 text-gray-700 border-gray-200" }
    }
  }

  const { label, color } = getLevelInfo(level)

  return (
    <div className={`flex items-center text-xs px-2 py-1 rounded-full ${color}`}>
      <AlertTriangle className="w-3 h-3 mr-1" />
      <span>汚染レベル: {level}</span>
    </div>
  )
}

// バッジコンポーネント
function UserBadge({
  icon,
  name,
  description,
  color,
}: {
  icon: React.ReactNode
  name: string
  description: string
  color: string
}) {
  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-white shadow-sm border text-center">
      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${color} mb-2`}>{icon}</div>
      <h4 className="font-medium text-sm">{name}</h4>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  )
}

// 統計カードコンポーネント
function StatCard({
  icon,
  title,
  value,
  color,
  bgColor,
}: {
  icon: React.ReactNode
  title: string
  value: string | number
  color: string
  bgColor: string
}) {
  return (
    <div className="flex flex-col items-center p-3 rounded-lg bg-white shadow-sm border text-center">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bgColor} mb-2`}>
        <div className={color}>{icon}</div>
      </div>
      <h4 className="text-2xl font-bold">{value}</h4>
      <p className="text-xs text-gray-500">{title}</p>
    </div>
  )
}

// SNSリンクコンポーネント
function SocialLink({ type, url }: { type: string; url: string }) {
  const getSocialIcon = (type: string) => {
    switch (type) {
      case "twitter":
        return <Twitter className="w-4 h-4" />
      case "instagram":
        return <Instagram className="w-4 h-4" />
      case "facebook":
        return <Facebook className="w-4 h-4" />
      case "website":
        return <Globe className="w-4 h-4" />
      default:
        return <ExternalLink className="w-4 h-4" />
    }
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
      {getSocialIcon(type)}
    </a>
  )
}

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("area-reports")

  // ダミーデータ
  const userData = {
    id: params.id,
    name: "山田 太郎",
    bio: "東京都在住。環境保全活動に熱心に取り組んでいます。週末は主に渋谷区周辺でゴミ拾いボランティアに参加しています。一緒に活動できる仲間を募集中です！",
    avatar: "/placeholder.svg?height=100&width=100&text=山田",
    coverImage: "/placeholder.svg?height=200&width=800&text=カバー画像",
    group: { id: 1, name: "渋谷区清掃ボランティア", members: 24 },
    badges: [
      {
        id: 1,
        name: "清掃マスター",
        description: "50回以上の清掃活動に参加",
        icon: <Award className="w-8 h-8 text-white" />,
        color: "bg-yellow-500",
      },
      {
        id: 2,
        name: "エリアウォッチャー",
        description: "100件以上のエリアレポートを投稿",
        icon: <Shield className="w-8 h-8 text-white" />,
        color: "bg-blue-500",
      },
      {
        id: 3,
        name: "コミュニティリーダー",
        description: "5つ以上のミッションを作成",
        icon: <Star className="w-8 h-8 text-white" />,
        color: "bg-purple-500",
      },
    ],
    socialLinks: [
      { id: 1, type: "twitter", url: "https://twitter.com/username" },
      { id: 2, type: "instagram", url: "https://instagram.com/username" },
      { id: 3, type: "facebook", url: "https://facebook.com/username" },
    ],
    stats: {
      areaReports: 127,
      cleaningReports: 53,
      missions: 8,
      totalPoints: 12450,
      rank: 12,
      activeDays: 78,
    },
  }

  // 写真の数に応じたグリッドクラスを返す関数
  const getGridClass = (photoCount: number) => {
    switch (photoCount) {
      case 1:
        return "grid-cols-1"
      case 2:
        return "grid-cols-2"
      case 3:
        return "grid-cols-3"
      case 4:
      default:
        return "grid-cols-2 grid-rows-2"
    }
  }

  return (
    <div className="user-profile-page pb-20">
      {/* ヘッダー部分 */}
      <div className="relative">
        <div className="h-40 w-full relative">
          <Image src={userData.coverImage || "/placeholder.svg"} alt="カバー画像" fill className="object-cover" />
          <div className="absolute top-4 left-4 z-10">
            <button onClick={() => router.back()} className="bg-black/30 text-white p-2 rounded-full backdrop-blur-sm">
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="px-4 pb-4 relative">
          <div className="absolute -top-12 left-4 border-4 border-white rounded-full bg-white shadow-md">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
              <AvatarFallback>{userData.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          </div>

          <div className="pt-14 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              <div className="flex items-center mt-1 space-x-2">
                {userData.socialLinks.map((link) => (
                  <SocialLink key={link.id} type={link.type} url={link.url} />
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-sm text-gray-500 mt-1">総獲得ポイント: {userData.stats.totalPoints}pt</div>
            </div>
          </div>

          {/* プロフィールテキスト */}
          {userData.bio && (
            <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
              {userData.bio}
            </div>
          )}
        </div>
      </div>

      {/* 所属グループ */}
      {userData.group && (
        <div className="px-4 py-3">
          <h2 className="text-lg font-medium mb-2 flex items-center">
            <Users className="w-5 h-5 mr-1 text-blue-500" />
            所属グループ
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{userData.group.name}</h3>
                    <p className="text-sm text-gray-500">メンバー: {userData.group.members}人</p>
                  </div>
                </div>
                <Link href={`/groups/${userData.group.id}`} className="text-blue-500">
                  <ExternalLink className="w-5 h-5" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 活動統計 */}
      <div className="px-4 py-3">
        <h2 className="text-lg font-medium mb-2 flex items-center">
          <Award className="w-5 h-5 mr-1 text-amber-500" />
          活動実績
        </h2>
        <div className="grid grid-cols-3 gap-2">
          <StatCard
            icon={<MapPinned className="w-5 h-5" />}
            title="エリアレポート"
            value={userData.stats.areaReports}
            color="text-blue-600"
            bgColor="bg-blue-100"
          />
          <StatCard
            icon={<Trash2 className="w-5 h-5" />}
            title="清掃レポート"
            value={userData.stats.cleaningReports}
            color="text-green-600"
            bgColor="bg-green-100"
          />
          <StatCard
            icon={<BadgeCheck className="w-5 h-5" />}
            title="ミッション"
            value={userData.stats.missions}
            color="text-purple-600"
            bgColor="bg-purple-100"
          />
        </div>
      </div>

      {/* バッジコレクション */}
      <div className="px-4 py-3">
        <h2 className="text-lg font-medium mb-2 flex items-center">
          <Shield className="w-5 h-5 mr-1 text-indigo-500" />
          バッジコレクション
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {userData.badges.map((badge) => (
            <UserBadge
              key={badge.id}
              icon={badge.icon}
              name={badge.name}
              description={badge.description}
              color={badge.color}
            />
          ))}
        </div>
      </div>

      {/* 詳細実績タブ */}
      <div className="px-4 py-3">
        <h2 className="text-lg font-medium mb-2">詳細実績</h2>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-2">
            <TabsTrigger value="area-reports">エリアレポート</TabsTrigger>
            <TabsTrigger value="cleaning-reports">清掃レポート</TabsTrigger>
            <TabsTrigger value="missions">ミッション</TabsTrigger>
          </TabsList>

          {/* エリアレポートタブ */}
          <TabsContent value="area-reports" className="space-y-3">
            {[
              { id: 1, photoCount: 4, pollutionLevel: 3 },
              { id: 2, photoCount: 1, pollutionLevel: 1 },
              { id: 3, photoCount: 2, pollutionLevel: 4 },
            ].map((item) => (
              <Card key={item.id}>
                <CardContent className="p-3">
                  <div className="flex items-start">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium">渋谷区宮益坂 {item.id}丁目付近</h3>
                        <PollutionLevelBadge level={item.pollutionLevel} />
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mb-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{item.id * 2}日前</span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        道路脇にペットボトルやビニール袋が散乱しています。早急な対応が必要です。
                      </p>
                      <div className={`grid ${getGridClass(item.photoCount)} gap-1 mt-2`}>
                        {Array.from({ length: item.photoCount }).map((_, j) => (
                          <div key={j} className="aspect-square bg-gray-100 rounded overflow-hidden">
                            <Image
                              src={`/placeholder.svg?key=cxlbu&key=sae37&key=o1zoa&height=40&width=40&text=写真${j + 1}`}
                              width={40}
                              height={40}
                              alt={`写真 ${j + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* 清掃レポートタブ */}
          <TabsContent value="cleaning-reports" className="space-y-3">
            {[
              { id: 1, hasReward: true, rewardAmount: 150, status: "付与済み" },
              { id: 2, hasReward: true, rewardAmount: 200, status: "審査中" },
              { id: 3, hasReward: true, rewardAmount: 300, status: "付与済み" },
            ].map((item) => (
              <Card key={item.id}>
                <CardContent className="p-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={`/placeholder.svg?key=61in7&key=w2btw&key=kh24i&height=80&width=80&text=清掃${item.id}`}
                        width={80}
                        height={80}
                        alt={`清掃写真 ${item.id}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">東京都渋谷区代々木公園付近</h3>
                      <div className="flex items-center text-xs text-gray-500 mb-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{item.id}週間前</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mb-1">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>清掃時間: {30 + item.id * 15}分</span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        公園内のゴミ拾いを行いました。合計で45Lのゴミ袋{item.id}つ分を回収しました。
                      </p>
                      {item.hasReward ? (
                        <div className="mt-1 flex items-center justify-between">
                          <div className="text-xs font-medium text-green-600">
                            +{item.rewardAmount} pt{item.status === "付与済み" ? " 獲得" : ""}
                          </div>
                          {item.status !== "付与済み" && (
                            <div className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{item.status}</div>
                          )}
                        </div>
                      ) : (
                        <div className="mt-1 text-xs text-gray-500">報酬対象外のミッションです</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* ミッションタブ */}
          <TabsContent value="missions" className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="hover:bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-lg">東京都渋谷区神宮前{i}丁目</h3>
                    {i % 2 === 0 && (
                      <Badge variant="outline" className="bg-gray-50 text-gray-600">
                        非公開
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={`/placeholder.svg?key=2a6b4&key=9cy5a&key=7su8j&height=64&width=64&text=ミッション${i}`}
                        width={64}
                        height={64}
                        alt={`ミッション ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{i}ヶ月前</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span>総予算: {5000 * i}pt</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="w-4 h-4 mr-1" />
                        <span>参加者: {i * 3}人</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
                    <div className="text-sm">
                      <span className="text-gray-500">最大報酬:</span>
                      <span className="font-medium ml-1">{300 * i}pt</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">週予算:</span>
                      <span className="font-medium ml-1">{1000 * i}pt</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
