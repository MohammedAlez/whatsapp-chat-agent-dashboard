'use client'

import React, { useState } from "react"
import ConversationSidebar from "@/components/conversation-sidebar"
import { cn } from "@/lib/utils"
import { useParams } from "next/navigation"

interface Props {
  initialChats: any[] // Replace with proper type
  children: React.ReactNode
}

export default function ConversationsWrapper({ initialChats, children  }: Props) {
    const params = useParams<{id:string}>()
    const selectedId = params.id
    
    
    return (
        <div className="relative h-[calc(100vh-4rem)] overflow-hidden bg-background text-foreground">
            <div className={cn(
            "flex h-full w-[200%] lg:w-full transition-transform duration-300 ease-in-out lg:translate-x-0 lg:p-4 lg:gap-4",
            selectedId ? "-translate-x-1/2" : "translate-x-0"
            )}>
            
            <div className="w-1/2 lg:w-100 h-full p-4 lg:p-0">
                <ConversationSidebar chats={initialChats} />
            </div>

            <div className="w-1/2 lg:flex-1 h-full p-4 lg:p-0">
                {children}
            </div>

            </div>
        </div>
    )
}



{/* <div className="h-full w-full rounded-xl border border-border bg-card shadow-sm overflow-hidden">
    {selectedChatId ? (
        <ConversationContent 
        chatId={selectedChatId} 
        onBack={() => setSelectedChatId(null)} 
        />
    ) : (
        <div className="hidden lg:flex h-full items-center justify-center text-muted-foreground italic">
        Select a conversation to start messaging
        </div>
    )}
</div> */}