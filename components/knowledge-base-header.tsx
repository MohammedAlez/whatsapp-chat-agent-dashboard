
import React from 'react'
import { Search, Download, Import, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function KBHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-4">
      {/* Search Input */}
      <div className="relative flex w-full max-w-sm ">
        <Input 
          placeholder="Search entries" 
          className="p-5 flex-1 block pr-11 bg-background focus-visible:ring-1 focus-visible:ring-indigo-600"
        />
        <button className=" absolute right-1.5 top-1.25 size-5 h-8 cursor-pointer w-8 flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-lg">
            <Search className="size-5  text-slate-100" />
        </button>
      </div>

      <div className="flex w-full lg:w-fit items-center justify-between gap-3">
        {/* Date Filter */}
        <Select >
            <SelectTrigger className="w-full w-48 p-5">
                <SelectValue placeholder="This Month" />
            </SelectTrigger>
            <SelectContent className='p-2'>
                <SelectGroup className='p-1'>
                {/* <SelectLabel></SelectLabel> */}
                <SelectItem className='p-2.5 w-full' value="apple">This Month</SelectItem>
                <SelectItem className='p-2.5 w-full' value="banana">This Week</SelectItem>
                <SelectItem className='p-2.5 w-full' value="blueberry">Today</SelectItem>
                <SelectItem className='p-2.5 w-full' value="grapes">All Time</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>

        {/* Export Button */}
        <Button variant="outline" className="gap-2 bg-indigo-500 text-slate-100 hover:bg-indigo-600 hover:text-slate-100 p-5 rounded-xl cursor-pointer">
          <Import className="h-4 w-4" />
          Import CSV
        </Button>
        <Button variant="outline" className="gap-2 bg-indigo-500 text-slate-100 hover:bg-indigo-600 hover:text-slate-100 p-5 rounded-xl cursor-pointer">
          <Download className="h-4 w-4" />
          Export 
        </Button>
        <KBHeader />
      </div>
    </div>
  )
}




// import { useState } from 'react'
// import { HelpCircle } from 'lucide-react'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"

// interface AddEntryProps {
//   onAddEntry?: (entry: { question: string; answer: string; tag: string }) => void
// }

// const AddEntry=({ onAddEntry }: AddEntryProps)=>{

//     const [open, setOpen] = useState(false)
//     const [question, setQuestion] = useState('')
//     const [answer, setAnswer] = useState('')
//     const [tag, setTag] = useState('')
    
//     const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!question || !answer || !tag) return

//     if (onAddEntry) {
//         onAddEntry({ question, answer, tag })
//     }

//     // Reset form state and close modal
//     setQuestion('')
//     setAnswer('')
//     setTag('')
//     setOpen(false)
//     }

//     return (
//         <Dialog open={open} onOpenChange={setOpen} >
//             <DialogTrigger asChild className='p-2'>
//                 <Button className="gap-2 bg-indigo-500 text-slate-100 hover:bg-indigo-600 hover:text-slate-100 p-5 rounded-xl cursor-pointer">
//                     <Plus size={16} />
//                     Add Entry
//                 </Button>
//             </DialogTrigger>
            
//             <DialogContent className="sm:max-w-131.25 rounded-2xl p-6">
//                 <DialogHeader>
//                     <DialogTitle className="flex gap-2 items-center text-xl">
//                         <HelpCircle size={22} className="text-indigo-500" />
//                         Create Knowledge Base Entry
//                     </DialogTitle>
//                     <DialogDescription>
//                         Add a new question and answer pairs to train your AI agent.
//                     </DialogDescription>
//                 </DialogHeader>

//                 <form onSubmit={handleSubmit} className="space-y-5 py-2">
//                 {/* Question Input */}
//                 <div className="space-y-2">
//                     <Label htmlFor="question" className="text-sm font-semibold text-muted-foreground">
//                     Question
//                     </Label>
//                     <Input
//                     id="question"
//                     placeholder="e.g., What are your shipping rates?"
//                     value={question}
//                     onChange={(e) => setQuestion(e.target.value)}
//                     className="rounded-xl border-input bg-background px-3 py-5 focus-visible:ring-indigo-500"
//                     required
//                     />
//                 </div>

//                 {/* Tag Select Dropdown */}
//                 <div className="space-y-2">
//                     <Label htmlFor="tag" className="text-sm font-semibold text-muted-foreground">
//                     Category Tag
//                     </Label>
//                     <Select value={tag} onValueChange={setTag} required>
//                     <SelectTrigger id="tag" className="rounded-xl p-5 w-full focus:ring-indigo-500">
//                         <SelectValue placeholder="Select a category" />
//                     </SelectTrigger>
//                     <SelectContent className="p-2">
//                         <SelectItem className='p-2.5 w-full ' value="schedules">Schedules</SelectItem>
//                         <SelectItem className='p-2.5 w-full ' value="courses">Courses</SelectItem>
//                         <SelectItem className='p-2.5 w-full ' value="pricing">Pricing</SelectItem>
//                         <SelectItem className='p-2.5 w-full ' value="enrollment">Enrollment</SelectItem>
//                         <SelectItem className='p-2.5 w-full ' value="general">General</SelectItem>
//                     </SelectContent>
//                     </Select>
//                 </div>
//                 {/* Answer Textarea */}
//                 <div className="space-y-2">
//                     <Label htmlFor="answer" className="text-sm font-semibold text-muted-foreground">
//                     Answer
//                     </Label>
//                     <Textarea
//                     id="answer"
//                     placeholder="Provide a clear and concise response for the AI..."
//                     value={answer}
//                     onChange={(e) => setAnswer(e.target.value)}
//                     className="min-h-[120px] rounded-xl resize-none focus-visible:ring-indigo-500"
//                     required
//                     />
//                 </div>

//                 <DialogFooter className="p-2 bg-transparent border-none">
//                     <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => setOpen(false)}
//                     className="rounded-xl px-4 py-5"
//                     >
//                     Cancel
//                     </Button>
//                     <Button
//                     type="submit"
//                     className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-5 py-5"
//                     >
//                     Save Entry
//                     </Button>
//                 </DialogFooter>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     )
// }