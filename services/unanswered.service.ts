import { supabase } from '@/lib/supabase';

export const UnansweredService = {
  
  /**
   * 1. Fetch Aggregated Statistics for the Top Metrics Cards
   * Fixed column mapping to use `kb_status` based on schema.
   */
  async getQuestionStats() {
    const [total, open, handled, addedToKb] = await Promise.all([
      supabase.from('unanswered_questions').select('*', { count: 'exact', head: true }),
      supabase.from('unanswered_questions').select('*', { count: 'exact', head: true }).eq('kb_status', 'open'),
      supabase.from('unanswered_questions').select('*', { count: 'exact', head: true }).eq('kb_status', 'handled'),
      supabase.from('unanswered_questions').select('*', { count: 'exact', head: true }).eq('kb_status', 'added_to_kb')
    ]);

    return {
      total: total.count || 0,
      open: open.count || 0,
      handled: handled.count || 0,
      addedToKb: addedToKb.count || 0,
    };
  },

  /**
   * 2. Fetch Questions List with Filters
   * Corrected Joins: unanswered_questions -> contacts -> users to find the customer's name.
   */
  async getQuestions({
    searchTerm = '',
    status = 'all',
    course = 'all',
    dateRange = 'all_time'
  }: {
    searchTerm?: string;
    status?: string;
    course?: string;
    dateRange?: string;
  }) {
    // 1. Swapped !inner to a standard Left Join so rows show up unconditionally
    let query = supabase
      .from('unanswered_questions')
      .select(`
        id,
        question,
        kb_status,
        created_at,
        contact_id,
        contacts (
          platform_id,
          users (
            name
          ),
          leads (
            course_interest
          )
        )
      `)
      .order('created_at', { ascending: false });

    // Filter using correct status column
    if (status !== 'all') {
      query = query.eq('kb_status', status);
    }

    // Filter by course if present
    if (course !== 'all') {
      query = query.eq('contacts.leads.course_interest', course);
    }

    // Apply Date Range Filter
    if (dateRange !== 'all_time') {
      const now = new Date();
      let startDate = new Date();

      if (dateRange === 'today') {
        startDate.setHours(0, 0, 0, 0);
      } else if (dateRange === 'this_week') {
        const day = now.getDay();
        startDate.setDate(now.getDate() - day);
        startDate.setHours(0, 0, 0, 0);
      } else if (dateRange === 'this_month') {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      }
      
      query = query.gte('created_at', startDate.toISOString());
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching unanswered questions:", error);
      throw error;
    }

    if (!data || data.length === 0) return [];

    // Safely map values without relying on perfectly-filled foreign objects
    return data.map((item: any) => {
      const contactObj = item.contacts;
      // Handle instances where users or leads might be singular objects or single item arrays
      const userObj = Array.isArray(contactObj?.users) ? contactObj.users[0] : contactObj?.users;
      const leadObj = Array.isArray(contactObj?.leads) ? contactObj.leads[0] : contactObj?.leads;

      return {
        id: item.id,
        question: item.question,
        status: item.kb_status, 
        date: item.created_at,
        contactId: item.contact_id,
        customerName: userObj?.name || contactObj?.platform_id || 'Unknown User',
        customerPhone: contactObj?.platform_id || 'Unknown Number',
        courseInterest: leadObj?.course_interest || 'General Inquiry'
      };
    });
  },

  /**
   * 3. Row Action
   * Updated column name target to `kb_status`.
   */
  async updateQuestionStatus(id: string, newStatus: 'handled' | 'added_to_kb') {
    const { data, error } = await supabase
      .from('unanswered_questions')
      .update({ kb_status: newStatus })
      .eq('id', id)
      .select();

    if (error) {
      console.error(`Error updating question ${id} to ${newStatus}:`, error);
      throw error;
    }
    return data;
  }
};