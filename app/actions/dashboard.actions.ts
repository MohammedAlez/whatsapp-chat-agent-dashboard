"use server";

import prisma from "@/lib/prisma";
import { LeadStatus, QuestionStatus, MessageRole } from "@/app/generated/prisma";

// --- HELPERS ---

/**
 * Calculates the percentage change between two values.
 */
function calculateTrend(current: number, previous: number): string {
  if (previous === 0) return current > 0 ? "+100%" : "0%";
  const diff = ((current - previous) / previous) * 100;
  const sign = diff >= 0 ? "+" : "";
  return `${sign}${diff.toFixed(1)}%`;
}

// --- ACTIONS ---

/**
 * Fetches high-level metrics for the dashboard overview cards.
 * Compares "Today (since midnight)" vs "Yesterday (midnight to current time)".
 */
export async function getOverviewStats() {
  try {
    const now = new Date();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);

    const yesterdayUntilNow = new Date(now);
    yesterdayUntilNow.setDate(yesterdayUntilNow.getDate() - 1);

    // Running all counts in parallel for performance
    const [
      currConvos,
      currLeads,
      currEscalatedBacklog, // 1. Main card count: all currently open questions
      currEscalatedToday,   // 2. Added: New escalations created today
      currTotalOutbound, // Changed to track outbound answers only
      currAiMsgs,
      prevConvos,
      prevLeads,
      prevEscalatedYesterday, // 3. Added: New escalations created yesterday same timeframe
      prevTotalOutbound, // Changed to track outbound answers only
      prevAiMsgs,
    ] = await Promise.all([
      // --- CURRENT PERIOD (TODAY) ---
      prisma.user.count({ where: { messages: { some: { createdAt: { gte: todayStart } } } } }),
      prisma.lead.count({ where: { status: LeadStatus.new, createdAt: { gte: todayStart } } }),
      
      // Cumulative unresolved backlog for the main card number
      prisma.unansweredQuestion.count({ where: { status: QuestionStatus.open } }), 
      
      // Volume of new escalations that happened today
      prisma.unansweredQuestion.count({ where: { createdAt: { gte: todayStart } } }),
      // Total outbound responses today (AI + Human Team)
      prisma.message.count({ 
        where: { 
          role: { in: [MessageRole.ai_assistant, MessageRole.human_assistant] }, 
          createdAt: { gte: todayStart } 
        } 
      }),
      prisma.message.count({ where: { role: MessageRole.ai_assistant, createdAt: { gte: todayStart } } }),

      // --- PREVIOUS PERIOD (YESTERDAY SAME TIMEFRAME) ---
      prisma.user.count({
        where: { messages: { some: { createdAt: { gte: yesterdayStart, lt: yesterdayUntilNow } } } },
      }),
      prisma.lead.count({
        where: { status: LeadStatus.new, createdAt: { gte: yesterdayStart, lt: yesterdayUntilNow } },
      }),
      
      // Volume of new escalations that happened yesterday during these same hours
      prisma.unansweredQuestion.count({
        where: { createdAt: { gte: yesterdayStart, lt: yesterdayUntilNow } }
      }),

      // Total outbound responses yesterday same timeframe (AI + Human Team)
      prisma.message.count({ 
        where: { 
          role: { in: [MessageRole.ai_assistant, MessageRole.human_assistant] }, 
          createdAt: { gte: yesterdayStart, lt: yesterdayUntilNow } 
        } 
      }),
      prisma.message.count({
        where: { role: MessageRole.ai_assistant, createdAt: { gte: yesterdayStart, lt: yesterdayUntilNow } },
      }),
    ]);

    // AI Automation Rate Calculation (AI responses / Total system responses)
    const aiHandledRate = currTotalOutbound > 0 ? Math.round((currAiMsgs / currTotalOutbound) * 100) : 0;
    const prevAiRate = prevTotalOutbound > 0 ? Math.round((prevAiMsgs / prevTotalOutbound) * 100) : 0;

    return {
      conversationsToday: currConvos,
      leadsCaptured: currLeads,
      escalatedCount: currEscalatedBacklog,
      aiHandledRate: aiHandledRate,
      trends: {
        conversations: calculateTrend(currConvos, prevConvos),
        leads: calculateTrend(currLeads, prevLeads),
        aiRate: calculateTrend(aiHandledRate, prevAiRate),
        // Dynamic comparison: Are we getting more or fewer open tickets than yesterday?
        escalated: calculateTrend(currEscalatedToday, prevEscalatedYesterday),      },
    };
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    throw new Error("Failed to load dashboard statistics.");
  }
}

/**
 * Fetches recent leads with associated user contact info.
 */
export async function getRecentLeads(limit = 5) {
  try {
    const leads = await prisma.lead.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            phoneNumber: true,
            lastSeen: true,
          },
        },
      },
    });

    return leads.map((lead) => ({
      id: lead.id,
      status: lead.status,
      serviceInterest: lead.serviceInterest,
      createdAt: lead.createdAt,
      customer: {
        name: lead.user.name || lead.user.phoneNumber,
        phoneNumber: lead.user.phoneNumber,
        lastSeen: lead.user.lastSeen,
      },
    }));
  } catch (error) {
    console.error("Recent Leads Error:", error);
    throw new Error("Failed to load recent leads.");
  }
}

/**
 * Fetches questions flagged as unanswered by the AI that need KB updates.
 */
export async function getUnansweredQuestions(limit = 5) {
  try {
    const questions = await prisma.unansweredQuestion.findMany({
      where: { status: QuestionStatus.open },
      take: limit,
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

    return questions.map((q) => ({
      id: q.id,
      question: q.question,
      createdAt: q.createdAt,
      status: q.status,
      customerName: q.user.name || q.user.phoneNumber,
      customerPhone: q.user.phoneNumber
    }));
  } catch (error) {
    console.error("Unanswered Questions Error:", error);
    throw new Error("Failed to load unanswered questions.");
  }
}