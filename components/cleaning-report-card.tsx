import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CleaningReportCardProps {
  id: number
  location: string
  timeAgo: string
  duration: number
  distance?: string
  comment: string
}

export default function CleaningReportCard({
  id,
  location,
  timeAgo,
  duration,
  distance = "0.5km",
  comment,
}: CleaningReportCardProps) {
  return (
    <Link href={`/share/cleaning-report/social-share?images=${id}`} className="block">
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-start space-x-4">
            <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={`/placeholder-t0dta.png?height=96&width=96&text=清掃${id}`}
                width={96}
                height={96}
                alt={`清掃写真 ${id}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium mb-2 text-base hover:text-teal-600 transition-colors">{location}</h3>
              <div className="flex items-center text-xs text-gray-500 mb-2">
                <Trash2 className="w-3 h-3 mr-1.5" />
                <span>{timeAgo}</span>
              </div>
              <div className="flex items-center text-xs text-gray-500 mb-2">
                <Clock className="w-3 h-3 mr-1.5" />
                <span>清掃時間: {duration}分</span>
              </div>
              <div className="flex items-center text-xs text-gray-500 mb-2">
                <MapPin className="w-3 h-3 mr-1.5" />
                <span>距離: {distance}</span>
              </div>
              <p className="text-sm text-gray-600">{comment}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
