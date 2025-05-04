import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, AlertTriangle } from "lucide-react"
import Image from "next/image"

interface AreaReportCardProps {
  id: number
  location: string
  timeAgo: string
  pollutionLevel: number
  comment: string
  photoCount: number
  dateIcon?: React.ReactNode
}

export default function AreaReportCard({
  id,
  location,
  timeAgo,
  pollutionLevel,
  comment,
  photoCount,
  dateIcon = <MapPin className="w-3 h-3 mr-1" />,
}: AreaReportCardProps) {
  // 汚染レベルに応じたスタイルを取得
  const getLevelInfo = (level: number) => {
    switch (level) {
      case 1:
        return { label: "きれい", color: "bg-green-100 text-green-700 border-green-200" }
      case 2:
        return { label: "概ねきれい", color: "bg-teal-100 text-teal-700 border-teal-200" }
      case 3:
        return { label: "やや汚れている", color: "bg-amber-100 text-amber-700 border-amber-200" }
      case 4:
        return { label: "汚れている", color: "bg-red-100 text-red-700 border-red-200" }
      default:
        return { label: "不明", color: "bg-gray-100 text-gray-700 border-gray-200" }
    }
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

  const { color } = getLevelInfo(pollutionLevel)

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex items-start">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium">{location}</h3>
              <div className={`flex items-center text-xs px-2 py-1 rounded-full ${color}`}>
                <AlertTriangle className="w-3 h-3 mr-1" />
                <span>汚染レベル: {pollutionLevel}</span>
              </div>
            </div>
            <div className="flex items-center text-xs text-gray-500 mb-1">
              {dateIcon}
              <span>{timeAgo}</span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{comment}</p>
            <div className={`grid ${getGridClass(photoCount)} gap-1 mt-2`}>
              {Array.from({ length: photoCount }).map((_, j) => (
                <div key={j} className="aspect-square bg-gray-100 rounded overflow-hidden">
                  <Image
                    src={`/placeholder.svg?key=uk3bw&key=vkh4z&key=nef4y&key=9db21&key=j75nv&key=b69vg&key=8zii0&key=4xmd6&key=38j5r&height=40&width=40&text=写真${j + 1}`}
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
  )
}
