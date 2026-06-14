



// import React from 'react'
// import ChatHeader from './chat-header'
// import ChatMessages from './chat-messages'
// import ChatInput from './chat-input'
// import { ChevronLeft } from 'lucide-react'
// import Link from 'next/link'
// import { ChatService } from '@/services/chat.service'

// interface ContentProps {
//   chatId: string;
//   userInfo: {
//       customerName: any;
//       customerPhone: any;
//       isAiPaused: any;
//   } | null
// }

// async function ConversationContent({ chatId, userInfo }: ContentProps) {


//   const data = await ChatService.getMessages(chatId)

//     console.log("messages from content", data)
//     console.log("hi from content", chatId)
    
//     return (
//       <div className='flex flex-col h-full bg-background'>
//           <div className="flex items-center border-b border-border px-2">
//               {/* Mobile-only Back Button */}
//               <Link 
//                 href={'/dashboard/conversations'}
//                 className="lg:hidden p-2 hover:bg-muted rounded-full transition-colors mr-1"
//               >
//                 <ChevronLeft className="w-6 h-6 text-foreground" />
//               </Link>
//               <div className="flex-1">
//                   <ChatHeader userInfo={userInfo}/>
//               </div>
//           </div>
          
          
//           <ChatMessages initialMessages={data} chatId={chatId}/>

//           {/* <div className="flex-1 min-h-0 bg-slate-50/30"> 
//             <ChatMessages initialMessages={data} chatId={chatId}/>
//           </div> */}
          
//           {/* <div className="p-2 bg-background border-t">
//             <ChatInput chatId={chatId}/>
//           </div> */}
//       </div>
//     )
// }

// export default ConversationContent







import React from 'react'
import ChatHeader from './chat-header'
import ChatMessages from './chat-messages'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { getMessages } from '@/app/actions/chat.actions'


interface ContentProps {
  chatId: string;
  userInfo: {
      customerName: any;
      customerPhone: any;
      isAiPaused: any;
  } | null
}

async function ConversationContent({ chatId, userInfo }: ContentProps) {


  const data = await getMessages(chatId)

    console.log("messages from content", data)
    console.log("hi from content", chatId)
    
    return (
      <div className='flex flex-col h-full bg-background'>
          <div className="flex items-center border-b border-border px-2">
              {/* Mobile-only Back Button */}
              <Link 
                href={'/dashboard/conversations'}
                className="lg:hidden p-2 hover:bg-muted rounded-full transition-colors mr-1"
              >
                <ChevronLeft className="w-6 h-6 text-foreground" />
              </Link>
              <div className="flex-1">
                  <ChatHeader userInfo={userInfo} chatId={chatId}/>
              </div>
          </div>
          
          
          <ChatMessages initialMessages={data} chatId={chatId}/>

          {/* <div className="flex-1 min-h-0 bg-slate-50/30"> 
            <ChatMessages initialMessages={data} chatId={chatId}/>
          </div> */}
          
          {/* <div className="p-2 bg-background border-t">
            <ChatInput chatId={chatId}/>
          </div> */}
      </div>
    )
}

export default ConversationContent