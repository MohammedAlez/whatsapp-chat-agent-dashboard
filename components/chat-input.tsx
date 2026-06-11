'use client'

import { useState } from 'react';
import { Send, MessageCircle, X, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { ChatService } from '@/services/chat.service';
import { useRouter } from 'next/navigation';
import { Spinner } from "@/components/ui/spinner"
import {Message, MessageRole, MessageStatus} from '@/app/generated/prisma'
import { sendMessage } from '@/app/actions/chat.actions';


interface ChatInputProps {
  chatId:string
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}
function ChatInput({chatId, setMessages}:ChatInputProps) {


  const [isReplying, setIsReplying] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false)

  const router = useRouter()

  const handleSend = async() => {
    if (!message.trim() || isSending) return;
    console.log("Sending message:", message);

    const optimisticMessage = {
      id: crypto.randomUUID(),
      content: message,
      role: MessageRole.human_assistant,
      createdAt: new Date() ,
      type:"text",
      status:MessageStatus.pending,
      userId:chatId
    }


    // setIsSending(true)
    setMessage("");
    // setMessages(prev => [...prev])
    setMessages(prev => [...prev, optimisticMessage])


    // await ChatService.sendMessage(chatId, message)
    const newMessage = await sendMessage(chatId, message)
    console.log("newMessage is:", newMessage)
    // setIsSending(false)
    // router.refresh()


    
    // Optional: Return to button state after sending
    // setIsReplying(false); 
  };

  
  return (
    <div className="p-4 border-td border-border bg-background">
      <div className="max-w-4xl mx-auto relative flex justify-center items-center h-12 lg:h-14">
        <AnimatePresence mode="wait">
          {!isReplying ? (
            /* --- STEP 1: INITIAL BUTTON --- */
            <motion.div
              key="button"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Button 
                variant="outline" 
                onClick={() => setIsReplying(true)}
                className="rounded-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white hover:text-white cursor-pointer border-none px-8 h-12 shadow-lg shadow-indigo-500/20 active:scale-95 transition-transform"
              >
                <MessageCircle className="w-4 h-4" />
                Reply Manually
              </Button>
            </motion.div>
          ) : (
            /* --- STEP 2: EXPANDED INPUT --- */
            <motion.div
              key="input"
              initial={{ opacity: 0, width: "50%" }}
              animate={{ opacity: 1, width: "100%" }}
              exit={{ opacity: 0, width: "50%" }}
              className="flex items-center gap-2 w-full"
            >
              {/* Cancel Button to go back to "Manual Reply" state */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsReplying(false)}
                className="shrink-0 size-10 lg:size-11 active:scale-95 bg-indigo-600 hover:bg-indigo-600 cursor-pointer text-muted-foreground hover:text-foreground rounded-xl"
              >
                  <Sparkles className="size-4 lg:size-5 text-white" />
              </Button>

              <div className="relative flex-1 flex items-center gap-2">
                <Input
                  autoFocus
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="bg-muted/50 text-sm lg:text-base text-foreground focus-visible:ring-2 focus-visible:ring-indigo-500/30 h-11 lg:h-12 rounded-2xl border-none px-4"
                />
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <Button 
                    size="icon" 
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="bg-indigo-600 active:scale-95 hover:bg-indigo-700 shrink-0 size-10 lg:size-11 rounded-xl shadow-md disabled:opacity-50 transition-all"
                  >
                    {/* {isSending 
                      ? <Spinner />
                      : <Send className="size-4 lg:size-5 text-white" />
                    } */}
                    <Send className="size-4 lg:size-5 text-white" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ChatInput;