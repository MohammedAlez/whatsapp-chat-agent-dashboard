import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Edit, Edit2, List, Trash, Trash2 } from 'lucide-react'
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const FAQData = [
  {
    question: "What are the working hours?",
    tag: "schedules",
    answer: "Sunday to Wednesday, 2 hours per day. Morning and evening shifts available. Course runs for approximately 4 weeks.",
    usageCount: 47,
    addedAgo: "3 days ago"
  },
  {
    question: "Do you offer IELTS preparation courses?",
    tag: "courses",
    answer: "Yes, we offer specialized IELTS prep courses including practice tests, speaking sessions, writing feedback, and exam strategies. Course duration is 4 weeks.",
    usageCount: 89,
    addedAgo: "1 week ago"
  },
  {
    question: "What is the difference between Level 6 and Level 7?",
    tag: "courses",
    answer: "Level 6 focuses on building fluency in everyday conversations, while Level 7 introduces more complex topics and advanced grammar structures. Level 7 also includes formal writing skills.",
    usageCount: 34,
    addedAgo: "2 weeks ago"
  },
  {
    question: "Is there a discount for returning students?",
    tag: "pricing",
    answer: "Yes, Prudle Membership gives registered students and alumni a 20% discount on future courses at headquarters.",
    usageCount: 56,
    addedAgo: "1 month ago"
  },
  {
    question: "How do I register for a course?",
    tag: "enrollment",
    answer: "To register, provide your name, phone number, course interest, and gender. Our team will contact you to complete the registration and schedule a free placement test.",
    usageCount: 71,
    addedAgo: "2 months ago"
  }
];

function KBEntries() {
  return (
    <div className=''>
        <Card>
            <CardHeader>
                <CardTitle className='flex gap-2'>
                    <List size={20} className='text-indigo-500'/>
                    Entries
                </CardTitle>
                <CardAction className='text-primary'>
                    showing 42 of 42
                </CardAction>
            </CardHeader>
            <CardContent className='space-y-3'>
                {FAQData.map((item, index)=>{
                    return (
                        <Card key={index}>
                            <CardHeader className='font-bold flex gap-2 items-center'>
                                {item.question}
                                <Badge className='bg-indigo-500'>
                                    {item.tag}
                                </Badge>
                            </CardHeader>
                            <CardContent className='space-y-2'>
                                <div className="">
                                    {item.answer}
                                </div>
                                <div className="flex items-center justify-between ">
                                    <div className="font-medium">
                                        Used {item.usageCount} time{item.usageCount>1 ? 's' : ''} · {item.addedAgo}
                                    </div>
                                    <div className="space-x-2">
                                        <Button className='cursor-pointer p-3 py-5 rounded-xl bg-accent text-foreground'>
                                            <Edit2 size={11}/>
                                            edit
                                        </Button>
                                        <Button className='cursor-pointer p-3 py-5 rounded-xl bg-accent text-foreground'>
                                            <Trash2 size={11}/>
                                            delete
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                                
                            
                        </Card>
                    )
                })}
            </CardContent>
        </Card>
    </div>
  )
}

export default KBEntries