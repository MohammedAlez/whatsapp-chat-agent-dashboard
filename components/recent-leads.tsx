import React from 'react'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Lead } from '@/types/database'

function RecentLeads({recentLeads}:{recentLeads:Lead[]}) {
  // Dummy data - replace with actual data source
  const leads = [
    {
      id: 1,
      name: 'John Doe',
      photo: '/avatars/john.jpg', // Replace with actual image path
      interest: 'Web Development',
      gender: 'Male',
      status: 'new'
    },
    {
      id: 2,
      name: 'Jane Smith',
      photo: '/avatars/jane.jpg',
      interest: 'Data Science',
      gender: 'Female',
      status: 'contacted'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      photo: '/avatars/bob.jpg',
      interest: 'UX Design',
      gender: 'Male',
      status: 'enrolled'
    }
  ]

//   console.log(recentLeads)
  return (
    <div className='h-full'>
        <Card className={`h-full`}> 
            {recentLeads.length > 0 
            ?
            <>
                <CardHeader className=''>
                    <CardTitle>Recent Leads</CardTitle>
                    <CardAction className='text-sm group  font-medium text-purple-600 cursor-pointer flex items-center gap-1'>
                        view all
                        <ArrowRight className='size-3! group-hover:translate-x-1 transition' />    
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 ">
                        {recentLeads.map((lead, index) => (
                            <React.Fragment key={lead.id}>
                                <div className="flex items-center justify-between ">
                                    <div className="flex items-center gap-3">
                                        <Avatar size="default">
                                            <AvatarImage src={lead.id} alt={lead.customer.name} />
                                            <AvatarFallback>{lead.customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium text-sm">{lead.customer.name}</p>
                                                <Badge className={`text-xs ${
                                                    lead.status === 'new' 
                                                        ? 'bg-green-100 text-green-800 border-green-200' 
                                                        : lead.status === 'contacted' 
                                                        ? 'bg-blue-100 text-blue-800 border-blue-200' 
                                                        : 'bg-purple-100 text-purple-800 border-purple-200'
                                                }`}>
                                                    {lead.status}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {/* {lead.course_interest} • {lead.gender} */}
                                            </p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline" className="bg-green-100 text-green-800 hover:bg-green-300 border-green-300">
                                        Open Chat
                                        <MessageCircle className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                                {index < recentLeads.length - 1 && <Separator />}
                            </React.Fragment>
                        ))}
                    </div>
                    
                </CardContent>
            </>
            :
            <div className="flex-1 flex justify-center items-center font-bold">
                No captured Leads yet
            </div>
            }
        </Card>

    </div>
  )
}

export default RecentLeads