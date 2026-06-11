"use server";

import prisma from "@/lib/prisma";
import { MessageRole } from "@/app/generated/prisma";
import { refresh, revalidatePath } from "next/cache";

/**
 * Fetches all users with their latest message for the sidebar.
 * Filters: 'all' | 'ai_handling' (aiPaused = false) | 'escalated' (aiPaused = true)
 */
export async function getConversations(filter: 'all' | 'ai_handling' | 'escalated' | 'lead_saved' = 'all') {
  try {
    const whereClause: any = {};

    if (filter === 'ai_handling') {
      whereClause.aiPaused = false;
    } else if (filter === 'escalated') {
      whereClause.aiPaused = true;
    }

    const users = await prisma.user.findMany({
      where: whereClause,
      orderBy: { lastSeen: 'desc' },
      select: {
        id: true,
        name: true,
        phoneNumber: true,
        aiPaused: true,
        lastSeen: true,
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1, // Only get the single most recent message
          select: {
            content: true,
            createdAt: true,
          },
        },
      },
    });

    // Transform data strictly to the new UI expectations
    return users.map((user) => ({
      id: user.id,
      name: user.name || user.phoneNumber, // Fallback to phone if no name
      phoneNumber: user.phoneNumber,
      ai_paused: user.aiPaused,
      last_seen: user.lastSeen,
      lastMessage: user.messages[0] || { content: 'No messages yet', created_at: user.lastSeen },
    }));
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw new Error("Failed to fetch conversations");
  }
}

/**
 * Simple search by name or phone number
 */
export async function searchConversations(searchTerm: string) {
  try {
    return await prisma.user.findMany({
      where: {
        OR: [
          { phoneNumber: { contains: searchTerm, mode: 'insensitive' } },
          { name: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        phoneNumber: true,
        name: true,
      },
    });
  } catch (error) {
    console.error("Error searching conversations:", error);
    throw new Error("Failed to search conversations");
  }
}

/**
 * Fetches all messages for a specific user.
 * Ordered by createdAt to show the thread in chronological order.
 */
export async function getMessages(userId: string) {
  try {
    return await prisma.message.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'asc' }, // Oldest first (top to bottom)
      select: {
        id: true,
        role: true,
        content: true,
        type: true,
        createdAt: true,
        status:true,
        userId:true
      },
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw new Error("Failed to fetch messages");
  }
}

/**
 * Fetches specific user details for the chat header.
 */
export async function getChatHeaderInfo(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        phoneNumber: true,
        aiPaused: true,
      },
    });

    if (!user) return null;

    return {
      customerName: user.name || user.phoneNumber || 'Unknown Customer',
      customerPhone: user.phoneNumber,
      isAiPaused: user.aiPaused,
    };
  } catch (error) {
    console.error(`Error fetching chat header info for user ${userId}:`, error);
    throw new Error("Failed to fetch chat header");
  }
}

/**
 * Inserts a manual message sent by the human team.
 */
export async function sendMessage(userId: string, content: string, type: string = 'text') {
  if (!content.trim()) return null;

  try {
    const message = await prisma.message.create({
      data: {
        userId: userId,
        content: content.trim(),
        role: MessageRole.human_assistant,
        type: type,
      },
    });

    // return message;
    // refresh()
    revalidatePath('/dashboard/conversations/'+userId)

  } catch (error) {
    console.error(`Error saving manual message for user ${userId}:`, error);
    throw new Error("Failed to send message");
  }
}