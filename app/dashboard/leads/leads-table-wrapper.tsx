import { LeadService } from "@/services/lead.service"
import { LeadsTable } from "@/components/leads-table"
import { getLeads } from "@/app/actions/lead.actions"

export default async function LeadsTableWrapper({
  status,
  service,
  q,
}:any) {
  const leads = await getLeads({
    searchTerm: q,
    status,
    service,
  })

  return <LeadsTable data={leads} />
}