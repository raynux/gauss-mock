import { Card, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface MissionCardProps {
  id: string
  title: string
  distance: string
  reward: number
  budget?: number
  deadline?: string
  expanded?: boolean
  className?: string
  topSponsor?: {
    name: string
    avatar: string
  }
}

export default function MissionCard({
  id,
  title,
  distance,
  reward,
  budget,
  deadline,
  expanded = false,
  className,
  topSponsor,
}: MissionCardProps) {
  return (
    <Card className={cn("overflow-hidden mb-4", className)}>
      <CardContent className="p-0">
        <div className="relative h-32 bg-gray-200">
          <Image
            src="/placeholder.svg?height=128&width=280"
            width={280}
            height={128}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full z-20">
            {reward} pt
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-medium text-base mb-2 line-clamp-1">{title}</h3>
          <div className="space-y-2 text-xs text-gray-500">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                <span>
                  <span className="font-medium">距離:</span> {distance}
                </span>
              </div>
              {budget && (
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1 flex-shrink-0"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                    <path d="M12 18V6" />
                  </svg>
                  <span>
                    <span className="font-medium">予算:</span> {budget} pt
                  </span>
                </div>
              )}
            </div>
            {topSponsor && (
              <div className="flex items-center mt-2">
                <div className="w-4 h-4 rounded-full overflow-hidden mr-1 flex-shrink-0 border border-gray-300">
                  <img
                    src={topSponsor.avatar || "/placeholder.svg"}
                    alt={topSponsor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>
                  <span className="font-medium">トップスポンサー:</span> {topSponsor.name}
                </span>
              </div>
            )}
          </div>

          {expanded && (
            <div className="mt-3 pt-3 border-t border-gray-100 text-sm">
              <p className="text-gray-600">
                渋谷川周辺のゴミ拾いプロジェクトです。最近の雨で川沿いにゴミが増えています。
                地域の環境を守るため、みんなで協力して清掃活動を行いましょう。
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
