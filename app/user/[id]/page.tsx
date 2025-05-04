"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  BadgeCheck,
  Users,
  Calendar,
  ExternalLink,
  Twitter,
  Instagram,
  Facebook,
  Globe,
  Shield,
  Award,
  Star,
  MapPinned,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import CleaningReportCard from "@/components/cleaning-report-card"
import AreaReportCard from "@/components/area-report-card"
import MissionAchievementCard from "@/components/mission-achievement-card"

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
              {
                id: 1,
                location: "渋谷区宮益坂 1丁目付近",
                timeAgo: "2日前",
                pollutionLevel: 3,
                comment: "道路脇にペットボトルやビニール袋が散乱しています。早急な対応が必要です。",
                photoCount: 4,
                dateIcon: <Calendar className="w-3 h-3 mr-1" />,
              },
              {
                id: 2,
                location: "渋谷区宮益坂 2丁目付近",
                timeAgo: "4日前",
                pollutionLevel: 1,
                comment: "先週の清掃活動の効果で、ほとんどゴミが見当たりません。きれいな状態が続いています。",
                photoCount: 1,
                dateIcon: <Calendar className="w-3 h-3 mr-1" />,
              },
              {
                id: 3,
                location: "渋谷区宮益坂 3丁目付近",
                timeAgo: "6日前",
                pollutionLevel: 4,
                comment: "公園内にタバコの吸い殻や空き缶が多数散乱しています。ゴミ箱の設置が必要かもしれません。",
                photoCount: 2,
                dateIcon: <Calendar className="w-3 h-3 mr-1" />,
              },
            ].map((item) => (
              <AreaReportCard
                key={item.id}
                id={item.id}
                location={item.location}
                timeAgo={item.timeAgo}
                pollutionLevel={item.pollutionLevel}
                comment={item.comment}
                photoCount={item.photoCount}
                dateIcon={item.dateIcon}
              />
            ))}
          </TabsContent>

          {/* 清掃レポートタブ */}
          <TabsContent value="cleaning-reports" className="space-y-6">
            {[
              {
                id: 1,
                location: "東京都渋谷区代々木公園付近",
                timeAgo: "1週間前",
                duration: 45,
                comment: "公園内のゴミ拾いを行いました。合計で45Lのゴミ袋1つ分を回収しました。",
                hasReward: true,
                rewardAmount: 150,
                status: "付与済み",
              },
              {
                id: 2,
                location: "東京都渋谷区代々木公園付近",
                timeAgo: "2週間前",
                duration: 60,
                comment: "公園内のゴミ拾いを行いました。合計で45Lのゴミ袋2つ分を回収しました。",
                hasReward: true,
                rewardAmount: 200,
              },
              {
                id: 3,
                location: "東京都渋谷区代々木公園付近",
                timeAgo: "3週間前",
                duration: 75,
                comment: "公園内のゴミ拾いを行いました。合計で45Lのゴミ袋3つ分を回収しました。",
                hasReward: true,
                rewardAmount: 300,
                status: "付与済み",
              },
            ].map((item) => (
              <CleaningReportCard
                key={item.id}
                id={item.id}
                location={item.location}
                timeAgo={item.timeAgo}
                duration={item.duration}
                comment={item.comment}
                hasReward={item.hasReward}
                rewardAmount={item.rewardAmount}
                status={item.status}
              />
            ))}
          </TabsContent>

          {/* ミッションタブ */}
          <TabsContent value="missions" className="space-y-3">
            {[1, 2, 3].map((i) => (
              <MissionAchievementCard
                key={i}
                id={i}
                title={`東京都渋谷区神宮前${i}丁目`}
                timeAgo={`${i}ヶ月前`}
                budget={5000 * i}
                maxReward={300 * i}
                weeklyBudget={1000 * i}
                participants={i * 3}
                isPrivate={i % 2 === 0}
                dateIcon={<Calendar className="w-4 h-4 mr-1" />}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
