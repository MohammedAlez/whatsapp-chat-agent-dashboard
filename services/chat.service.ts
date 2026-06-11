import { supabase } from '@/lib/supabase';

export const ChatService = {
  /**
   * Fetches all contacts with their latest message for the sidebar.
   * Filters: 
   * - 'all': everything
   * - 'ai_handling': where ai_paused is false
   * - 'escalated': where ai_paused is true
   */
  async getConversations(filter: 'all' | 'ai_handling' | 'escalated' | 'lead_saved' = 'all') {
    let query = supabase
      .from('contacts')
      .select(`
        id,
        platform_id,
        platform,
        ai_paused,
        last_seen,
        users (
          name
        ),
        messages (
          content,
          created_at
        )
      `)
      // Get the latest message first
      .order('created_at', { foreignTable: 'messages', ascending: false })
      // Order the list by who spoke most recently
      .order('last_seen', { ascending: false });

    // Apply Filters based on your UI Tabs
    if (filter === 'ai_handling') {
      query = query.eq('ai_paused', false);
    } else if (filter === 'escalated') {
      query = query.eq('ai_paused', true);
    }
    // Note: 'lead_saved' would require a join with the leads table 
    // but for now, we'll keep it simple.

    const { data, error } = await query;

    if (error) throw error;

    // Transform data to ensure we only return the SINGLE latest message for the UI
    return data.map((contact: any) => ({
      id: contact.id,
      name: contact.users?.name || contact.platform_id, // Fallback to phone if no name
      platform_id: contact.platform_id,
      platform: contact.platform,
      ai_paused: contact.ai_paused,
      last_seen: contact.last_seen,
      // Get only the most recent message object
      lastMessage: contact.messages?.[0] || { content: 'No messages yet', created_at: contact.last_seen }
    }));
  },

  /**
   * Simple search by name or phone number
   */
  async searchConversations(searchTerm: string) {
    const { data, error } = await supabase
      .from('contacts')
      .select(`
        id,
        platform_id,
        users!inner ( name )
      `)
      .or(`platform_id.ilike.%${searchTerm}%, users.name.ilike.%${searchTerm}%`);

    if (error) throw error;
    return data;
  },




  /**
   * Fetches all messages for a specific contact/conversation.
   * Ordered by created_at to show the thread in chronological order.
   */
  async getMessages(contactId: string) {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        id,
        role,
        content,
        type,
        created_at
      `)
      .eq('contact_id', contactId)
      .order('created_at', { ascending: true }); // true = oldest first (top to bottom)

    if (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }

    return data;
  },

  async getChatHeaderInfo(contactId: string) {
    const { data, error } = await supabase
      .from('contacts')
      .select(`
        platform_id,
        ai_paused,
        users (
          name
        )
      `)
      .eq('id', contactId)
      .single(); // Since contactId is a primary key, we want a single object returned

    if (error) {
      console.error(`Error fetching chat header info for contact ${contactId}:`, error);
      throw error;
    }

    if (!data) return null;

    // Handle single object or array nesting based on how Supabase reads the users table relation
    const userObj = Array.isArray(data.users) ? data.users[0] : data.users;

    return {
      customerName: userObj?.name || data.platform_id || 'Unknown Customer',
      customerPhone: data.platform_id || 'Unknown Handle',
      isAiPaused: data.ai_paused || false
    };
  },

  async sendMessage(contactId: string, content: string, type: string = 'text') {
    if (!content.trim()) return null;

    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          contact_id: contactId,
          content: content.trim(),
          role: 'human-assistant', // Explicitly marked so the UI renders it on the right side
          type: type,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error(`Error saving manual message for contact ${contactId}:`, error);
      throw error;
    }

    return data;
  }
};