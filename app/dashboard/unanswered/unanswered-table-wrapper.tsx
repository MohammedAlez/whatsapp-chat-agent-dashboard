import { UnansweredService } from "@/services/unanswered.service"
import { QuestionsTable } from "@/components/questions-table"

export default async function UnansweredsTableWrapper({
  status,
  course,
  q,
}:any) {
  const questions = await UnansweredService.getQuestions({
    status,
    course,
    searchTerm: q,
  })

  return <QuestionsTable data={questions} />

}