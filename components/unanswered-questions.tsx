import React from 'react'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { ArrowRight, MessageCircle } from 'lucide-react'

type UnansweredQuestions = {
    id: any;
    question: any;
    created_at: any;
    kb_status: any;
    contact_id: any;
    contacts: {
        platform_id: any;
        platform: any;
    }[];
}[]

function UnansweredQuestions({unanswered_questions}:{unanswered_questions:UnansweredQuestions}) {
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

    function getRelativeTime(dateString: string) {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} min${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    return past.toLocaleDateString(); // Fallback for very old dates
    }
    console.log("unanswered_questions", unanswered_questions)
    return (
        <div className='h-full'>
            <Card className='h-full'> 
                <CardHeader className=''>
                    <CardTitle>Unanswered Questions</CardTitle>
                    <CardAction className='text-sm group  font-medium text-purple-600 cursor-pointer flex items-center gap-1'>
                        view all
                        <ArrowRight className='size-3! group-hover:translate-x-1 transition' />    
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 ">
                        {unanswered_questions.map((question, index) => (
                            <React.Fragment key={question.id}>
                                <div className="flex items-center justify-between ">
                                    <div className="grid grid-cols-1 gap-3">
                                        {/* <Avatar size="default">
                                            <AvatarImage src={question.photo} alt={question.name} />
                                            <AvatarFallback>{question.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar> */}
                                        {/* <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium text-sm">{question.name}</p>
                                                <Badge className={`text-xs ${
                                                    question.status === 'new' 
                                                        ? 'bg-green-100 text-green-800 border-green-200' 
                                                        : question.status === 'contacted' 
                                                        ? 'bg-blue-100 text-blue-800 border-blue-200' 
                                                        : 'bg-purple-100 text-purple-800 border-purple-200'
                                                }`}>
                                                    {question.status}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {question.interest} • {question.gender}
                                            </p>
                                        </div> */}
                                        <CardTitle className="text-sm font-medium">
                                            +966 55 123 4567
                                        </CardTitle>
                                        <p className="text-xs text-muted-foreground">
                                            {question.question}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <p className="text-xs text-muted-foreground">
                                            {getRelativeTime(question.created_at)}
                                        </p>
                                        <Button size="sm" variant="link" className="text-sm  text-purple-400 bg-none hover:bg-none border-none hover:text-purple-600 cursor-pointer">
                                            <MessageCircle className="ml-2 h-4 w-4" />
                                            Open Chat
                                        </Button>                               
                                    </div>
                                </div>
                                {index < unanswered_questions.length - 1 && <Separator />}
                            </React.Fragment>
                        ))}
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}

export default UnansweredQuestions