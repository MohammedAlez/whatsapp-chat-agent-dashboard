'use client'

import React, { useState, useEffect } from 'react'
import { Search, Download } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function QuestionsHeader() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get current active parameters
  const currentSearch = searchParams.get('q') || ''
  const currentDateFilter = searchParams.get('date') || 'all_time'

  // Keep search input state local
  const [searchTerm, setSearchTerm] = useState(currentSearch)

  // Sync input value ONLY if the URL search param actually shifts externally
  useEffect(() => {
    setSearchTerm(currentSearch)
  }, [currentSearch])

  // Clean Debounce: Listens ONLY to the local searchTerm string changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // 1. Create params based on latest URL state inside the function
      const params = new URLSearchParams(window.location.search)
      
      // 2. Only push if the search parameter actually changed
      const currentParam = params.get('q') || ''
      if (searchTerm === currentParam) return

      if (searchTerm) {
        params.set('q', searchTerm)
      } else {
        params.delete('q')
      }
      
      router.push(`?${params.toString()}`, { scroll: false })
    }, 400)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, router]) // <-- Removed searchParams dependency

  // Action handler for the dropdowns
  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search)
    
    if (value && value !== 'all_time') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-4">
      {/* Search Input */}
      <div className="relative flex w-full max-w-sm">
        <Input 
          placeholder="Search name or number" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-5 flex-1 block pr-11 bg-background focus-visible:ring-1 focus-visible:ring-indigo-600"
        />
        <div className="absolute right-1.5 top-1.25 size-5 h-8 w-8 flex items-center justify-center bg-indigo-500 rounded-lg pointer-events-none">
          <Search className="size-5 text-slate-100" />
        </div>
      </div>

      <div className="flex w-full lg:w-fit items-center justify-between gap-3">
        {/* Date Filter */}
        <Select 
          value={currentDateFilter} 
          onValueChange={(val) => updateParam('date', val)}
        >
          <SelectTrigger className="w-full lg:w-48 p-5">
            <SelectValue placeholder="Filter by date" />
          </SelectTrigger>
          <SelectContent className='p-2'>
            <SelectGroup className='p-1'>
              <SelectItem className='p-2.5 w-full' value="all_time">All Time</SelectItem>
              <SelectItem className='p-2.5 w-full' value="today">Today</SelectItem>
              <SelectItem className='p-2.5 w-full' value="this_week">This Week</SelectItem>
              <SelectItem className='p-2.5 w-full' value="this_month">This Month</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Export Button */}
        <Button variant="outline" className="gap-2 bg-indigo-500 text-slate-100 hover:bg-indigo-600 hover:text-slate-100 p-5 rounded-xl cursor-pointer">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  )
}