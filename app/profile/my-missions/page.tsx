"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Edit, EyeOff } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export default function MyMissionsPage() {
  const [editingMission, setEditingMission] = useState<number | null>(null)
  const [isPublic, setIsPublic] = useState(true)
  // サンプルデータ
  const missions = [
    {
      id: 1,
      title: "東京都渋谷区神宮前1丁目",
      createdAt: "2025年1月15日",
      budget: 5000,
      weeklyBudget: 1000,
      maxReward: 300,
      participants: 3,
      isActive: true,
      hasNewRewards: true,
      image: `/placeholder.svg?height=200&width=400&text=渋谷区神宮前1丁目`,
    },
    {
      id: 2,
      title: "東京都渋谷区神宮前2丁目",
      createdAt: "2025年1月10日",
      budget: 10000,
      weeklyBudget: 2000,
      maxReward: 600,
      participants: 6,
      isActive: true,
      hasNewRewards: false,
      image: `/placeholder.svg?height=200&width=400&text=渋谷区神宮前2丁目`,
    },
    {
      id: 3,
      title: "東京都渋谷区神宮前3丁目",
      createdAt: "2024年12月20日",
      budget: 7500,
      weeklyBudget: 1500,
      maxReward: 450,
      participants: 4,
      isActive: false,
      hasNewRewards: false,
      image: `/placeholder.svg?height=200&width=400&text=渋谷区神宮前3丁目`,
    },
  ]

  return (
    <div className="my-missions-page p-4 pt-8 pb-20">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link href="/profile" className="mr-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">自分のミッション</h1>
        </div>
        <div>
          <Link href="/mission/create">
            <Button size="icon" className="h-9 w-9">
              <Plus className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      <div className="mb-6">
        <Link href="/profile/my-missions/rewards">
          <Card className="bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200 hover:from-teal-100 hover:to-emerald-100 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-teal-100 rounded-full p-2 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-teal-600"
                    >
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">報酬分配</h3>
                    <p className="text-sm text-gray-600">2件の新しい分配案があります</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-teal-200 hover:border-teal-300 hover:bg-teal-50">
                  確認する
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="space-y-4">
        {missions.map((mission) => (
          <Card key={mission.id} className={`overflow-hidden ${!mission.isActive ? "bg-gray-50 border-gray-200" : ""}`}>
            <CardContent className="p-0">
              <div className="relative">
                <div className="h-48 bg-gray-100">
                  <Image
                    src={mission.image || `/placeholder.svg?height=200&width=400&text=Mission${mission.id}`}
                    width={400}
                    height={200}
                    alt={mission.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-lg">{mission.title}</h3>
                      {mission.hasNewRewards && <Badge className="ml-2 bg-teal-500 text-white">新規分配案</Badge>}
                      {!mission.isActive && (
                        <div className="flex items-center ml-2 text-gray-500">
                          <EyeOff className="h-4 w-4 mr-1" />
                          <span className="text-xs">非表示</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">作成: {mission.createdAt}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setEditingMission(mission.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-gray-100 p-2 rounded-md">
                    <p className="text-xs text-gray-500">予算</p>
                    <p className="font-medium">{mission.budget.toLocaleString()} pt</p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-md">
                    <p className="text-xs text-gray-500">週間上限</p>
                    <p className="font-medium">{mission.weeklyBudget.toLocaleString()} pt</p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-md">
                    <p className="text-xs text-gray-500">一人当たり上限</p>
                    <p className="font-medium">{mission.maxReward.toLocaleString()} pt</p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-md">
                    <p className="text-xs text-gray-500">参加者数</p>
                    <p className="font-medium">{mission.participants}人</p>
                  </div>
                </div>

                <div>
                  <Link href={`/profile/my-missions/rewards?mission=${mission.id}`}>
                    <Button variant="outline" size="sm">
                      報酬分配履歴
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ミッション編集ダイアログ */}
      <Dialog open={editingMission !== null} onOpenChange={(open) => !open && setEditingMission(null)}>
        <DialogContent className="max-w-[390px] mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>ミッション編集</span>
              <Button variant="ghost" size="icon" onClick={() => setEditingMission(null)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                <Image
                  src={`/placeholder.svg?key=etvjp&key=2sdh1&key=77fo3&key=f4uou&height=64&width=64&text=Mission${editingMission || 1}`}
                  width={64}
                  height={64}
                  alt={`ミッション`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{missions.find((m) => m.id === editingMission)?.title || "ミッション"}</h3>
                <p className="text-sm text-gray-500">
                  作成: {missions.find((m) => m.id === editingMission)?.createdAt || ""}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-sm font-medium">
                  予算（支援するポイント）
                </Label>
                <Input
                  id="budget"
                  type="number"
                  defaultValue={missions.find((m) => m.id === editingMission)?.budget || 5000}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weeklyLimit" className="text-sm font-medium">
                  一週間に使うポイントの上限
                </Label>
                <Input
                  id="weeklyLimit"
                  type="number"
                  defaultValue={missions.find((m) => m.id === editingMission)?.weeklyBudget || 1000}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="perPersonLimit" className="text-sm font-medium">
                  一人当たりの上限ポイント(週)
                </Label>
                <Input
                  id="perPersonLimit"
                  type="number"
                  defaultValue={missions.find((m) => m.id === editingMission)?.maxReward || 300}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">参考写真</Label>
              <div className="border-2 border-dashed rounded-md p-4 text-center">
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400 mb-2"
                  >
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                    <line x1="16" x2="22" y1="5" y2="5" />
                    <line x1="19" x2="19" y1="2" y2="8" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
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
