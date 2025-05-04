"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Textarea } from "@/components/ui/textarea"

export default function ProfileEditPage() {
  const [gender, setGender] = useState("male")

  return (
    <div className="profile-edit p-4 pt-8 pb-20">
      <header className="flex items-center mb-6">
        <Link href="/profile" className="mr-2">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold">プロフィール編集</h1>
      </header>

      <div className="space-y-6">
        <div className="relative">
          <div className="h-32 bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=128&width=390"
              width={390}
              height={128}
              alt="カバー画像"
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-2 right-2 bg-black/50 text-white p-2 rounded-full">
            <Camera className="h-5 w-5" />
          </button>

          <div className="relative -mt-12 ml-4">
            <Avatar className="h-20 w-20 border-4 border-white">
              <AvatarImage src="/placeholder.svg?height=80&width=80" alt="プロフィール画像" />
              <AvatarFallback>ユ</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>基本情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">名前</Label>
              <Input id="name" defaultValue="ユーザーさん" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">自己紹介</Label>
              <Textarea
                id="bio"
                placeholder="自己紹介文を入力してください"
                defaultValue="東京都在住。環境保全活動に熱心に取り組んでいます。週末は主に渋谷区周辺でゴミ拾いボランティアに参加しています。一緒に活動できる仲間を募集中です！"
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>性別</Label>
              <RadioGroup defaultValue={gender} onValueChange={setGender} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">男性</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">女性</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">その他</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>生年月日</Label>
              <div className="grid grid-cols-3 gap-2">
                <Select defaultValue="1990">
                  <SelectTrigger>
                    <SelectValue placeholder="年" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 50 }, (_, i) => 2024 - i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}年
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select defaultValue="1">
                  <SelectTrigger>
                    <SelectValue placeholder="月" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                      <SelectItem key={month} value={month.toString()}>
                        {month}月
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select defaultValue="1">
                  <SelectTrigger>
                    <SelectValue placeholder="日" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <SelectItem key={day} value={day.toString()}>
                        {day}日
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SNS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="twitter">X (Twitter)</Label>
              <Input id="twitter" placeholder="@username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input id="instagram" placeholder="username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input id="facebook" placeholder="username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">ウェブサイト</Label>
              <Input id="website" placeholder="https://example.com" />
            </div>
          </CardContent>
        </Card>

        <Button className="w-full">保存する</Button>
      </div>
    </div>
  )
}
