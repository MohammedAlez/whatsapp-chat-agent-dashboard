import { LeadService } from "@/services/lead.service"
import { LeadsTable } from "@/components/leads-table"

export default async function LeadsTableWrapper({
  status,
  course,
  q,
}:any) {
  const leads = await LeadService.getLeads({
    status,
    course,
    searchTerm: q,
  })

  return <LeadsTable data={leads} />
}