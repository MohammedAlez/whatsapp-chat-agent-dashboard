"use client"

import {
  Users,
  UserPlus,
  PhoneCall,
  GraduationCap,
  TrendingUpIcon,
  TrendingDownIcon,
  HelpCircle,
  MessageSquareX,
  UserCheck,
  Database,
} from "lucide-react"
import { cn } from "@/lib/utils"

const cards = [
  {
    label:     "Total Unanswered",
    value:     23,
    subText:   "this week",
    icon:      HelpCircle,
    iconBg:    "bg-zinc-500/20",
    iconColor: "text-zinc-400",
  },
  {
    label:     "Open",
    value:     7,
    subText:   "need attention",
    icon:      MessageSquareX,
    iconBg:    "bg-orange-500/20",
    iconColor: "text-orange-400",
  },
  {
    label:     "Handled by Team",
    value:     12,
    subText:   "team replied",
    icon:      UserCheck,
    iconBg:    "bg-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    label:     "Added to KB",
    value:     4,
    subText:   "AI improved",
    icon:      Database,
    iconBg:    "bg-indigo-500/20",
    iconColor: "text-indigo-400",
  },
]
interface StatsProps {
    total: number;
    open: number;
    handled: number;
    addedToKb: number;
}

export function QuestionsCards({data}:{data:StatsProps}) {


    const cards = [
      {
        label:     "Total Unanswered",
        value:     data.total,
        icon:      HelpCircle,
        iconBg:    "bg-zinc-500/20",
        iconColor: "text-zinc-400",
      },
      {
        label:     "Open",
        value:     data.open,
        icon:      MessageSquareX,
        iconBg:    "bg-orange-500/20",
        iconColor: "text-orange-400",
      },
      {
        label:     "Handled by Team",
        value:     data.handled,
        icon:      UserCheck,
        iconBg:    "bg-emerald-500/20",
        iconColor: "text-emerald-400",
      },
      {
        label:     "Added to KB",
        value:     data.addedToKb,
        icon:      Database,
        iconBg:    "bg-indigo-500/20",
        iconColor: "text-indigo-400",
      },
    ]

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon
          // const isUp = card.trend.direction === "up"
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