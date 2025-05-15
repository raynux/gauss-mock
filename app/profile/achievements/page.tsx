"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, MapPin, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import CleaningReportCard from "@/components/cleaning-report-card"
import AreaReportCard from "@/components/area-report-card"

export default function AchievementsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")

  const [activeTab, setActiveTab] = useState("area-reports")

  // URLパラメータからタブを設定
  useEffect(() => {
    if (tabParam && ["area-reports", "cleaning-reports"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  // タブ変更時にURLを更新
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    router.push(`/profile/achievements?tab=${tab}`, { scroll: false })
  }

  return (
    <div className="achievements-page p-4 pt-8 pb-20">
      <header className="flex items-center mb-6">
        <Link href="/profile" className="mr-2">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold">実績</h1>
      </header>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="area-reports" className="text-xs">
            <MapPin className="w-4 h-4 mr-1" />
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
            {
              id: 4,
              location: "渋谷区宮益坂 4丁目付近",
              timeAgo: "8日前",
              pollutionLevel: 2,
              comment: "少しゴミは見られますが、全体的には比較的きれいな状態です。定期的な清掃が効果を発揮しています。",
              photoCount: 3,
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
  )
}
