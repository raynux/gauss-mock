"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, MapPin, Trash2, BadgeCheck, X, Upload, Clock, DollarSign, Lock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

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
            { id: 1, photoCount: 4 },
            { id: 2, photoCount: 1 },
            { id: 3, photoCount: 2 },
            { id: 4, photoCount: 3 },
          ].map((item) => (
            <Card key={item.id}>
              <CardContent className="p-3">
                <div className="flex items-start">
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">渋谷区宮益坂 {item.id}丁目付近</h3>
                    <div className="flex items-center text-xs text-gray-500 mb-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{item.id * 2}日前</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      道路脇にペットボトルやビニール袋が散乱しています。早急な対応が必要です。
                    </p>
                    <div className={`grid ${getGridClass(item.photoCount)} gap-1 mt-2`}>
                      {Array.from({ length: item.photoCount }).map((_, j) => (
                        <div key={j} className="aspect-square bg-gray-100 rounded overflow-hidden">
                          <Image
                            src={`/placeholder.svg?key=38j5r&height=40&width=40&text=写真${j + 1}`}
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

        <TabsContent value="cleaning-reports" className="space-y-4">
          {[
            { id: 1, hasReward: true, rewardAmount: 150, status: "付与済み" },
            { id: 2, hasReward: true, rewardAmount: 200, status: "審査中" },
            { id: 3, hasReward: false, status: "対象外" },
          ].map((item) => (
            <Card key={item.id}>
              <CardContent className="p-3">
                <div className="flex items-start space-x-3">
                  <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={`/placeholder.svg?key=8mywh&height=80&width=80&text=清掃${item.id}`}
                      width={80}
                      height={80}
                      alt={`清掃写真 ${item.id}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">東京都渋谷区代々木公園付近</h3>
                    <div className="flex items-center text-xs text-gray-500 mb-1">
                      <Trash2 className="w-3 h-3 mr-1" />
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

        <TabsContent value="missions" className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} onClick={() => setEditingMission(i)} className="cursor-pointer hover:bg-gray-50">
              <CardContent className="p-3">
                <div className="flex items-start space-x-3">
                  <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0 relative">
                    <Image
                      src={`/placeholder.svg?key=v0jb8&height=80&width=80&text=ミッション${i}`}
                      width={80}
                      height={80}
                      alt={`ミッション ${i}`}
                      className="w-full h-full object-cover"
                    />
                    {i % 2 === 0 && (
                      <div className="absolute top-0 right-0 bg-gray-800/70 p-1 rounded-bl-md">
                        <Lock className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="font-medium mb-1">東京都渋谷区神宮前{i}丁目</h3>
                      {i % 2 === 0 && (
                        <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded">非公開</span>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-1 mb-1">
                      <div className="flex items-center text-xs text-gray-500">
                        <DollarSign className="w-3 h-3 mr-1" />
                        <span>総予算: {5000 * i}pt</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <DollarSign className="w-3 h-3 mr-1" />
                        <span>週予算: {1000 * i}pt</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <DollarSign className="w-3 h-3 mr-1" />
                        <span>上限: {300}pt</span>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mb-1">
                      <BadgeCheck className="w-3 h-3 mr-1" />
                      <span>完了: {i}ヶ月前</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="budget">予算（支援するポイント）</Label>
              <Input id="budget" type="number" defaultValue="5000" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weeklyLimit">一週間に使うポイントの上限</Label>
              <Input id="weeklyLimit" type="number" defaultValue="1000" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="perPersonLimit">一人当たりの上限ポイント(週)</Label>
              <Input id="perPersonLimit" type="number" defaultValue="300" />
            </div>

            <div className="space-y-2">
              <Label>参考写真</Label>
              <div className="border-2 border-dashed rounded-md p-4 text-center">
                <div className="flex flex-col items-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">クリックして写真をアップロード</p>
                  <p className="text-xs text-gray-400">または、ここにドラッグ＆ドロップ</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">コメント</Label>
              <Textarea
                id="comment"
                rows={3}
                defaultValue="渋谷川周辺の清掃活動です。最近の雨で川沿いにゴミが増えています。地域の環境を守るため、みんなで協力して清掃活動を行いましょう。"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">清掃した人に送るメッセージ</Label>
              <Textarea
                id="message"
                rows={2}
                defaultValue="ありがとうございます！あなたの活動が地域の美化に貢献しています。"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="isPublic" className="cursor-pointer">
                公開する
              </Label>
              <Switch id="isPublic" checked={isPublic} onCheckedChange={setIsPublic} />
            </div>
          </div>

          <DialogFooter>
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
