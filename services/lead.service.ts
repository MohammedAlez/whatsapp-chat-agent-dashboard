import { supabase } from '@/lib/supabase';

export const LeadService = {
  
  // 1. Fetch Stats for the Top Cards
  async getLeadStats() {
    const [total, newLeads, contacted, enrolled] = await Promise.all([
      supabase.from('leads').select('*', { count: 'exact', head: true }),
      supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'new'),
      supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'contacted'),
      supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'enrolled')
    ]);

    return {
      total: total.count || 0,
      new: newLeads.count || 0,
      contacted: contacted.count || 0,
      enrolled: enrolled.count || 0,
    };
  },

  // 2. Fetch Leads for the Table with Filters
  async getLeads({ 
    searchTerm = '', 
    status = 'all', 
    course = 'all' 
  }: { 
    searchTerm?: string, 
    status?: string, 
    course?: string 
  }) {
    
    // Start the query and join the contacts table to get the phone number
    let query = supabase
      .from('leads')
      .select(`
        id,
        name,
        course_interest,
        gender,
        source,
        status,
        date,
        contact_id,
        contacts!inner (
          platform_id
        )
      `)
      .order('date', { ascending: false });

    // Apply Status Filter
    if (status !== 'all') {
      query = query.eq('status', status);
    }

    // Apply Course Filter
    if (course !== 'all') {
      query = query.eq('course_interest', course);
    }

    // Apply Search Filter (checking both lead name and contact phone number)
    if (searchTerm) {
    // Use the exact relationship name 'contacts' to point to the joined column
    // query = query.or(`name.ilike.%${searchTerm}%,contacts.platform_id.ilike.%${searchTerm}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching leads:", error);
      throw error;
    }

    // Map the data to flatten the contact info for easier UI rendering
    return data.map((lead: any) => ({
      ...lead,
      phone: lead.contacts?.platform_id || 'Unknown',
    }));
  }
};