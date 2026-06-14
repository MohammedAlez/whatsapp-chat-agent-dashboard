// import { ChartAreaInteractive } from "@/components/chart-area-interactive"
// import { DataTable } from "@/components/data-table"
// import { SectionCards } from "@/components/section-cards"

// import data from "../data.json"
// import RecentLeads from "@/components/recent-leads"
// import UnansweredQuestions from "@/components/unanswered-questions"
// import SystemStatus from "@/components/system-status"
// import TopAskedQuestions from "@/components/top-asked-questions"
// import { SiteHeader } from "@/components/site-header"
// import { DashboardService } from "@/services/dashboard.service";



// export default async function Page() {

//   const stats = await DashboardService.getOverviewStats();
//   const recentLeads = await DashboardService.getRecentLeads() 
//   const unanswered_questions = await DashboardService.getUnansweredQuestions()
//   return (
//     <div className="flex flex-1 flex-col h-full">
//       <div className="@container/main flex flex-1 flex-col gap-2 ">
//         <div className="h-full flex flex-col gap-4 py-4 md:gap-6 md:py-6 max-h-[calc(100vh-20rem)]d ">
//           <SiteHeader title="Dashboard"/>
//           <SectionCards stats={stats}/>
//           <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 lg:px-6">
//               <RecentLeads recentLeads={recentLeads}/>
//               <UnansweredQuestions unanswered_questions={unanswered_questions}/>
//             </div>
//         </div>
//       </div>
//     </div>
//   )
// }



import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"

import data from "../data.json"
import RecentLeads from "@/components/recent-leads"
import UnansweredQuestions from "@/components/unanswered-questions"
import SystemStatus from "@/components/system-status"
import TopAskedQuestions from "@/components/top-asked-questions"
import { SiteHeader } from "@/components/site-header"
import { DashboardService } from "@/services/dashboard.service";
import { getOverviewStats, getRecentLeads, getUnansweredQuestions } from "@/app/actions/dashboard.actions"



export default async function Page() {

  const stats = await getOverviewStats();
  const recentLeads = await getRecentLeads() 
  const unanswered_questions = await getUnansweredQuestions()
  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="@container/main flex flex-1 flex-col gap-2 ">
        <div className="h-full flex flex-col gap-4 py-4 md:gap-6 md:py-6 max-h-[calc(100vh-20rem)]d ">
          <SiteHeader title="Dashboard"/>
          <SectionCards stats={stats}/>
          <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 lg:px-6">
              <RecentLeads recentLeads={recentLeads}/>
              <UnansweredQuestions unanswered_questions={unanswered_questions}/>
            </div>
        </div>
      </div>
    </div>
  )
}
