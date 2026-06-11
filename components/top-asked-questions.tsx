import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

function TopAskedQuestions() {
  const courses = [
    { id: 1, label: 'IELTS prep', count: 18, width: '90%', color: 'bg-violet-500' },
    { id: 2, label: 'Level 1–3', count: 14, width: '70%', color: 'bg-emerald-500' },
    { id: 3, label: 'Children', count: 9, width: '55%', color: 'bg-amber-500' },
    { id: 4, label: 'Business Eng', count: 6, width: '40%', color: 'bg-orange-500' },
    { id: 5, label: 'Conversation', count: 4, width: '25%', color: 'bg-slate-500' },
  ]

  return (
    <div className="">
        <Card className='h-full flex-1'>
            <CardHeader>
                <div>
                <CardTitle>Top asked courses</CardTitle>
                </div>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                {courses.map((course) => (
                    <div key={course.id} className="space-y-2">
                    <div className="flex items-center justify-between gap-3 text-sm font-medium text-foreground">
                        <span>{course.label}</span>
                        <span className="text-muted-foreground">{course.count}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                        <div
                        className={`${course.color} h-full rounded-full`}
                        style={{ width: course.width }}
                        />
                    </div>
                    </div>
                ))}
                </div>
            </CardContent>
        </Card>
    </div>
    )
}

export default TopAskedQuestions