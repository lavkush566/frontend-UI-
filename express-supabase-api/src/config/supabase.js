import { createClient } from '@supabase/supabase-js';

// Your exact Supabase credentials hardcoded
const supabaseUrl = 'https://supabase.co';
const supabaseAnonKey = 'sb_publishable_wnFosAzwM9_vV7hORkYBrw_6ogf07-X';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
