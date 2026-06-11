"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ListChecks, Plus, Trash2, GripVertical, Settings } from "lucide-react"

export function AiControls() {
  // Using standard state so the toggles actually work in your UI
  const [fields, setFields] = useState([
    { id: 1, name: "Global AI status", required: true },
    { id: 2, name: "Auto-escalate on uncertainty", required: true },
    { id: 3, name: "Collect feedback after replies", required: false },
  ])

  const toggleRequired = (id: number) => {
    setFields(fields.map(f => f.id === id ? { ...f, required: !f.required } : f))
  }

  return (
    <Card className="h-full flex flex-col border-border bg-card text-card-foreground shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-blue-500/10 flex items-center justify-center shrink-0">
            <Settings className="h-4 w-4 text-blue-500" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">Controls</CardTitle>
            
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 flex-1">
        
        {/* Extraction Fields List */}
        <div className="flex flex-col gap-3">
          {fields.map((field) => (
            <div 
              key={field.id} 
              className="flex items-center justify-between p-3 rounded-lg border border-border bg-background shadow-sm group"
            >
              <div className="flex items-center gap-3 flex-1">
                <GripVertical className="h-4 w-4 text-muted-foreground/50 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity" />
                <Input 
                  defaultValue={field.name}
                  className="h-8 bg-transparent border-transparent hover:border-border focus:border-border transition-colors max-w-[200px] font-medium"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch 
                    id={`req-${field.id}`} 
                    checked={field.required}
                    onCheckedChange={() => toggleRequired(field.id)}
                    className="data-[state=checked]:bg-indigo-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}