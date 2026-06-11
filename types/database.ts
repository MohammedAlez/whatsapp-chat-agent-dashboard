export interface Lead {
  id: string;
  name: string;
  course_interest: string;
  gender: 'Male' | 'Female';
  status: 'new' | 'contacted' | 'enrolled' | 'lost';
  source: string;
  date: string;
}

export interface Message {
  id: string;
  contact_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
}


