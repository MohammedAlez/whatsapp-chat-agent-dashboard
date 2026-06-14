'use client'

import { Button } from './ui/button'
import { MessageCircleIcon, Pause } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { toggleAiPause } from '@/app/actions/chat.actions';



interface ChatHeaderProps {
    userInfo:{
        customerName: any;
        customerPhone: any;
        isAiPaused: any;
    } | null 
    chatId: string
}
function ChatHeader({userInfo, chatId}:ChatHeaderProps) {

    console.log("userInfo", userInfo)
    return (
        <div className='px-2 flex items-center justify-between border-b border-border py-4'>
            <div className="flex justify-center gap-2">
                <div className="relative">
                        <Avatar size="lg" className="bg-muted ">
                            <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png" alt={"user bg"} />
                        </Avatar>
                    </div>
                <div className="flex flex-col items-start justify-center">
                    <span className='font-bold text-sm'>{userInfo?.customerName}</span>
                    <span className="text-xs">+{userInfo?.customerPhone}</span>
                </div>
            </div>
            <div className="space-x-2">
                <Button variant="outline" size="lg" className='hover:bg-green-100'>
                    <MessageCircleIcon className="w-4 h-4 lg:mr-2" />
                    <span className="hidden lg:inline">open chat</span>
                </Button>
                <PauseAiButton chatId={chatId} userInfo={userInfo}/>
            </div>
        </div>
    )
}

export default ChatHeader




import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from 'react';

export function PauseAiButton({userInfo, chatId}:ChatHeaderProps) {

    const [loading, setLoading] = useState(false)

    const toggleAi=async()=>{
        try{
            setLoading(true)
            const res = await toggleAiPause(chatId, !userInfo?.isAiPaused)
            console.log("result ", res)
        }catch{
            alert("something went wrong")
        }finally{
            setLoading(false)
        }
    }

    return (
        <AlertDialog >
        <AlertDialogTrigger asChild>
            <Button variant="outline" size="lg">
                {loading ?
                    <span className="">loading...</span>
                : 
                <>
                    <Pause className="w-4 h-4 lg:mr-2" />
                    <span className="hidden lg:inline">{userInfo?.isAiPaused ? 'Enable' : 'Disable'} AI</span>
                </>}
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action will {userInfo?.isAiPaused ? 'enable' : 'disable'} the ai chat agent for this contact
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={toggleAi}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    )
}
