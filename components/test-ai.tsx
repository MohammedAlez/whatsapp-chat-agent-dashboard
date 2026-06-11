"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Play, Send, Bot, User } from "lucide-react"

export function TestAi() {
  return (
    <Card className="h-full flex flex-col border-border bg-card text-card-foreground shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-emerald-500/10 flex items-center justify-center shrink-0">
            <Play className="h-4 w-4 text-emerald-500 fill-emerald-500/20" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">Test AI</CardTitle>
            
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 gap-4">
        {/* Chat Interface Area */}
        <div className="flex-1 bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col gap-4 overflow-y-auto min-h-[300px]">
          
          {/* AI Message */}
          <div className="flex items-start gap-2">
            <div className="h-7 w-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
              <Bot className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="bg-background border border-border text-foreground text-sm p-3 rounded-2xl rounded-tl-sm max-w-[85%] shadow-sm">
              Hello! I'm the Travel Assistant. How can I help you today?
            </div>
          </div>

          {/* User Message */}
          <div className="flex items-start gap-2 justify-end">
            <div className="bg-primary text-primary-foreground text-sm p-3 rounded-2xl rounded-tr-sm max-w-[85%] shadow-sm">
              I need a flight to Dubai.
            </div>
            <div className="h-7 w-7 rounded-full bg-muted border border-border flex items-center justify-center shrink-0 mt-0.5">
              <User className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </div>

          {/* AI Typing Indicator */}
          <div className="flex items-start gap-2">
            <div className="h-7 w-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
              <Bot className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="bg-background border border-border text-foreground text-sm p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5 w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-pulse"></span>
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-pulse" style={{ animationDelay: '150ms' }}></span>
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-pulse" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
          
        </div>

        {/* Chat Input Area */}
        <div className="flex items-center gap-2 mt-auto pt-2">
          <Input 
            placeholder="Type a message..." 
            className="bg-background border-input flex-1 p-5" 
          />
          <Button size="lg" className="shrink-0 rounded-lg size-10 bg-indigo-500">
            <Send className="h-8 w-8" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}