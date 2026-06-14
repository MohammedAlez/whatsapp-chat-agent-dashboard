"use server";

import prisma from "@/lib/prisma";
import { LeadStatus } from "@/app/generated/prisma";

interface GetLeadsOptions {
  searchTerm?: string;
  status?: string;   // 'all' or one of the LeadStatus enums
  service?: string;  // 'all' or specific service name (replaces legacy course field)
}

/**
 * 1. Fetch Aggregated Counter Stats for Lead Cards
 */
export async function getLeadStats() {
  try {
    const [total, newLeads, contacted, confirmed, canceled] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: LeadStatus.new } }),
      prisma.lead.count({ where: { status: LeadStatus.contacted } }),
      prisma.lead.count({ where: { status: LeadStatus.confirmed } }),
      prisma.lead.count({ where: { status: LeadStatus.canceled } }),
    ]);

    return {
      total,
      new: newLeads,
      contacted,
      confirmed,
      canceled,
    };
  } catch (error) {
    console.error("[SERVER ACTION ERROR] getLeadStats failed:", error);
    throw new Error("Failed to load lead statistics.");
  }
}

/**
 * 2. Fetch Leads List with Dynamic Filters and Multi-Column Search
 */
export async function getLeads({ 
  searchTerm = "", 
  status = "all", 
  service = "all" 
}: GetLeadsOptions = {}) {
  try {
    const whereClause: any = {};

    // Apply Status Filter matching the exact Prisma enums
    if (status !== "all") {
      whereClause.status = status as LeadStatus;
    }

    // Apply Service/Course Filter against the new column name
    if (service !== "all") {
      whereClause.serviceInterest = {
        equals: service,
        mode: "insensitive", // Case-insensitive matching
      };
    }

    // Apply Complex Search Filter (looks through Lead Name, Service type, or User Phone Number)
    if (searchTerm.trim()) {
      const genericSearch = { contains: searchTerm.trim(), mode: "insensitive" as const };
      
      whereClause.OR = [
        { name: genericSearch },
        { serviceInterest: genericSearch },
        {
          user: {
            OR: [
              { phoneNumber: genericSearch },
              { name: genericSearch }
            ]
          }
        }
      ];
    }

    // Fetch leads ordered by most recently created
    const leads = await prisma.lead.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            phoneNumber: true,
          },
        },
      },
    });

    // Flatten data mapping to keep integration with the frontend data-tables incredibly easy
    return leads.map((lead) => ({
      id: lead.id,
      name: lead.name || "Unnamed Lead",
      serviceInterest: lead.serviceInterest || "General Inquiry",
      gender: lead.gender,
      status: lead.status,
      createdAt: lead.createdAt,
      phone: lead.user?.phoneNumber || "Unknown",
    }));

  } catch (error) {
    console.error("[SERVER ACTION ERROR] getLeads failed:", error);
    throw new Error("Failed to retrieve filtered leads dataset.");
  }
}