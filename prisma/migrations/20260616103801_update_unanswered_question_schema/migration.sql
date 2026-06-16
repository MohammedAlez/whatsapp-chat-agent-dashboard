/*
  Warnings:

  - You are about to drop the column `kb_status` on the `unanswered_questions` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "QuestionStatus" AS ENUM ('open', 'handled');

-- DropIndex
DROP INDEX "unanswered_questions_kb_status_idx";

-- AlterTable
ALTER TABLE "unanswered_questions" DROP COLUMN "kb_status",
ADD COLUMN     "added_to_kb" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "QuestionStatus" NOT NULL DEFAULT 'open';

-- DropEnum
DROP TYPE "KbStatus";

-- CreateIndex
CREATE INDEX "unanswered_questions_status_idx" ON "unanswered_questions"("status");

-- CreateIndex
CREATE INDEX "unanswered_questions_added_to_kb_idx" ON "unanswered_questions"("added_to_kb");
