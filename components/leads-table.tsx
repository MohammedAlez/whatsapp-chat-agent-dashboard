import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const leads = [
  {
    id: "1",
    name: "Samar Al-Otaibi",
    phone: "+966 50 123 4567",
    course: "IELTS Prep",
    gender: "female",
    source: "WhatsApp",
    date: "Today, 10:14",
    status: "new",
  },
  {
    id: "2",
    name: "Fahad Al-Shammari",
    phone: "+966 55 987 6543",
    course: "Business English",
    gender: "male",
    source: "WhatsApp",
    date: "Today, 09:30",
    status: "contacted",
  },
  {
    id: "3",
    name: "Noura Al-Qahtani",
    phone: "+966 54 456 7890",
    course: "Level 4–6",
    gender: "female",
    source: "WhatsApp",
    date: "Yesterday",
    status: "enrolled",
  },
  {
    id: "4",
    name: "Rim Al-Nemer",
    phone: "+966 54 321 0987",
    course: "IELTS Prep",
    gender: "female",
    source: "WhatsApp",
    date: "3 days ago",
    status: "lost",
  },
  {
    id: "5",
    name: "Mohammed Alez",
    phone: "+966 54 231 2343",
    course: "IELTS Prep",
    gender: "male",
    source: "WhatsApp",
    date: "5 days ago",
    status: "lost",
  },
]


interface LeadProps {
    id: any;
    name: any;
    course_interest: any;
    gender: any;
    source: any;
    status: any;
    date: any;
    phone: any;
    contact_id: any;
    contacts: {
        platform_id: any;
    }[];
}


export function LeadsTable({data}:{data:LeadProps[]}) {

  console.log("leads", data)

  const leads = data
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <Table className=''>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-xs px-4 uppercase font-semibold tracking-wider text-muted-foreground">
              Customer
            </TableHead>
            <TableHead className="text-xs px-4 uppercase font-semibold tracking-wider text-muted-foreground">
              Course Interest
            </TableHead>
            <TableHead className="text-xs px-4 uppercase font-semibold tracking-wider text-muted-foreground">
              Gender
            </TableHead>
            <TableHead className="text-xs px-4 uppercase font-semibold tracking-wider text-muted-foreground">
              Source
            </TableHead>
            <TableHead className="text-xs px-4 uppercase font-semibold tracking-wider text-muted-foreground">
              Date
            </TableHead>
            <TableHead className="text-xs px-4 uppercase font-semibold tracking-wider text-muted-foreground">
              Status
            </TableHead>
            <TableHead className="text-xs px-4 uppercase font-semibold tracking-wider text-right text-muted-foreground">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {leads.map((lead) => (
            <TableRow
              key={lead.id}
              className="border-border hover:bg-muted/50 transition-colors"
            >
              {/* Customer */}
              <TableCell className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border border-border">
                    <AvatarImage
                      alt={lead.name}
                      src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png"
                    />
                    <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
                      {lead.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground leading-none">
                      {lead.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {lead.phone}
                    </span>
                  </div>
                </div>
              </TableCell>

              {/* Course */}
              <TableCell className="text-sm text-foreground font-medium">
                {lead.course_interest}
              </TableCell>

              {/* Gender */}
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn(
                    "capitalize font-normal border-none text-xs px-2.5 py-0.5",
                    lead.gender === "female"
                      ? "bg-pink-500/10 text-pink-500 dark:text-pink-400"
                      : "bg-sky-500/10 text-sky-500 dark:text-sky-400"
                  )}
                >
                  {lead.gender}
                </Badge>
              </TableCell>

              {/* Source — plain, secondary */}
              <TableCell className="text-sm text-muted-foreground">
                {lead.source}
              </TableCell>

              {/* Date — plain, secondary */}
              <TableCell className="text-sm text-muted-foreground">
                {lead.date}
              </TableCell>

              {/* Status */}
              <TableCell>
                <StatusBadge status={lead.status} />
              </TableCell>

              {/* Action */}
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <MessageCircle className="h-4 w-4" />
                  Open
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new:       "bg-violet-500/10 text-violet-500 dark:text-violet-400 border-violet-500/20",
    contacted: "bg-amber-500/10  text-amber-500  dark:text-amber-400  border-amber-500/20",
    enrolled:  "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20",
    lost:      "bg-muted text-muted-foreground border-border",
  }

  return (
    <Badge
      variant="outline"
      className={cn("capitalize text-xs px-2.5 py-0.5 font-normal", styles[status] ?? styles.new)}
    >
      {status}
    </Badge>
  )
}