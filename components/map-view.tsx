"use client"
import Image from "next/image"

interface MapViewProps {
  onMarkerClick?: (id: string) => void
}

export default function MapView({ onMarkerClick }: MapViewProps) {
  // 実際のアプリではMapboxなどの地図ライブラリを使用
  return (
    <div className="absolute inset-0 w-full h-full bg-gray-200">
      <Image
        src="/placeholder.svg?height=800&width=390&text=地図"
        width={390}
        height={800}
        alt="地図"
        className="w-full h-full object-cover"
        priority
      />

      {/* サンプルのピン */}
      {[
        { id: "mission-1", x: "30%", y: "40%" },
        { id: "mission-2", x: "50%", y: "30%" },
        { id: "mission-3", x: "70%", y: "60%" },
      ].map((pin) => (
        <button
          key={pin.id}
          className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: pin.x, top: pin.y }}
          onClick={() => onMarkerClick && onMarkerClick(pin.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-red-500"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </button>
      ))}
    </div>
  )
}
