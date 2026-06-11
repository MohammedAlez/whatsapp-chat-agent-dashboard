import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useRealtimeStats() {
  const [newLeadCount, setNewLeadCount] = useState(0);

  useEffect(() => {
    const channel = supabase
      .channel('realtime-dashboard')
      .on('postgres_changes', 
          { event: 'INSERT', schema: 'public', table: 'leads' }, 
          () => setNewLeadCount(prev => prev + 1)
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return { newLeadCount };
}