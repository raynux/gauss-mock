import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"

export default function RankingPage() {
  return (
    <div className="ranking-page p-4 pt-8">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-1">ランキング</h1>
        <p className="text-gray-500 text-sm">Coming Soon</p>
      </header>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
            個人ランキング
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-40 bg-gray-100 rounded-md">
            <p className="text-gray-500">近日公開予定</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-blue-500" />
            グループランキング
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-40 bg-gray-100 rounded-md">
            <p className="text-gray-500">近日公開予定</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
