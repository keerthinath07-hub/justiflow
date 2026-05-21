import { createClient } from '@supabase/supabase-js';

// Retrieve credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = supabaseUrl !== '' && supabaseAnonKey !== '';

// Create a mock Supabase client fallback if not configured
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: {
        signInWithPassword: async () => ({ data: { user: null }, error: new Error('Supabase not configured') }),
        signOut: async () => ({ error: null }),
      },
      from: () => ({
        select: () => ({ order: () => ({ data: [], error: new Error('Supabase not configured') }) }),
        insert: () => ({ data: null, error: new Error('Supabase not configured') }),
        update: () => ({ data: null, error: new Error('Supabase not configured') }),
        delete: () => ({ data: null, error: new Error('Supabase not configured') }),
      }),
    };
