"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RewardsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const missionId = searchParams.get("mission")
  const [activeTab, setActiveTab] = useState("pending")

  // サンプルデータ
  const rewards = [
    {
      id: 1,
      missionId: 1,
      location: "福岡県福岡市中央区",
      period: "2/3〜2/9",
      cleaningCount: 1,
      status: "pending", // pending, confirmed
      totalAmount: 200,
    },
    {
      id: 2,
      missionId: 2,
      location: "沖縄県那覇市",
      period: "1/20〜1/26",
      cleaningCount: 2,
      status: "pending",
      totalAmount: 300,
    },
    {
      id: 3,
      missionId: 1,
      location: "沖縄県那覇市",
      period: "1/13〜1/19",
      cleaningCount: 1,
      status: "confirmed",
      totalAmount: 150,
    },
    {
      id: 4,
      missionId: 3,
      location: "東京都渋谷区",
      period: "1/6〜1/12",
      cleaningCount: 3,
      status: "confirmed",
      totalAmount: 450,
    },
  ]

  // ミッションIDでフィルタリング（指定がある場合）
  const filteredRewards = missionId ? rewards.filter((r) => r.missionId === Number.parseInt(missionId)) : rewards

  // タブでフィルタリング
  const pendingRewards = filteredRewards.filter((r) => r.status === "pending")
  const confirmedRewards = filteredRewards.filter((r) => r.status === "confirmed")

  return (
    <div className="rewards-page p-4 pt-8 pb-20">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link href="/profile/my-missions" className="mr-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">支援の記録</h1>
        </div>
      </header>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="pending" className="text-xs">
            <Clock className="w-4 h-4 mr-1" />
            確認待ち
            {pendingRewards.length > 0 && (
              <Badge className="ml-1.5 bg-teal-500 text-white">{pendingRewards.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="confirmed" className="text-xs">
            <Calendar className="w-4 h-4 mr-1" />
            確定済み
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingRewards.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>確認待ちの分配案はありません</p>
            </div>
          ) : (
            pendingRewards.map((reward) => (
              <Link key={reward.id} href={`/profile/my-missions/rewards/${reward.id}`}>
                <Card className="overflow-hidden hover:bg-gray-50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-lg hover:text-teal-600 transition-colors">{reward.location}</h3>
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">確認待ち</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 p-2 rounded-md">
                        <p className="text-xs text-gray-500">清掃回数</p>
                        <p className="font-medium">{reward.cleaningCount} 件</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-md">
                        <p className="text-xs text-gray-500">期間</p>
                        <p className="font-medium">{reward.period}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </TabsContent>

        <TabsContent value="confirmed" className="space-y-4">
          {confirmedRewards.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>確定済みの分配案はありません</p>
            </div>
          ) : (
            confirmedRewards.map((reward) => (
              <Link key={reward.id} href={`/profile/my-missions/rewards/${reward.id}`}>
                <Card className="overflow-hidden hover:bg-gray-50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-lg hover:text-teal-600 transition-colors">{reward.location}</h3>
                      <Badge className="bg-green-100 text-green-800 border-green-200">確定済み</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 p-2 rounded-md">
                        <p className="text-xs text-gray-500">清掃回数</p>
                        <p className="font-medium">{reward.cleaningCount} 件</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-md">
                        <p className="text-xs text-gray-500">期間</p>
                        <p className="font-medium">{reward.period}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
