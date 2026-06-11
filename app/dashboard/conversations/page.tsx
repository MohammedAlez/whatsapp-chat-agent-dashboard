import React from "react"
import { SiteHeader } from "@/components/site-header"
import ConversationsWrapper from "@/components/conversations-wrapper"
import { ChatService } from "@/services/chat.service"

async function Page() {
  // Fetch on the server
  // const initialChats = await ChatService.getConversations()

  return (
    <>
      <div className="hidden lg:flex h-full items-center justify-center">
        Select a conversation
      </div>
    </>
  )
}

export default Page