"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
  icon?: React.ReactNode
}

interface SegmentedTabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (tabId: string) => void
}

export default function SegmentedTabs({ tabs, activeTab, onChange }: SegmentedTabsProps) {
  return (
    <div className="flex p-1 bg-gray-100 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "flex items-center justify-center flex-1 py-2 px-3 text-sm rounded-md transition-all",
            activeTab === tab.id ? "bg-white shadow-sm text-black font-medium" : "text-gray-500 hover:text-gray-700",
          )}
        >
          {tab.icon && <span className="mr-1.5">{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  )
}
