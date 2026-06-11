// import ConversationContent from "@/components/conversation-content"
// import { ChatService } from "@/services/chat.service"
// import { id } from "zod/locales"

// export default async function ChatPage({
//   params,
// }: {
//   params: Promise<{ id: any }>
// }) {

//     const {id} = await params
//     console.log(id)

//     const userInfo = await ChatService.getChatHeaderInfo(id)
    
//   return (
//     <ConversationContent chatId={id} userInfo={userInfo}/>
//   )
// }



import ConversationContent from "@/components/conversation-content"
import { getChatHeaderInfo } from "@/app/actions/chat.actions"
import { id } from "zod/locales"

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: any }>
}) {

    const {id} = await params
    console.log(id)

    const userInfo = await getChatHeaderInfo(id)
    
  return (
    <ConversationContent chatId={id} userInfo={userInfo}/>
  )
}