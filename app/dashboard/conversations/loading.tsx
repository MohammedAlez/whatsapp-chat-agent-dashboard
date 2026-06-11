import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function ConversationsLayoutLoading() {
  return (
    <div className="flex flex-col h-full animate-pulse">
      {/* Header Row Stub */}
      <header className="flex h-[--header-height] shrink-0 items-center gap-2 border-b border-border">
        <div className="flex w-full items-center gap-2 px-4 lg:gap-2 lg:px-6">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-6 w-36 rounded-md" />
        </div>
      </header>

      {/* Main Framework - Split layout mirroring ConversationsWrapper */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Hand Sidebar Stub */}
        <aside className="w-full lg:w-80 border-r border-border flex flex-col bg-card">
          {/* Internal search/filter area */}
          <div className="p-4 space-y-2 border-b border-border/60">
            <Skeleton className="h-9 w-full rounded-lg" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>

          {/* List of Mock Conversation Row Items */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-transparent">
                <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                <div className="flex-1 space-y-2 min-w-0">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-24 rounded" />
                    <Skeleton className="h-3 w-10 rounded" />
                  </div>
                  <Skeleton className="h-3.5 w-5/6 rounded" />
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Desktop placeholder side right window */}
        <main className="hidden lg:flex flex-1 items-center justify-center bg-background">
          <Skeleton className="h-5 w-40 rounded-md" />
        </main>
      </div>
    </div>
  )
}