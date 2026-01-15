import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const dbService = {
  // Fetch all saved papers for your Knowledge Base
  async getSavedPapers() {
    const { data, error } = await supabase
      .from('research_archive')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }
};