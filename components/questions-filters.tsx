'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useRouter, useSearchParams } from 'next/navigation';



const filters = [
  { id: "all", label: "All" },
  { id: "open", label: "Open" },
  { id: "handled", label: "Handled" },
  { id: "added-to-kb", label: "Added to KB" },
]


export function QuestionsFilters({ currentStatus, currentCourse }: { currentStatus: string, currentCourse: string }) {
  
    const router = useRouter();
      const searchParams = useSearchParams();
    
      // Helper function to update URL params without losing existing ones
      const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (value && value !== 'all') {
          params.set(key, value);
        } else {
          params.delete(key);
        }
    
        // Push the new URL, triggering a server re-fetch
        router.push(`?${params.toString()}`);
    }
  
    return (
        <div className='py-4 flex flex-col gap-2 lg:flex-row justify-between'>
          {/* Status Buttons */}
          <div className="flex flex-wrap gap-1">
            {filters.map((filter) => {
              const isActive = currentStatus === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => updateFilter('status', filter.id)}
                  className={cn(
                    "rounded-lg border px-2.5 py-1 text-xs md:text-sm cursor-pointer font-medium transition",
                    isActive ? "bg-indigo-100 text-indigo-700" : "bg-background text-muted-foreground hover:bg-muted"
                  )}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
    
          {/* Course Dropdown */}
          <div className="rounded-2xl flex gap-2 flex-col lg:flex-row">
            <Select 
              value={currentCourse} 
              onValueChange={(val) => updateFilter('course', val)}
            >
              <SelectTrigger className="w-full md:w-48 p-5">
                <SelectValue placeholder="all courses" />
              </SelectTrigger>
              <SelectContent className='p-2'>
                <SelectGroup className='p-1'>
                  <SelectItem className='p-2.5 w-full' value="all">All Courses</SelectItem>
                  <SelectItem className='p-2.5 w-full' value="business_english">Business english</SelectItem>
                  <SelectItem className='p-2.5 w-full' value="ielts">IELTS</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
    )
}

