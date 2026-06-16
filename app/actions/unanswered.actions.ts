"use server";

import prisma from "@/lib/prisma";
import { QuestionStatus } from "@/app/generated/prisma";
import { revalidatePath } from "next/cache";

interface GetQuestionsOptions {
  searchTerm?: string;
  status?: string;      // 'all' | 'open' | 'handled'
  addedToKb?: string;   // 'all' | 'yes' | 'no'
  dateRange?: string;   // 'all_time' | 'today' | 'this_week' | 'this_month'
}

/**
 * 1. Fetch Aggregated Statistics for the Top Metrics Cards
 */
export async function getQuestionStats() {
  try {
    const [total, open, handled, addedToKb] = await Promise.all([
      prisma.unansweredQuestion.count(),
      prisma.unansweredQuestion.count({ where: { status: QuestionStatus.open } }),
      prisma.unansweredQuestion.count({ where: { status: QuestionStatus.handled } }),
      prisma.unansweredQuestion.count({ where: { addedToKb: true } }),
    ]);

    return {
      total,
      open,
      handled,
      addedToKb,
    };
  } catch (error) {
    console.error("[SERVER ACTION ERROR] getQuestionStats failed:", error);
    throw new Error("Failed to load question statistics.");
  }
}

/**
 * 2. Fetch Questions List with Filters (Course removed completely)
 */
export async function getQuestions({
  searchTerm = "",
  status = "all",
  addedToKb = "all",
  dateRange = "all_time",
}: GetQuestionsOptions = {}) {
  try {
    const whereClause: any = {};

    // Filter by Workflow Status
    if (status !== "all") {
      whereClause.status = status as QuestionStatus;
    }

    // Filter by Knowledge Base Status
    if (addedToKb !== "all") {
      whereClause.addedToKb = addedToKb === "yes";
    }

    // Filter by Date Ranges natively using standard Prisma Date blocks
    if (dateRange !== "all_time") {
      const now = new Date();
      let startDate = new Date();

      if (dateRange === "today") {
        startDate.setHours(0, 0, 0, 0);
      } else if (dateRange === "this_week") {
        const day = now.getDay();
        startDate.setDate(now.getDate() - day);
        startDate.setHours(0, 0, 0, 0);
      } else if (dateRange === "this_month") {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      }

      whereClause.createdAt = { gte: startDate };
    }

    // Dynamic relational search block across user properties or the question string itself
    if (searchTerm.trim()) {
      const searchString = { contains: searchTerm.trim(), mode: "insensitive" as const };
      whereClause.OR = [
        { question: searchString },
        {
          user: {
            OR: [
              { name: searchString },
              { phoneNumber: searchString },
            ],
          },
        },
      ];
    }

    const questions = await prisma.unansweredQuestion.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            phoneNumber: true,
          },
        },
      },
    });

    // Clean data flattening for immediate consumption by your layout data-tables
    return questions.map((item) => ({
      id: item.id,
      question: item.question,
      status: item.status,
      addedToKb: item.addedToKb,
      createdAt: item.createdAt,
      userId: item.userId,
      customerName: item.user?.name || item.user?.phoneNumber || "Unknown User",
      customerPhone: item.user?.phoneNumber || "Unknown Number",
    }));
  } catch (error) {
    console.error("[SERVER ACTION ERROR] getQuestions failed:", error);
    throw new Error("Failed to load filtered questions.");
  }
}

/**
 * 3. Update Workflow Status (Open <-> Handled)
 */
export async function updateQuestionStatus(id: string, newStatus: QuestionStatus) {
  try {
    const updated = await prisma.unansweredQuestion.update({
      where: { id },
      data: { status: newStatus },
    });

    revalidatePath("/dashboard"); // Automatically synchronizes your dashboard views
    return { success: true, data: updated };
  } catch (error) {
    console.error(`[SERVER ACTION ERROR] updateQuestionStatus failed for ${id}:`, error);
    throw new Error("Failed to update execution workflow state.");
  }
}

/**
 * 4. Toggle Knowledge Base Syndication Status
 */
export async function toggleAddedToKb(id: string, isAdded: boolean) {
  try {
    const updated = await prisma.unansweredQuestion.update({
      where: { id },
      data: { addedToKb: isAdded },
    });

    revalidatePath("/dashboard");
    return { success: true, data: updated };
  } catch (error) {
    console.error(`[SERVER ACTION ERROR] toggleAddedToKb failed for ${id}:`, error);
    throw new Error("Failed to sync status to knowledge base context.");
  }
}