'use client'

import { Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"
import { getConversations, searchConversations } from "@/app/actions/chat.actions"


type Filters = {
  id:'all' | 'ai_handling' | 'escalated',
  label:string
}
const filters:Filters[] = [
  { id: "all", label: "All" },
  { id: "ai_handling", label: "AI handling" },
  { id: "escalated", label: "Escalated" },
  // { id: "lead-saved", label: "Lead saved" },
]

interface SidebarProps {
  chats: any[] // Pass from parent
}

export default function ConversationSidebar({ chats }: SidebarProps) {
  
  const params = useParams<{id:string}>()
  const selectedId = params.id

  const [chatsList, setChatsList] = useState(chats)

  const [searchQuery, setSearchQuery] = useState('')
  const handleSearch=async()=>{
    try{
      const filteredChats = await searchConversations(searchQuery)
      console.log("filteredChats: ", filteredChats)
      setChatsList(filteredChats)
    }catch{
      alert("something went wrong")
    }
  }

  const [filter, setFilter] = useState<"all" | 'escalated' | 'ai_handling'>('all')
  const handleFilter=async()=>{
    
    try{
      // const res = await getConversations(filter)
      // console.log(res)
    }catch{
      alert("something went wrong while applying filters")
    }
  }
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex-1 overflow-hidden rounded-xl border border-border bg-card/90">
        {/* ... rest of your JSX, use the `chats` prop instead of hardcoded data */}
        <div className="border-b border-border px-4 py-4 space-y-3">
          <p className="text-sm font-medium text-foreground">Recent chats</p>
          <div className="relative">
            <button onClick={handleSearch} disabled={searchQuery==''} className={`h-7 w-7 rounded-md ${searchQuery!='' ? 'bg-indigo-500' : 'bg-gray-200'} -translate-y-1/2 cursor-pointer absolute right-1 top-1/2 flex items-center justify-center`}>
              <Search className={`h-4 w-4   ${searchQuery!='' ? 'text-white' : 'text-black'}`} />
            </button>
            <Input
              placeholder="Search chats"
              className="pl-3 pr-3 h-9 bg-muted/50 border-none focus-visible:ring-indigo-500"
              value={searchQuery}
              onChange={(e)=>setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-1">
            {filters.map((item, index) => (
              <button
                key={item.id}
                className={cn(
                  "cursor-pointer rounded-full border px-2 py-1 text-[11px] font-medium transition",
                  item.id === filter ? "bg-indigo-100 text-indigo-700" : "bg-muted text-muted-foreground"
                )}
                onClick={()=>{
                  setFilter(item.id)
                  handleFilter()
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-y-auto px-2 py-2 space-y-1">
          {chatsList.map((chat) => {
            const isActive = selectedId === chat.id
            return (
              <Link 
                href={"/dashboard/conversations/"+chat.id}
                key={chat.id}
                className={cn(
                  "group flex w-full items-start gap-3 rounded-2xl p-4 text-left transition",
                  isActive ? "bg-indigo-500 shadow-lg" : "hover:bg-muted/50"
                )}
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{chat?.name[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className={cn("truncate text-sm font-bold", isActive ? "text-white" : "text-foreground")}>
                    {chat.name}
                  </p>
                  <p className={cn("truncate text-[11px] mt-2", isActive ? "text-indigo-50" : "text-muted-foreground")}>
                    {chat.lastMessage.content}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}