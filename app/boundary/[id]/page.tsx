import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BoundaryDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="boundary-detail pb-6">
      <div className="relative h-48 bg-gray-200">
        <Image
          src="/placeholder.svg?height=192&width=390"
          width={390}
          height={192}
          alt="行政区域画像"
          className="w-full h-full object-cover"
        />
        <Link href="/explore" className="absolute top-4 left-4 bg-black/30 rounded-full p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
      </div>

      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">渋谷区道玄坂</h1>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span>500m</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card>
            <CardContent className="p-3 flex items-center">
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
                className="mr-2 text-gray-500"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                <path d="M12 18V6" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">予算</p>
                <p className="font-medium">5,000 pt</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 flex items-center">
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
                className="mr-2 text-gray-500"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">最大報酬</p>
                <p className="font-medium">300 pt</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 flex items-center">
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
                className="mr-2 text-gray-500"
              >
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">ミッション数</p>
                <p className="font-medium">3件</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 flex items-center">
              <Users className="w-5 h-5 mr-2 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">参加者</p>
                <p className="font-medium">12人</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">ミッション</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "ゴミ拾い（一般）",
                  owner: { name: "渋谷クリーンチーム", avatar: "/placeholder.svg?height=32&width=32&text=渋谷" },
                  budget: 2000,
                  maxReward: 200,
                  comment:
                    "渋谷川周辺のゴミ拾いプロジェクトです。最近の雨で川沿いにゴミが増えています。地域の環境を守るため、みんなで協力して清掃活動を行いましょう。",
                },
                {
                  title: "プラスチック回収",
                  owner: { name: "エコプロジェクト", avatar: "/placeholder.svg?height=32&width=32&text=エコ" },
                  budget: 1500,
                  maxReward: 250,
                  comment:
                    "川沿いのプラスチックゴミを重点的に回収するミッションです。リサイクル可能なプラスチックを分別して回収してください。",
                },
                {
                  title: "写真撮影",
                  owner: { name: "渋谷区役所", avatar: "/placeholder.svg?height=32&width=32&text=区役所" },
                  budget: 1000,
                  maxReward: 150,
                  comment:
                    "清掃活動の様子を写真に収めるミッションです。活動前後の比較写真や参加者の様子など、多角的に撮影してください。",
                },
              ].map((mission, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center mb-3">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={mission.owner.avatar || "/placeholder.svg"} alt={mission.owner.name} />
                      <AvatarFallback>{mission.owner.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-medium">{mission.title}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">予算</p>
                      <p className="font-medium">{mission.budget} pt</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">最大報酬</p>
                      <p className="font-medium">{mission.maxReward} pt</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{mission.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">参加者</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage
                      src={`/placeholder.svg?key=p8uxu&key=03nd4&key=ev623&key=i0hm7&height=32&width=32&text=U${i}`}
                      alt={`ユーザー${i}`}
                    />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                  <p className="font-medium">ユーザー{i}</p>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                すべての参加者を見る
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500 mt-2">
          ミッションに参加するには、下部メニューの「投稿」→「清掃レポート」から行ってください。
        </div>
      </div>
    </div>
  )
}
