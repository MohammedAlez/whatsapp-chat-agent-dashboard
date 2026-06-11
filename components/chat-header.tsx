import React from 'react'
import { Button } from './ui/button'
import { MessageCircleIcon, Pause } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'



interface ChatHeaderProps {
    userInfo:{
        customerName: any;
        customerPhone: any;
        isAiPaused: any;
    } | null 
}
function ChatHeader({userInfo}:ChatHeaderProps) {

 
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
                <Button variant="outline" size="lg">
                    <Pause className="w-4 h-4 lg:mr-2" />
                    <span className="hidden lg:inline">pause AI</span>
                </Button>
            </div>
        </div>
    )
}

export default ChatHeader