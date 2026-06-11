"use client"

import { BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AgentPerformance() {
  return (
    // <Card className="h-full flex flex-col border-border bg-card text-card-foreground shadow-sm">
    //   <CardHeader className="pb-4">
    //     <div className="flex items-center gap-2">
    //       <div className="h-8 w-8 rounded-md bg-purple-500/10 flex items-center justify-center shrink-0">
    //         <BarChart3 className="h-4 w-4 text-purple-500" />
    //       </div>
    //       <CardTitle className="text-lg font-semibold tracking-wide text-foreground">
    //         Performance
    //       </CardTitle>
    //     </div>
    //   </CardHeader>
      
    //   <CardContent className="space-y-4 flex-1 mt-2">
    //     {/* Row 1: Successful replies */}
    //     <div className="flex items-center justify-between border-b border-border pb-3">
    //       <span className="text-sm font-medium text-muted-foreground">Successful replies</span>
    //       <span className="text-sm font-bold text-foreground">1,035 / 1,247</span>
    //     </div>

    //     {/* Row 2: Escalations */}
    //     <div className="flex items-center justify-between border-b border-border pb-3">
    //       <span className="text-sm font-medium text-muted-foreground">Escalations</span>
    //       <span className="text-sm font-bold text-foreground">212 (17%)</span>
    //     </div>

    //     {/* Row 3: Most asked topic */}
    //     <div className="flex items-center justify-between border-b border-border pb-3">
    //       <span className="text-sm font-medium text-muted-foreground">Most asked topic</span>
    //       <span className="text-sm font-bold text-foreground">IELTS prep</span>
    //     </div>

    //     {/* Row 4: Avg tokens per reply */}
    //     <div className="flex items-center justify-between pt-1">
    //       <span className="text-sm font-medium text-muted-foreground">Avg tokens per reply</span>
    //       <span className="text-sm font-bold text-foreground">147</span>
    //     </div>
    //   </CardContent>
    // </Card>

    <Card className="h-full flex flex-col border-border bg-card text-card-foreground shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-blue-500/10 flex items-center justify-center shrink-0">
            <BarChart3 className="h-4 w-4 text-blue-500" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">Performance</CardTitle>
            
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Row 1: Successful replies */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <span className="text-sm font-medium text-primary">Successful replies</span>
          <span className="text-sm font-bold text-fontground">1,035 / 1,247</span>
        </div>

        {/* Row 2: Escalations */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <span className="text-sm font-medium text-primary">Escalations</span>
          <span className="text-sm font-bold text-fontground">212 (17%)</span>
        </div>

        {/* Row 3: Most asked topic */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <span className="text-sm font-medium text-primary">Most asked topic</span>
          <span className="text-sm font-bold text-fontground">IELTS prep</span>
        </div>

        {/* Row 4: Avg tokens per reply */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm font-medium text-primary">Avg tokens per reply</span>
          <span className="text-sm font-bold text-fontground">147</span>
        </div>
      </CardContent>
    </Card>
  )
}