import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BoundaryDetailPage({ params }: { params: { id: string } }) {
  // ダミーユーザーデータ（非常に長い名前を含む）
  const dummyUsers = [
    { id: 1, name: "田中", avatar: "/placeholder-ahv9z.png?height=48&width=48&text=田中" },
    { id: 2, name: "鈴木一郎", avatar: "/placeholder-ahv9z.png?height=48&width=48&text=鈴木" },
    { id: 3, name: "東京環境クリーンプロジェクト", avatar: "/placeholder-ahv9z.png?height=48&width=48&text=東京" },
    { id: 4, name: "高橋", avatar: "/placeholder-ahv9z.png?height=48&width=48&text=高橋" },
    { id: 5, name: "渡辺京子", avatar: "/placeholder-ahv9z.png?height=48&width=48&text=渡辺" },
    { id: 6, name: "渋谷区環境保全推進委員会メンバー", avatar: "/placeholder-ahv9z.png?height=48&width=48&text=渋谷" },
    { id: 7, name: "山本", avatar: "/placeholder-ahv9z.png?height=48&width=48&text=山本" },
    { id: 8, name: "中村太郎", avatar: "/placeholder-ahv9z.png?height=48&width=48&text=中村" },
    {
      id: 9,
      name: "エコフレンドリー・サステナビリティ推進協会",
      avatar: "/placeholder-ahv9z.png?height=48&width=48&text=エコ",
    },
    { id: 10, name: "加藤", avatar: "/placeholder-ahv9z.png?height=48&width=48&text=加藤" },
    {
      id: 11,
      name: "地球にやさしい未来創造プロジェクト2023",
      avatar: "/placeholder-ahv9z.png?height=48&width=48&text=地球",
    },
    { id: 12, name: "松本さくらこ", avatar: "/placeholder-ahv9z.png?height=48&width=48&text=松本" },
  ]

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
                  location: "渋谷川周辺",
                  owner: { name: "渋谷クリーンチーム", avatar: "/placeholder.svg?height=32&width=32&text=渋谷" },
                  budget: 2000,
                  maxReward: 200,
                  comment:
                    "渋谷川周辺のゴミ拾いプロジェクトです。最近の雨で川沿いにゴミが増えています。地域の環境を守るため、みんなで協力して清掃活動を行いましょう。",
                  photo: "/placeholder.svg?height=120&width=120&text=川沿い清掃",
                },
                {
                  location: "宮益坂付近",
                  owner: { name: "エコプロジェクト", avatar: "/placeholder.svg?height=32&width=32&text=エコ" },
                  budget: 1500,
                  maxReward: 250,
                  comment:
                    "川沿いのプラスチックゴミを重点的に回収するミッションです。リサイクル可能なプラスチックを分別して回収してください。",
                },
                {
                  location: "渋谷駅東口",
                  owner: { name: "渋谷区役所", avatar: "/placeholder.svg?height=32&width=32&text=区役所" },
                  budget: 1000,
                  maxReward: 150,
                  comment:
                    "清掃活動の様子を写真に収めるミッションです。活動前後の比較写真や参加者の様子など、多角的に撮影してください。",
                  photo: "/placeholder.svg?height=120&width=120&text=活動写真",
                },
              ].map((mission, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center mb-3">
                    <Link href={`/user/user-${index + 1}`} className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={mission.owner.avatar || "/placeholder.svg"} alt={mission.owner.name} />
                        <AvatarFallback>{mission.owner.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-medium">{mission.owner.name}</h3>
                    </Link>
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

                  {mission.photo && (
                    <div className="mb-3">
                      <Image
                        src={mission.photo || "/placeholder.svg"}
                        width={120}
                        height={80}
                        alt={`${mission.location}の写真`}
                        className="w-full max-w-xs h-20 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">参加者</CardTitle>
            <span className="text-sm text-gray-500 font-normal">12人</span>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {dummyUsers.map((user) => (
                <div key={user.id} className="flex flex-col items-center group w-full">
                  <Link href={`/user/user-${user.id}`} className="block">
                    <Avatar className="h-12 w-12 mb-1 border-2 border-white shadow-sm transition-transform group-hover:scale-110">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="w-full px-1">
                    <p className="text-xs font-medium truncate w-full text-center" title={user.name}>
                      {user.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
