"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Bot, Sparkles, BookA, Languages } from "lucide-react"

export function SystemPrompt() {
  return (
    <Card className="h-full flex flex-col border-border bg-card text-card-foreground shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">Agent Identity</CardTitle>
            
          </div>
        </div>
      </CardHeader>

      <CardContent className="h-full flex flex-col gap-6 flex-1">
        {/* System Prompt Textarea */}
        <div className="space-y-2 flex-1 flex flex-col">
          <Label htmlFor="system-prompt" className="text-sm font-medium flex items-center justify-between">
            <span className="flex items-center gap-2">
              <BookA className="h-3.5 w-3.5 text-muted-foreground" />
              System Prompt
            </span>
          </Label>
          <Textarea 
            id="system-prompt" 
            placeholder="You are a helpful AI assistant..." 
            className="flex-1 min-h-[250px] resize-none bg-background border-input font-mono text-sm leading-relaxed"
            defaultValue="You are a helpful AI assistant for a business. Your goal is to qualify leads, answer frequently asked questions using the provided knowledge base, and maintain a polite, professional demeanor. Do not invent pricing or services."
          />
        </div>
      </CardContent>
    </Card>
  )
}