import { cn } from '@/lib/utils'
import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'



const filters = [
  { id: "all", label: "All" },
  { id: "courses", label: "Courses" },
  { id: "pricing", label: "Pricing" },
  { id: "enrollment", label: "Enrollment" },
  { id: "general", label: "General" },
]


function KBFilters() {
  return (
    <div className='py-4 flex flex-col gap-2 lg:flex-row justify-between'>

        <div className="flex flex-wrap gap-1">
            {filters.map((filter, index) => (
                <button
                key={filter.id}
                className={cn(
                    "rounded-lg border px-2.5 py-1 text-xs md:text-sm cursor-pointer font-medium transition",
                    index === 0 ? "bg-indigo-100 text-indigo-700" : "bg-background text-muted-foreground"
                )}
                >
                {filter.label}
                </button>
            ))}
        </div>

        <div className="rounded-2xl flex gap-2 flex-col lg:flex-row">
            <Select >
                <SelectTrigger className="w-full md:w-48 p-5">
                    <SelectValue placeholder="all courses" />
                </SelectTrigger>
                <SelectContent className='p-2'>
                    <SelectGroup className='p-1'>
                    {/* <SelectLabel></SelectLabel> */}
                    <SelectItem className='p-2.5 w-full' value="apple">Business english</SelectItem>
                    <SelectItem className='p-2.5 w-full' value="banana">ILETS</SelectItem>
                    <SelectItem className='p-2.5 w-full' value="blueberry">Children</SelectItem>
                    <SelectItem className='p-2.5 w-full' value="grapes">Conversation</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>
  )
}

export default KBFilters