import { UnansweredService } from "@/services/unanswered.service"
import { QuestionsTable } from "@/components/questions-table"
import { getQuestions } from "@/app/actions/unanswered.actions"

export default async function UnansweredsTableWrapper({
  status,
  q,
}:any) {
  const questions = await getQuestions({
    status,
    searchTerm: q,
  })

  return <QuestionsTable data={questions} />

}