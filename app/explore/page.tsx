"use client"

import { useState, useEffect } from "react"
import { Filter, List, Map, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import SegmentedTabs from "@/components/segmented-tabs"
import MissionCard from "@/components/mission-card"
import MapView from "@/components/map-view"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"

export default function ExplorePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")

  const [activeTab, setActiveTab] = useState<"map" | "list" | "area-report">("map")
  const [selectedMission, setSelectedMission] = useState<string | null>(null)
  const [expandedComments, setExpandedComments] = useState<Record<number, boolean>>({})

  // コメントの展開/折りたたみを切り替える
  const toggleComment = (missionId: number) => {
    setExpandedComments((prev) => ({
      ...prev,
      [missionId]: !prev[missionId],
    }))
  }

  // URLパラメータからタブを設定
  useEffect(() => {
    if (tabParam === "report") {
      // 古いパラメータをリダイレクト
      router.replace("/explore?tab=area-report", { scroll: false })
      setActiveTab("area-report")
    } else if (tabParam && ["map", "list", "area-report"].includes(tabParam)) {
      setActiveTab(tabParam as "map" | "list" | "area-report")
    }
  }, [tabParam, router])

  // タブ変更時にURLを更新
  const handleTabChange = (tab: string) => {
    const newTab = tab as "map" | "list" | "area-report"
    setActiveTab(newTab)
    router.push(`/explore?tab=${newTab}`, { scroll: false })
  }

  // ミッションデータ
  const missions = [
    {
      id: 1,
      title: "渋谷川清掃プロジェクト",
      sponsor: "渋谷クリーンチーム",
      avatar: "/placeholder.svg?height=40&width=40&text=渋谷",
      budget: 5000,
      maxReward: 300,
      image: "/placeholder.svg?height=120&width=120&text=渋谷川",
      comment:
        "渋谷川周辺のゴミ拾いプロジェクトです。最近の雨で川沿いにゴミが増えています。地域の環境を守るため、みんなで協力して清掃活動を行いましょう。特に川沿いのプラスチックゴミが問題となっています。",
    },
    {
      id: 2,
      title: "プラスチック回収ミッション",
      sponsor: "エコプロジェクト",
      avatar: "/placeholder.svg?height=40&width=40&text=エコ",
      budget: 3000,
      maxReward: 250,
      image: "/placeholder.svg?height=120&width=120&text=プラスチック",
      comment:
        "川沿いのプラスチックゴミを重点的に回収するミッションです。リサイクル可能なプラスチックを分別して回収してください。",
    },
  ]

  return (
    <div className="explore h-full flex flex-col">
      <header className="p-3 pt-4">
        <h1 className="text-xl font-bold mb-2">探索</h1>
        <SegmentedTabs
          tabs={[
            { id: "map", label: "地図", icon: <Map className="w-4 h-4" /> },
            { id: "list", label: "一覧", icon: <List className="w-4 h-4" /> },
            { id: "area-report", label: "汚れ状況", icon: <AlertTriangle className="w-4 h-4" /> },
          ]}
          activeTab={activeTab}
          onChange={handleTabChange}
        />
      </header>

      {activeTab === "map" && (
        <div className="flex-1 relative">
          <MapView onMarkerClick={(id) => setSelectedMission(id)} />
          {selectedMission && (
            <Drawer open={!!selectedMission} onOpenChange={() => setSelectedMission(null)}>
              <DrawerContent className="max-h-[85vh] w-full max-w-[390px] mx-auto">
                <DrawerHeader className="text-left p-4 pb-0">
                  <DrawerTitle>この場所のミッション</DrawerTitle>
                </DrawerHeader>
                <div className="p-4 overflow-auto max-h-[calc(85vh-60px)]">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-lg mb-1">東京都渋谷区神宮前</h3>
                    </div>

                    <div className="space-y-3">
                      {missions.map((mission) => (
                        <Card key={mission.id} className="overflow-hidden">
                          <CardContent className="p-3">
                            <div className="flex items-center mb-2">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={mission.avatar || "/placeholder.svg"} alt={mission.sponsor} />
                                <AvatarFallback>{mission.sponsor[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{mission.title}</p>
                                <p className="text-xs text-gray-500">{mission.sponsor}</p>
                              </div>
                            </div>

                            {mission.image && (
                              <div className="mb-2 rounded-md overflow-hidden h-24">
                                <img
                                  src={mission.image || "/placeholder.svg"}
                                  alt={mission.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}

                            <div className="grid grid-cols-2 gap-2 mb-2">
                              <div className="bg-gray-50 p-2 rounded text-center">
                                <p className="text-xs text-gray-500">予算</p>
                                <p className="font-medium">{mission.budget}pt</p>
                              </div>
                              <div className="bg-gray-50 p-2 rounded text-center">
                                <p className="text-xs text-gray-500">最大報酬</p>
                                <p className="font-medium">{mission.maxReward}pt</p>
                              </div>
                            </div>

                            {mission.comment && (
                              <div className="mt-2 text-sm text-gray-600">
                                <p className={expandedComments[mission.id] ? "" : "line-clamp-2"}>{mission.comment}</p>
                                {mission.comment.length > 70 && (
                                  <button
                                    onClick={() => toggleComment(mission.id)}
                                    className="text-gray-500 text-xs mt-1 flex items-center"
                                  >
                                    {expandedComments[mission.id] ? (
                                      <>
                                        閉じる <ChevronUp className="h-3 w-3 ml-0.5" />
                                      </>
                                    ) : (
                                      <>
                                        もっと読む <ChevronDown className="h-3 w-3 ml-0.5" />
                                      </>
                                    )}
                                  </button>
                                )}
                              </div>
                            )}

                            <Link href={`/boundary/boundary-${mission.id}`} className="mt-2 block">
                              <Button size="sm" variant="outline" className="w-full">
                                詳細を見る
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <Button className="w-full" onClick={() => setSelectedMission(null)}>
                      閉じる
                    </Button>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </div>
      )}

      {activeTab === "list" && (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-auto p-4 pb-20">
            <div className="space-y-6">
              {[
                {
                  id: 1,
                  address: "東京都渋谷区神宮前",
                  distance: "500m",
                  reward: 300,
                  budget: 5000,
                  isExclusive: true,
                  topSponsor: {
                    name: "渋谷クリーンチーム",
                    avatar: "/placeholder.svg?height=16&width=16&text=渋谷",
                  },
                },
                {
                  id: 2,
                  address: "東京都渋谷区代々木",
                  distance: "800m",
                  reward: 250,
                  budget: 3000,
                  isExclusive: false,
                  topSponsor: {
                    name: "エコプロジェクト",
                    avatar: "/placeholder.svg?height=16&width=16&text=エコ",
                  },
                },
                {
                  id: 3,
                  address: "東京都渋谷区恵比寿",
                  distance: "1.2km",
                  reward: 350,
                  budget: 7000,
                  isExclusive: true,
                  topSponsor: {
                    name: "恵比寿町内会",
                    avatar: "/placeholder.svg?height=16&width=16&text=恵比寿",
                  },
                },
                {
                  id: 4,
                  address: "東京都新宿区新宿",
                  distance: "2.5km",
                  reward: 400,
                  budget: 10000,
                  isExclusive: false,
                  topSponsor: {
                    name: "新宿区役所",
                    avatar: "/placeholder.svg?height=16&width=16&text=新宿",
                  },
                },
                {
                  id: 5,
                  address: "東京都港区六本木",
                  distance: "3.0km",
                  reward: 450,
                  budget: 8000,
                  isExclusive: false,
                  topSponsor: {
                    name: "港区環境課",
                    avatar: "/placeholder.svg?height=16&width=16&text=港区",
                  },
                },
              ].map((item) => (
                <Link
                  href={item.isExclusive ? `/dedicated-mission/mission-${item.id}` : `/boundary/boundary-${item.id}`}
                  key={item.id}
                >
                  <div className={item.isExclusive ? "relative" : ""}>
                    {item.isExclusive && (
                      <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-br-lg rounded-tl-lg z-10">
                        専用ミッション
                      </div>
                    )}
                    <MissionCard
                      id={`mission-${item.id}`}
                      title={item.address}
                      distance={item.distance}
                      reward={item.reward}
                      budget={item.budget}
                      topSponsor={item.topSponsor}
                      className={item.isExclusive ? "border-blue-200 shadow-md" : ""}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="absolute bottom-20 right-4 z-10">
            <Button size="icon" className="h-12 w-12 rounded-full shadow-lg">
              <Filter className="h-6 w-6" />
            </Button>
          </div>
        </div>
      )}

      {activeTab === "area-report" && (
        <div className="flex-1 relative">
          <div className="h-full bg-gray-200 relative">
            <Image
              src="/placeholder.svg?height=700&width=390"
              width={390}
              height={700}
              alt="汚染ヒートマップ"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-white rounded p-1 text-xs">ヒートマップ：汚染レベル</div>

            {/* サンプルのエリア */}
            {[
              { id: "area1", x: "30%", y: "40%" },
              { id: "area2", x: "50%", y: "30%" },
              { id: "area3", x: "70%", y: "60%" },
            ].map((area) => (
              <button
                key={area.id}
                className="absolute w-12 h-12 transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: area.x, top: area.y }}
                onClick={() => setSelectedMission(area.id)}
              >
                <div className="w-12 h-12 bg-red-500/30 rounded-full border-2 border-red-500 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
              </button>
            ))}
          </div>

          {selectedMission && (
            <Drawer open={!!selectedMission} onOpenChange={() => setSelectedMission(null)}>
              <DrawerContent className="max-h-[90vh] w-full max-w-[390px] mx-auto">
                <DrawerHeader className="text-left p-4 pb-0">
                  <DrawerTitle>エリア詳細</DrawerTitle>
                </DrawerHeader>
                <div className="p-4 overflow-auto max-h-[calc(90vh-60px)]">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-100 p-3 rounded-lg text-center">
                        <p className="text-xs text-gray-500">レポート数</p>
                        <p className="text-xl font-bold">12</p>
                      </div>
                      <div className="bg-gray-100 p-3 rounded-lg text-center">
                        <p className="text-xs text-gray-500">ユーザー数</p>
                        <p className="text-xl font-bold">8</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">関係するユーザー</h3>
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Link href={`/user/user-${i}`} key={i}>
                            <Avatar className="border-2 border-white cursor-pointer hover:opacity-80 transition-opacity">
                              <AvatarImage
                                src={`/placeholder-u.png?key=p9xyd&key=7s9z1&height=32&width=32&text=U${i}`}
                              />
                              <AvatarFallback>U{i}</AvatarFallback>
                            </Avatar>
                          </Link>
                        ))}
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium border-2 border-white">
                          +3
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">写真</h3>
                      <div>
                        <div className="grid grid-cols-2 gap-2">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="aspect-square bg-gray-100 rounded overflow-hidden">
                              <Image
                                src={`/placeholder.svg?key=3wal0&key=jw835&key=bz9cy&key=qllzr&key=xgtl8&key=w4pep&key=pbuao&key=dif3q&key=o1qiu&key=a6513&key=zeqwf&key=dj7qv&height=120&width=120&text=写真${
                                  i + 1
                                }`}
                                width={120}
                                height={120}
                                alt={`写真 ${i + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button className="w-full" onClick={() => setSelectedMission(null)}>
                      閉じる
                    </Button>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </div>
      )}
    </div>
  )
}
