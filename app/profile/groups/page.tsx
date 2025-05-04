"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function GroupsPage() {
  return (
    <div className="groups-page p-4 pt-8 pb-20">
      <header className="flex items-center mb-6">
        <Link href="/profile" className="mr-2">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold">グループ設定</h1>
      </header>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>所属グループ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="groupId">グループID</Label>
              <Input id="groupId" placeholder="グループIDを入力" defaultValue="shibuya-clean-team" />
              <p className="text-xs text-gray-500">
                所属するグループのIDを入力してください。グループIDはグループ管理者から提供されます。
              </p>
            </div>
            <Button className="w-full">グループ情報を確認</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ポイント分配設定</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>グループへの分配率</Label>
                <span className="font-medium">30%</span>
              </div>
              <Slider defaultValue={[30]} max={100} step={5} />
              <p className="text-xs text-gray-500">
                獲得したポイントのうち、グループに分配する割合を設定します。残りは個人に付与されます。
              </p>
            </div>
          </CardContent>
        </Card>

        <Button className="w-full">保存する</Button>
      </div>
    </div>
  )
}
