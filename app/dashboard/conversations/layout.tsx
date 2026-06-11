// import ConversationsWrapper from "@/components/conversations-wrapper"
// import { SiteHeader } from "@/components/site-header"
// import { ChatService } from "@/services/chat.service"

// export default async function ConversationsLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const conversations = await ChatService.getConversations()

//   console.log(conversations)
//   return (
//     <div className="">
//         <SiteHeader title="Conversations" />
//         <ConversationsWrapper initialChats={conversations}>
//             {children}
//         </ConversationsWrapper>
//     </div>
    
//   )
// }


import ConversationsWrapper from "@/components/conversations-wrapper"
import { SiteHeader } from "@/components/site-header"
import { getConversations } from "@/app/actions/chat.actions"

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const conversations = await getConversations()

  console.log("conversations", conversations)
  return (
    <div className="">
        <SiteHeader title="Conversations" />
        <ConversationsWrapper initialChats={conversations}>
            {children}
        </ConversationsWrapper>
    </div>
    
  )
}