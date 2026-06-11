import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function ChatThreadLoading() {
  return (
    <div className="flex flex-col h-full bg-background animate-pulse">
      {/* 1. Chat Sub-Header Module skeleton */}
      <div className="flex h-14 items-center border-b border-border px-4 justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-32 rounded" />
            <Skeleton className="h-3 w-20 rounded" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>

      {/* 2. Message History Window Pane (Alternating bubble patterns) */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto bg-slate-50/30">
        {/* Row 1: Incoming message item stub */}
        <div className="flex items-end gap-2 max-w-[70%]">
          <Skeleton className="h-7 w-7 rounded-full shrink-0" />
          <div className="space-y-1.5">
            <Skeleton className="h-14 w-56 rounded-2xl rounded-bl-none" />
            <Skeleton className="h-3 w-10 rounded mx-1" />
          </div>
        </div>

        {/* Row 2: Outgoing message item stub */}
        <div className="flex items-end gap-2 max-w-[70%] ml-auto justify-end">
          <div className="space-y-1.5 flex flex-col items-end">
            <Skeleton className="h-10 w-40 rounded-2xl rounded-br-none bg-indigo-200/40" />
            <Skeleton className="h-3 w-10 rounded mx-1" />
          </div>
        </div>

        {/* Row 3: Long incoming message text block */}
        <div className="flex items-end gap-2 max-w-[75%]">
          <Skeleton className="h-7 w-7 rounded-full shrink-0" />
          <div className="space-y-1.5">
            <Skeleton className="h-20 w-72 rounded-2xl rounded-bl-none" />
            <Skeleton className="h-3 w-10 rounded mx-1" />
          </div>
        </div>

        {/* Row 4: Outgoing reply code snippet or message */}
        <div className="flex items-end gap-2 max-w-[70%] ml-auto justify-end">
          <div className="space-y-1.5 flex flex-col items-end">
            <Skeleton className="h-12 w-48 rounded-2xl rounded-br-none bg-indigo-200/40" />
            <Skeleton className="h-3 w-10 rounded mx-1" />
          </div>
        </div>
      </div>

      {/* 3. Text Area Bottom Input Row Skeleton */}
      <div className="p-3 bg-background border-t border-border flex items-center gap-2 shrink-0">
        <Skeleton className="h-9 w-9 rounded-lg shrink-0" /> {/* Attachment button */}
        <Skeleton className="h-10 flex-1 rounded-xl" />     {/* Input layout field */}
        <Skeleton className="h-9 w-16 rounded-xl shrink-0" /> {/* Action click button */}
      </div>
    </div>
  )
}