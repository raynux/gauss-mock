"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, MapPin, Trash2, BadgeCheck, X, Upload } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import CleaningReportCard from "@/components/cleaning-report-card"
import AreaReportCard from "@/components/area-report-card"
import MissionAchievementCard from "@/components/mission-achievement-card"

export default function AchievementsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")

  const [activeTab, setActiveTab] = useState("area-reports")
  const [editingMission, setEditingMission] = useState<number | null>(null)
  const [isPublic, setIsPublic] = useState(true)

  // URLパラメータからタブを設定
  useEffect(() => {
    if (tabParam && ["area-reports", "cleaning-reports", "missions"].includes(tabParam)) {
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
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="area-reports" className="text-xs">
            <MapPin className="w-4 h-4 mr-1" />
            エリアレポート
          </TabsTrigger>
          <TabsTrigger value="cleaning-reports" className="text-xs">
            <Trash2 className="w-4 h-4 mr-1" />
            清掃レポート
          </TabsTrigger>
          <TabsTrigger value="missions" className="text-xs">
            <BadgeCheck className="w-4 h-4 mr-1" />
            ミッション
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
              hasReward: false,
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

        <TabsContent value="missions" className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
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
              onClick={() => setEditingMission(i)}
            />
          ))}
        </TabsContent>
      </Tabs>

      <Dialog open={editingMission !== null} onOpenChange={(open) => !open && setEditingMission(null)}>
        <DialogContent className="max-w-[390px] mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>ミッション編集</span>
              <Button variant="ghost" size="icon" onClick={() => setEditingMission(null)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                <Image
                  src={`/placeholder.svg?key=m1uwx&key=52xww&key=33426&key=ky4zv&key=3sc5e&key=zt48p&key=rtv79&key=ygfwx&key=v0jb8&height=64&width=64&text=ミッション${editingMission || 1}`}
                  width={64}
                  height={64}
                  alt={`ミッション`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">東京都渋谷区神宮前{editingMission}丁目</h3>
                <p className="text-sm text-gray-500">作成: 2025年1月15日</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-sm font-medium">
                  予算（支援するポイント）
                </Label>
                <Input id="budget" type="number" defaultValue="5000" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weeklyLimit" className="text-sm font-medium">
                  一週間に使うポイントの上限
                </Label>
                <Input id="weeklyLimit" type="number" defaultValue="1000" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="perPersonLimit" className="text-sm font-medium">
                  一人当たりの上限ポイント(週)
                </Label>
                <Input id="perPersonLimit" type="number" defaultValue="300" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">参考写真</Label>
              <div className="border-2 border-dashed rounded-md p-4 text-center">
                <div className="flex flex-col items-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">クリックして写真をアップロード</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment" className="text-sm font-medium">
                コメント
              </Label>
              <Textarea
                id="comment"
                rows={3}
                defaultValue="渋谷川周辺の清掃活動です。最近の雨で川沿いにゴミが増えています。地域の環境を守るため、みんなで協力して清掃活動を行いましょう。"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="privateMessage" className="text-sm font-medium">
                清掃した人へのメッセージ（非公開）
              </Label>
              <div className="text-xs text-gray-500 mb-1">
                このメッセージは清掃を行った人だけに表示され、他のユーザーには見えません。
              </div>
              <Textarea
                id="privateMessage"
                rows={3}
                defaultValue="お疲れ様です。ゴミ袋は指定の場所に捨ててください。"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="isPublic" className="cursor-pointer text-sm font-medium">
                公開する
              </Label>
              <Switch id="isPublic" checked={isPublic} onCheckedChange={setIsPublic} />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setEditingMission(null)}>
              キャンセル
            </Button>
            <Button onClick={() => setEditingMission(null)}>保存する</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
