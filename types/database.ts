// export interface Lead {
//   id: string;
//   name: string;
//   course_interest: string;
//   gender: 'Male' | 'Female';
//   status: 'new' | 'contacted' | 'enrolled' | 'lost';
//   source: string;
//   date: string;

import { LeadStatus } from "@/app/generated/prisma";

// }
export interface Lead {
  id: string;
    status: LeadStatus;
    serviceInterest: string | null;
    createdAt: Date;
    customer: {
        name: string;
        phoneNumber: string;
        lastSeen: Date;
    };
}

export interface Message {
  id: string;
  contact_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
}


