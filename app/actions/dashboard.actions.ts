"use server";

import prisma from "@/lib/prisma";
import { LeadStatus, KbStatus, MessageRole } from "@/app/generated/prisma";

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
      currEscalated,
      currTotalMsgs,
      currAiMsgs,
      prevConvos,
      prevLeads,
      prevTotalMsgs,
      prevAiMsgs,
    ] = await Promise.all([
      // CURRENT PERIOD
      prisma.user.count({ where: { messages: { some: { createdAt: { gte: todayStart } } } } }),
      prisma.lead.count({ where: { status: LeadStatus.new, createdAt: { gte: todayStart } } }),
      prisma.user.count({ where: { aiPaused: true } }), // Cumulative count
      prisma.message.count({ where: { createdAt: { gte: todayStart } } }),
      prisma.message.count({ where: { role: MessageRole.ai_assistant, createdAt: { gte: todayStart } } }),

      // PREVIOUS PERIOD (Yesterday same timeframe)
      prisma.user.count({
        where: { messages: { some: { createdAt: { gte: yesterdayStart, lt: yesterdayUntilNow } } } },
      }),
      prisma.lead.count({
        where: { status: LeadStatus.new, createdAt: { gte: yesterdayStart, lt: yesterdayUntilNow } },
      }),
      prisma.message.count({ where: { createdAt: { gte: yesterdayStart, lt: yesterdayUntilNow } } }),
      prisma.message.count({
        where: { role: MessageRole.ai_assistant, createdAt: { gte: yesterdayStart, lt: yesterdayUntilNow } },
      }),
    ]);

    // AI Rate Calculation
    const aiHandledRate = currTotalMsgs > 0 ? Math.round((currAiMsgs / currTotalMsgs) * 100) : 0;
    const prevAiRate = prevTotalMsgs > 0 ? Math.round((prevAiMsgs / prevTotalMsgs) * 100) : 0;

    return {
      conversationsToday: currConvos,
      leadsCaptured: currLeads,
      escalatedCount: currEscalated,
      aiHandledRate: aiHandledRate,
      trends: {
        conversations: calculateTrend(currConvos, prevConvos),
        leads: calculateTrend(currLeads, prevLeads),
        aiRate: calculateTrend(aiHandledRate, prevAiRate),
        escalated: calculateTrend(currEscalated, 5), // Baseline comparison per your original logic
      },
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
      where: { kbStatus: KbStatus.open },
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
      kbStatus: q.kbStatus,
      customer: {
        name: q.user.name || q.user.phoneNumber,
        phoneNumber: q.user.phoneNumber,
      },
    }));
  } catch (error) {
    console.error("Unanswered Questions Error:", error);
    throw new Error("Failed to load unanswered questions.");
  }
}