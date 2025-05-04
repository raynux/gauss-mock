"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { BadgeCheck, DollarSign, Users, Lock } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface MissionAchievementCardProps {
  id: number
  title: string
  timeAgo: string
  budget: number
  maxReward: number
  weeklyBudget: number
  participants: number
  isPrivate?: boolean
  onClick?: () => void
  dateIcon?: React.ReactNode
}

export default function MissionAchievementCard({
  id,
  title,
  timeAgo,
  budget,
  maxReward,
  weeklyBudget,
  participants,
  isPrivate = false,
  onClick,
  dateIcon = <BadgeCheck className="w-4 h-4 mr-1 text-teal-500" />,
}: MissionAchievementCardProps) {
  return (
    <Card onClick={onClick} className={onClick ? "cursor-pointer hover:bg-gray-50" : ""}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-lg">{title}</h3>
          {isPrivate && (
            <Badge variant="outline" className="bg-gray-50 text-gray-600">
              非公開
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 relative">
            <Image
              src={`/placeholder.svg?key=lflpi&key=tjnas&key=7m69w&key=lvlug&key=g4zlo&key=xtnht&key=00r2c&key=v0jb8&height=64&width=64&text=ミッション${id}`}
              width={64}
              height={64}
              alt={`ミッション ${id}`}
              className="w-full h-full object-cover"
            />
            {isPrivate && (
              <div className="absolute top-0 right-0 bg-gray-800/70 p-1 rounded-bl-md">
                <Lock className="h-3 w-3 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              {dateIcon}
              <span>{timeAgo}</span>
            </div>

            <div className="flex items-center text-sm text-gray-500 mb-1">
              <DollarSign className="w-4 h-4 mr-1" />
              <span>総予算: {budget}pt</span>
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <Users className="w-4 h-4 mr-1" />
              <span>参加者: {participants}人</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
          <div className="text-sm">
            <span className="text-gray-500">最大報酬:</span>
            <span className="font-medium ml-1">{maxReward}pt</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">週予算:</span>
            <span className="font-medium ml-1">{weeklyBudget}pt</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
