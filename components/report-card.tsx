import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AlertTriangle, MapPin } from "lucide-react"
import Image from "next/image"

interface ReportCardProps {
  id: string
  title: string
  level: number
  date: string
  comment: string
}

export default function ReportCard({ id, title, level, date, comment }: ReportCardProps) {
  return (
    <Accordion type="single" collapsible className="border rounded-lg overflow-hidden">
      <AccordionItem value={id} className="border-0">
        <AccordionTrigger className="px-4 py-3 hover:no-underline">
          <div className="flex items-start w-full">
            <div className="flex-1 text-left">
              <h3 className="font-medium text-base mb-1">{title}</h3>
              <div className="flex items-center text-xs text-gray-500">
                <MapPin className="w-3 h-3 mr-1" />
                <span className="mr-3">報告: {date}</span>
                <AlertTriangle className="w-3 h-3 mr-1 text-amber-500" />
                <span className="text-amber-500">汚染レベル: {level}</span>
              </div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-0 pt-0">
          <div className="grid grid-cols-2 gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gray-200">
                <Image
                  src={`/placeholder.svg?height=150&width=150&text=写真${i}`}
                  width={150}
                  height={150}
                  alt={`レポート写真 ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="p-4 text-sm text-gray-600">
            <p>{comment}</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
