import MissionCard from "@/components/mission-card"
import { Badge, BadgeCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="home pb-6">
      <div className="p-4 pt-8">
        <h1 className="text-2xl font-bold mb-1">こんにちは、ユーザーさん</h1>
        <p className="text-gray-500 text-sm">今日も地域をきれいにしましょう！</p>
      </div>

      <section className="px-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">おすすめミッション</h2>
          <Link href="/explore" className="text-sm text-gray-500">
            もっと見る
          </Link>
        </div>
        <div className="flex overflow-x-auto pb-2 -mx-1 scrollbar-hide">
          {[1, 2, 3].map((i) => (
            <div key={i} className="px-1 min-w-[280px]">
              <MissionCard
                id={`mission-${i}`}
                title={`東京都新宿区 ${i}`}
                distance="500m"
                reward={300 * i}
                deadline="2日後"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center">
                <Badge className="w-5 h-5 mr-2" />
                バッジ進捗
              </CardTitle>
              <Link href="/profile" className="text-sm text-gray-500">
                すべて見る
              </Link>
            </div>
            <CardDescription>次のバッジまであと少し！</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="font-medium">初心者清掃員</span>
                  <span>3/5</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="font-medium">エリアレポーター</span>
                  <span>2/10</span>
                </div>
                <Progress value={20} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="font-medium">チームプレイヤー</span>
                  <span>0/3</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="px-4 mb-6">
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">今日のTips</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex items-center p-4">
              <div className="flex-1 pr-4">
                <h3 className="font-medium mb-1">プラスチックの分別方法</h3>
                <p className="text-sm text-gray-600">
                  プラスチックゴミは種類によって分別方法が異なります。リサイクルマークを確認して適切に分別しましょう。
                </p>
              </div>
              <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=96&width=96"
                  width={96}
                  height={96}
                  alt="プラスチック分別イラスト"
                  className="object-cover"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="px-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center">
                <BadgeCheck className="w-5 h-5 mr-2" />
                最近の活動
              </CardTitle>
              <Link href="/profile" className="text-sm text-gray-500">
                もっと見る
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <div>
                  <p className="font-medium">渋谷川清掃に参加</p>
                  <p className="text-gray-500">2日前</p>
                </div>
                <span className="text-green-600 font-medium">+200pt</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <div>
                  <p className="font-medium">エリアレポート投稿</p>
                  <p className="text-gray-500">5日前</p>
                </div>
                <span className="text-green-600 font-medium">+50pt</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">代々木公園清掃に参加</p>
                  <p className="text-gray-500">1週間前</p>
                </div>
                <span className="text-green-600 font-medium">+150pt</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
