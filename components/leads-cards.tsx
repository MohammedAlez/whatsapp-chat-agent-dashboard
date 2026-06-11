"use client"

import {
  Users,
  UserPlus,
  PhoneCall,
  GraduationCap,
  TrendingUpIcon,
  TrendingDownIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const cards = [
  {
    label:     "Total Leads",
    value:     35,
    trend:     { direction: "up", label: "+5 this week" },
    icon:      Users,
    iconBg:    "bg-orange-500/20",
    iconColor: "text-orange-400",
  },
  {
    label:     "New",
    value:     3,
    trend:     { direction: "up", label: "+3" },
    icon:      UserPlus,
    iconBg:    "bg-violet-500/20",
    iconColor: "text-violet-400",
  },
  {
    label:     "Contacted",
    value:     15,
    trend:     { direction: "down", label: "-2" },
    icon:      PhoneCall,
    iconBg:    "bg-amber-500/20",
    iconColor: "text-amber-400",
  },
  {
    label:     "Enrolled",
    value:     7,
    trend:     { direction: "up", label: "+2" },
    icon:      GraduationCap,
    iconBg:    "bg-emerald-500/20",
    iconColor: "text-emerald-400",
  },
]

interface StatsProps {
    total: number;
    new: number;
    contacted: number;
    enrolled: number;
}

export function LeadsCards({data}:{data:StatsProps}) {

  console.log("leads screen lead", data)

  const cards = [
  {
    label:     "Total Leads",
    value:     data.total,
    icon:      Users,
    iconBg:    "bg-orange-500/20",
    iconColor: "text-orange-400",
  },
  {
    label:     "New",
    value:     data.new,
    icon:      UserPlus,
    iconBg:    "bg-violet-500/20",
    iconColor: "text-violet-400",
  },
  {
    label:     "Contacted",
    value:     data.contacted,
    icon:      PhoneCall,
    iconBg:    "bg-amber-500/20",
    iconColor: "text-amber-400",
  },
  {
    label:     "Enrolled",
    value:     data.enrolled,
    icon:      GraduationCap,
    iconBg:    "bg-emerald-500/20",
    iconColor: "text-emerald-400",
  },
]
  

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.label}
            className="rounded-2xl bg-background border border-border p-5 flex flex-col gap-4 shaddow-sm"
          >
            {/* Top row: value + label on left, icon bubble on right */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-4xl font-bold text-foreground tabular-nums leading-none">
                  {card.value}
                </span>
                <span className="text-sm text-zinc-400 font-medium">{card.label}</span>
              </div>

              <div className={cn("h-11 w-11 rounded-full flex items-center justify-center shrink-0", card.iconBg)}>
                <Icon className={cn("h-5 w-5", card.iconColor)} strokeWidth={1.8} />
              </div>
            </div>

            
          </div>
        )
      })}
    </div>
  )
}