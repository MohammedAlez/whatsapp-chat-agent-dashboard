import { supabase } from '@/lib/supabase';
import { Lead } from '@/types/database';

export const DashboardService = {
  // Helper to calculate percentage change
  calculateTrend(current: number, previous: number) {
    if (previous === 0) return current > 0 ? "+100%" : "0%";
    const diff = ((current - previous) / previous) * 100;
    const sign = diff >= 0 ? "+" : "";
    return `${sign}${diff.toFixed(1)}%`;
  },

  async getOverviewStats() {
    const now = new Date();
    
    // Timeframes
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    
    const yesterdayUntilNow = new Date(now);
    yesterdayUntilNow.setDate(yesterdayUntilNow.getDate() - 1);

    const [current, previous] = await Promise.all([
      // --- FETCH CURRENT (TODAY) ---
      Promise.all([
        supabase.from('messages').select('contact_id', { count: 'exact', head: true }).gte('created_at', todayStart.toISOString()),
        supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'new').gte('created_at', todayStart.toISOString()),
        supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('ai_paused', true), // Cumulative
        supabase.from('messages').select('*', { count: 'exact', head: true }).gte('created_at', todayStart.toISOString()),
        supabase.from('messages').select('*', { count: 'exact', head: true }).gte('created_at', todayStart.toISOString()).eq('role', 'assistant')
      ]),
      // --- FETCH PREVIOUS (YESTERDAY SAME TIME) ---
      Promise.all([
        supabase.from('messages').select('contact_id', { count: 'exact', head: true }).gte('created_at', yesterdayStart.toISOString()).lt('created_at', yesterdayUntilNow.toISOString()),
        supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'new').gte('created_at', yesterdayStart.toISOString()).lt('created_at', yesterdayUntilNow.toISOString()),
        supabase.from('messages').select('*', { count: 'exact', head: true }).gte('created_at', yesterdayStart.toISOString()).lt('created_at', yesterdayUntilNow.toISOString()),
        supabase.from('messages').select('*', { count: 'exact', head: true }).gte('created_at', yesterdayStart.toISOString()).lt('created_at', yesterdayUntilNow.toISOString()).eq('role', 'assistant')
      ])
    ]);

    // Data Extraction
    const currConvos = current[0].count || 0;
    const currLeads = current[1].count || 0;
    const currEscalated = current[2].count || 0;
    const currTotalMsgs = current[3].count || 0;
    const currAiMsgs = current[4].count || 0;

    const prevConvos = previous[0].count || 0;
    const prevLeads = previous[1].count || 0;
    const prevTotalMsgs = previous[2].count || 0;
    const prevAiMsgs = previous[3].count || 0;

    // AI Rate Calculation
    const aiHandledRate = currTotalMsgs > 0 ? Math.round((currAiMsgs / currTotalMsgs) * 100) : 0;
    const prevAiRate = prevTotalMsgs > 0 ? Math.round((prevAiMsgs / prevTotalMsgs) * 100) : 0;

    return {
      conversationsToday: currConvos,
      leadsCaptured: currLeads,
      escalatedCount: currEscalated,
      aiHandledRate: aiHandledRate,
      trends: {
        conversations: this.calculateTrend(currConvos, prevConvos),
        leads: this.calculateTrend(currLeads, prevLeads),
        aiRate: this.calculateTrend(aiHandledRate, prevAiRate),
        // Escalated usually compared to a fixed threshold or yesterday's total
        escalated: this.calculateTrend(currEscalated, 5) // Example: comparing to a baseline
      }
    };
  },

  async getRecentLeads(limit = 5) {
    const { data, error } = await supabase
      .from('leads')
      .select('*, contacts(platform, last_seen)')
      .order('date', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data as any[];
  },

  async getUnansweredQuestions(limit = 5) {
    const { data, error } = await supabase
      .from('unanswered_questions')
      .select(`
        id,
        question,
        created_at,
        kb_status,
        contact_id,
        contacts (
          platform_id,
          platform
        )
      `)
      .eq('kb_status', 'open') // Only show questions that still need attention
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching unanswered questions:", error);
      throw error;
    }

    return data;
  }
};