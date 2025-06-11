"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ArrowLeft,
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
  Sparkles,
  ClipboardCheck,
  PiggyBank,
  HandHeart,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import CleaningReportCard from "@/components/cleaning-report-card"
import AreaReportCard from "@/components/area-report-card"

// SNSリンクコンポーネント
function SocialLink({ type, url }: { type: string; url: string }) {
  const getSocialIcon = (type: string) => {
    switch (type) {
      case "twitter":
        return <Twitter className="w-5 h-5" />
      case "instagram":
        return <Instagram className="w-5 h-5" />
      case "facebook":
        return <Facebook className="w-5 h-5" />
      case "website":
        return <Globe className="w-5 h-5" />
      default:
        return <ExternalLink className="w-5 h-5" />
    }
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white/20 hover:bg-white/30 p-2 rounded-full text-white transition-colors"
    >
      {getSocialIcon(type)}
    </a>
  )
}

// バッジカードコンポーネント
function BadgeCard({ badge }: { badge: any }) {
  const IconComponent = badge.icon
  const isEarned = badge.earnedDate !== null

  return (
    <div className="flex flex-col items-center p-3 rounded-lg bg-gray-50 text-center">
      <div
        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 ${isEarned ? "" : "grayscale opacity-50"}`}
        style={{
          backgroundColor: isEarned ? badge.iconBgColor : "rgba(229, 231, 235, 0.1)",
          borderColor: isEarned ? badge.iconColor : "rgb(229, 231, 235)",
        }}
      >
        <IconComponent className="w-6 h-6" style={{ color: isEarned ? badge.iconColor : "rgb(156, 163, 175)" }} />
      </div>
      <h4 className="font-medium text-xs line-clamp-2">{badge.name}</h4>
    </div>
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
    coverImage: "/abstract-cleaning-pattern.png",
    socialLinks: [
      { id: 1, type: "twitter", url: "https://twitter.com/username" },
      { id: 2, type: "instagram", url: "https://instagram.com/username" },
      { id: 3, type: "facebook", url: "https://facebook.com/username" },
      { id: 4, type: "website", url: "https://example.com" },
    ],
    stats: {
      areaReports: 127,
      cleaningReports: 53,
      totalPoints: 12450,
    },
    badges: [
      {
        id: 1,
        name: "清掃マスター",
        icon: Sparkles,
        earnedDate: "2025年4月15日",
        chipColor: "rgb(130,184,255)",
        iconColor: "rgb(130,184,255)",
        iconBgColor: "rgba(130,184,255,0.1)",
      },
      {
        id: 2,
        name: "エリアレポーター",
        icon: MapPinned,
        earnedDate: "2025年4月22日",
        chipColor: "rgb(102,205,10)",
        iconColor: "rgb(102,205,10)",
        iconBgColor: "rgba(102,205,10,0.1)",
      },
      {
        id: 3,
        name: "チームプレイヤー",
        icon: ClipboardCheck,
        earnedDate: "2025年4月10日",
        chipColor: "rgb(192,192,192)",
        iconColor: "rgb(192,192,192)",
        iconBgColor: "rgba(192,192,192,0.1)",
      },
      {
        id: 4,
        name: "初心者",
        icon: PiggyBank,
        earnedDate: "2025年4月05日",
        chipColor: "rgb(192,192,192)",
        iconColor: "rgb(192,192,192)",
        iconBgColor: "rgba(192,192,192,0.1)",
      },
      {
        id: 5,
        name: "継続者",
        icon: HandHeart,
        earnedDate: "2025年4月20日",
        chipColor: "rgb(205,127,50)",
        iconColor: "rgb(205,127,50)",
        iconBgColor: "rgba(205,127,50,0.1)",
      },
      {
        id: 6,
        name: "地域貢献者",
        icon: Star,
        earnedDate: "2025年4月25日",
        chipColor: "rgb(130,184,255)",
        iconColor: "rgb(130,184,255)",
        iconBgColor: "rgba(130,184,255,0.1)",
      },
      {
        id: 7,
        name: "環境守護者",
        icon: Shield,
        earnedDate: "2025年4月28日",
        chipColor: "rgb(102,205,10)",
        iconColor: "rgb(102,205,10)",
        iconBgColor: "rgba(102,205,10,0.1)",
      },
      {
        id: 8,
        name: "コミュニティリーダー",
        icon: Award,
        earnedDate: "2025年4月30日",
        chipColor: "rgb(205,127,50)",
        iconColor: "rgb(205,127,50)",
        iconBgColor: "rgba(205,127,50,0.1)",
      },
    ],
  }

  const earnedBadges = userData.badges.filter((badge) => badge.earnedDate !== null)
  const latestBadges = earnedBadges.slice(0, 6)
  const additionalBadges = earnedBadges.slice(6)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* ヘッダー（背景画像付き） */}
      <header className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 opacity-70">
          <Image
            src={userData.coverImage || "/abstract-cleaning-pattern.png"}
            alt="ヘッダー背景"
            fill
            className="object-cover mix-blend-overlay"
            priority
          />
        </div>
        {/* 戻るボタン */}
        <div className="absolute top-4 left-4 z-10">
          <button onClick={() => router.back()} className="bg-black/30 text-white p-2 rounded-full backdrop-blur-sm">
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>
        {/* ユーザー名とSNSリンク */}
        <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-center">
          <div className="bg-black bg-opacity-50 px-6 py-4 rounded-lg">
            <h1 className="text-3xl font-bold text-white">{userData.name}</h1>
          </div>
        </div>
      </header>

      {/* プロフィールカード */}
      <div className="relative px-4 -mt-16 max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden text-gray-800">
          <div className="p-6">
            {/* アバターとポイント */}
            <div className="flex items-center justify-between mb-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
                <Image
                  src={userData.avatar || "/placeholder.svg"}
                  alt={userData.name}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
              <div className="flex items-center space-x-2">
                {userData.socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-600 transition-colors"
                  >
                    {link.type === "twitter" && <Twitter className="w-4 h-4" />}
                    {link.type === "instagram" && <Instagram className="w-4 h-4" />}
                    {link.type === "facebook" && <Facebook className="w-4 h-4" />}
                    {link.type === "website" && <Globe className="w-4 h-4" />}
                  </a>
                ))}
              </div>
            </div>

            {/* 自己紹介 */}
            {userData.bio && (
              <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-gray-700">{userData.bio}</p>
              </div>
            )}

            {/* 活動統計 */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center text-gray-700 mb-2">
                  <MapPinned className="w-5 h-5 mr-2 text-blue-600" />
                  <span className="font-medium">エリアレポート</span>
                </div>
                <p className="text-2xl font-bold">
                  {userData.stats.areaReports}
                  <span className="text-sm ml-1">件</span>
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center text-gray-700 mb-2">
                  <Trash2 className="w-5 h-5 mr-2 text-green-600" />
                  <span className="font-medium">清掃レポート</span>
                </div>
                <p className="text-2xl font-bold">
                  {userData.stats.cleaningReports}
                  <span className="text-sm ml-1">件</span>
                </p>
              </div>
            </div>

            {/* バッジセクション */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <span className="w-2 h-6 bg-blue-600 rounded-full mr-2"></span>
                獲得済みバッジ
              </h3>

              {/* 最新の6個のバッジ */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {latestBadges.map((badge) => (
                  <BadgeCard key={badge.id} badge={badge} />
                ))}
              </div>

              {/* もっと見るアコーディオン */}
              {additionalBadges.length > 0 && (
                <Accordion type="single" collapsible>
                  <AccordionItem value="more-badges" className="border-0">
                    <AccordionTrigger className="text-gray-600 hover:text-gray-800 py-2 hover:no-underline">
                      もっと見る
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-3 gap-3 pt-2">
                        {additionalBadges.map((badge) => (
                          <BadgeCard key={badge.id} badge={badge} />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </div>

            {/* 活動実績タブ */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <span className="w-2 h-6 bg-blue-600 rounded-full mr-2"></span>
                活動実績
              </h3>

              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="area-reports" className="text-xs">
                    <MapPinned className="w-4 h-4 mr-1" />
                    エリアレポート
                  </TabsTrigger>
                  <TabsTrigger value="cleaning-reports" className="text-xs">
                    <Trash2 className="w-4 h-4 mr-1" />
                    清掃レポート
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="area-reports" className="space-y-4">
                  {[
                    {
                      id: 1,
                      location: "渋谷区宮益坂 1丁目付近",
                      timeAgo: "2日前",
                      pollutionLevel: 3,
                      comment: "道路脇にペットボトルやビニール袋が散乱しています。早急な対応が必要です。",
                      photoCount: 4,
                    },
                    {
                      id: 2,
                      location: "渋谷区宮益坂 2丁目付近",
                      timeAgo: "4日前",
                      pollutionLevel: 1,
                      comment: "先週の清掃活動の効果で、ほとんどゴミが見当たりません。きれいな状態が続いています。",
                      photoCount: 1,
                    },
                    {
                      id: 3,
                      location: "渋谷区宮益坂 3丁目付近",
                      timeAgo: "6日前",
                      pollutionLevel: 4,
                      comment: "公園内にタバコの吸い殻や空き缶が多数散乱しています。ゴミ箱の設置が必要かもしれません。",
                      photoCount: 2,
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
                    />
                  ))}
                </TabsContent>

                <TabsContent value="cleaning-reports" className="space-y-6">
                  {[
                    {
                      id: 1,
                      location: "東京都渋谷区代々木公園付近",
                      timeAgo: "1週間前",
                      duration: 45,
                      distance: "0.5km",
                      comment: "公園内のゴミ拾いを行いました。合計で45Lのゴミ袋1つ分を回収しました。",
                    },
                    {
                      id: 2,
                      location: "東京都渋谷区代々木公園付近",
                      timeAgo: "2週間前",
                      duration: 60,
                      distance: "0.8km",
                      comment: "公園内のゴミ拾いを行いました。合計で45Lのゴミ袋2つ分を回収しました。",
                    },
                    {
                      id: 3,
                      location: "東京都渋谷区代々木公園付近",
                      timeAgo: "3週間前",
                      duration: 75,
                      distance: "1.2km",
                      comment: "公園内のゴミ拾いを行いました。合計で45Lのゴミ袋3つ分を回収しました。",
                    },
                  ].map((item) => (
                    <CleaningReportCard
                      key={item.id}
                      id={item.id}
                      location={item.location}
                      timeAgo={item.timeAgo}
                      duration={item.duration}
                      distance={item.distance}
                      comment={item.comment}
                    />
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* フッター */}
          <div className="bg-gray-50 p-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <Image src="/eco-friendly-logo.png" alt="MeGo" width={40} height={40} className="object-cover" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">MeGo</p>
                  <p className="text-xs text-gray-500">街をキレイにするアプリ</p>
                </div>
              </div>
              <Link href="https://mego.work/download" target="_blank">
                <button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white text-sm px-4 py-2 rounded-full">
                  LINE で一秒登録
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 参加促進セクション */}
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">あなたも一緒に活動しませんか？</h2>
        <p className="text-gray-300 mb-6">
          MeGoは無料で参加できる清掃活動支援アプリです。
          <br />
          {userData.name}さんのように、みんなで環境改善に貢献しましょう。
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="https://mego.work/download" target="_blank">
            <button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-3 rounded-full">
              LINE で一秒登録
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
