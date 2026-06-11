"use client"

import {
  Users,
  MessageSquare,
  PauseCircle,
  UserX,
  TrendingUpIcon,
  TrendingDownIcon,
  Bot,
  Timer,
  Database,
} from "lucide-react"
import { cn } from "@/lib/utils"

const cards = [
  {
    label:     "AI handling rate",
    value:     "83%",
    trend:     { direction: "up", label: "+5 this week" },
    icon:      Bot,
    iconBg:    "bg-orange-500/20",
    iconColor: "text-orange-400",
  },
  {
    label:     "Avg response time",
    value:     "1.2s",
    trend:     { direction: "up", label: "+3" },
    icon:      Timer,
    iconBg:    "bg-violet-500/20",
    iconColor: "text-violet-400",
  },
  {
    label:     "Total interactions",
    value:     1.247,
    trend:     { direction: "down", label: "-2" },
    icon:      MessageSquare,
    iconBg:    "bg-amber-500/20",
    iconColor: "text-amber-400",
  },
  {
    label:     "KB entries",
    value:     42,
    trend:     { direction: "up", label: "+2" },
    icon:      Database,
    iconBg:    "bg-emerald-500/20",
    iconColor: "text-emerald-400",
  },
]

interface StatsProps {
    numberOfChats: number;
    totalLeadsCaptured: number;
    pausedByAgent: number;
    pausedByUsers: number;
}
// {data}:{data:StatsProps}
export function AiAgentCards() {

  // console.log("leads screen lead", data)

    // const cards = [
    // {
    //     label:     "Number of chats",
    //     value:     data.numberOfChats,
    //     icon:      MessageSquare,
    //     iconBg:    "bg-orange-500/20",
    //     iconColor: "text-orange-400",
    // },
    // {
    //     label:     "Total leads captured",
    //     value:     data.totalLeadsCaptured,
    //     icon:      Users,
    //     iconBg:    "bg-violet-500/20",
    //     iconColor: "text-violet-400",
    // },
    // {
    //     label:     "Paused by agent",
    //     value:     data.pausedByAgent,
    //     icon:      PauseCircle,
    //     iconBg:    "bg-amber-500/20",
    //     iconColor: "text-amber-400",
    // },
    // {
    //     label:     "Paused by users",
    //     value:     data.pausedByUsers,
    //     icon:      UserX,
    //     iconBg:    "bg-emerald-500/20",
    //     iconColor: "text-emerald-400",
    // },
    // ]
  

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