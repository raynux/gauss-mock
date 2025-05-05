"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ImageIcon, LinkIcon, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { useSearchParams } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export default function CleaningReportSharePage() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const [copied, setCopied] = useState(false)
  const [showCertificateDialog, setShowCertificateDialog] = useState(false)
  const [name, setName] = useState("")

  // URLクエリから選択された画像IDを取得
  const selectedImageIds = searchParams.get("images")?.split(",") || ["1"]

  // 選択された最初の画像を表示
  const mainImageId = selectedImageIds[0]

  // URLをコピーする関数
  const copyUrl = () => {
    navigator.clipboard.writeText("https://app.mego.work/share/cleaning-report/12345")
    setCopied(true)
    toast({
      title: "URLをコピーしました",
      duration: 2000,
    })
    setTimeout(() => setCopied(false), 2000)
  }

  // 画像を保存する関数
  const saveImage = () => {
    toast({
      title: "画像を保存しました",
      duration: 2000,
    })
  }

  // 証明書を発行する関数
  const issueCertificate = () => {
    if (name.trim()) {
      toast({
        title: "証明書を発行しました",
        description: "PDFが公式LINEアカウントから送信されます",
        duration: 3000,
      })
      setShowCertificateDialog(false)
      setName("")
    }
  }

  return (
    <div className="p-4 pt-8 h-full flex flex-col">
      <div className="flex items-center mb-6">
        <Link href="/share/cleaning-report/thumbnail-select" className="mr-2">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">SNSでシェア</h1>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden mb-4">
          <Image
            src={`/placeholder.svg?key=nbwxr&height=300&width=400&text=清掃${mainImageId}`}
            width={400}
            height={300}
            alt="清掃写真"
            className="w-full h-full object-cover"
          />
          <div className="absolute left-0 top-0 bottom-0 w-[120px] bg-black/70 text-white p-3">
            <div className="flex flex-col h-full">
              <div className="mb-2">
                <Image
                  src="/placeholder.svg?height=60&width=60&text=MeGo"
                  width={60}
                  height={60}
                  alt="MeGo"
                  className="rounded-full"
                />
              </div>
              <div className="text-xs space-y-2">
                <div>
                  <p className="text-gray-400">清掃実施日</p>
                  <p>2025.05.04</p>
                </div>
                <div>
                  <p className="text-gray-400">清掃時間</p>
                  <p>1 分</p>
                </div>
                <div>
                  <p className="text-gray-400">直線距離</p>
                  <p>55 m</p>
                </div>
                <div>
                  <p className="text-gray-400">累計清掃回数</p>
                  <p>32</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 mt-2">
          <Button
            variant="outline"
            className="w-full justify-between py-6"
            onClick={() =>
              window.open("https://twitter.com/intent/tweet?url=https://app.mego.work/share/cleaning-report/12345")
            }
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </div>
              <span>で活動内容をシェアする</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-between py-6"
            onClick={() =>
              window.open(
                "https://www.facebook.com/sharer/sharer.php?u=https://app.mego.work/share/cleaning-report/12345",
              )
            }
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </div>
              <span>で活動内容をシェアする</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>

          <Button variant="outline" className="w-full justify-between py-6" onClick={copyUrl}>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <LinkIcon className="h-4 w-4 text-gray-700" />
              </div>
              <span>URLをコピー</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>

          <Button variant="outline" className="w-full justify-between py-6" onClick={saveImage}>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <ImageIcon className="h-4 w-4 text-gray-700" />
              </div>
              <span>サムネイル画像を保存</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-between py-6"
            onClick={() => setShowCertificateDialog(true)}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <CheckCircle className="h-4 w-4 text-gray-700" />
              </div>
              <span>ボランティア証明書の発行</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>
        </div>

        <div className="mt-auto pt-4">
          <Link href="/">
            <Button variant="default" className="w-full">
              トップにもどる
            </Button>
          </Link>
        </div>
      </div>

      {/* ボランティア証明書発行ダイアログ */}
      <Dialog open={showCertificateDialog} onOpenChange={setShowCertificateDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-teal-500" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">
              ���ランティア
              <br />
              証明書の発行
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center mb-4">
              ボランティア証明書に記載する氏名を入力してください。証明書はPDF形式で公式LINEアカウントからお送りします。
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium">氏名</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="氏名を入力"
                className="bg-gray-50"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={issueCertificate}
              disabled={!name.trim()}
              className="w-full bg-teal-400 hover:bg-teal-500 text-white"
            >
              発行する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
