import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CleaningReportCardProps {
  id: number
  location: string
  timeAgo: string
  duration: number
  comment: string
  hasReward?: boolean
  rewardAmount?: number
  status?: string
}

export default function CleaningReportCard({
  id,
  location,
  timeAgo,
  duration,
  comment,
  hasReward = false,
  rewardAmount = 0,
  status,
}: CleaningReportCardProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start space-x-4">
          <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
            <Image
              src={`/placeholder.svg?key=26lkj&key=i0kan&key=4dwhm&key=oedyx&key=skg28&key=41o2p&key=nsi7d&key=8iotg&key=8mywh&height=96&width=96&text=清掃${id}`}
              width={96}
              height={96}
              alt={`清掃写真 ${id}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <Link href={`/share/cleaning-report/${id}`}>
              <h3 className="font-medium mb-2 text-base hover:text-teal-600 transition-colors cursor-pointer">
                {location}
              </h3>
            </Link>
            <div className="flex items-center text-xs text-gray-500 mb-2">
              <Trash2 className="w-3 h-3 mr-1.5" />
              <span>{timeAgo}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 mb-2">
              <Clock className="w-3 h-3 mr-1.5" />
              <span>清掃時間: {duration}分</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{comment}</p>
            {hasReward ? (
              <div className="mt-1 flex items-center">
                <div className="text-sm font-medium text-green-600">
                  +{rewardAmount} pt{status === "付与済み" ? " 獲得" : ""}
                </div>
              </div>
            ) : (
              <div className="mt-1 text-sm text-gray-500">報酬対象外のミッションです</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
