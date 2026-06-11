import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageCircle, Library, Check } from "lucide-react"
import { cn } from "@/lib/utils"



const questions = [
  { id: "1", name: "Samar Al-Otaibi", phone: "+966 50 123 4567", question: "What's the difference between level 6 and 7 in content?", meta: "asked via voice message - transcribed", date: "today - 10:18", status: "open" },
  { id: "2", name: "Fahad Al-Shammari", phone: "+966 55 987 6543", question: "Do you have children's courses under 5 years?", meta: "asked via text", date: "today - 09:45", status: "open" },
  { id: "3", name: "Noura Al-Qahtani", phone: "+966 54 456 7890", question: "Do you accept bank transfers for payment?", meta: "asked via text", date: "today - 08:30", status: "handled" },
  { id: "4", name: "Abdullah Al-Dosari", phone: "+966 56 111 2233", question: "How long is the certificate valid? When does it expire?", meta: "asked via text", date: "yesterday - 14:20", status: "added to KB" },
]


interface QuestionProps {
  id: any;
  question: any;
  status: any;
  date: any;
  contactId: any;
  customerName: any;
  customerPhone: any;
  courseInterest: any;
}

export function QuestionsTable({data}:{data:QuestionProps[]}) {

  console.log("Questions unanswered", data)
  const questions = data
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-xs px-4 uppercase font-semibold tracking-wider text-muted-foreground">Customer</TableHead>
            <TableHead className="text-xs px-4 uppercase font-semibold tracking-wider text-muted-foreground">Question</TableHead>
            <TableHead className="text-xs px-4 uppercase font-semibold tracking-wider text-muted-foreground">Date</TableHead>
            <TableHead className="text-xs px-4 uppercase font-semibold tracking-wider text-muted-foreground">Status</TableHead>
            <TableHead className="text-xs px-4 uppercase font-semibold tracking-wider text-right text-muted-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Mapping through data... */}
          {questions.map((item, key)=>(
            <TableRow key={key} className="border-border hover:bg-muted/50 transition-colors">
                <TableCell className="py-4 px-4">
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-border">
                        <AvatarImage src={'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png'}/>
                        <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">SA</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">{item.customerName}</span>
                    <span className="text-xs text-muted-foreground">{item.customerPhone}</span>
                    </div>
                </div>
                </TableCell>
                <TableCell>
                <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground ">{item.question.slice(0,29)}...</span>
                    <span className="text-[10px] text-muted-foreground italic">asked via text</span>
                </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{(item.date as String).slice(0,10)}</TableCell>
                <TableCell>
                <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-none px-2.5 py-0.5 font-normal capitalize">{item.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground hover:bg-muted">
                    <MessageCircle className="h-4 w-4" /> open
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1.5 border-border bg-transparent hover:bg-muted">
                    <Library className="h-4 w-4" /> add to KB
                    </Button>
                </div>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}