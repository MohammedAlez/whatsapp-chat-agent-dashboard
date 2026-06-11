"use client"

import React, { useEffect, useState } from "react"
import { 
  TrendingUpIcon, 
  TrendingDownIcon, 
  MessageSquare, 
  UserPlus, 
  Bot, 
  AlertCircle 
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useRealtimeStats } from "@/hooks/use-realtime-stats";




type Stats = {
    conversationsToday: number;
    leadsCaptured: number;
    escalatedCount: number;
    aiHandledRate: number;
    trends: {
        conversations: string;
        leads: string;
        aiRate: string;
        escalated: string;
    };
}

export function SectionCards({stats:initialStats}:{stats:Stats}) {

  const { newLeadCount} = useRealtimeStats()
  const [stats, setStats] = useState(initialStats)


  useEffect(()=>{
    if(newLeadCount>0){
      setStats(prev=>(
        {
          ...prev,
          leadsCaptured:prev.leadsCaptured + newLeadCount
        }
      ))
    }
  },[newLeadCount])


  console.log("stats", stats)
  const cards = [
    {
      label: "Conversations Today",
      value: stats.conversationsToday,
      trend: { value: stats.trends.conversations, direction: Number.parseInt(stats.trends.conversations)>=0 ? "up":'down' },
      icon: MessageSquare,
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-600",
    },
    {
      label: "Leads Captured",
      value: stats.leadsCaptured,
      trend: { value: stats.trends.leads, direction: Number.parseInt(stats.trends.leads)>=0 ? "up":'down' },
      icon: UserPlus,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-600",
    },
    {
      label: "AI Handled",
      value: stats.aiHandledRate + "%",
      trend: { value: stats.trends.aiRate, direction: Number.parseInt(stats.trends.aiRate)>=0 ? "up":'down' }, // No trend for this one based on your original file
      icon: Bot,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-600",
    },
    {
      label: "Escalated to Team",
      value: stats.escalatedCount,
      trend: { value: stats.trends.escalated, direction: Number.parseInt(stats.trends.escalated)>=0 ? "up":'down' }, // Using down as requested for comparison
      icon: AlertCircle,
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-600",
    },
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-6 py-4">
      {cards.map((card) => {
        const Icon = card.icon
        const isUp = card.trend?.direction === "up"

        return (
          <div
            key={card.label}
            className="rounded-2xl bg-background border border-border p-5 flex flex-col gap-4 shaddow-sm"
          >
            {/* Top row: Value + Icon Bubble */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-3xl font-bold text-foreground tabular-nums tracking-tight">
                  {card.value}
                </span>
                <span className="text-sm text-muted-foreground font-medium">
                  {card.label}
                </span>
              </div>

              <div className={cn(
                "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors", 
                card.iconBg
              )}>
                <Icon className={cn("h-6 w-6", card.iconColor)} strokeWidth={2} />
              </div>
            </div>

            {/* Bottom row: Trend Indicator */}
            <div className="flex items-center">
              {card.trend ? (
                <Badge 
                  variant="outline" 
                  className={cn(
                    "flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-lg border-none",
                    isUp 
                      ? "bg-green-500/10 text-green-600" 
                      : "bg-red-500/10 text-red-600"
                  )}
                >
                  {isUp ? (
                    <TrendingUpIcon className="size-3.5" />
                  ) : (
                    <TrendingDownIcon className="size-3.5" />
                  )}
                  {card.trend.value}
                </Badge>
              ) : (
                <span className="text-[11px] text-muted-foreground/60 font-medium">
                  Stable performance
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}