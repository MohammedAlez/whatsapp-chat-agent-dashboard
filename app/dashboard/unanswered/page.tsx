import { SiteHeader } from '@/components/site-header'
import { QuestionsHeader } from '@/components/questions-header'
import { QuestionsCards } from '@/components/questions-cards'
import { QuestionsFilters } from '@/components/questions-filters'
import { QuestionsTable } from '@/components/questions-table'
import { Lightbulb } from 'lucide-react'
import { UnansweredService } from '@/services/unanswered.service'
import UnansweredsTableWrapper from './unanswered-table-wrapper'
import { Suspense } from 'react'

 export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; course?: string; q?: string }>
}) {

  const {status='all', course='all', q=''} = await searchParams
  
    console.log("status,", status)
    console.log("course", course)
  
    const stats = await UnansweredService.getQuestionStats()

    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader title="Unanswered Questions" />
        <main className="container mx-auto px-4 pb-10">
          <QuestionsHeader />
          <div className="mt-4 flex flex-col gap-6">
            <QuestionsCards data={stats}/>
            
            {/* Alert Banner */}
            <div className="flex items-center gap-3 rounded-xl bg-slate-500/10 border border-indigo-500/20 p-4 text-sm text-slate-600">
              <Lightbulb className="h-5 w-5 text-slate-400 shrink-0 " />
              <p>
                Questions marked <span className="font-bold">"added to KB"</span> have been added to the knowledge base.
              </p>
            </div>

            <QuestionsFilters currentCourse={course} currentStatus={status}/>
            <Suspense fallback={<TableSkelton />} key={`${status}-${course}-${q}`}>
                <UnansweredsTableWrapper
                  status={status}
                  course={course}
                  q={q}
                />
            </Suspense>
          </div>
        </main>
      </div>
    )
}




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