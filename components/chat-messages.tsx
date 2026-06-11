'use client'

import { useEffect, useRef, useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import ChatInput from './chat-input';
import {Message, MessageRole} from '@/app/generated/prisma'

// interface Message {
//   id: string;
//   senderName: string;
//   content: string;
//   timestamp: string;
//   isUser: boolean;
//   status?: 'transcribed' | 'escalated' | string;
// }

// const messages: Message[] = [
//   { id: '1', senderName: 'Samar', content: 'Hello, peace be upon you.', timestamp: '10:14', isUser: true },
//   { id: '2', senderName: 'AI · Prudle', content: "Welcome! I'm the smart assistant for Prudle Institute. I can help you with inquiries about courses, levels, schedules, and registration.", timestamp: '10:14', isUser: false },
//   { id: '3', senderName: 'Samar', content: 'Which one is better if I want to study in Canada? What is the difference between TOEFL and IELTS?', timestamp: '10:16', isUser: true },
//   { id: '4', senderName: 'AI · Prudle', content: 'IELTS is more common for admission to Canadian universities. Both are recognized in Canada.', timestamp: '10:16', isUser: false },
//   { id: '5', senderName: 'AI · Prudle', content: 'Our team will contact you regarding your inquiry.', timestamp: '10:18', isUser: false, status: 'escalated' },
//   { id: '6', senderName: 'Samar', content: 'Which one is better if I want to study in Canada? What is the difference between TOEFL and IELTS?', timestamp: '10:16', isUser: true },
//   { id: '7', senderName: 'AI · Prudle', content: 'IELTS is more common for admission to Canadian universities. Both are recognized in Canada.', timestamp: '10:16', isUser: false },
//   { id: '8', senderName: 'AI · Prudle', content: 'Our team will contact you regarding your inquiry.', timestamp: '10:18', isUser: false, status: 'escalated' },
// ];

interface MessagesProps {
  initialMessages:Message[]

  chatId:string
}
function ChatMessages({initialMessages, chatId}:MessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState(initialMessages)

  console.log("intial messages ", messages)
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages.length]);

  return (
    <>
      <div className="flex-1 min-h-0 bg-slate-50/30"> 
        <div className="relative h-full w-full bg-[#F8FAFC]">
          <ScrollArea 
            ref={scrollRef} 
            className="h-full w-full p-4"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
            }}
          >
            <div className="flex flex-col gap-6 py-8">
              {messages.map((msg, index) => {
                let created_at = (new Date(msg.createdAt)).toISOString()
                return (
                  <div
                    key={`${msg.id}-${index}`}
                    className={cn(
                      "flex flex-col max-w-[85%] sm:max-w-[75%]",
                      msg.role == MessageRole.customer ? "ml-auto items-end" : "mr-auto items-start"
                    )}
                  >
                    {/* Sender Name */}
                    <span className="text-[11px] font-medium text-muted-foreground/70 mb-1.5 px-1 uppercase tracking-wider">
                      {/* {msg.id} */}
                    </span>

                    {/* Message Bubble */}
                    <div
                      className={cn(
                        "px-4 py-3 rounded-2xl text-[13px] shadow-sm leading-relaxed",
                        msg.role == MessageRole.customer 
                          ? "bg-indigo-100d bg-muted text-indigo-950 rounded-tr-none border border-indigo-100" 
                          : "bg-indigo-100 text-indigo-700 rounded-tl-none shadow-md shadow-slate-200/50"
                      )}
                    >
                      {msg.content}
                    </div>
                    
                    {/* Footer: Time & Status */}
                    <div className="flex items-center gap-1.5 mt-1.5 px-1">
                      {msg.role == MessageRole.customer && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                      <span className="text-[10px] font-medium text-muted-foreground">
                        {(created_at as String).slice(0,10) + " - " + (created_at as String).slice(11,16)}
                      </span>
                      {/* {msg.status && (
                        <>
                          <span className="text-[10px] text-muted-foreground/50">•</span>
                          <span className={cn(
                            "text-[10px] font-semibold uppercase tracking-tight",
                            msg.status === 'escalated' ? "text-amber-600" : "text-muted-foreground"
                          )}>
                            {msg.status}
                          </span>
                        </>
                      )} */}
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className="p-2 bg-background border-t">
        <ChatInput chatId={chatId} setMessages={setMessages}/>
      </div>
    </>
  );
}

export default ChatMessages;