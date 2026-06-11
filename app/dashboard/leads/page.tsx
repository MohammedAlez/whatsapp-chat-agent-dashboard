import { LeadsCards } from '@/components/leads-cards'
import LeadsFilters from '@/components/leads-filters'
import { LeadsHeader } from '@/components/leads-screen-header'
import { LeadsTable } from '@/components/leads-table'
import { SiteHeader } from '@/components/site-header'
import { LeadService } from '@/services/lead.service'
import React, { Suspense } from 'react'
import LeadsTableWrapper from './leads-table-wrapper'

async function Page({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; course?: string; q?: string }>
}) {

  const {status='all', course='all', q=''} = await searchParams

  console.log("status,", status)
  console.log("course", course)

  const stats = await LeadService.getLeadStats()

  return (
    <>
      <SiteHeader title='Leads'/>
      <main className="container mx-auto px-4">
        <LeadsHeader />
        <div className="mt-4">
          {/* Pass the fetched data down as props */}
          <LeadsCards data={stats} />
          
          {/* Filters need to know the current active state */}
          <LeadsFilters 
            currentStatus={status} 
            currentCourse={course} 
          />
          
          <Suspense fallback={<TableSkelton />} key={`${status}-${course}-${q}`}>
            <LeadsTableWrapper
              status={status}
              course={course}
              q={q}
            />
          </Suspense>
        </div>
      </main>
    </>
  )
}

export default Page



const TableSkelton =()=>(
  <div className="rounded-lg border border-border bg-card overflow-hidden">
    <div className="animate-pulse divide-y divide-border">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-4">
          <div className="h-9 w-9 rounded-full bg-muted" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-3 w-32 rounded bg-muted" />
            <div className="h-3 w-24 rounded bg-muted" />
          </div>
          <div className="h-3 w-20 rounded bg-muted ml-auto" />
        </div>
      ))}
    </div>
  </div>
)